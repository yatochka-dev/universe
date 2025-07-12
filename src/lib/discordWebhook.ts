export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  [key: string]: unknown;
}

export default async function sendDiscordWebhook(_: ContactPayload) {
  // Placeholder for future Discord webhook integration
  return;
}
