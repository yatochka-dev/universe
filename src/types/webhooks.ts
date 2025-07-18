/**
 * Utility: require at least one of the listed keys to be present.
 */
type AtLeastOne<T, K extends keyof T> = Omit<T, K> &
  {
    [P in K]-?: Required<Pick<T, P>> & Partial<Pick<T, Exclude<K, P>>>;
  }[K];

/* ---------- Core Structures ---------- */

export interface AllowedMentions {
  parse?: Array<"roles" | "users" | "everyone">;
  roles?: string[]; // Role IDs to ping explicitly
  users?: string[]; // User IDs to ping explicitly
  replied_user?: boolean; // If true, ping author of referenced message
}

export interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedFooter {
  text: string; // REQUIRED if footer object provided
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface EmbedImageLike {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface Embed {
  title?: string;
  type?: string; // Usually "rich"; rarely needed
  description?: string;
  url?: string;
  timestamp?: string; // ISO8601
  color?: number; // Decimal int (24-bit)
  footer?: EmbedFooter;
  image?: EmbedImageLike;
  thumbnail?: EmbedImageLike;
  video?: EmbedImageLike;
  provider?: { name?: string; url?: string };
  author?: EmbedAuthor;
  fields?: EmbedField[]; // Max 25
}

/* ---------- Poll (new-ish feature) ---------- */

export interface PollMedia {
  text?: string;
  emoji_id?: string; // For custom emoji
  emoji_name?: string; // For unicode or custom name
  emoji_animated?: boolean;
}

export interface PollAnswer {
  poll_media: PollMedia;
}

export interface PollQuestion {
  text: string;
}

export interface Poll {
  question: PollQuestion;
  answers: PollAnswer[]; // (2–? upper limit may change; keep conservative)
  duration: number; // Hours poll stays open
  allow_multiselect?: boolean;
}

/* ---------- Attachments (metadata reference if using multipart) ---------- */

export interface AttachmentPayload {
  id: string; // Stringified index (e.g. "0") when sending multipart
  filename: string;
  description?: string;
  // Optionally width/height/content_type/size if reusing existing attachments
}

/* ---------- Components (Buttons, etc.) ----------
 * Only valid for certain webhook contexts (e.g. if application has integration).
 * Included for completeness; omit if you don’t use interactive components.
 */

export interface MessageComponentBase {
  type: number; // Discord component type enum
}

export interface ActionRow extends MessageComponentBase {
  type: 1;
  components: Component[];
}

export interface ButtonComponent extends MessageComponentBase {
  type: 2;
  style: number; // 1..5
  label?: string;
  emoji?: { id?: string; name?: string; animated?: boolean };
  custom_id?: string; // Required if not link
  url?: string; // Only for link buttons (style 5)
  disabled?: boolean;
}

export interface SelectMenuComponent extends MessageComponentBase {
  type: 3 | 5 | 6 | 7 | 8; // Different select types
  custom_id: string;
  options?: Array<{
    label: string;
    value: string;
    description?: string;
    emoji?: { id?: string; name?: string; animated?: boolean };
    default?: boolean;
  }>;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export type Component = ActionRow | ButtonComponent | SelectMenuComponent;

/* ---------- Base Webhook Payload ---------- */

interface WebhookPayloadCore {
  content?: string; // <= 2000 chars
  username?: string; // Override webhook default
  avatar_url?: string; // Override avatar
  tts?: boolean;
  embeds?: Embed[]; // Max 10
  allowed_mentions?: AllowedMentions;
  components?: Component[]; // For interactive messages (if allowed)
  flags?: number; // e.g. suppress embeds; rarely used here
  thread_name?: string; // Auto-create thread (when supported)
  poll?: Poll;
  attachments?: AttachmentPayload[]; // MUST align with multipart form parts
}

/**
 * Enforce at least one meaningful content carrier.
 * (Cannot guarantee “attachments” since those are multipart, but we include the metadata.)
 */
export type WebhookPayload = AtLeastOne<
  WebhookPayloadCore,
  "content" | "embeds" | "poll" | "attachments"
>;
