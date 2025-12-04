"use client";
import SignInForm from "./_components/SignInForm";

import SignUpIntro from "../../sign-up/[[...sign-up]]/_components/SignUpIntro";
import DebugClerk from "@/components/debug-clerk";
export default function SignInPage() {
  return (
    <div
      className="w-full  gap-6 px-6 py-3 h-screen bg-[linear-gradient(0deg,rgba(255,255,255,0)_37.5%,rgba(240,100,29,0.2)_100%)]

    "
    >
      <div className="grid grid-cols-12 gap-x-12 m-20">
        <div className="col-span-5 space-y-8">
          <div className="rounded-md w-full bg-white p-8">
            {/* <SignIn />*/}
            <SignInForm />
          </div>
        </div>
        <div className="col-span-7 ">
          <SignUpIntro />
        </div>
      </div>
      <DebugClerk />
    </div>
  );
}
