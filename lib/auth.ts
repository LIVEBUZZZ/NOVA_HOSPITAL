import { cookies } from "next/headers";

import { SESSION_COOKIE } from "@/lib/auth-constants";
import { getSessionUser } from "@/lib/server/store";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return getSessionUser(token);
}
