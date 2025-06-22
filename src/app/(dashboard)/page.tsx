import { auth } from '@/lib/auth'
import HomeView from '@/modules/home/ui/views/HomeView'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'


async function Home() {
  // This is a server component, so we can use the auth client directly
  // to get the session. => fast
  const session = await auth.api.getSession({
    headers : await headers(),
  });



  if( !session) {
    redirect('/sign-in');
  }

  return (
  
  <HomeView />
  )
}

export default Home
