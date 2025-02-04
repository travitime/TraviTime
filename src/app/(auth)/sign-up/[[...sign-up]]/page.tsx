import { SignIn } from "@clerk/nextjs";
import SignUpForm from "./_components/SignUpForm";

import Image from "next/image";
import SignUpIntro from "./_components/SignUpIntro";
export default function SignInPage() {
  return (
    <div
      className="w-full  gap-6 px-6 py-3 h-screen bg-[linear-gradient(0deg,rgba(255,255,255,0)_37.5%,rgba(240,100,29,0.2)_100%)]

    "
    >
      <div className="grid grid-cols-12 gap-x-12   m-20">
        <div className="col-span-5  space-y-8">
          <div className="rounded-md w-full bg-white p-8">
            <SignUpForm />
          </div>
        </div>
        <div className="col-span-7 ">
          <SignUpIntro />
        </div>
      </div>
    </div>
  );
}
