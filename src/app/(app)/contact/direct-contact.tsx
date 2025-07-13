import { Mail, MessageCircle } from "lucide-react";
import React from "react";

export const DirectContact = () => {
  return (
    <div className="border-border rounded-lg border p-8 shadow-sm">
      <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
        Direct Contact
      </h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <Mail className="mr-3 h-5 w-5 text-red-600" />
          <div>
            <p className="text-muted-foreground font-medium">Email</p>
            <p className="text-gray-600">hello@universe.com</p>
          </div>
        </div>
        <div className="flex items-center">
          <MessageCircle className="mr-3 h-5 w-5 text-red-600" />
          <div>
            <p className="text-muted-foreground font-medium">Discord</p>
            <p className="text-gray-600">
              Join our community for instant support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
