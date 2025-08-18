import { Button } from "~/components/ui/button";
import { Instagram, MessageCircle, Music, Youtube, Icon } from "lucide-react";
import React from "react";
import type { ContactPage } from "../../../../payload-types";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

function DynamicIcon({ name, size = 24 }: { name: IconName; size?: number }) {
  const LucideIcon = Icons[name]; // lookup by string
  if (!LucideIcon) return null; // fallback if invalid name
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <LucideIcon size={size} />;
}

export const Socials = (props: { socials: ContactPage["socials"] }) => {
  const shownIcons = !!props.socials
    ? props.socials?.filter((social) => social.show).length
    : 0;

  if (shownIcons === 0) return null;

  return (
    <div className="border-border rounded-lg border p-8 shadow-sm">
      <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
        Follow Us
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {!!props.socials &&
          props.socials.map((social) => {
            if (!social.show) return null;
            return (
              <Button
                key={social.id}
                variant="outline"
                className="justify-start bg-transparent"
              >
                <DynamicIcon
                  name={(social.icon as IconName) ?? "MessageCircle"}
                />
                {social.name}
              </Button>
            );
          })}
      </div>
    </div>
  );
};
