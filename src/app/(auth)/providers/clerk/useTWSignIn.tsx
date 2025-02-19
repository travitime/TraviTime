"use client";

import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/store/useUserStore";

export function useTWSignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { user } = useUser(); // Get user details from Clerk
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId }); // Set active session
        console.log(user);
        setUser({
          id: user?.id || null,
          email: user?.primaryEmailAddress || null,
          firstName: user?.firstName || null,
          lastName: user?.lastName || null,
          profileImage: user?.imageUrl || null,
        });
        router.push("/dashboard"); // Manually redirect
      } else if (result.status === "needs_first_factor") {
        setPendingVerification(true);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid credentials");
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (!signIn) return; // Add null check for 'signIn' variable

      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId }); // Set active session
        // Store user data in Zustand store
        setUser({
          id: user?.id || null,
          email: user?.primaryEmailAddress || null,
          firstName: user?.firstName || null,
          lastName: user?.lastName || null,
          profileImage: user?.imageUrl || null,
        });
        router.push("/dashboard"); // Manually redirect
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification code");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    verificationCode,
    setVerificationCode,
    error,
    pendingVerification,
    handleSignIn,
    handleVerifyCode,
  };
}
