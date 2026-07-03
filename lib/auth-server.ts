import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const getSession = async () => {
  if (!auth) {
    return null;
  }

  return auth.api.getSession({
    headers: await headers(),
  });
};
