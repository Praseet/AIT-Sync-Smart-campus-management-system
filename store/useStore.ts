import { create } from 'zustand';
import { Student, Faculty, MaintenanceTicket, Alumni, Resource, PlacementJob, Notice } from '../types';

interface AppState {
  currentUser: Student;
  facultyList: Faculty[];
  tickets: MaintenanceTicket[];
  alumniList: Alumni[];
  resourceList: Resource[];
  jobList: PlacementJob[];
  noticeList: Notice[];
  theme: 'dark' | 'light';
  isSearchOpen: boolean;
  
  // Actions
  toggleFacultyStatus: (id: string, newStatus: Faculty['status']) => void;
  togglePinFaculty: (id: string) => void;
  addTicket: (ticket: MaintenanceTicket) => void;
  voteTicket: (ticketId: string, voteType: 'UP' | 'DOWN') => void;
  updateUser: (updates: Partial<Student>) => void;
  volunteerToVacate: () => void;
  toggleTheme: () => void;
  setSearchOpen: (isOpen: boolean) => void;
}

// --- Mock Data ---

const INITIAL_STUDENT: Student = {
  id: 'u-1234',
  name: 'Aditya Verma',
  role: 'STUDENT',
  cgpa: 9.2,
  attendance: 68.5,
  discipline_records: 0, 
  is_local_resident: true, 
  hostel_status: 'WAITLISTED',
  campus_credits: 120,
  pinned_faculty: ['f-1', 'f-2'],
};

const INITIAL_FACULTY: Faculty[] = [
  { id: 'f-1', name: 'Dr. Rajesh Kumar', status: 'AVAILABLE', last_updated: new Date().toISOString(), cabin_location: 'Block A-201', department: 'Comp. Sci.' },
  { id: 'f-2', name: 'Prof. Anita Desai', status: 'IN_CLASS', last_updated: new Date().toISOString(), cabin_location: 'Block B-105', department: 'Electronics' },
  { id: 'f-3', name: 'Dr. Vikram Seth', status: 'OFF_CAMPUS', last_updated: new Date().toISOString(), cabin_location: 'Admin Block', department: 'Dean' },
  { id: 'f-4', name: 'Prof. Meera Reddy', status: 'BUSY', last_updated: new Date().toISOString(), cabin_location: 'Lab Complex 3', department: 'Mathematics' },
  { id: 'f-5', name: 'Dr. S. Venkat', status: 'AVAILABLE', last_updated: new Date().toISOString(), cabin_location: 'Block C-302', department: 'Physics' },
  { id: 'f-6', name: 'Prof. Arjun Singh', status: 'OFF_CAMPUS', last_updated: new Date(Date.now() - 3600000).toISOString(), cabin_location: 'Block D-101', department: 'Civil Eng.' },
  { id: 'f-7', name: 'Dr. Priya Sharma', status: 'AVAILABLE', last_updated: new Date().toISOString(), cabin_location: 'Block A-305', department: 'Biotech' },
  { id: 'f-8', name: 'Prof. Kevin Fernandes', status: 'BUSY', last_updated: new Date().toISOString(), cabin_location: 'Lab Complex 1', department: 'Mechanical' },
  { id: 'f-9', name: 'Dr. R. K. Mishra', status: 'IN_CLASS', last_updated: new Date().toISOString(), cabin_location: 'Lecture Hall 4', department: 'Mathematics' },
  { id: 'f-10', name: 'Prof. Sarah Lee', status: 'AVAILABLE', last_updated: new Date().toISOString(), cabin_location: 'Block B-202', department: 'Humanities' },
];

const INITIAL_TICKETS: MaintenanceTicket[] = [
  { 
    id: 't-1', 
    category: 'WIFI', 
    severity: 'CRITICAL', 
    status: 'IN_PROGRESS', 
    description: 'Wifi router in Hostel B, 2nd Floor is not working since last night. Exams are approaching!', 
    created_at: new Date(Date.now() - 86400000).toISOString(), 
    upvotes: 45, 
    user_vote: 'UP' 
  },
  { 
    id: 't-2', 
    category: 'PLUMBING', 
    severity: 'MEDIUM', 
    status: 'REPORTED', 
    description: 'Water cooler in the library hallway is leaking. Slippery floor hazard.', 
    created_at: new Date(Date.now() - 172800000).toISOString(), 
    upvotes: 12, 
    user_vote: null 
  },
  {
    id: 't-3',
    category: 'CARPENTRY',
    severity: 'LOW',
    status: 'ASSIGNED',
    description: 'Door handle in Room 304 is loose and sometimes gets stuck.',
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    upvotes: 5,
    user_vote: null
  },
  {
    id: 't-4',
    category: 'ELECTRIC',
    severity: 'MEDIUM', 
    status: 'VERIFICATION',
    description: 'Corridor lights on 3rd floor flicker constantly, causing headaches.',
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    upvotes: 28,
    user_vote: 'DOWN'
  }
];

