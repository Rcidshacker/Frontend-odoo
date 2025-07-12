"use client";
import { cn } from "@/lib/utils";
import React, {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export interface GlowingEffectProps {
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
  blur?: number;
  spread?: number;
  proximity?: number;
  borderWidth?: number;
  disabled?: boolean;
  inactiveZone?: number;
}

export const GlowingEffect = ({
  children,
  className,
  glow = true,
  blur = 0,
  spread = 80,
  proximity = 64,
  borderWidth = 3,
  disabled = false,
  inactiveZone = 0.01,
}: GlowingEffectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current || disabled) return;

      const rect = ref.current.getBoundingClientRect();

      const proximityX = proximity;
      const proximityY = proximity;

      const newX = event.clientX;
      const newY = event.clientY;

      if (
        newX > rect.left - proximityX &&
        newX < rect.right + proximityX &&
        newY > rect.top - proximityY &&
        newY < rect.bottom + proximityY
      ) {
        setMousePosition({ x: newX - rect.left, y: newY - rect.top });
      } else {
        setMousePosition({ x: -1000, y: -1000 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled, proximity]);

  return (
    <div
      ref={ref}
      style={
        {
          "--glow-blur": `${blur}px`,
          "--glow-spread": `${spread}px`,
          "--glow-proximity": `${proximity}px`,
          "--glow-border": `${borderWidth}px`,
          "--glow-inactive": `${inactiveZone}`,
        } as React.CSSProperties
      }
      className={cn("relative h-full w-full", className)}
    >
      <div
        style={
          {
            "--glow-x": `${mousePosition.x}px`,
            "--glow-y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
        id={id}
        className={cn(
          "pointer-events-none absolute left-0 top-0 h-full w-full opacity-0 transition-opacity duration-500",
          {
            "opacity-100": glow,
          }
        )}
      >
        <div
          className={cn(
            "h-full w-full",
            "[mask-image:radial-gradient(calc(var(--glow-proximity)_*_1px)_at_var(--glow-x)_var(--glow-y),transparent_calc(var(--glow-inactive)_*_100%),black_calc(var(--glow-proximity)_*_1%))]"
          )}
        >
          <div
            className={cn(
              "absolute inset-[var(--glow-border)] rounded-[inherit]",
              "[background:radial-gradient(closest-side_at_var(--glow-x)_var(--glow-y),hsl(var(--primary)),transparent)]",
              "[filter:blur(var(--glow-blur))_saturate(1.2)]",
              "opacity-[var(--glow-opacity,0.5)]"
            )}
          />

          <div
            className={cn(
              "absolute inset-0 rounded-[inherit]",
              "[background:radial-gradient(closest-side_at_var(--glow-x)_var(--glow-y),hsl(var(--primary)),transparent)]",
              "[filter:blur(calc(var(--glow-spread)_/_2))_saturate(1.5)]",
              "opacity-[var(--glow-opacity,0.25)]"
            )}
          />
        </div>
      </div>
      {children}
    </div>
  );
};
