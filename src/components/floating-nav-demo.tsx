
"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { User, Rocket, Home, ArrowRightLeft, UserCircle, MessageSquare, Bell } from "lucide-react";
import { NotificationsDropdown } from "./notifications-dropdown";

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
    {
      name: "Profile",
      link: "/profile",
      icon: (
        <UserCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  const rightItems = (
    <>
      <NotificationsDropdown />
    </>
  )

  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} rightItems={rightItems} />
    </div>
  );
}