const INITIAL_ALUMNI: Alumni[] = [
    { id: '1', name: 'Arjun Gupta', company: 'Google', position: 'Senior Software Engineer', graduating_year: 2019, branch: 'CSE', is_open_to_mentorship: true, linkedin_url: '#' },
    { id: '2', name: 'Sarah Jenkins', company: 'Microsoft', position: 'Product Manager', graduating_year: 2020, branch: 'IT', is_open_to_mentorship: false, linkedin_url: '#' },
    { id: '3', name: 'Rahul Sharma', company: 'Razorpay', position: 'Founding Staff', graduating_year: 2021, branch: 'ECE', is_open_to_mentorship: true, linkedin_url: '#' },
    { id: '4', name: 'Emily Chen', company: 'Tesla', position: 'Mechanical Design Lead', graduating_year: 2018, branch: 'ME', is_open_to_mentorship: false, linkedin_url: '#' },
    { id: '5', name: 'Vikram Malhotra', company: 'IIM Ahmedabad', position: 'MBA Candidate', graduating_year: 2022, branch: 'CSE', is_open_to_mentorship: true, linkedin_url: '#' },
    { id: '6', name: 'Priya Desai', company: 'Goldman Sachs', position: 'Financial Analyst', graduating_year: 2019, branch: 'ECE', is_open_to_mentorship: true, linkedin_url: '#' },
    { id: '7', name: 'Amit Patel', company: 'Indian Administrative Service', position: 'District Collector', graduating_year: 2015, branch: 'Civil', is_open_to_mentorship: false, linkedin_url: '#' },
    { id: '8', name: 'Zainab Khan', company: 'Adobe', position: 'UX Researcher', graduating_year: 2020, branch: 'IT', is_open_to_mentorship: true, linkedin_url: '#' },
    { id: '9', name: 'David Ross', company: 'Y Combinator Startup', position: 'CTO & Co-Founder', graduating_year: 2021, branch: 'CSE', is_open_to_mentorship: true, linkedin_url: '#' },
    { id: '10', name: 'Neha Gupta', company: 'L&T Construction', position: 'Project Manager', graduating_year: 2017, branch: 'Civil', is_open_to_mentorship: true, linkedin_url: '#' },
];

const INITIAL_RESOURCES: Resource[] = [
  { id: 1, name: 'Data Structures - Lecture 5.pdf', type: 'PDF', size: '2.4 MB', subject: 'CS201', date: '2 days ago', downloads: 145 },
  { id: 2, name: 'Sorting_Algorithms.py', type: 'CODE', size: '4 KB', subject: 'CS201', date: '3 days ago', downloads: 89 },
  { id: 3, name: 'Digital Logic - Midterm Prep.pdf', type: 'PDF', size: '5.1 MB', subject: 'EC204', date: '1 week ago', downloads: 210 },
  { id: 4, name: 'Lab_Report_Template.docx', type: 'DOC', size: '1.2 MB', subject: 'General', date: '2 weeks ago', downloads: 560 },
  { id: 5, name: 'Semester_Schedule.xlsx', type: 'SHEET', size: '18 KB', subject: 'Admin', date: '1 month ago', downloads: 1020 },
  { id: 6, name: 'Physics_Lab_Manual_v2.pdf', type: 'PDF', size: '12 MB', subject: 'PH101', date: '3 weeks ago', downloads: 340 },
  { id: 7, name: 'Organic_Chemistry_Notes.pdf', type: 'PDF', size: '8.5 MB', subject: 'CH102', date: '1 month ago', downloads: 120 },
  { id: 8, name: 'Java_Project_Boilerplate.zip', type: 'CODE', size: '1.5 MB', subject: 'CS202', date: '2 days ago', downloads: 45 },
  { id: 9, name: 'Calculus_II_Problem_Set.pdf', type: 'PDF', size: '3.2 MB', subject: 'MA102', date: '5 days ago', downloads: 180 },
  { id: 10, name: 'Economics_Assignment_3.docx', type: 'DOC', size: '0.8 MB', subject: 'HS301', date: '1 week ago', downloads: 75 },
  { id: 11, name: 'Club_Budget_Template.xlsx', type: 'SHEET', size: '25 KB', subject: 'Extra Curricular', date: '2 months ago', downloads: 65 },
  { id: 12, name: 'React_Workshop_Source.js', type: 'CODE', size: '12 KB', subject: 'Workshop', date: '3 weeks ago', downloads: 210 },
  { id: 13, name: 'ML_Basics_Slides.pdf', type: 'PDF', size: '15 MB', subject: 'CS305', date: '1 day ago', downloads: 55 },
  { id: 14, name: 'Campus_Map_HighRes.pdf', type: 'PDF', size: '22 MB', subject: 'General', date: '6 months ago', downloads: 1500 },
  { id: 15, name: 'Internship_Cover_Letter.docx', type: 'DOC', size: '1.1 MB', subject: 'Career', date: '2 weeks ago', downloads: 430 },
  { id: 16, name: 'Matlab_Simulations.m', type: 'CODE', size: '8 KB', subject: 'EC301', date: '4 days ago', downloads: 90 },
  { id: 17, name: 'Circuit_Design_Schematics.pdf', type: 'PDF', size: '4.5 MB', subject: 'EC204', date: '1 week ago', downloads: 130 },
  { id: 18, name: 'Hostel_Leave_Form.docx', type: 'DOC', size: '0.5 MB', subject: 'Admin', date: '3 months ago', downloads: 890 },
];

