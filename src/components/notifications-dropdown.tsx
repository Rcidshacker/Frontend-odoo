
"use client";

import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Star } from "lucide-react";
import { UserContext } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function NotificationsDropdown() {
    const { notifications, users, setNotifications } = useContext(UserContext);
    const router = useRouter();

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotificationClick = (notificationId: string, link: string) => {
        setNotifications(prev => prev.map(n => n.id === notificationId ? {...n, read: true} : n));
        router.push(link);
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                           {unreadCount}
                        </span>
                    )}
                 </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                    notifications.map(notification => {
                        const user = users.find(u => u.id === notification.fromUserId);
                        return (
                            <DropdownMenuItem key={notification.id} onClick={() => handleNotificationClick(notification.id, notification.link)} className={`cursor-pointer ${!notification.read ? 'bg-accent/50' : ''}`}>
                                <div className="flex items-start gap-3">
                                    {notification.type === 'request' && <MessageSquare className="h-5 w-5 mt-1 text-primary" />}
                                    {notification.type === 'feedback' && <Star className="h-5 w-5 mt-1 text-yellow-500" />}
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{notification.title}</p>
                                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        )
                    })
                ) : (
                    <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
