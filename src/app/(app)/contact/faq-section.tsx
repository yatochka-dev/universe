import React from "react";
import type { ContactPage } from "../../../../payload-types";

export const FaqSection = ({ contact }: { contact: ContactPage }) => {
  if (!contact.faq.show) return null;
  return (
    <div className="mt-16">
      <h2 className="text-muted-foreground mb-8 text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {contact.faq.questions?.map((question) => {
          return (
            <div
              key={`${question.id}-question`}
              className="border-border rounded-lg border p-6 shadow-sm"
            >
              <h3 className="text-foreground mb-2 font-semibold">
                {question.question}
              </h3>
              <p className="text-muted-foreground">{question.answer}</p>
            </div>
          );
        })}

        {/*<div className="border-border rounded-lg border p-6 shadow-sm">*/}
        {/*  <h3 className="text-foreground mb-2 font-semibold">*/}
        {/*    Are events free to attend?*/}
        {/*  </h3>*/}
        {/*  <p className="text-muted-foreground">*/}
        {/*    Yes! All our events, workshops, and hackathons are completely free*/}
        {/*    for UniVerse community members.*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*<div className="border-border rounded-lg border p-6 shadow-sm">*/}
        {/*  <h3 className="text-foreground mb-2 font-semibold">*/}
        {/*    Can I host an event or workshop?*/}
        {/*  </h3>*/}
        {/*  <p className="text-muted-foreground">*/}
        {/*    We encourage community members to share their expertise. Contact us*/}
        {/*    to discuss your event idea.*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*<div className="border-border rounded-lg border p-6 shadow-sm">*/}
        {/*  <h3 className="text-foreground mb-2 font-semibold">*/}
        {/*    Do you offer mentorship programs?*/}
        {/*  </h3>*/}
        {/*  <p className="text-muted-foreground">*/}
        {/*    Yes, we connect students with mentors in their field of interest.*/}
        {/*    Join our Discord to learn more about our mentorship opportunities.*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