const INITIAL_JOBS: PlacementJob[] = [
  { id: 1, role: "Software Engineer", company: "Google", logo: "G", type: "Full-time", pkg: "₹24 LPA", location: "Bangalore", deadline: "2 days left", eligibility: "CGPA > 8.5, No Backlogs" },
  { id: 2, role: "Product Analyst", company: "Flipkart", logo: "F", type: "Internship", pkg: "₹45k / mo", location: "Remote", deadline: "5 days left", eligibility: "CGPA > 7.5" },
  { id: 3, role: "Backend Developer", company: "Amazon", logo: "A", type: "Full-time", pkg: "₹40 LPA", location: "Hyderabad", deadline: "1 week left", eligibility: "CGPA > 9.0" },
  { id: 4, role: "Data Scientist", company: "Microsoft", logo: "M", type: "Full-time", pkg: "₹28 LPA", location: "Noida", deadline: "Closed", eligibility: "Closed" },
];

const INITIAL_NOTICES: Notice[] = [
  { id: 1, title: "Exam Schedule Released", summary: "Finals start Nov 15. Check student portal for hall tickets.", date: "2h ago", urgent: true },
  { id: 2, title: "Guest Lecture: AI Ethics", summary: "Dr. Hinton speaking at Auditorium A @ 4PM today.", date: "5h ago", urgent: false },
  { id: 3, title: "Hostel Wifi Maintenance", summary: "Scheduled downtime in Hostel B tonight from 10 PM - 12 AM.", date: "1d ago", urgent: false },
  { id: 4, title: "Hackathon Registration", summary: "Annual coding hackathon registrations close tomorrow.", date: "1d ago", urgent: false },
];

export const useStore = create<AppState>((set) => ({
  currentUser: INITIAL_STUDENT,
  facultyList: INITIAL_FACULTY,
  tickets: INITIAL_TICKETS,
  alumniList: INITIAL_ALUMNI,
  resourceList: INITIAL_RESOURCES,
  jobList: INITIAL_JOBS,
  noticeList: INITIAL_NOTICES,
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
  isSearchOpen: false,

  toggleFacultyStatus: (id, newStatus) => set((state) => ({
    facultyList: state.facultyList.map(f => 
      f.id === id ? { ...f, status: newStatus, last_updated: new Date().toISOString() } : f
    )
  })),

  togglePinFaculty: (id) => set((state) => {
    const isPinned = state.currentUser.pinned_faculty.includes(id);
    const newPinned = isPinned 
      ? state.currentUser.pinned_faculty.filter(pid => pid !== id)
      : [...state.currentUser.pinned_faculty, id];
    
    return {
      currentUser: { ...state.currentUser, pinned_faculty: newPinned }
    };
  }),

  addTicket: (ticket) => set((state) => ({
    tickets: [ticket, ...state.tickets]
  })),

  voteTicket: (ticketId, voteType) => set((state) => ({
    tickets: state.tickets.map(t => {
      if (t.id !== ticketId) return t;

      let newVote = t.user_vote;
      let newScore = t.upvotes;

      if (voteType === 'UP') {
        if (newVote === 'UP') {
          // Toggle off
          newVote = null;
          newScore -= 1;
        } else if (newVote === 'DOWN') {
          // Switch from Down to Up
          newVote = 'UP';
          newScore += 2;
        } else {
          // New Upvote
          newVote = 'UP';
          newScore += 1;
        }
      } else { // DOWN
        if (newVote === 'DOWN') {
          // Toggle off
          newVote = null;
          newScore += 1;
        } else if (newVote === 'UP') {
          // Switch from Up to Down
          newVote = 'DOWN';
          newScore -= 2;
        } else {
          // New Downvote
          newVote = 'DOWN';
          newScore -= 1;
        }
      }

      return { ...t, upvotes: newScore, user_vote: newVote };
    })
  })),

  updateUser: (updates) => set((state) => ({
    currentUser: { ...state.currentUser, ...updates }
  })),

  volunteerToVacate: () => set((state) => ({
    currentUser: { 
        ...state.currentUser, 
        hostel_status: 'PENDING',
        campus_credits: state.currentUser.campus_credits + 20 
    }
  })),

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),

  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
}));