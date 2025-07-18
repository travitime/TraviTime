"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type CreateHeaderProps = {
  title: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
};

export function CreateHeader({
  title,
  primaryAction,
  secondaryAction,
}: CreateHeaderProps) {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-10 py-6 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <div className="flex gap-3">
        {secondaryAction && (
          <Button
            variant="outline"
            onClick={secondaryAction.onClick}
            
          >
            {secondaryAction.label}
          </Button>
        )}
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
           
          >
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
