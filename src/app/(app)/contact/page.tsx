import Contact from "~/app/(app)/contact/contact";
import getContactPage from "~/data-access/contact";

export default async function ContactPage() {
  const data = await getContactPage();
  return <Contact contact={data} />;
}
