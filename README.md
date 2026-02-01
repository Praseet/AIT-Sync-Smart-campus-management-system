AIT-Sync - Smart Campus Management System
AIT-Sync is a comprehensive smart campus management system designed to streamline and centralize various aspects of college life for students, faculty, and administrators. Built with modern web technologies, this platform serves as a one-stop solution for managing campus operations and fostering better communication within the academic community.

🎯 Key Features
Hostel Management
Automated hostel application and allocation system
Priority-based scoring algorithm considering:
Academic merit (CGPA)
Attendance records
Local residency status
Disciplinary records
Real-time application status tracking (Not Applied, Pending, Approved, Rejected, Waitlisted)
Faculty Management
Faculty availability tracking system
Real-time status updates (Available, In Class, Busy, Off Campus)
Cabin location directory
Ability to pin favorite professors for quick access
Department-wise faculty organization
Maintenance & Complaints
Comprehensive ticket management system for campus maintenance issues
Support for multiple categories: Electrical, Plumbing, Carpentry, and WiFi
Severity-based prioritization (Low, Medium, Critical)
Ticket lifecycle tracking (Reported → Assigned → In Progress → Verification → Closed)
Community-driven voting system (upvotes/downvotes) to highlight urgent issues
Student feedback and rating system for completed requests
Alumni Network
Alumni directory with company and position information
Mentorship connection platform
Filter by graduation year, branch, and industry
LinkedIn profile integration
Access to successful alumni for career guidance
Resource Management
Centralized academic resource library
Support for multiple file types (PDFs, Code, Documents, Spreadsheets)
Subject-wise categorization
Download tracking and popular resources
Easy resource sharing among students
Placement Portal
Job and internship opportunity listings
Company information with logos
Package and location details
Application deadline tracking
Eligibility criteria display
Job type categorization
Student Dashboard
Personalized profile management
Campus credits system (virtual currency)
Academic performance tracking (CGPA and attendance)
Urgent notices and announcements
Quick access to all campus services
🛠️ Technology Stack
Frontend Framework: React 18.3 with TypeScript
Build Tool: Vite
Routing: React Router DOM (Hash-based routing)
State Management: Zustand
UI Components:
Lucide React (icons)
Framer Motion (animations)
CMDK (command palette)
Tailwind CSS (styling with tailwind-merge and clsx)
Data Fetching: TanStack React Query
📋 User Roles
The system supports multiple user roles:

Students: Access to all campus services and resources
Faculty: Management of availability and student interactions
Alumni: Mentorship and networking features
Admin: System-wide management and oversight
🎨 Architecture
The application follows a modular architecture with dedicated modules for each feature:

Dashboard
Profile Management
Hostel Management
Faculty Directory
Maintenance System
Alumni Connect
Resource Library
Placement Portal
AI Chat Assistant
Each module is built as a self-contained unit with its own components, state management, and business logic, ensuring scalability and maintainability.
