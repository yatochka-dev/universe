import ContactForm from "~/components/contact-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
