
"use client";
import React, { useState, useContext, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserContext } from "@/context/user-context";
import { initialUser } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket, User } from "lucide-react";


export const FloatingNav = ({
  navItems,
  rightItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  rightItems?: React.ReactNode;
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });
  
  const { currentUser, setCurrentUser, allSwapRequests, conversations } = useContext(UserContext);

  const pendingRequestCount = useMemo(() => {
    return allSwapRequests.filter(
      (req) => req.toUserId === currentUser.id && req.status === "pending"
    ).length;
  }, [allSwapRequests, currentUser]);

  const unreadMessagesCount = useMemo(() => {
    // Mock logic for unread messages
    return conversations.filter(c => c.id.includes('new-convo')).length;
  }, [conversations]);


  const handleLogout = () => {
    setCurrentUser(initialUser);
  };
  
  const userInitials = currentUser?.name.split(' ').map(n => n[0]).join('').toUpperCase() || '';

  const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
    navItems.map((navItem: any, idx: number) => (
      <Link
        key={`link=${idx}`}
        href={navItem.link}
        className={cn(
          "relative flex items-center space-x-2 text-neutral-600 dark:text-neutral-50 hover:text-neutral-500 dark:hover:text-neutral-300",
          inSheet && "p-2 rounded-md hover:bg-muted text-lg"
        )}
      >
        <span className="block sm:hidden">{navItem.icon}</span>
        <span className="hidden sm:block text-sm">{navItem.name}</span>
        {navItem.name === "Requests" && pendingRequestCount > 0 && (
           <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">{pendingRequestCount}</Badge>
        )}
        {navItem.name === "Messages" && unreadMessagesCount > 0 && (
           <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">{unreadMessagesCount}</Badge>
        )}
      </Link>
    ))
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-secondary/50 rounded-2xl bg-background/80 backdrop-blur-lg shadow-lg z-50 pr-4 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <Link href="/" className="flex items-center gap-2 mr-4">
          <Rocket className="h-8 w-8 text-primary" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
           {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
               {navItem.name === "Requests" && pendingRequestCount > 0 && (
                <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">{pendingRequestCount}</Badge>
              )}
              {navItem.name === "Messages" && unreadMessagesCount > 0 && (
                <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">{unreadMessagesCount}</Badge>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
            {rightItems}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="/profile" passHref>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} data-ai-hint="user avatar" />
                    <AvatarFallback>
                      {userInitials || <User />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {currentUser && (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/chat">Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/requests">Swap Requests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <Link href="/login">Log out</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 pt-10">
                    <NavLinks inSheet />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
