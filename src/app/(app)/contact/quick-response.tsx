import { Button } from "~/components/ui/button";
import { MessageCircle } from "lucide-react";
import React from "react";

export const QuickResponse = () => {
  return (
    <div className="border-border rounded-lg border p-8">
      <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
        Quick Response
      </h3>
      <p className="mb-4 text-gray-600">
        For the fastest response, join our Discord community where our team and
        community members are active daily.
      </p>
      <Button className="bg-red-600 text-white hover:bg-red-700">
        <MessageCircle className="mr-2 h-4 w-4" />
        Join Discord Now
      </Button>
    </div>
  );
};
