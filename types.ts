export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN' | 'ALUMNI';
export type HostelStatus = 'NOT_APPLIED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'WAITLISTED';
export type FacultyStatus = 'AVAILABLE' | 'IN_CLASS' | 'BUSY' | 'OFF_CAMPUS';
export type TicketCategory = 'ELECTRIC' | 'PLUMBING' | 'CARPENTRY' | 'WIFI';
export type TicketSeverity = 'LOW' | 'MEDIUM' | 'CRITICAL';
export type TicketStatus = 'REPORTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'VERIFICATION' | 'CLOSED';

export interface Student {
  id: string;
  name: string;
  role: UserRole;
  cgpa: number; // 0.0 - 10.0
  attendance: number; // 0 - 100
  discipline_records: number; // Count of cases
  is_local_resident: boolean;
  hostel_status: HostelStatus;
  campus_credits: number; // Virtual currency
  pinned_faculty: string[]; // IDs of pinned professors
}

export interface HostelApplication {
  id: string;
  student_id: string;
  priority_score: number;
  breakdown: {
    merit: number;
    attendance: number;
    locality: number;
    discipline: number;
  };
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  status: FacultyStatus;
  last_updated: string; // ISO String
  cabin_location: string;
}

export interface MaintenanceTicket {
  id: string;
  category: TicketCategory;
  severity: TicketSeverity;
  status: TicketStatus;
  description: string;
  student_rating?: number | null; // 1-5
  created_at: string;
  // Voting System
  upvotes: number;
  user_vote?: 'UP' | 'DOWN' | null;
}

export interface Alumni {
  id: string;
  name: string;
  graduating_year: number;
  company: string;
  position: string;
  branch: string;
  is_open_to_mentorship: boolean;
  linkedin_url?: string;
}

export interface Resource {
  id: number;
  name: string;
  type: 'PDF' | 'CODE' | 'DOC' | 'SHEET';
  size: string;
  subject: string;
  date: string;
  downloads: number;
}

export interface PlacementJob {
  id: number;
  role: string;
  company: string;
  logo: string;
  type: string;
  pkg: string;
  location: string;
  deadline: string;
  eligibility: string;
}

export interface Notice {
  id: number;
  title: string;
  summary: string;
  date: string;
  urgent: boolean;
}

// AI Chat Types
export interface SearchResult {
  id: string;
  content: string;
  similarity: number; // 0.0 - 1.0 (Mocked)
  source: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: SearchResult[]; // The RAG context used
}