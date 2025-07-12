export type Skill = string;

export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
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
    skillsOffered: ["React Development", "Guitar Lessons", "Photography"],
    skillsWanted: ["Creative Writing", "Data Science", "Public Speaking"],
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
    skillsOffered: ["Creative Writing", "Graphic Design", "Yoga Instruction"],
    skillsWanted: ["React Development", "Baking", "German Language"],
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
    skillsOffered: ["Data Science", "Woodworking", "Financial Planning"],
    skillsWanted: ["Guitar Lessons", "Graphic Design", "Gardening"],
    availability: ["weekends"],
    profileVisibility: "Public",
    feedback: [],
  },
  {
    id: "user-4",
    name: "Maria Garcia",
    avatar: "https://placehold.co/100x100/A2AADB/FFF2E0?text=MG",
    location: "Miami, FL",
    skillsOffered: ["Baking", "Spanish Tutoring", "Salsa Dancing"],
    skillsWanted: ["Photography", "Yoga Instruction", "Financial Planning"],
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
    skillsOffered: ["Public Speaking", "Japanese Calligraphy", "Gardening"],
    skillsWanted: ["Woodworking", "Salsa Dancing", "Data Science"],
    availability: ["weekends", "flexible"],
    profileVisibility: "Public",
    feedback: [],
  },
  {
    id: "user-6",
    name: "Priya Patel",
    avatar: "https://placehold.co/100x100/C0C9EE/4d4f8d?text=PP",
    location: "Austin, TX",
    skillsOffered: ["Python Programming", "Indian Cooking", "Meditation Guide"],
    skillsWanted: ["React Development", "Graphic Design", "Guitar Lessons"],
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
    skillsOffered: ["Content Marketing", "SEO Optimization", "Creative Writing"],
    skillsWanted: ["Python Programming", "Photography", "Japanese Calligraphy"],
    availability: ["weekdays"],
    profileVisibility: "Public",
    feedback: [],
  },
  {
    id: "user-8",
    name: "Fatima Al-Jamil",
    avatar: "https://placehold.co/100x100/898AC4/FFF2E0?text=FA",
    location: "London, UK",
    skillsOffered: ["Arabic Calligraphy", "Digital Illustration", "UX/UI Design"],
    skillsWanted: ["Content Marketing", "SEO Optimization", "Salsa Dancing"],
    availability: ["evenings", "flexible"],
    profileVisibility: "Public",
    feedback: [
        { rating: 5, comment: "Her design skills are top-notch.", from: "Jane Smith" },
    ],
  }
];

export const currentUser = users[0];
