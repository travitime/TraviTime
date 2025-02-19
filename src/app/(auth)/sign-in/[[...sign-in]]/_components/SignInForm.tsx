"use client";

import { useTWSignIn } from "../../../providers/clerk/useTWSignIn";
import { useTWSignOut } from "../../../providers/clerk/useTWSignOut";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomSignIn() {
  const {
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
  } = useTWSignIn();
  const { handleSignOut } = useTWSignOut();
  return (
    <div className="max-w-md mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Sign up with</h2>
      <div className="flex gap-2 mb-4">
        <Button variant="outline" className="flex-1">
          <Facebook className="w-5 h-5" />
        </Button>
        <Button variant="outline" className="flex-1">
          <Twitter className="w-5 h-5" />
        </Button>
         
        <Button variant="outline" className="flex-1">
          <Github className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative flex items-center my-4">
        <div className="flex-1 border-t"></div>
        <span className="mx-3 text-gray-500 text-sm">Or</span>
        <div className="flex-1 border-t"></div>
      </div>
      {!pendingVerification ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="flex flex-col gap-4"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p
              className="text-red-500 text-sm"
              onClick={() => handleSignOut("/sign-in")}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md transition hover:bg-primary/80"
          >
            Sign In
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyCode();
          }}
          className="flex flex-col gap-4"
        >
          <Input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md transition hover:bg-primary/80"
          >
            Verify Code
          </button>
        </form>
      )}
      <p className="text-xs text-center text-gray-500 mt-4">
        By signing up, you agree to our{" "}
        <a href="#" className="font-medium text-black">
          Terms
        </a>
        ,{" "}
        <a href="#" className="font-medium text-black">
          Data Policy
        </a>{" "}
        and{" "}
        <a href="#" className="font-medium text-black">
          Cookies Policy
        </a>
        .
      </p>
    </div>
  );
}
