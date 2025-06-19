"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useRouter } from "next/navigation";
export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  if (session) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="text-lg">You are already signed in.</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }else{
    router.push("/sign-in");
  }
  return (
    <div>
   


    </div>
  );
}
