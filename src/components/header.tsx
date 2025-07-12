"use client";

import { useContext, useMemo } from "react";
import Link from "next/link";
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
import { UserContext } from "@/context/user-context";
import { initialUser } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { currentUser, setCurrentUser, allSwapRequests } = useContext(UserContext);

  const pendingRequestCount = useMemo(() => {
    return allSwapRequests.filter(
      (req) => req.toUserId === currentUser.id && req.status === "pending"
    ).length;
  }, [allSwapRequests, currentUser]);

  const handleLogout = () => {
    setCurrentUser(initialUser);
  };
  
  const userInitials = currentUser?.name.split(' ').map(n => n[0]).join('').toUpperCase() || '';

  const NavLinks = () => (
    <>
      <Link
        href="/"
        className="transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/requests"
        className="flex items-center gap-2 transition-colors hover:text-primary"
      >
        Requests
        {pendingRequestCount > 0 && (
          <Badge variant="destructive" className="h-6 w-6 flex items-center justify-center p-0">{pendingRequestCount}</Badge>
        )}
      </Link>
      <Link
        href="/profile"
        className="transition-colors hover:text-primary"
      >
        Profile
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">SkillSphere</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} data-ai-hint="user avatar" />
                  <AvatarFallback>
                    {userInitials || <User />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {currentUser && (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      {/* Note: email isn't part of the User model from mock-data, so we can't display it here without changes */}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/requests">Swap Requests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login" onClick={handleLogout}>Log out</Link>
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
                <div className="flex flex-col gap-6 pt-10 text-lg font-medium">
                    <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
