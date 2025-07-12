"use client";

import * as React from "react";
import { User, SwapRequest, users as initialUsers, allSwapRequests as initialSwapRequests, initialUser } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface UserContextType {
    users: User[];
    currentUser: User;
    allSwapRequests: SwapRequest[];
    setCurrentUser: (user: User) => void;
    addUser: (user: User) => void;
    setAllSwapRequests: React.Dispatch<React.SetStateAction<SwapRequest[]>>;
    addSwapRequest: (request: SwapRequest) => void;
}

export const UserContext = React.createContext<UserContextType>({
    users: initialUsers,
    currentUser: initialUser,
    allSwapRequests: initialSwapRequests,
    setCurrentUser: () => {},
    addUser: () => {},
    setAllSwapRequests: () => {},
    addSwapRequest: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { toast } = useToast();
    const [users, setUsers] = React.useState<User[]>(initialUsers);
    const [currentUser, setCurrentUserState] = React.useState<User>(initialUser);
    const [allSwapRequests, setAllSwapRequests] = React.useState<SwapRequest[]>(initialSwapRequests);

    const setCurrentUser = (user: User) => {
        // Find if user exists and update them, otherwise this is a new user from signup setting themselves
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

        // Simulate a real-time notification for the receiving user
        if (request.toUserId === currentUser.id) {
            const fromUser = users.find(u => u.id === request.fromUserId);
            toast({
                title: "New Swap Request!",
                description: `${fromUser?.name || 'Someone'} wants to swap skills with you.`,
            });
        }
    };

    return (
        <UserContext.Provider value={{ users, currentUser, allSwapRequests, setCurrentUser, addUser, setAllSwapRequests, addSwapRequest }}>
            {children}
        </UserContext.Provider>
    );
};
