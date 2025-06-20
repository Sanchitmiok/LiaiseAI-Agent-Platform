import { auth } from '@/lib/auth';
import SignInView from '@/modules/auth/ui/views/Sign-in-view'
import { redirect } from 'next/navigation';
import React from 'react'
import { headers } from 'next/headers';

async function Page() {
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
