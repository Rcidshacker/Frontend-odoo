"use client";

import { User } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

interface RequestSwapModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userToSwap: User;
  currentUser: User;
}

export default function RequestSwapModal({
  isOpen,
  setIsOpen,
  userToSwap,
  currentUser,
}: RequestSwapModalProps) {
  const { toast } = useToast();
  const [yourSkill, setYourSkill] = useState("");
  const [theirSkill, setTheirSkill] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yourSkill || !theirSkill) {
      toast({
        variant: "destructive",
        title: "Incomplete Selection",
        description: "Please select a skill from both lists.",
      });
      return;
    }

    // Mock submission
    console.log({
      from: currentUser.id,
      to: userToSwap.id,
      yourSkill,
      theirSkill,
      message,
    });
    
    toast({
      title: "Request Sent!",
      description: `Your swap request has been sent to ${userToSwap.name}.`,
    });
    setIsOpen(false);
    setYourSkill("");
    setTheirSkill("");
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">Request a Swap with {userToSwap.name}</DialogTitle>
            <DialogDescription>
              Choose the skills you'd like to exchange.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="your-skill">Choose one of your offered skills</Label>
              <Select value={yourSkill} onValueChange={setYourSkill}>
                <SelectTrigger id="your-skill">
                  <SelectValue placeholder="Select a skill to offer" />
                </SelectTrigger>
                <SelectContent>
                  {currentUser.skillsOffered.map((skill) => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="their-skill">Choose one of their wanted skills</Label>
              <Select value={theirSkill} onValueChange={setTheirSkill}>
                <SelectTrigger id="their-skill">
                  <SelectValue placeholder="Select a skill to request" />
                </SelectTrigger>
                <SelectContent>
                  {userToSwap.skillsOffered.map((skill) => ( // Note: should be their skillsOffered, as you request what they offer.
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                placeholder={`Hi ${userToSwap.name}, I'd like to swap skills...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
