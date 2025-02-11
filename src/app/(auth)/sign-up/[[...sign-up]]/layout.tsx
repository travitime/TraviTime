import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Metadata } from "next";
import FullWidthLayoutSite from "@/components/layouts/FullWidthLayoutSite";

export const metadata: Metadata = {
  title: "TraviTime",
  description: "One Place Desitination",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <FullWidthLayoutSite>
        {/* <LeftNavigation> */}
        {children}
        {/* </LeftNavigation> */}
      </FullWidthLayoutSite>
    </ClerkProvider>
  );
}
