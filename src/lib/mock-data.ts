export interface Skill {
  name: string;
  category: 'Technology' | 'Creative' | 'Lifestyle' | 'Business';
  description?: string;
  tags?: string[];
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  bio: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: string[];
  profileVisibility: 'Public' | 'Private';
  feedback: { rating: number; comment: string; from: string }[];
}

export const users: User[] = [
  {
    id: "user-1",
    name: "Alex Doe",
    avatar: "https://placehold.co/100x100/A2AADB/FFF2E0?text=AD",
    location: "San Francisco, CA",
    bio: "Full-stack developer with a passion for music and photography. Let's learn together!",
    skillsOffered: [
      { name: "React Development", category: "Technology", proficiency: "Expert", description: "Building modern, fast web apps." },
      { name: "Guitar Lessons", category: "Creative", proficiency: "Intermediate", description: "Acoustic and electric guitar basics." },
      { name: "Photography", category: "Creative", proficiency: "Advanced", description: "Landscape and portrait photography." },
    ],
    skillsWanted: [
      { name: "Creative Writing", category: "Creative", description: "Want to write short stories." },
      { name: "Data Science", category: "Technology", description: "Interested in learning Python for data analysis." },
      { name: "Public Speaking", category: "Business", description: "Looking to improve my presentation skills." },
    ],
    availability: ["evenings", "weekends"],
    profileVisibility: "Public",
    feedback: [
      { rating: 5, comment: "Alex is a fantastic React developer!", from: "Jane Smith" },
      { rating: 4, comment: "Great guitar teacher, very patient.", from: "Bob Johnson" },
    ],
  },
  {
    id: "user-2",
    name: "Jane Smith",
    avatar: "https://placehold.co/100x100/898AC4/FFF2E0?text=JS",
    location: "New York, NY",
    bio: "Graphic designer and writer, always looking to learn something new. Yoga enthusiast.",
    skillsOffered: [
      { name: "Creative Writing", category: "Creative", proficiency: "Expert" },
      { name: "Graphic Design", category: "Creative", proficiency: "Advanced" },
      { name: "Yoga Instruction", category: "Lifestyle", proficiency: "Intermediate" }
    ],
    skillsWanted: [
        { name: "React Development", category: "Technology" },
        { name: "Baking", category: "Lifestyle" },
        { name: "German Language", category: "Lifestyle" }
    ],
    availability: ["weekdays"],
    profileVisibility: "Public",
    feedback: [
        { rating: 5, comment: "Jane's writing workshop was inspiring.", from: "Alex Doe" },
    ],
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    avatar: "https://placehold.co/100x100/C0C9EE/4d4f8d?text=BJ",
    location: "Chicago, IL",
    bio: "Data scientist by day, carpenter by night.",
    skillsOffered: [
        { name: "Data Science", category: "Technology", proficiency: "Expert" },
        { name: "Woodworking", category: "Creative", proficiency: "Advanced" },
        { name: "Financial Planning", category: "Business", proficiency: "Intermediate" }
    ],
    skillsWanted: [
        { name: "Guitar Lessons", category: "Creative" },
        { name: "Graphic Design", category: "Creative" },
        { name: "Gardening", category: "Lifestyle" }
    ],
    availability: ["weekends"],
    profileVisibility: "Public",
    feedback: [],
  },
  {
    id: "user-4",
    name: "Maria Garcia",
    avatar: "https://placehold.co/100x100/A2AADB/FFF2E0?text=MG",
    location: "Miami, FL",
    bio: "I love to bake, dance, and teach Spanish!",
    skillsOffered: [
        { name: "Baking", category: "Lifestyle", proficiency: "Expert" },
        { name: "Spanish Tutoring", category: "Lifestyle", proficiency: "Expert" },
        { name: "Salsa Dancing", category: "Lifestyle", proficiency: "Advanced" }
    ],
    skillsWanted: [
        { name: "Photography", category: "Creative" },
        { name: "Yoga Instruction", category: "Lifestyle" },
        { name: "Financial Planning", category: "Business" }
    ],
    availability: ["evenings"],
    profileVisibility: "Public",
    feedback: [
        { rating: 5, comment: "Her cakes are a work of art!", from: "Jane Smith" },
    ],
  },
  {
    id: "user-5",
    name: "Ken Watanabe",
    avatar: "https://placehold.co/100x100/898AC4/FFF2E0?text=KW",
    location: "Seattle, WA",
    bio: "Helping people find their voice and their green thumb.",
    skillsOffered: [
        { name: "Public Speaking", category: "Business", proficiency: "Expert" },
        { name: "Japanese Calligraphy", category: "Creative", proficiency: "Advanced" },
        { name: "Gardening", category: "Lifestyle", proficiency: "Advanced" }
    ],
    skillsWanted: [
        { name: "Woodworking", category: "Creative" },
        { name: "Salsa Dancing", category: "Lifestyle" },
        { name: "Data Science", category: "Technology" }
    ],
    availability: ["weekends", "flexible"],
    profileVisibility: "Public",
    feedback: [],
  },
  {
    id: "user-6",
    name: "Priya Patel",
    avatar: "https://placehold.co/100x100/C0C9EE/4d4f8d?text=PP",
    location: "Austin, TX",
    bio: "Techie who loves to cook and meditate.",
    skillsOffered: [
        { name: "Python Programming", category: "Technology", proficiency: "Expert" },
        { name: "Indian Cooking", category: "Lifestyle", proficiency: "Advanced" },
        { name: "Meditation Guide", category: "Lifestyle", proficiency: "Intermediate" }
    ],
    skillsWanted: [
        { name: "React Development", category: "Technology" },
        { name: "Graphic Design", category: "Creative" },
        { name: "Guitar Lessons", category: "Creative" }
    ],
    availability: ["evenings", "weekends"],
    profileVisibility: "Public",
    feedback: [
        { rating: 5, comment: "Learned so much about Python in just a few sessions.", from: "Alex Doe" },
    ],
  },
   {
    id: "user-7",
    name: "Tom Chen",
    avatar: "https://placehold.co/100x100/A2AADB/FFF2E0?text=TC",
    location: "Boston, MA",
    bio: "Marketing guru and aspiring author.",
    skillsOffered: [
        { name: "Content Marketing", category: "Business", proficiency: "Expert" },
        { name: "SEO Optimization", category: "Business", proficiency: "Advanced" },
        { name: "Creative Writing", category: "Creative", proficiency: "Intermediate" }
    ],
    skillsWanted: [
        { name: "Python Programming", category: "Technology" },
        { name: "Photography", category: "Creative" },
        { name: "Japanese Calligraphy", category: "Creative" }
    ],
    availability: ["weekdays"],
    profileVisibility: "Public",
    feedback: [],
  },
  {
    id: "user-8",
    name: "Fatima Al-Jamil",
    avatar: "https://placehold.co/100x100/898AC4/FFF2E0?text=FA",
    location: "London, UK",
    bio: "Digital artist and designer from the UK.",
    skillsOffered: [
        { name: "Arabic Calligraphy", category: "Creative", proficiency: "Expert" },
        { name: "Digital Illustration", category: "Creative", proficiency: "Advanced" },
        { name: "UX/UI Design", category: "Business", proficiency: "Advanced" }
    ],
    skillsWanted: [
        { name: "Content Marketing", category: "Business" },
        { name: "SEO Optimization", category: "Business" },
        { name: "Salsa Dancing", category: "Lifestyle" }
    ],
    availability: ["evenings", "flexible"],
    profileVisibility: "Public",
    feedback: [
        { rating: 5, comment: "Her design skills are top-notch.", from: "Jane Smith" },
    ],
  }
];

export const currentUser = users[0];
