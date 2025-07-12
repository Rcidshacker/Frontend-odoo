
"use client";

import * as React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "@/context/user-context";
import { Message, User } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search, Send, User as UserIcon } from "lucide-react";
import Link from "next/link";


export default function ChatPage() {
    const { currentUser, users, conversations, setConversations } = useContext(UserContext);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");
    
    const selectedConversation = conversations.find(c => c.id === selectedConversationId);
    const otherUser = selectedConversation ? users.find(u => u.id === selectedConversation.participantIds.find(id => id !== currentUser.id)) : null;

    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedConversation?.messages]);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedConversationId) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            text: message,
            timestamp: new Date().toISOString(),
        };

        setConversations(prev => prev.map(convo => 
            convo.id === selectedConversationId 
                ? { ...convo, messages: [...convo.messages, newMessage] }
                : convo
        ));
        setMessage("");
    };

    const filteredConversations = conversations
        .filter(c => c.participantIds.includes(currentUser.id))
        .filter(c => {
            const participant = users.find(u => u.id === c.participantIds.find(id => id !== currentUser.id));
            return participant?.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => new Date(b.messages[b.messages.length - 1].timestamp).getTime() - new Date(a.messages[a.messages.length - 1].timestamp).getTime());


    return (
        <div className="container mx-auto p-4 h-[calc(100vh-120px)]">
            <Card className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
                <div className="flex flex-col border-r col-span-1">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold">Messages</h2>
                        <div className="relative mt-2">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder="Search contacts..." 
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        {filteredConversations.map(convo => {
                            const participant = users.find(u => u.id === convo.participantIds.find(id => id !== currentUser.id));
                            if (!participant) return null;
                            const lastMessage = convo.messages[convo.messages.length - 1];
                            return (
                                <div 
                                    key={convo.id} 
                                    className={cn(
                                        "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50",
                                        selectedConversationId === convo.id && "bg-muted"
                                    )}
                                    onClick={() => setSelectedConversationId(convo.id)}
                                >
                                    <Avatar>
                                        <AvatarImage src={participant.avatar} data-ai-hint="user avatar"/>
                                        <AvatarFallback>{participant.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-semibold truncate">{participant.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{lastMessage.text}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </ScrollArea>
                </div>
                <div className="flex flex-col md:col-span-2 lg:col-span-3">
                    {selectedConversation && otherUser ? (
                        <>
                            <div className="flex items-center gap-4 p-4 border-b">
                                <Avatar>
                                    <AvatarImage src={otherUser.avatar} data-ai-hint="user avatar"/>
                                    <AvatarFallback>{otherUser.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Link href={`/profile/${otherUser.id}`} className="font-bold hover:underline">{otherUser.name}</Link>
                                    <p className="text-sm text-muted-foreground">Online</p>
                                </div>
                            </div>
                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-4">
                                    {selectedConversation.messages.map(msg => (
                                        <div key={msg.id} className={cn(
                                            "flex items-end gap-2",
                                            msg.senderId === currentUser.id ? "justify-end" : "justify-start"
                                        )}>
                                            {msg.senderId !== currentUser.id && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={otherUser.avatar} data-ai-hint="user avatar"/>
                                                    <AvatarFallback>{otherUser.name.substring(0,2)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn(
                                                "max-w-xs lg:max-w-md p-3 rounded-lg",
                                                msg.senderId === currentUser.id 
                                                    ? "bg-primary text-primary-foreground rounded-br-none" 
                                                    : "bg-muted rounded-bl-none"
                                            )}>
                                                <p>{msg.text}</p>
                                            </div>
                                             {msg.senderId === currentUser.id && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={currentUser.avatar} data-ai-hint="profile avatar"/>
                                                     <AvatarFallback><UserIcon /></AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messageEndRef} />
                                </div>
                            </ScrollArea>
                            <div className="p-4 border-t">
                                <form className="flex gap-2" onSubmit={handleSendMessage}>
                                    <Input 
                                        placeholder="Type a message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <Button type="submit" size="icon" disabled={!message.trim()}>
                                        <Send />
                                    </Button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

