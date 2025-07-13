"use client";
import React from "react";

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
import { submitContact } from "~/actions/contact";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "@tanstack/react-form";
import { Label } from "~/components/ui/label";
import { inquiryTypes } from "~/collections/Contact";
import { useAnimate } from "motion/react";
import {
  resetAnimation,
  runSubmitAnimation,
} from "~/app/(app)/contact/animations";
import { FaqSection } from "~/app/(app)/contact/faq-section";
import { Checkmark } from "~/app/(app)/contact/checkmark";
import { FieldInfo } from "~/components/field-info";
import { emailRegex } from "~/lib/utils";
import { DirectContact } from "~/app/(app)/contact/direct-contact";
import { Socials } from "~/app/(app)/contact/socials";
import { QuickResponse } from "~/app/(app)/contact/quick-response";

export default function ContactPage() {
  const { executeAsync: dispatch } = useAction(submitContact);
  const [scope, animate] = useAnimate();
  const [message, setMessage] = React.useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "general",
      message: "",
    },
    onSubmit: async ({ value: values }) => {
      const result = await dispatch(values);
      if (result.data) {
        setMessage(`Your request (#${result.data.id}) has been submitted.`);
      }
      if (result.validationErrors) {
        return {
          form: result.validationErrors.formErrors,
          fields: result.validationErrors.fieldErrors,
        };
      }
      if (result.serverError) {
        return {
          form: ["Something went wrong, please try again later."],
        };
      }

      await runSubmitAnimation(animate);
      form.reset();
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
            className="border-border relative rounded-lg border p-8 shadow-sm"
            ref={scope}
          >
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              Send us a message
            </h2>
            {!!message && (
              <Checkmark
                message={message}
                onReset={async () => {
                  await resetAnimation(animate);
                  setMessage("");
                }}
              />
            )}
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
                className="w-full cursor-pointer bg-red-600 text-white hover:bg-red-700"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <DirectContact />

            <Socials />

            <QuickResponse />
          </div>
        </div>

        {/* FAQ Section */}
        <FaqSection />
      </div>
    </div>
  );
}
