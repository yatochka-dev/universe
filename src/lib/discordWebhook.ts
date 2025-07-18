// Re‑use interfaces from prior answer (assume imported) or redefine as needed.

import type {
  AllowedMentions,
  AttachmentPayload,
  Component,
  Embed,
  EmbedField,
  Poll,
  WebhookPayload,
} from "~/types/webhooks";

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

// Discord embed length constraints (kept here for reference)
const LIMITS = {
  CONTENT: 2000,
  EMBED: {
    TITLE: 256,
    DESC: 4096,
    FIELDS: 25,
    FIELD_NAME: 256,
    FIELD_VALUE: 1024,
    FOOTER_TEXT: 2048,
    AUTHOR_NAME: 256,
    TOTAL: 6000, // Sum of title + desc + all field names/values + footer + author
  },
};

export class WebhookPayloadBuilder {
  private payload: Partial<WebhookPayload> = {
    allowed_mentions: { parse: [] },
  };
  private validateLengths = false;

  static create() {
    return new WebhookPayloadBuilder();
  }

  enableLengthValidation(on = true) {
    this.validateLengths = on;
    return this;
  }

  username(name: string) {
    this.payload.username = name;
    return this;
  }

  avatar(url: string) {
    this.payload.avatar_url = url;
    return this;
  }

  content(text: string) {
    if (this.validateLengths && text.length > LIMITS.CONTENT) {
      throw new Error(`content too long (${text.length} > ${LIMITS.CONTENT})`);
    }
    this.payload.content = text;
    return this;
  }

  suppressMentions() {
    this.payload.allowed_mentions = { parse: [] };
    return this;
  }

  allowMentions(opts: AllowedMentions) {
    this.payload.allowed_mentions = opts;
    return this;
  }

  tts(on = true) {
    this.payload.tts = on;
    return this;
  }

  addFieldToLastEmbed(field: EmbedField) {
    if (!this.payload.embeds || this.payload.embeds.length === 0) {
      throw new Error("No embed to add field to. Call addEmbed() first.");
    }
    const e = this.payload.embeds[this.payload.embeds.length - 1];
    if (!e) return this;
    e.fields = e.fields ?? [];
    if (this.validateLengths) {
      if (e.fields.length >= LIMITS.EMBED.FIELDS)
        throw new Error("Too many fields.");
      if (field.name.length > LIMITS.EMBED.FIELD_NAME)
        throw new Error("Field name too long.");
      if (field.value.length > LIMITS.EMBED.FIELD_VALUE)
        throw new Error("Field value too long.");
    }
    e.fields.push(field);
    return this;
  }

  addEmbed(embedInit: Omit<Embed, "fields"> & { fields?: EmbedField[] } = {}) {
    this.payload.embeds = this.payload.embeds ?? [];
    if (this.payload.embeds.length >= 10) throw new Error("Max 10 embeds.");
    const e: Embed = { ...embedInit };
    if (this.validateLengths) this.validateEmbedLengths(e);
    this.payload.embeds.push(e);
    return this;
  }

  modifyLastEmbed(mutator: (e: Embed) => void) {
    if (!this.payload.embeds || this.payload.embeds.length === 0) {
      throw new Error("No embed to modify.");
    }
    const e = this.payload.embeds[this.payload.embeds.length - 1];
    if (!e) return this;
    mutator(e);
    if (this.validateLengths) this.validateEmbedLengths(e);
    return this;
  }

  setPoll(poll: Poll) {
    this.payload.poll = poll;
    return this;
  }

  addAttachmentMeta(att: AttachmentPayload) {
    this.payload.attachments = this.payload.attachments ?? [];
    this.payload.attachments.push(att);
    return this;
  }

  components(components: Component[]) {
    this.payload.components = components;
    return this;
  }

  /**
   * Finalize & get a *frozen* payload object.
   * Throws if missing required "one of" fields.
   */
  build(): WebhookPayload & DeepReadonly<WebhookPayload> {
    if (
      !this.payload.content &&
      (!this.payload.embeds || this.payload.embeds.length === 0) &&
      !this.payload.poll &&
      (!this.payload.attachments || this.payload.attachments.length === 0)
    ) {
      throw new Error(
        "Invalid payload: need content, embed(s), poll, or attachment(s).",
      );
    }
    // Optionally revalidate embeds if lengths on.
    if (this.validateLengths && this.payload.embeds) {
      this.payload.embeds.forEach((e) => this.validateEmbedLengths(e));
    }
    return Object.freeze(this.payload as WebhookPayload);
  }

  private validateEmbedLengths(e: Embed) {
    const sum =
      (e.title?.length ?? 0) +
      (e.description?.length ?? 0) +
      (e.footer?.text?.length ?? 0) +
      (e.author?.name?.length ?? 0) +
      (e.fields?.reduce((a, f) => a + f.name.length + f.value.length, 0) ?? 0);

    if (e.title && e.title.length > LIMITS.EMBED.TITLE)
      throw new Error("Embed title too long");
    if (e.description && e.description.length > LIMITS.EMBED.DESC)
      throw new Error("Embed description too long");
    if (e.footer?.text && e.footer.text.length > LIMITS.EMBED.FOOTER_TEXT)
      throw new Error("Footer text too long");
    if (e.author?.name && e.author.name.length > LIMITS.EMBED.AUTHOR_NAME)
      throw new Error("Author name too long");
    if (e.fields) {
      if (e.fields.length > LIMITS.EMBED.FIELDS)
        throw new Error("Too many embed fields");
      for (const f of e.fields) {
        if (f.name.length > LIMITS.EMBED.FIELD_NAME)
          throw new Error("Field name too long");
        if (f.value.length > LIMITS.EMBED.FIELD_VALUE)
          throw new Error("Field value too long");
      }
    }
    if (sum > LIMITS.EMBED.TOTAL)
      throw new Error(`Embed total length (${sum}) > ${LIMITS.EMBED.TOTAL}`);
  }
}

export interface SendOptions {
  wait?: boolean; // adds ?wait=true
  retry?: number; // simple linear retry count on 429/5xx
  signal?: AbortSignal;
}

export async function sendWebhook(
  webhookUrl: string,
  payload: WebhookPayload,
  opts: SendOptions = {},
) {
  const url = new URL(webhookUrl);
  if (opts.wait) url.searchParams.set("wait", "true");

  let attempt = 0;
  const max = Math.max(0, opts.retry ?? 0);

  while (true) {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: opts.signal,
    });

    if (res.status === 204 || res.ok) {
      return res.status === 204 ? null : ((await res.json()) as unknown);
    }

    if (res.status === 429) {
      const retryAfter =
        parseFloat(res.headers.get("Retry-After") ?? "0") * 1000;
      if (attempt < max) {
        await new Promise((r) => setTimeout(r, retryAfter || 1000));
        attempt++;
        continue;
      }
    } else if (res.status >= 500 && attempt < max) {
      attempt++;
      await new Promise((r) => setTimeout(r, 500 * attempt));
      continue;
    }

    // Extract error body for clarity
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      /* ignore */
    }
    throw new Error(
      `Webhook send failed: ${res.status} ${res.statusText} ${body ? JSON.stringify(body) : ""}`,
    );
  }
}
