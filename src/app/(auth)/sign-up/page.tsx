import { auth } from "@/lib/auth";
import SignUpView from "@/modules/auth/ui/views/Sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }
  return <SignUpView />;
}

export default Page;
