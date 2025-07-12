"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { submitContact } from "~/actions/contact";
import { Button } from "~/components/ui/button";

export default function ContactForm() {
  const { execute, status, result, reset } = useAction(submitContact);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        execute(form);
      }}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        className="rounded-md border border-gray-300 p-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        className="rounded-md border border-gray-300 p-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <textarea
        className="rounded-md border border-gray-300 p-2"
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />
      <Button type="submit" disabled={status === "executing"}>
        {status === "executing" ? "Sending..." : "Send"}
      </Button>
      {result?.data && (
        <p className="text-green-600">Thank you for contacting us!</p>
      )}
      {result?.serverError && (
        <p className="text-red-600">{result.serverError}</p>
      )}
    </form>
  );
}
