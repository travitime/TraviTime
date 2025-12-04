"use client";

import { useAuth, useUser } from "@clerk/nextjs";

export default function DebugClerk() {
  const { isLoaded, userId, sessionId } = useAuth();
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  console.log("Clerk Debug - Auth:", { isLoaded, userId, sessionId });
  console.log("Clerk Debug - User:", { userLoaded, isSignedIn, user });

  return (
    <div className="fixed top-0 right-0 bg-yellow-100 p-4 text-xs max-w-sm z-50">
      <h3 className="font-bold">Clerk Debug Info:</h3>
      <div>Auth Loaded: {isLoaded ? "✅" : "❌"}</div>
      <div>User Loaded: {userLoaded ? "✅" : "❌"}</div>
      <div>Is Signed In: {isSignedIn ? "✅" : "❌"}</div>
      <div>User ID: {userId || "null"}</div>
      <div>Session ID: {sessionId || "null"}</div>
      {user && (
        <div>
          <div>Email: {user.primaryEmailAddress?.emailAddress || "null"}</div>
          <div>Name: {user.firstName || ""} {user.lastName || ""}</div>
        </div>
      )}
    </div>
  );
}