import React from "react";
import { User, Cog, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderAside: React.FC = () => {
  return (
    <div>
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
        <User size={32} />
      </Button>
    </div>
  );
};

export default HeaderAside;
