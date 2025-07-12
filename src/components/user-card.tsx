import { User } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Briefcase, Target, User as UserIcon } from "lucide-react";

interface UserCardProps {
  user: User;
  onRequestSwap: () => void;
}

export default function UserCard({ user, onRequestSwap }: UserCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-transparent hover:border-secondary">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-secondary">
          <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile avatar" />
          <AvatarFallback><UserIcon /></AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription>{user.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm text-primary"><Briefcase className="h-4 w-4"/> Offers</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
            {user.skillsOffered.length > 3 && <Badge variant="outline">+{user.skillsOffered.length - 3} more</Badge>}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm text-primary"><Target className="h-4 w-4"/> Wants</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
            {user.skillsWanted.length > 3 && <Badge variant="outline">+{user.skillsWanted.length - 3} more</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onRequestSwap}>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Request Swap
        </Button>
      </CardFooter>
    </Card>
  );
}
