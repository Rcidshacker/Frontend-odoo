"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const GlowingCard = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative p-[2px] rounded-lg",
        containerClassName
      )}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div
          className={cn(
            "absolute inset-[-200%] animate-[anibg_10s_linear_infinite]",
            `[background:conic-gradient(from_90deg_at_50%_50%,hsl(var(--secondary))_0%,hsl(var(--primary))_50%,hsl(var(--secondary))_100%)]`
          )}
        />
      </div>
      <div
        className={cn(
          "relative bg-card text-card-foreground rounded-[6px] w-full h-full overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
