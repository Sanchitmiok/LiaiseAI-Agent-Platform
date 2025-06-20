"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useRouter } from "next/navigation";
export default function  HomeView() {

  // this is fetch request to get the session => relatively slow
  const { data: session } = authClient.useSession();
  const router = useRouter();
  if (session) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="text-lg">You are already signed in.</p>
        <Button onClick={() => authClient.signOut(
            {fetchOptions : {onSuccess : ()=> router.push("/sign-in")} } // this will redirect to sign-in page after sign out
        )}>Sign Out</Button>
      </div>
    );
  }
  return (
    <div>
   <Loading />
    </div>
  );
}
