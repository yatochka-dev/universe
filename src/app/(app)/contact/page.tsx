"use client";
import React, { useTransition } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Mail, MessageCircle, Instagram, Youtube, Music } from "lucide-react";
import { submitContact } from "~/actions/contact";
import { useAction } from "next-safe-action/hooks";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { inquiryTypes } from "~/collections/Contact";
import { useAnimate } from "motion/react";
import Checkmark from "~/components/ui/checkmark";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  const isError = field.state.meta.errors.length > 0;

  return (
    <span className={cn("opacity-0", isError && "text-red-500 opacity-100")}>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : (
        "uhm, hello, why are looking here???"
      )}
      {field.state.meta.isValidating ? "Validating..." : null}
    </span>
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { executeAsync: dispatch } = useAction(submitContact);
  const [isPending, startTransition] = useTransition();
  const [scope, animate] = useAnimate();
  const checkmarkRef = React.useRef<typeof Checkmark>(null);

  const form = useForm({
    defaultValues: {
      name: "philip",
      email: "philip@me.com",
      inquiryType: "general",
      message: "awdawd",
    },
    onSubmit: async ({ value: values }) => {
      startTransition(async () => {
        // await dispatch(values);
        form.reset();

        animate(".field-parent", {
          opacity: 0,
          y: 20,
          transitionDelay: 0.1,
          transitionDuration: 0.3,
          transitionTimingFunction: "ease-in-out",
        });
        animate("button", {
          opacity: 0,
          y: 20,
          transitionDelay: 0.1,
          transitionDuration: 0.3,
          transitionTimingFunction: "ease-in-out",
        });
        animate("h2", {
          opacity: 0,
          y: 20,
          transitionDelay: 0.1,
          transitionDuration: 0.3,
          transitionTimingFunction: "ease-in-out",
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        // if (checkmarkRef.current) {
        animate([
          [
            ".tick",
            { strokeDashoffset: 0 },
            { duration: 0.45, easing: "ease-out" },
          ],
          [
            ".circle",
            { strokeDashoffset: 0 },
            { duration: 0.65, easing: "ease-out", delay: 0.45 },
          ],
        ]);
        // }
      });
    },
  });

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
          {/* Contact Form */}
          <div
            className="border-border rounded-lg border p-8 shadow-sm"
            ref={scope}
          >
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              Send us a message
            </h2>
            <Checkmark ref={checkmarkRef} />
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();
              }}
            >
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "A first name is required"
                      : value.length < 3
                        ? "First name must be at least 3 characters"
                        : undefined,
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <div className={"field-parent flex flex-col gap-2"}>
                      <Label htmlFor={field.name}>First Name:</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={"Johnny Appleseed"}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "An email is required"
                      : emailRegex.test(value)
                        ? undefined
                        : "Invalid email",
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <div className={"field-parent flex flex-col gap-2"}>
                      <Label htmlFor={field.name}>Email:</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={"johnny.appleseed@me.com"}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="inquiryType"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Inquiry type is required" : undefined,
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <div className={"field-parent flex flex-col gap-2"}>
                      <Label htmlFor={field.name}>Inquiry Type:</Label>

                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(e) => field.handleChange(e)}
                      >
                        <SelectTrigger className={"w-full"}>
                          <SelectValue
                            placeholder="Select inquiry type"
                            id={field.name}
                            onBlur={field.handleBlur}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((i) => (
                            <SelectItem key={i.value} value={i.value}>
                              {i.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name="message"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "The message is required"
                      : value.length < 3
                        ? "Message must be at least 3 characters"
                        : value.length > 1000
                          ? "Message must be less than 1000 characters"
                          : undefined,

                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <div className={"field-parent flex flex-col gap-2"}>
                      <Label htmlFor={field.name}>Message:</Label>
                      <Textarea
                        id={field.name}
                        rows={4}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder={"I'd like to..."}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              {/*<div>*/}
              {/*  <label*/}
              {/*    htmlFor="message"*/}
              {/*    className="mb-2 block text-sm font-medium text-gray-700"*/}
              {/*  >*/}
              {/*    Message*/}
              {/*  </label>*/}
              {/*  <Textarea*/}
              {/*    id="message"*/}
              {/*    value={formData.message}*/}
              {/*    onChange={(e) => handleInputChange("message", e.target.value)}*/}
              {/*    placeholder="Tell us more about your inquiry..."*/}
              {/*    rows={6}*/}
              {/*    required*/}
              {/*  />*/}
              {/*</div>*/}

              <Button
                type="submit"
                className="w-full bg-red-600 text-white hover:bg-red-700"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
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

            <div className="border-border rounded-lg border p-8 shadow-sm">
              <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Discord
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <Music className="mr-2 h-4 w-4" />
                  TikTok
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </Button>
              </div>
            </div>

            <div className="border-border rounded-lg border p-8">
              <h3 className="text-muted-foreground mb-4 text-xl font-semibold">
                Quick Response
              </h3>
              <p className="mb-4 text-gray-600">
                For the fastest response, join our Discord community where our
                team and community members are active daily.
              </p>
              <Button className="bg-red-600 text-white hover:bg-red-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                Join Discord Now
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-muted-foreground mb-8 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border-border rounded-lg border p-6 shadow-sm">
              <h3 className="text-foreground mb-2 font-semibold">
                How do I join UniVerse?
              </h3>
              <p className="text-muted-foreground">
                Simply click the &#34;Join Discord&#34; button and follow the
                onboarding process. Membership is free for all students!
              </p>
            </div>
            <div className="border-border rounded-lg border p-6 shadow-sm">
              <h3 className="text-foreground mb-2 font-semibold">
                Are events free to attend?
              </h3>
              <p className="text-muted-foreground">
                Yes! All our events, workshops, and hackathons are completely
                free for UniVerse community members.
              </p>
            </div>
            <div className="border-border rounded-lg border p-6 shadow-sm">
              <h3 className="text-foreground mb-2 font-semibold">
                Can I host an event or workshop?
              </h3>
              <p className="text-muted-foreground">
                We encourage community members to share their expertise. Contact
                us to discuss your event idea.
              </p>
            </div>
            <div className="border-border rounded-lg border p-6 shadow-sm">
              <h3 className="text-foreground mb-2 font-semibold">
                Do you offer mentorship programs?
              </h3>
              <p className="text-muted-foreground">
                Yes, we connect students with mentors in their field of
                interest. Join our Discord to learn more about our mentorship
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
