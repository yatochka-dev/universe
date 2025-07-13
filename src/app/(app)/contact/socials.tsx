import { Button } from "~/components/ui/button";
import { Instagram, MessageCircle, Music, Youtube } from "lucide-react";
import React from "react";

export const Socials = () => {
  return (
    <div className="border-border rounded-lg border p-8 shadow-sm">
      <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
        Follow Us
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="justify-start bg-transparent">
          <MessageCircle className="mr-2 h-4 w-4" />
          Discord
        </Button>
        <Button variant="outline" className="justify-start bg-transparent">
          <Instagram className="mr-2 h-4 w-4" />
          Instagram
        </Button>
        <Button variant="outline" className="justify-start bg-transparent">
          <Music className="mr-2 h-4 w-4" />
          TikTok
        </Button>
        <Button variant="outline" className="justify-start bg-transparent">
          <Youtube className="mr-2 h-4 w-4" />
          YouTube
        </Button>
      </div>
    </div>
  );
};
