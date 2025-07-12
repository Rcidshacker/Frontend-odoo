
"use client";

import * as React from "react";
import { User, SwapRequest, users as initialUsers, allSwapRequests as initialSwapRequests, initialUser, Conversation, Message, Notification, conversations as initialConversations, notifications as initialNotifications } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface UserContextType {
    users: User[];
    currentUser: User;
    allSwapRequests: SwapRequest[];
    conversations: Conversation[];
    notifications: Notification[];
    setCurrentUser: (user: User) => void;
    addUser: (user: User) => void;
    setAllSwapRequests: React.Dispatch<React.SetStateAction<SwapRequest[]>>;
    addSwapRequest: (request: SwapRequest) => void;
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const UserContext = React.createContext<UserContextType>({
    users: initialUsers,
    currentUser: initialUser,
    allSwapRequests: initialSwapRequests,
    conversations: initialConversations,
    notifications: initialNotifications,
    setCurrentUser: () => {},
    addUser: () => {},
    setAllSwapRequests: () => {},
    addSwapRequest: () => {},
    setConversations: () => {},
    setNotifications: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { toast } = useToast();
    const [users, setUsers] = React.useState<User[]>(initialUsers);
    const [currentUser, setCurrentUserState] = React.useState<User>(initialUser);
    const [allSwapRequests, setAllSwapRequests] = React.useState<SwapRequest[]>(initialSwapRequests);
    const [conversations, setConversations] = React.useState<Conversation[]>(initialConversations);
    const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications);


    const setCurrentUser = (user: User) => {
        const userExists = users.some(u => u.id === user.id);
        if (userExists) {
            setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? user : u));
        }
        setCurrentUserState(user);
    };

    const addUser = (user: User) => {
        setUsers(prevUsers => [...prevUsers, user]);
    };

    const addSwapRequest = (request: SwapRequest) => {
        setAllSwapRequests(prev => [...prev, request]);

        const fromUser = users.find(u => u.id === request.fromUserId);

        const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            userId: request.toUserId,
            fromUserId: request.fromUserId,
            type: 'request',
            title: 'New Swap Request',
            description: `${fromUser?.name} wants to swap skills.`,
            link: '/requests',
            read: false,
            createdAt: new Date().toISOString(),
        }
        setNotifications(prev => [newNotification, ...prev]);

        toast({
            title: "New Swap Request!",
            description: `${fromUser?.name || 'Someone'} wants to swap skills with you.`,
        });
    };

    React.useEffect(() => {
        setCurrentUserState(u => {
            const updatedUser = users.find(user => user.id === u.id);
            return updatedUser || u;
        });
    }, [users]);

    return (
        <UserContext.Provider value={{ 
            users, 
            currentUser, 
            allSwapRequests, 
            conversations,
            notifications,
            setCurrentUser, 
            addUser, 
            setAllSwapRequests, 
            addSwapRequest,
            setConversations,
            setNotifications
        }}>
            {children}
        </UserContext.Provider>
    );
};
