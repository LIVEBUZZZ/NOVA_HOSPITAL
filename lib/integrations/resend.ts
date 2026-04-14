type ResendEmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export function getResendClient() {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    return null;
  }

  return {
    async sendEmail(payload: ResendEmailPayload) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      return response;
    }
  };
}
