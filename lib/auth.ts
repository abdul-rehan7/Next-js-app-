import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  email: string;
  fullName: string | null;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  try {
    await connection();
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims;

    if (!claims) {
      return null;
    }

    const fullNameValue = claims.user_metadata?.full_name;
    const fullName =
      typeof fullNameValue === "string" && fullNameValue.trim()
        ? fullNameValue.trim()
        : null;

    return {
      id: claims.sub,
      email: typeof claims.email === "string" ? claims.email : "",
      fullName,
    };
  } catch {
    return null;
  }
});

export async function requireUser(nextPath = "/account") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}
