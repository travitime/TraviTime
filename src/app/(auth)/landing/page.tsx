"use client";
// import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  return (
    <div
      className="w-full  gap-6 px-6 py-3 h-screen bg-[linear-gradient(0deg,rgba(255,255,255,0)_0%,rgba(255,200,27,0.2)_100%)]
    "
    >
      <div className="grid grid-cols-12 m-20">
        <div className="col-span-8  space-y-8">
          <h1 className="text-[96px] leading-none font-[500]">
            One liner MVP, clear and crsip
          </h1>
          <p className="text-[24px]">
            Some sub content. Some sub content. Some sub content. Some sub
            content. Some sub content. Some sub content.{" "}
          </p>
          <div className="flex gap-4">
            <Button variant={"outline"} size={"lg"}>
              Contact Sales
            </Button>
            <Button size={"lg"} onClick={handleSignUpClick}>
              Sign up
            </Button>
          </div>
        </div>
        <div className="col-span-4 rounded-xl flex flex-col gap-6 py-3">
          <Image
            src={"/site-assets/signup-thumbnail.png"}
            alt="Brand Logo"
            width={400}
            height={0}
          />
        </div>
      </div>
    </div>
  );
}
