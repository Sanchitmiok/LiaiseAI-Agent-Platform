import { auth } from '@/lib/auth';
import SignInView from '@/modules/auth/ui/views/Sign-in-view'
import { redirect } from 'next/navigation';
import React from 'react'
import { headers } from 'next/headers';

async function Page() {

  // Ye auth.api.getSession() ek inbuilt function hai jo session ko check karta hai
  // agar session hai to user ko home page pe redirect karta hai
   const session = await auth.api.getSession({
     headers: await headers(),
   });

   if (session) {
     redirect("/");
   }
  return (<SignInView />
  )
}

export default Page
