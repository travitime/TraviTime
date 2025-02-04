import * as Form from "@radix-ui/react-form";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function SignUpForm() {
  const router = useRouter();
  const handleSignUpClick = () => {
    router.push("/dashboard");
  };
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

      <Form.Root className="space-y-4">
        <Form.Field name="fullName">
          <Form.Control asChild>
            <Input placeholder="Full name" required />
          </Form.Control>
        </Form.Field>

        <Form.Field name="email">
          <Form.Control asChild>
            <Input type="email" placeholder="Mobile number or email" required />
          </Form.Control>
        </Form.Field>

        <Form.Field name="password">
          <Form.Control asChild>
            <Input type="password" placeholder="Password" required />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <Button onClick={handleSignUpClick}>Create your account</Button>
        </Form.Submit>
      </Form.Root>

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
