export async function sendWhatsAppNotification(payload: { to: string; body: string }) {
  const url = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_API_TOKEN;

  if (!url || !token) {
    return { sent: false, mode: "demo" as const };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return { sent: response.ok, mode: "live" as const };
}
