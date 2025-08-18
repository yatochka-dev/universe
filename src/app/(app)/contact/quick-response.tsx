import { Button } from "~/components/ui/button";
import { MessageCircle } from "lucide-react";
import React from "react";
import getSettings from "~/data-access/settings";
import Link from "next/link";

export const QuickResponse = async () => {
  const settings = await getSettings();
  return (
    <div className="border-border rounded-lg border p-8">
      <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
        Quick Response
      </h3>
      <p className="mb-4 text-gray-600">
        For the fastest response, join our Discord community where our team and
        community members are active daily.
      </p>
      <Button
        className="cursor-pointer bg-red-600 text-white hover:bg-red-700"
        asChild
      >
        <Link
          target={"_blank"}
          href={settings.discord_community_url}
          rel="noopener noreferrer"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Join Discord Now
        </Link>
      </Button>
    </div>
  );
};
