
"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { User, Rocket, Home, ArrowRightLeft, UserCircle, MessageSquare, Bell } from "lucide-react";


export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Messages",
        link: "/chat",
        icon: <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Requests",
      link: "/requests",
      icon: <ArrowRightLeft className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
