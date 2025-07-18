"use client";
import React from "react";
import { User, Cog, Search, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useTWSignOut } from "@/app/(auth)/providers/clerk/useTWSignOut";

const HeaderAside: React.FC = () => {
  const { handleSignOut } = useTWSignOut();
  const { firstName, lastName, profileImage } = useUserStore();
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
      <Button variant={"ghost"} onClick={() => handleSignOut()}>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        )}
        {firstName}
        <LogOut size={32} />
        {firstName} {lastName}
      </Button>
    </div>
  );
};

export default HeaderAside;
