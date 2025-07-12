"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { currentUser as initialUser, User } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, Star, User as UserIcon, MapPin, Briefcase, Target, Calendar, Eye } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  location: z.string().optional(),
  skillsOffered: z.string(),
  skillsWanted: z.string(),
  availability: z.array(z.string()).nonempty("Please select at least one availability option."),
  profileVisibility: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const availabilityOptions = ["weekends", "evenings", "weekdays", "flexible"];

export default function ProfilePage() {
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      location: user.location,
      skillsOffered: user.skillsOffered.join(", "),
      skillsWanted: user.skillsWanted.join(", "),
      availability: user.availability,
      profileVisibility: user.profileVisibility === "Public",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    const updatedUser: User = {
      ...user,
      name: data.name,
      location: data.location || "",
      skillsOffered: data.skillsOffered.split(",").map((s) => s.trim()).filter(Boolean),
      skillsWanted: data.skillsWanted.split(",").map((s) => s.trim()).filter(Boolean),
      availability: data.availability,
      profileVisibility: data.profileVisibility ? "Public" : "Private",
    };
    setUser(updatedUser);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const ProfileView = () => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-primary">Your Profile</CardTitle>
            <Button onClick={() => setIsEditing(true)}><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile avatar" />
            <AvatarFallback><UserIcon /></AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            {user.location && <p className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> {user.location}</p>}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Skills Offered</h3>
            <div className="flex flex-wrap gap-2">
                {user.skillsOffered.map(skill => <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>)}
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Skills Wanted</h3>
            <div className="flex flex-wrap gap-2">
                {user.skillsWanted.map(skill => <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>)}
            </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Availability</h3>
                <div className="flex flex-wrap gap-2">
                    {user.availability.map(avail => <Badge key={avail} variant="outline" className="capitalize">{avail}</Badge>)}
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Eye className="h-5 w-5 text-primary" /> Profile Visibility</h3>
                <p>{user.profileVisibility}</p>
            </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Star className="h-5 w-5 text-primary" /> Ratings and Feedback</h3>
          <div className="space-y-4">
            {user.feedback.map((fb, index) => (
              <div key={index} className="border-l-4 border-accent pl-4">
                <div className="flex items-center">
                  <p className="font-semibold">{fb.from}</p>
                  <div className="ml-auto flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />)}
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{fb.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProfileEditForm = () => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="text-2xl text-primary">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="skillsOffered" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Skills Offered</FormLabel>
                        <FormControl><Textarea {...field} /></FormControl>
                        <FormDescription>Enter skills separated by commas.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="skillsWanted" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Skills Wanted</FormLabel>
                        <FormControl><Textarea {...field} /></FormControl>
                        <FormDescription>Enter skills separated by commas.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="availability" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Controller
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                            <div className="flex flex-wrap gap-4">
                                {availabilityOptions.map((option) => (
                                    <div key={option} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={option}
                                            value={option}
                                            checked={field.value?.includes(option)}
                                            onChange={(e) => {
                                                const newAvailability = e.target.checked
                                                    ? [...(field.value || []), option]
                                                    : field.value?.filter((v) => v !== option);
                                                field.onChange(newAvailability);
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={option} className="capitalize">{option}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="profileVisibility" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel>Public Profile</FormLabel>
                            <FormDescription>Make your profile visible to others.</FormDescription>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button type="submit"><Save className="mr-2 h-4 w-4"/> Save Changes</Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {isEditing ? <ProfileEditForm /> : <ProfileView />}
      </div>
    </div>
  );
}
