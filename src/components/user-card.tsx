import { User } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Briefcase, Target, User as UserIcon } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";

interface UserCardProps {
  user: User;
  onRequestSwap: () => void;
}

export default function UserCard({ user, onRequestSwap }: UserCardProps) {
  return (
    <div className="relative h-full w-full rounded-lg bg-card text-card-foreground shadow-sm border p-px">
        <GlowingEffect proximity={80} spread={120} blur={24}>
            <div className="relative z-10 h-full w-full rounded-[inherit] bg-card p-4 flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 p-2 pt-0">
                    <Avatar className="h-16 w-16 border-2 border-secondary">
                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile avatar" />
                    <AvatarFallback><UserIcon /></AvatarFallback>
                    </Avatar>
                    <div>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription>{user.location}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4 p-2 pt-0">
                    <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm text-primary"><Briefcase className="h-4 w-4"/> Offers</h4>
                    <div className="flex flex-wrap gap-2">
                        {user.skillsOffered.slice(0, 3).map((skill) => (
                        <Badge key={skill.name} variant="secondary">{skill.name}</Badge>
                        ))}
                        {user.skillsOffered.length > 3 && <Badge variant="outline">+{user.skillsOffered.length - 3} more</Badge>}
                    </div>
                    </div>
                    <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm text-primary"><Target className="h-4 w-4"/> Wants</h4>
                    <div className="flex flex-wrap gap-2">
                        {user.skillsWanted.slice(0, 3).map((skill) => (
                        <Badge key={skill.name} variant="outline">{skill.name}</Badge>
                        ))}
                        {user.skillsWanted.length > 3 && <Badge variant="outline">+{user.skillsWanted.length - 3} more</Badge>}
                    </div>
                    </div>
                </CardContent>
                <CardFooter className="p-2 pb-0">
                    <Button className="w-full" onClick={onRequestSwap}>
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Request Swap
                    </Button>
                </CardFooter>
            </div>
        </GlowingEffect>
    </div>
  );
}
