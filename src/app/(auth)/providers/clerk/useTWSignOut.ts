"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function useTWSignOut() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async (callbackUrl = "/") => {
    await signOut();
    router.push(callbackUrl); // Redirect to homepage or login page
  };

  return { handleSignOut };
}
