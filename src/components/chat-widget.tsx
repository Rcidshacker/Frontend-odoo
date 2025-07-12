
"use client";
import React, { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '@/context/user-context';
import { Message, User } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Minus, Send, X, ChevronsRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ChatWidget() {
    const { currentUser, users, conversations, setConversations } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
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
            id: `msg-widget-${Date.now()}`,
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

    const sortedConversations = conversations
        .filter(c => c.participantIds.includes(currentUser.id))
        .sort((a, b) => new Date(b.messages[b.messages.length - 1].timestamp).getTime() - new Date(a.messages[a.messages.length - 1].timestamp).getTime());


    const unreadMessagesCount = conversations.reduce((count, convo) => {
        // This is a mock implementation. In a real app, you'd check a `read` status.
        return count + (convo.id.includes('new') ? 1 : 0);
    }, 0);

    if (!isOpen) {
        return (
            <Button
                className="fixed bottom-5 right-5 h-16 w-16 rounded-full shadow-lg"
                onClick={() => setIsOpen(true)}
            >
                <MessageSquare className="h-8 w-8" />
                {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadMessagesCount}
                    </span>
                )}
            </Button>
        );
    }
    
    if (isMinimized) {
        return (
             <Button
                className="fixed bottom-5 right-5 h-16 w-16 rounded-full shadow-lg"
                onClick={() => setIsMinimized(false)}
            >
                <MessageSquare className="h-8 w-8" />
                {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadMessagesCount}
                    </span>
                )}
            </Button>
        )
    }

    return (
        <Card className="fixed bottom-5 right-5 w-96 h-[600px] flex flex-col shadow-2xl z-50">
            <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
                <CardTitle className="text-lg">
                    {selectedConversationId && otherUser ? otherUser.name : "Messages"}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Link href="/chat">
                         <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronsRight />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
                        <Minus />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                        <X />
                    </Button>
                </div>
            </CardHeader>
            {selectedConversationId && otherUser ? (
                <>
                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-full p-3">
                             <div className="space-y-3">
                                {selectedConversation?.messages.map(msg => (
                                    <div key={msg.id} className={cn(
                                        "flex items-end gap-2 text-sm",
                                        msg.senderId === currentUser.id ? "justify-end" : "justify-start"
                                    )}>
                                        {msg.senderId !== currentUser.id && <Avatar className="h-6 w-6"><AvatarImage src={otherUser.avatar} data-ai-hint="user avatar" /></Avatar>}
                                        <p className={cn(
                                            "max-w-64 p-2 rounded-lg",
                                            msg.senderId === currentUser.id ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none"
                                        )}>
                                            {msg.text}
                                        </p>
                                    </div>
                                ))}
                                <div ref={messageEndRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-2 border-t">
                        <form className="flex w-full gap-2" onSubmit={handleSendMessage}>
                            <Input placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                            <Button type="submit" size="icon" disabled={!message.trim()}><Send /></Button>
                        </form>
                    </CardFooter>
                </>
            ) : (
                <CardContent className="flex-1 p-0">
                    <div className="p-2 border-b">
                        <Input placeholder="Search..." />
                    </div>
                    <ScrollArea className="h-full">
                         {sortedConversations.map(convo => {
                            const participant = users.find(u => u.id === convo.participantIds.find(id => id !== currentUser.id));
                            if (!participant) return null;
                            const lastMessage = convo.messages[convo.messages.length - 1];
                            return (
                                <div 
                                    key={convo.id} 
                                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50"
                                    onClick={() => setSelectedConversationId(convo.id)}
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={participant.avatar} data-ai-hint="profile avatar" />
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
                </CardContent>
            )}
        </Card>
    );
}

