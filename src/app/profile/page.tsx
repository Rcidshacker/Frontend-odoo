"use client";

import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Skill } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, Star, User as UserIcon, MapPin, Briefcase, Target, Calendar, Eye, Trash2, PlusCircle } from "lucide-react";
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
import { UserContext } from "@/context/user-context";

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required."),
  category: z.enum(['Technology', 'Creative', 'Lifestyle', 'Business']),
  description: z.string().optional(),
  proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).optional(),
});

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  location: z.string().optional(),
  bio: z.string().optional(),
  skillsOffered: z.array(skillSchema),
  skillsWanted: z.array(skillSchema.omit({ proficiency: true })),
  availability: z.array(z.string()).nonempty("Please select at least one availability option."),
  profileVisibility: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const availabilityOptions = ["weekdays", "evenings", "weekends", "flexible"];
const skillCategories = ['Technology', 'Creative', 'Lifestyle', 'Business'] as const;
const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });
  
  useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name,
        location: currentUser.location,
        bio: currentUser.bio,
        skillsOffered: currentUser.skillsOffered,
        skillsWanted: currentUser.skillsWanted,
        availability: currentUser.availability,
        profileVisibility: currentUser.profileVisibility === "Public",
      });
    }
  }, [currentUser, form, isEditing]);


  const { fields: offeredFields, append: appendOffered, remove: removeOffered } = useFieldArray({
    control: form.control,
    name: "skillsOffered",
  });

  const { fields: wantedFields, append: appendWanted, remove: removeWanted } = useFieldArray({
    control: form.control,
    name: "skillsWanted",
  });

  const onSubmit = (data: ProfileFormValues) => {
    const updatedUser: User = {
      ...currentUser,
      name: data.name,
      location: data.location || "",
      bio: data.bio || "",
      skillsOffered: data.skillsOffered,
      skillsWanted: data.skillsWanted,
      availability: data.availability,
      profileVisibility: data.profileVisibility ? "Public" : "Private",
    };
    setCurrentUser(updatedUser);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const SkillCard = ({ skill, offered }: { skill: Skill, offered: boolean }) => (
      <div className="p-4 rounded-lg border bg-card/50 w-full">
          <div className="flex justify-between items-start">
              <div>
                  <h4 className="font-bold">{skill.name}</h4>
                  <Badge variant="outline" className="mt-1">{skill.category}</Badge>
              </div>
              {offered && skill.proficiency && (
                  <Badge variant="secondary">{skill.proficiency}</Badge>
              )}
          </div>
          {skill.description && <p className="text-sm text-muted-foreground mt-2">{skill.description}</p>}
      </div>
  );

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
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} data-ai-hint="profile avatar" />
            <AvatarFallback><UserIcon /></AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            {currentUser.location && <p className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> {currentUser.location}</p>}
          </div>
        </div>
        {currentUser.bio && (
            <>
                <Separator />
                <div>
                    <h3 className="font-semibold text-lg mb-2">About Me</h3>
                    <p className="text-muted-foreground">{currentUser.bio}</p>
                </div>
            </>
        )}
        <Separator />
        <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Skills Offered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser.skillsOffered.map((skill, index) => <SkillCard key={index} skill={skill} offered />)}
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Skills Wanted</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser.skillsWanted.map((skill, index) => <SkillCard key={index} skill={skill} offered={false} />)}
            </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Availability</h3>
                <div className="flex flex-wrap gap-2">
                    {currentUser.availability.map(avail => <Badge key={avail} variant="outline" className="capitalize">{avail}</Badge>)}
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Eye className="h-5 w-5 text-primary" /> Profile Visibility</h3>
                <p>{currentUser.profileVisibility}</p>
            </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Star className="h-5 w-5 text-primary" /> Ratings and Feedback</h3>
          <div className="space-y-4">
            {currentUser.feedback.map((fb, index) => (
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
                <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl><Textarea {...field} placeholder="Tell us a little about yourself" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Skills Offered</Label>
                    {offeredFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                            <FormField control={form.control} name={`skillsOffered.${index}.name`} render={({ field }) => (
                                <FormItem><FormLabel>Skill Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`skillsOffered.${index}.category`} render={({ field }) => (
                                <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent>{skillCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`skillsOffered.${index}.proficiency`} render={({ field }) => (
                                <FormItem><FormLabel>Proficiency</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your proficiency" /></SelectTrigger></FormControl><SelectContent>{proficiencyLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`skillsOffered.${index}.description`} render={({ field }) => (
                                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeOffered(index)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendOffered({ name: "", category: "Technology", proficiency: "Beginner" })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill to Offer</Button>
                </div>
                
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Skills Wanted</Label>
                    {wantedFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                            <FormField control={form.control} name={`skillsWanted.${index}.name`} render={({ field }) => (
                                <FormItem><FormLabel>Skill Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`skillsWanted.${index}.category`} render={({ field }) => (
                                <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent>{skillCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name={`skillsWanted.${index}.description`} render={({ field }) => (
                                <FormItem><FormLabel>Description (Why you want to learn it)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeWanted(index)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendWanted({ name: "", category: "Technology" })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill to Learn</Button>
                </div>

                <FormField control={form.control} name="availability" render={() => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Controller
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                            <div className="flex flex-wrap gap-4">
                                {availabilityOptions.map((option) => (
                                    <FormItem key={option} className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                id={option}
                                                checked={field.value?.includes(option)}
                                                onChange={(e) => {
                                                    const newAvailability = e.target.checked
                                                        ? [...(field.value || []), option]
                                                        : field.value?.filter((v) => v !== option);
                                                    field.onChange(newAvailability);
                                                }}
                                                className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                        </FormControl>
                                        <label htmlFor={option} className="capitalize font-normal">{option}</label>
                                    </FormItem>
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

  if (!currentUser) {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto text-center">
                <p>Loading profile...</p>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {isEditing ? <ProfileEditForm /> : <ProfileView />}
      </div>
    </div>
  );
}
