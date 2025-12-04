"use client";

import { useState, useEffect } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/store/useUserStore";

export function useTWSignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { user } = useUser(); // Get user details from Clerk
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  // Effect to store user data when user becomes available
  useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || null,
        firstName: user.firstName || null,
        lastName: user.lastName || null,
        profileImage: user.imageUrl || null,
      });
    }
  }, [user, setUser]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleOAuthSignIn = async (strategy: 'oauth_google') => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      console.error("OAuth error:", err);
      const error = err as { errors?: Array<{ message: string }> };
      setError(error.errors?.[0]?.message || "OAuth authentication failed");
    }
  };

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId }); // Set active session
        // Wait a moment for the session to be fully established
        setTimeout(() => {
          router.push("/dashboard"); // Manually redirect
        }, 100);
      } else if (result.status === "needs_first_factor") {
        setPendingVerification(true);
      } else if (result.status === "needs_second_factor") {
        setError("Two-factor authentication required");
      }
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string }> };
      console.error("Sign in error:", err);
      setError(error.errors?.[0]?.message || "Invalid credentials");
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
        // Wait a moment for the session to be fully established
        setTimeout(() => {
          router.push("/dashboard"); // Manually redirect
        }, 100);
      } else if (result.status === "needs_second_factor") {
        setError("Two-factor authentication required");
      }
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string }> };
      console.error("Verification error:", err);
      setError(error.errors?.[0]?.message || "Invalid verification code");
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
    handleOAuthSignIn,
  };
}
