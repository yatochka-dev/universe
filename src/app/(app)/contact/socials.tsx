import { Button } from "~/components/ui/button";
import { Instagram, MessageCircle, Music, Youtube, Icon } from "lucide-react";
import React from "react";
import type { ContactPage, Setting } from "../../../../payload-types";
import * as Icons from "lucide-react";
import getSettings from "~/data-access/settings";
import Link from "next/link";

export type IconName = keyof typeof Icons;

export function DynamicIcon({
  name,
  size = 24,
}: {
  name: IconName;
  size?: number;
}) {
  const LucideIcon = Icons[name]; // lookup by string
  if (!LucideIcon) return null; // fallback if invalid name
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <LucideIcon size={size} />;
}

export const Socials = async () => {
  const settings = await getSettings();

  const shownIcons = !!settings.socials
    ? settings.socials?.filter((social) => social.show).length
    : 0;

  if (shownIcons === 0) return null;

  return (
    <div className="border-border rounded-lg border p-8 shadow-sm">
      <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
        Follow Us
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {!!settings.socials &&
          settings.socials.map((social) => {
            if (!social.show) return null;
            return (
              <Button
                key={social.id}
                variant="outline"
                className="justify-start bg-transparent"
                asChild
              >
                <Link
                  href={social.link}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <DynamicIcon
                    name={(social.icon as IconName) ?? "MessageCircle"}
                  />
                  {social.name}
                </Link>
              </Button>
            );
          })}
      </div>
    </div>
  );
};
