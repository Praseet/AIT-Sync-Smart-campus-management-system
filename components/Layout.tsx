import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Users, 
  BedDouble, 
  Wrench, 
  Search, 
  GraduationCap, 
  Sun, 
  Moon,
  Bell,
  Menu,
  X,
  BookOpenText,
  Briefcase,
  ChevronDown,
  ChevronRight,
  User,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import CommandPalette from './CommandPalette';

const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group relative",
      active 
        ? "bg-primary/10 text-primary" 
        : "text-muted-foreground hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5"
    )}
  >
    <Icon className={cn("w-4 h-4 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
    <span>{label}</span>
    {/* Linear-style subtle active indicator */}
    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full shadow-[0_0_8px_rgba(139,92,246,0.6)]" />}
  </Link>
);

const NavGroup = ({ label, children, defaultOpen = true }: { label: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest select-none hover:text-foreground/80 transition-colors"
      >
        <span>{label}</span>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      <div className={cn("space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
        {children}
      </div>
    </div>
  );
};

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;
  const { theme, toggleTheme, setSearchOpen, currentUser } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden font-sans selection:bg-primary/20">
      <CommandPalette />
      
      {/* Desktop Sidebar with Glass Effect */}
      <aside className="hidden md:flex flex-col w-64 glass-sidebar h-screen sticky top-0 z-30">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet-700 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none">AIT Sync</span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            {/* New AI Section */}
            <div className="mb-4">
                <NavItem to="/ai-chat" icon={Sparkles} label="AI Assistant" active={path === '/ai-chat'} />
            </div>

            <NavGroup label="Academic">
                <NavItem to="/" icon={Home} label="Dashboard" active={path === '/'} />
                <NavItem to="/faculty" icon={Users} label="Faculty Pulse" active={path === '/faculty'} />
                <NavItem to="/resources" icon={BookOpenText} label="Resource Vault" active={path === '/resources'} />
            </NavGroup>

            <NavGroup label="Campus Life">
                <NavItem to="/hostel" icon={BedDouble} label="Hostel Allocation" active={path === '/hostel'} />
                <NavItem to="/maintenance" icon={Wrench} label="Facilities Support" active={path === '/maintenance'} />
            </NavGroup>

            <NavGroup label="Career & Network">
                <NavItem to="/alumni" icon={GraduationCap} label="Alumni Connect" active={path === '/alumni'} />
                <NavItem to="/placements" icon={Briefcase} label="Placements" active={path === '/placements'} />
            </NavGroup>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-border/50 bg-background/20 backdrop-blur-md">
          <div 
             className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 p-2 -m-2 rounded-lg transition-colors group"
             onClick={() => navigate('/profile')}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-background/50 group-hover:ring-primary/50 transition-all">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{currentUser.name}</span>
              <span className="text-xs text-muted-foreground truncate">{currentUser.role} • {currentUser.campus_credits} Cr</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Shell */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background relative">
        {/* Top Header - Floating Glass */}
        <header className="h-14 border-b border-border/40 flex items-center px-4 md:px-8 justify-between glass sticky top-0 z-20">
          <div className="md:hidden flex items-center gap-3">
             <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
               <Menu className="w-5 h-5" />
             </button>
             <span className="font-semibold text-sm">AIT Sync</span>
          </div>

          <div className="hidden md:flex items-center text-sm breadcrumbs text-muted-foreground/80">
            <span className="hover:text-foreground cursor-pointer transition-colors text-xs font-medium uppercase tracking-wide">Campus</span>
            <span className="mx-2 text-muted-foreground/30">/</span>
            <span className="capitalize text-foreground font-semibold tracking-tight">{path === '/' ? 'Overview' : path.slice(1).replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/40 text-muted-foreground text-xs font-medium hover:text-foreground hover:bg-secondary/80 transition-all w-56 group shadow-sm"
            >
              <Search className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
              <span>Search... (Cmd+K)</span>
            </button>
            <button 
               onClick={() => setSearchOpen(true)}
               className="md:hidden p-2 text-muted-foreground"
            >
               <Search className="w-5 h-5" />
            </button>

            <div className="h-4 w-px bg-border/60 mx-1 hidden md:block"></div>

            <button className="relative p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-background"></span>
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
           <Outlet />
        </div>
      </main>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-2xl animate-fade-in">
           <div className="p-4 flex justify-between items-center border-b border-border/50">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
           </div>
           <div className="p-4 space-y-2" onClick={() => setMobileMenuOpen(false)}>
              <NavItem to="/" icon={Home} label="Dashboard" active={path === '/'} />
              <NavItem to="/ai-chat" icon={Sparkles} label="AI Assistant" active={path === '/ai-chat'} />
              <NavItem to="/profile" icon={User} label="My Profile" active={path === '/profile'} />
              <NavItem to="/faculty" icon={Users} label="Faculty Pulse" active={path === '/faculty'} />
              <NavItem to="/resources" icon={BookOpenText} label="Resource Vault" active={path === '/resources'} />
              <NavItem to="/hostel" icon={BedDouble} label="Hostel Allocation" active={path === '/hostel'} />
              <NavItem to="/maintenance" icon={Wrench} label="Facilities" active={path === '/maintenance'} />
              <NavItem to="/alumni" icon={GraduationCap} label="Alumni Network" active={path === '/alumni'} />
              <NavItem to="/placements" icon={Briefcase} label="Placements" active={path === '/placements'} />
           </div>
        </div>
      )}
    </div>
  );
}