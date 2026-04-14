export const posthogConfig = {
  key: process.env.POSTHOG_KEY || "",
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"
};

export function analyticsEnabled() {
  return Boolean(posthogConfig.key);
}
