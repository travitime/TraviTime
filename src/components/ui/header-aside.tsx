import React from "react";
import { User, Cog, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";

const HeaderAside: React.FC = () => {
  return (
    <div className="flex items-center">
      <Button variant={"ghost"}>
        <Search size={32} />
      </Button>
      <Button variant={"ghost"}>
        <Cog size={32} />
      </Button>
      <Button variant={"ghost"}>
        <Bell size={32} />
      </Button>
      <Button variant={"ghost"}>
        {/* <User size={32} /> */}
        <SignedIn>
            <UserButton />
        </SignedIn>
      </Button>
    </div>
  );
};

export default HeaderAside;
