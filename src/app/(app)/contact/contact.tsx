import React from "react";

import { FaqSection } from "~/app/(app)/contact/faq-section";

import { DirectContact } from "~/app/(app)/contact/direct-contact";
import { Socials } from "~/app/(app)/contact/socials";
import { QuickResponse } from "~/app/(app)/contact/quick-response";
import ContactForm from "~/app/(app)/contact/form";
import type { ContactPage } from "../../../../payload-types";

interface ContactProps {
  contact: ContactPage;
}

export default function Contact({ contact }: ContactProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Get in Touch</h1>
          <p className="text-muted-foreground text-xl">
            Have questions? Want to partner with us? We&apos;d love to hear from
            you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-8">
            <DirectContact />

            <Socials socials={contact.socials} />

            <QuickResponse />
          </div>
        </div>

        {/* FAQ Section */}
        <FaqSection contact={contact} />
      </div>
    </div>
  );
}
