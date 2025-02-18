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
    <div className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex space-x-2">
        {secondaryAction && (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
        {primaryAction && (
          <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
        )}
      </div>
    </div>
  );
}
