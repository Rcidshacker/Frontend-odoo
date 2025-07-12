"use client";

import * as React from "react";
import { useState, useContext } from "react";
import { SwapRequest, User } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightLeft,
  Calendar,
  Check,
  Clock,
  MessageSquare,
  User as UserIcon,
  X,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserContext } from "@/context/user-context";

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  accepted: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30",
  completed: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30",
  canceled: "bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30",
};

export default function RequestsPage() {
  const { currentUser, users, allSwapRequests, setAllSwapRequests } = useContext(UserContext);
  const { toast } = useToast();

  const incomingRequests = allSwapRequests.filter(
    (req) => req.toUserId === currentUser.id
  );
  const outgoingRequests = allSwapRequests.filter(
    (req) => req.fromUserId === currentUser.id
  );

  const handleRequestUpdate = (
    requestId: string,
    status: SwapRequest["status"]
  ) => {
    setAllSwapRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status } : req))
    );
    toast({
      title: `Request ${status}`,
      description: `The swap request has been ${status}.`,
    });
  };

  const RequestCard = ({ request, type }: { request: SwapRequest; type: "incoming" | "outgoing" }) => {
    const otherUser = users.find(
      (u) =>
        u.id === (type === "incoming" ? request.fromUserId : request.toUserId)
    );

    if (!otherUser) return null;

    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleFeedbackSubmit = () => {
        // Here you would normally submit the feedback to your backend
        console.log({
            requestId: request.id,
            rating,
            comment,
            ratedBy: currentUser.id,
            ratedUser: otherUser.id,
        });
        toast({
            title: "Feedback Submitted",
            description: "Thank you for your feedback!",
        });
        setIsFeedbackModalOpen(false);
        // Optionally, update the request status or disable the button
    };


    return (
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={otherUser.avatar} alt={otherUser.name} data-ai-hint="profile avatar"/>
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div>
                  {type === "incoming" ? "Request from" : "Request to"}{" "}
                  <span className="text-primary">{otherUser.name}</span>
                </div>
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {new Date(request.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <Badge className={`capitalize ${statusColors[request.status]}`}>
              {request.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-around text-center">
            <div className="w-full">
              <p className="font-semibold text-muted-foreground">You Offer</p>
              <p className="text-lg font-bold">
                {
                  (type === "incoming" ? request.toUserSkillName : request.fromUserSkillName)
                }
              </p>
            </div>
            <ArrowRightLeft className="h-8 w-8 text-primary shrink-0" />
            <div className="w-full">
              <p className="font-semibold text-muted-foreground">You Get</p>
              <p className="text-lg font-bold">
                {
                  (type === "incoming" ? request.fromUserSkillName : request.toUserSkillName)
                }
              </p>
            </div>
          </div>
          {request.message && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Message
              </p>
              <p className="text-sm text-muted-foreground italic">
                "{request.message}"
              </p>
            </div>
          )}
          {request.proposedSchedule && (
             <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-semibold flex items-center gap-2"><Calendar className="h-4 w-4" /> Proposed Schedule</p>
                <p className="text-sm text-muted-foreground">{request.proposedSchedule}</p>
             </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-end">
          {type === "incoming" && request.status === "pending" && (
            <>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                onClick={() => handleRequestUpdate(request.id, "rejected")}
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handleRequestUpdate(request.id, "accepted")}
              >
                <Check className="mr-2 h-4 w-4" /> Accept
              </Button>
            </>
          )}
          {type === "outgoing" && request.status === 'pending' && (
             <Button variant="destructive" onClick={() => handleRequestUpdate(request.id, "canceled")}>Cancel Request</Button>
          )}
          {request.status === "accepted" && (
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => handleRequestUpdate(request.id, "completed")}
            >
              Mark as Completed
            </Button>
          )}
           {request.status === "completed" && (
            <Button onClick={() => setIsFeedbackModalOpen(true)}>
              <Star className="mr-2 h-4 w-4"/>
              Leave Feedback
            </Button>
           )}
        </CardFooter>

        <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave Feedback for {otherUser.name}</DialogTitle>
                    <DialogDescription>Your feedback helps the community grow.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <Label>Overall Rating</Label>
                        <div className="flex items-center gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="feedback-comment">Comment</Label>
                        <Textarea id="feedback-comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How was your experience?"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsFeedbackModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </Card>
    );
  };
  
  const RequestList = ({ requests, type }: { requests: SwapRequest[]; type: "incoming" | "outgoing" }) => {
    if (requests.length === 0) {
      return (
        <div className="text-center py-16 text-muted-foreground">
          <p>No {type} requests found.</p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {requests.map((req) => (
          <RequestCard key={req.id} request={req} type={type} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Swap Requests</h1>
        <p className="text-muted-foreground text-lg">
          Manage your skill swap proposals.
        </p>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">
            Incoming ({incomingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="outgoing">
            Outgoing ({outgoingRequests.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="incoming">
          <RequestList requests={incomingRequests} type="incoming" />
        </TabsContent>
        <TabsContent value="outgoing">
          <RequestList requests={outgoingRequests} type="outgoing" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
