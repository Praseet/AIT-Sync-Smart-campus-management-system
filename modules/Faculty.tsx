import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Card, Input, Badge, Button } from '../components/ui/Primitives';
import { Search, MapPin, Clock, Pin, PinOff } from 'lucide-react';
import { formatDate } from '../lib/utils';
import { FacultyStatus } from '../types';

const statusConfig: Record<FacultyStatus, { color: string, label: string, ring: string }> = {
  'AVAILABLE': { color: 'bg-emerald-500', label: 'Available', ring: 'ring-emerald-500/20' },
  'IN_CLASS': { color: 'bg-red-500', label: 'In Class', ring: 'ring-red-500/20' },
  'BUSY': { color: 'bg-amber-500', label: 'Busy', ring: 'ring-amber-500/20' },
  'OFF_CAMPUS': { color: 'bg-zinc-500', label: 'Off Campus', ring: 'ring-zinc-500/20' },
};

export default function FacultyModule() {
  const { facultyList, currentUser, togglePinFaculty } = useStore();
  const [search, setSearch] = useState('');

  const filteredFaculty = facultyList.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-4">
         <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Faculty Pulse</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Live availability status.</p>
         </div>
         <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input 
              placeholder="Filter by name..." 
              className="pl-9 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFaculty.map((faculty) => {
          const status = statusConfig[faculty.status];
          const isPinned = currentUser.pinned_faculty.includes(faculty.id);

          return (
            <Card key={faculty.id} className="hover:border-primary/40 transition-all duration-300 group overflow-hidden relative group">
               <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => togglePinFaculty(faculty.id)}
                     className={`p-1.5 rounded-md transition-colors ${isPinned ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                   >
                       {isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
                   </button>
               </div>
               
               <div className="p-5">
                 <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-foreground font-bold text-sm border border-border">
                        {faculty.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{faculty.name}</h3>
                        <p className="text-xs text-muted-foreground">{faculty.department}</p>
                      </div>
                    </div>
                 </div>

                 <div className={`flex items-center gap-2 p-2 rounded-md bg-secondary/50 border border-border/50 mb-4`}>
                    <span className={`flex h-2 w-2 rounded-full ${status.color} ring-2 ${status.ring} ${faculty.status === 'AVAILABLE' ? 'animate-pulse' : ''}`}></span>
                    <span className="text-xs font-medium text-foreground">{status.label}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">
                       {faculty.status === 'IN_CLASS' ? 'Until 12:00 PM' : ''}
                    </span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1.5 rounded border border-border/30">
                       <MapPin className="w-3 h-3 opacity-70" />
                       <span className="truncate">{faculty.cabin_location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1.5 rounded border border-border/30">
                       <Clock className="w-3 h-3 opacity-70" />
                       <span>{formatDate(faculty.last_updated)}</span>
                    </div>
                 </div>
               </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
}