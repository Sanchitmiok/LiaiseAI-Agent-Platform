"use client";
//import the auth client
import { useTRPC } from "@/trpc/client";

// TanStack Query ek library hai jo React apps me server se data fetch, cache, aur update karna bahut aasan bana deti hai.
import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
export default function  HomeView() {

  // this is fetch request to get the session => relatively slow
  // const router = useRouter();
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text :"Sanchit"}));


  return (
    <div>
      {data?.greeting}
   {/* <Loading /> */}
    </div>
  );
}
