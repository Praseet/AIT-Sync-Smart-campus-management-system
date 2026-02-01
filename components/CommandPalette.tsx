import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Calendar, 
  CreditCard, 
  Settings, 
  Smile, 
  User,
  LayoutDashboard,
  Users,
  BedDouble,
  Wrench,
  Search,
  Moon,
  Sun,
  GraduationCap,
  FileText,
  Briefcase,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CommandPalette() {
  const { 
    isSearchOpen, 
    setSearchOpen, 
    theme, 
    toggleTheme, 
    facultyList,
    alumniList,
    resourceList,
    jobList,
    tickets
  } = useStore();
  const navigate = useNavigate();

  // Toggle with Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const runCommand = (command: () => void) => {
    setSearchOpen(false);
    command();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm transition-all">
      <div 
        className="w-full max-w-xl rounded-xl overflow-hidden border border-border shadow-2xl animate-in zoom-in-95 bg-popover text-popover-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <Command 
            className="w-full"
            loop
        >
          <div className="flex items-center border-b border-border px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input 
               className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
               placeholder="Search pages, faculty, jobs, or alumni..."
               autoFocus
            />
          </div>
          
          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>
            
            {/* --- Navigation --- */}
            <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground px-2 mb-2">
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/ai-chat'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <Sparkles className="w-4 h-4 text-primary" /> AI Assistant
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/faculty'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <Users className="w-4 h-4" /> Faculty Pulse
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/hostel'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <BedDouble className="w-4 h-4" /> Hostel Merit
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/maintenance'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <Wrench className="w-4 h-4" /> Maintenance
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/alumni'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <GraduationCap className="w-4 h-4" /> Alumni
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/resources'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <FileText className="w-4 h-4" /> Resources
              </Command.Item>
               <Command.Item 
                onSelect={() => runCommand(() => navigate('/placements'))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <Briefcase className="w-4 h-4" /> Placements
              </Command.Item>
            </Command.Group>

            {/* --- Faculty --- */}
            <Command.Group heading="Faculty" className="text-xs font-medium text-muted-foreground px-2 mb-2 mt-2">
                {facultyList.map(f => (
                     <Command.Item 
                        key={f.id}
                        value={`${f.name} ${f.department} ${f.status}`}
                        onSelect={() => runCommand(() => navigate('/faculty'))}
                        className="flex items-center justify-between px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground group"
                     >
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" /> 
                            <span>{f.name}</span>
                            <span className="text-xs text-muted-foreground ml-1">({f.department})</span>
                        </div>
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${f.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-secondary text-muted-foreground'}`}>{f.status}</span>
                     </Command.Item>
                ))}
            </Command.Group>

            {/* --- Alumni --- */}
            <Command.Group heading="Alumni Network" className="text-xs font-medium text-muted-foreground px-2 mb-2 mt-2">
                {alumniList.map(a => (
                    <Command.Item
                        key={a.id}
                        value={`${a.name} ${a.company} ${a.position}`}
                        onSelect={() => runCommand(() => navigate('/alumni'))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                        <GraduationCap className="w-4 h-4 opacity-70" />
                        <span className="flex-1">{a.name}</span>
                        <span className="text-xs text-muted-foreground">{a.position} @ {a.company}</span>
                    </Command.Item>
                ))}
            </Command.Group>

            {/* --- Placement Jobs --- */}
            <Command.Group heading="Jobs & Internships" className="text-xs font-medium text-muted-foreground px-2 mb-2 mt-2">
                {jobList.map(j => (
                    <Command.Item
                        key={j.id}
                        value={`${j.role} ${j.company} ${j.location} ${j.type}`}
                        onSelect={() => runCommand(() => navigate('/placements'))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                        <Briefcase className="w-4 h-4 opacity-70" />
                        <span className="font-medium">{j.role}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{j.company}</span>
                    </Command.Item>
                ))}
            </Command.Group>

            {/* --- Resources --- */}
            <Command.Group heading="Resources" className="text-xs font-medium text-muted-foreground px-2 mb-2 mt-2">
                {resourceList.map(r => (
                    <Command.Item
                        key={r.id}
                        value={`${r.name} ${r.subject} ${r.type}`}
                        onSelect={() => runCommand(() => navigate('/resources'))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                        <FileText className="w-4 h-4 opacity-70" />
                        <span className="truncate">{r.name}</span>
                        <span className="text-xs text-muted-foreground bg-secondary/50 px-1 rounded ml-auto">{r.subject}</span>
                    </Command.Item>
                ))}
            </Command.Group>

            {/* --- Tickets --- */}
            <Command.Group heading="Recent Tickets" className="text-xs font-medium text-muted-foreground px-2 mb-2 mt-2">
                {tickets.slice(0, 3).map(t => (
                    <Command.Item
                        key={t.id}
                        value={`${t.category} ${t.description} ${t.status}`}
                        onSelect={() => runCommand(() => navigate('/maintenance'))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                        <AlertCircle className="w-4 h-4 opacity-70" />
                        <span className="truncate flex-1">{t.category}: {t.description}</span>
                        <span className="text-[10px] uppercase font-bold">{t.status}</span>
                    </Command.Item>
                ))}
            </Command.Group>

            {/* --- System --- */}
            <Command.Group heading="System" className="text-xs font-medium text-muted-foreground px-2 mb-2 mt-2">
              <Command.Item 
                onSelect={() => runCommand(() => toggleTheme())}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                 {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                 Toggle Theme
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
        {/* Click outside to close */}
        <div className="absolute inset-0 -z-10" onClick={() => setSearchOpen(false)} />
      </div>
    </div>
  );
}