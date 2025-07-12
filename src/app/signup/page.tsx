"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, PartyPopper, PlusCircle, Trash2 } from "lucide-react";

const TOTAL_STEPS = 4;

const availabilityOptions = ["weekdays", "evenings", "weekends", "flexible"];
const skillCategories = ['Technology', 'Creative', 'Lifestyle', 'Business'] as const;
const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required."),
  category: z.enum(skillCategories),
  description: z.string().optional(),
});

const offeredSkillSchema = skillSchema.extend({
  proficiency: z.enum(proficiencyLevels),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  location: z.string().optional(),
  bio: z.string().max(300, "Bio cannot exceed 300 characters.").optional(),
  availability: z.array(z.string()).nonempty("Please select at least one availability option."),
  skillsOffered: z.array(offeredSkillSchema).min(1, "Please add at least one skill you can offer."),
  skillsWanted: z.array(skillSchema).min(1, "Please add at least one skill you want to learn."),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      bio: "",
      availability: [],
      skillsOffered: [],
      skillsWanted: [],
    },
  });

  const { fields: offeredFields, append: appendOffered, remove: removeOffered } = useFieldArray({
    control: form.control,
    name: "skillsOffered",
  });

  const { fields: wantedFields, append: appendWanted, remove: removeWanted } = useFieldArray({
    control: form.control,
    name: "skillsWanted",
  });
  
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof SignupFormValues)[] = [];
    if (step === 1) fieldsToValidate = ["name", "email", "password"];
    if (step === 2) fieldsToValidate = ["location", "bio", "availability"];
    if (step === 3) fieldsToValidate = ["skillsOffered"];
    if (step === 4) fieldsToValidate = ["skillsWanted"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      if (step < TOTAL_STEPS) {
        setStep(step + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data: SignupFormValues) => {
    console.log("Form submitted!", data);
    toast({
      title: "Welcome to SkillSphere!",
      description: "Your profile has been created successfully.",
    });
    router.push("/");
  };
  
  const Step1 = () => (
    <>
      <CardHeader>
        <CardTitle>Welcome to SkillSphere!</CardTitle>
        <CardDescription>Let's start with the basics.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} placeholder="Alex Doe" /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input {...field} type="email" placeholder="you@example.com" /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem><FormLabel>Password</FormLabel><FormControl><Input {...field} type="password" /></FormControl><FormMessage /></FormItem>
        )} />
      </CardContent>
    </>
  );

  const Step2 = () => (
    <>
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
        <CardDescription>This helps others get to know you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField control={form.control} name="location" render={({ field }) => (
          <FormItem><FormLabel>Location (optional)</FormLabel><FormControl><Input {...field} placeholder="City, Country" /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="bio" render={({ field }) => (
          <FormItem><FormLabel>Bio (optional)</FormLabel><FormControl><Textarea {...field} placeholder="A little bit about your interests..." /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="availability" render={() => (
          <FormItem>
            <FormLabel>Your Availability</FormLabel>
            <div className="flex flex-wrap gap-4 pt-2">
                {availabilityOptions.map((option) => (
                    <FormField
                        key={option}
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
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
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                </FormControl>
                                <label htmlFor={option} className="capitalize font-normal cursor-pointer">{option}</label>
                            </FormItem>
                        )}
                    />
                ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />
      </CardContent>
    </>
  );

  const Step3 = () => (
    <>
      <CardHeader>
        <CardTitle>What skills do you offer?</CardTitle>
        <CardDescription>Add at least one skill you're willing to teach or share.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {offeredFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeOffered(index)}><Trash2 className="h-4 w-4" /></Button>
                <FormField control={form.control} name={`skillsOffered.${index}.name`} render={({ field }) => (
                    <FormItem><FormLabel>Skill Name</FormLabel><FormControl><Input {...field} placeholder="e.g., React Development" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name={`skillsOffered.${index}.category`} render={({ field }) => (
                    <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent>{skillCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name={`skillsOffered.${index}.proficiency`} render={({ field }) => (
                    <FormItem><FormLabel>Proficiency</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your proficiency" /></SelectTrigger></FormControl><SelectContent>{proficiencyLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )} />
            </div>
        ))}
        <Button type="button" variant="outline" onClick={() => appendOffered({ name: "", category: "Technology", proficiency: 'Beginner' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
        <FormMessage>{form.formState.errors.skillsOffered?.message}</FormMessage>
      </CardContent>
    </>
  );

  const Step4 = () => (
    <>
      <CardHeader>
        <CardTitle>What skills do you want to learn?</CardTitle>
        <CardDescription>Add at least one skill you're interested in.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
          {wantedFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                  <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeWanted(index)}><Trash2 className="h-4 w-4" /></Button>
                  <FormField control={form.control} name={`skillsWanted.${index}.name`} render={({ field }) => (
                      <FormItem><FormLabel>Skill Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Creative Writing" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name={`skillsWanted.${index}.category`} render={({ field }) => (
                      <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent>{skillCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name={`skillsWanted.${index}.description`} render={({ field }) => (
                    <FormItem><FormLabel>Why do you want to learn this? (optional)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => appendWanted({ name: "", category: "Technology" })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
          <FormMessage>{form.formState.errors.skillsWanted?.message}</FormMessage>
      </CardContent>
    </>
  );
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <Card className="w-full max-w-2xl shadow-2xl bg-white/50 dark:bg-muted/50 border-2 border-secondary/50">
        <div className="p-6">
            <Progress value={(step / TOTAL_STEPS) * 100} className="mb-4" />
        </div>
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}

                <CardFooter className="flex justify-between">
                    {step > 1 ? (
                        <Button type="button" variant="outline" onClick={handlePrevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                    ) : <div></div>}

                    {step < TOTAL_STEPS ? (
                        <Button type="button" onClick={handleNextStep}>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="submit">
                            Finish Signup <PartyPopper className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </CardFooter>
            </form>
        </FormProvider>
      </Card>
    </div>
  );
}
