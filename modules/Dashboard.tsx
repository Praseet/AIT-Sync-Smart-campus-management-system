import React from 'react';
import { Card, Button, Badge } from '../components/ui/Primitives';
import { Clock, BookOpen, Bell, ArrowRight, Video, Wifi, CalendarCheck, AlertCircle, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

// Mock schedule data for "Next Class" dynamic feel
const SCHEDULE = [
  { id: 1, subject: "Data Structures", code: "CS201", time: "10:00 AM", location: "Hall 304", professor: "Dr. Rajesh Kumar", status: "UPCOMING" },
  { id: 2, subject: "Digital Logic", code: "EC204", time: "11:30 AM", location: "Lab 2", professor: "Prof. Anita Desai", status: "PENDING" },
];

export default function Dashboard() {
  const { currentUser, facultyList, noticeList } = useStore();
  const navigate = useNavigate();

  const pinnedFaculty = facultyList.filter(f => currentUser.pinned_faculty.includes(f.id));
  
  // Determine attendance color
  const attColor = currentUser.attendance < 75 ? 'text-red-500' : 'text-emerald-500';
  const attStroke = currentUser.attendance < 75 ? 'stroke-red-500' : 'stroke-emerald-500';

  const nextClass = SCHEDULE[0]; // Simulating next class

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border/40">
         <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {currentUser.name.split(' ')[0]}. Here is what's happening today.</p>
         </div>
         <div className="text-right hidden md:block">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Widget 1: Hero & Attendance (Span 8) */}
        <Card className="md:col-span-8 bg-card relative overflow-hidden flex flex-col md:flex-row p-6 gap-8 items-center border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide">
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Fall Semester 2024</span>
                </div>
                <div>
                   <h2 className="text-xl font-bold text-foreground">You are on track.</h2>
                   <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-lg">
                     Your academic performance is stable with a CGPA of <span className="text-foreground font-semibold">{currentUser.cgpa}</span>. 
                     Keep up the attendance in <span className="font-medium text-foreground">Data Structures</span> to avoid penalties.
                   </p>
                </div>
                <div className="flex gap-3 pt-2">
                    <Button onClick={() => navigate('/resources')} variant="default" size="sm" className="h-8 text-xs font-medium px-4">View Notes</Button>
                    <Button onClick={() => navigate('/hostel')} variant="outline" size="sm" className="h-8 text-xs font-medium px-4">Hostel Status</Button>
                </div>
            </div>

            {/* Attendance Ring - Fixed SVG ViewBox and Container */}
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center group cursor-pointer mr-2">
               {/* Decorative background glow */}
               <div className="absolute inset-0 bg-secondary/30 rounded-full blur-xl transform scale-75 group-hover:scale-100 transition-transform" />
               
               {/* SVG with proper viewBox to prevent clipping */}
               <svg className="w-full h-full transform -rotate-90 drop-shadow-lg relative z-10" viewBox="0 0 128 128">
                  {/* Background Circle */}
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary/50" />
                  {/* Progress Circle - Circumference = 2 * pi * 56 ≈ 351.8 */}
                  <circle 
                    cx="64" cy="64" r="56" 
                    stroke="currentColor" strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="351.8" 
                    strokeDashoffset={351.8 - (351.8 * currentUser.attendance) / 100} 
                    strokeLinecap="round"
                    className={`${attStroke} transition-all duration-1000 ease-out`} 
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <span className={`text-3xl font-bold ${attColor} tracking-tighter`}>{currentUser.attendance}%</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Attendance</span>
               </div>
            </div>
        </Card>

        {/* Widget 2: Next Class (Span 4) */}
        <Card className="md:col-span-4 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white p-6 flex flex-col justify-between shadow-xl shadow-indigo-500/10 border-0 relative overflow-hidden group">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 p-8 opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
               <BookOpen className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 flex justify-between items-start">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/10 shadow-inner">
                    <BookOpen className="w-5 h-5 text-indigo-100" />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        Upcoming
                    </span>
                    <span className="text-white font-mono text-xs mt-2 opacity-80">{nextClass.time}</span>
                </div>
            </div>
            
            <div className="relative z-10 mt-6">
                <p className="text-indigo-200 text-xs font-medium mb-1 flex items-center gap-1.5">
                   <Clock className="w-3 h-3" /> Starts in 15 mins
                </p>
                <h3 className="text-xl font-bold leading-tight tracking-tight mb-1">{nextClass.subject}</h3>
                <p className="text-indigo-200 text-xs font-mono opacity-60 mb-4">{nextClass.code}</p>
                
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                     <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-100 bg-white/10 px-2 py-1 rounded-md">
                        <MapPin className="w-3 h-3" /> {nextClass.location}
                     </div>
                     <div className="text-xs text-indigo-200 truncate flex-1 text-right">
                        {nextClass.professor}
                     </div>
                </div>
            </div>
        </Card>

        {/* Row 2: Two equal columns now */}
        
        {/* Widget 3: Faculty Watch (Span 6) */}
        <Card className="md:col-span-6 p-0 flex flex-col h-full border-border/60">
            <div className="px-6 py-4 border-b border-border/40 flex justify-between items-center bg-muted/20">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Video className="w-4 h-4 text-primary" /> Faculty Watch
                </h3>
                <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-muted-foreground hover:text-primary" onClick={() => navigate('/faculty')}>View All</Button>
            </div>
            <div className="p-3 space-y-1 flex-1 min-h-[200px]">
                {pinnedFaculty.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground/60 space-y-2">
                        <Video className="w-8 h-8 opacity-20" />
                        <p className="text-xs">No faculty pinned. Go to Faculty Pulse to pin your professors.</p>
                    </div>
                ) : (
                    pinnedFaculty.map(f => (
                        <div key={f.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/40 transition-colors group cursor-default border border-transparent hover:border-border/40">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground border border-border group-hover:border-primary/30 transition-colors">
                                    {f.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{f.name}</p>
                                    <p className="text-xs text-muted-foreground">{f.cabin_location}</p>
                                </div>
                            </div>
                            <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-background ${
                                f.status === 'AVAILABLE' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                                f.status === 'IN_CLASS' ? 'bg-red-500' : 
                                f.status === 'BUSY' ? 'bg-amber-500' : 'bg-zinc-500'
                            }`} title={f.status} />
                        </div>
                    ))
                )}
            </div>
        </Card>

        {/* Widget 4: Notices Ticker (Span 6) */}
        <Card className="md:col-span-6 p-0 flex flex-col h-full border-border/60">
            <div className="px-6 py-4 border-b border-border/40 flex justify-between items-center bg-muted/20">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" /> Campus Feed
                </h3>
                {noticeList.some(n => n.urgent) && <Badge variant="destructive" className="h-5 px-1.5 text-xs">1 Urgent</Badge>}
            </div>
            <div className="divide-y divide-border/40">
                {noticeList.map(n => (
                    <div key={n.id} className="px-6 py-4 hover:bg-secondary/20 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-1.5">
                            <span className={`text-sm font-medium leading-none ${n.urgent ? 'text-red-500 dark:text-red-400' : 'text-foreground'}`}>{n.title}</span>
                            <span className="text-xs font-medium text-muted-foreground/70 bg-secondary/50 px-1.5 py-0.5 rounded">{n.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-1 leading-relaxed">{n.summary}</p>
                    </div>
                ))}
            </div>
            <div className="mt-auto p-2 border-t border-border/40 bg-muted/10">
                <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground hover:text-foreground">View All Notices</Button>
            </div>
        </Card>

      </div>
    </div>
  );
}