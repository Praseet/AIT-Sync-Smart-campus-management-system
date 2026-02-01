import React from 'react';
import { useStore } from '../store/useStore';
import { calculateHostelScore, getStatusColor } from '../lib/hostelAlgorithm';
import { Card, Button, Badge } from '../components/ui/Primitives';
import { ArrowUpRight, AlertTriangle, CheckCircle, Info, Key, Coins, Utensils, Phone, ShieldAlert, Coffee, Sun, Moon, Sunrise } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hostel() {
  const { currentUser, volunteerToVacate } = useStore();
  const scoreData = calculateHostelScore(currentUser);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
           <h1 className="text-xl font-semibold text-foreground tracking-tight">Hostel Allocation</h1>
           <p className="text-sm text-muted-foreground mt-0.5">Merit-Need based allocation system.</p>
        </div>
        <div className="flex items-center gap-6 bg-card px-4 py-2 rounded-lg border border-border shadow-sm">
           <div className="flex flex-col items-end">
             <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Credits</span>
             <div className="flex items-center gap-1.5 text-amber-500">
                <Coins className="w-3.5 h-3.5" />
                <span className="font-bold text-base">{currentUser.campus_credits}</span>
             </div>
           </div>
           <div className="w-px h-8 bg-border" />
           <div className="text-right">
             <span className="block text-xs text-muted-foreground font-bold uppercase tracking-wider">Score</span>
             <span className={`text-2xl font-bold leading-none ${getStatusColor(scoreData.total)}`}>{scoreData.total}</span>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Algorithm Breakdown & Utility Widgets */}
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="bg-muted/30 px-5 py-3 border-b border-border flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              <h2 className="text-xs font-bold uppercase tracking-wide text-foreground">Score Breakdown</h2>
            </div>
            <div className="divide-y divide-border">
                {/* Academic */}
                <div className="px-5 py-3 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium">Academic Performance</p>
                        <p className="text-xs text-muted-foreground">CGPA {currentUser.cgpa} / 10</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-foreground h-6">+{scoreData.merit}</Badge>
                </div>
                {/* Attendance */}
                <div className="px-5 py-3 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium">Attendance Record</p>
                        <p className="text-xs text-muted-foreground">{currentUser.attendance}%</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-foreground h-6">+{scoreData.attendance}</Badge>
                </div>
                {/* Discipline */}
                <div className="px-5 py-3 flex justify-between items-center bg-red-500/5">
                    <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">Discipline History</p>
                        <p className="text-xs text-muted-foreground">{currentUser.discipline_records} Reported Cases</p>
                    </div>
                    <Badge variant="outline" className="font-mono text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 h-6">{scoreData.discipline}</Badge>
                </div>
                {/* Locality */}
                <div className="px-5 py-3 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium">Locality Factor</p>
                        <p className="text-xs text-muted-foreground">{currentUser.is_local_resident ? 'Local Resident (Penalty)' : 'Outstation Student (Bonus)'}</p>
                    </div>
                    <Badge variant={currentUser.is_local_resident ? 'secondary' : 'default'} className="font-mono h-6">
                        {scoreData.locality > 0 ? '+' : ''}{scoreData.locality}
                    </Badge>
                </div>
            </div>
            <div className="bg-muted/30 px-5 py-3 flex justify-between items-center border-t border-border">
                <span className="font-semibold text-sm">Final Priority Score</span>
                <span className="font-bold text-lg">{scoreData.total}</span>
            </div>
          </Card>

          {/* New: Mess Menu Widget */}
          <Card className="overflow-hidden">
             <div className="bg-muted/30 px-5 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-orange-500" />
                    <h2 className="text-xs font-bold uppercase tracking-wide text-foreground">Today's Menu</h2>
                </div>
                <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded">Hostel B Mess</span>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-4 flex flex-col gap-2 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Sunrise className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold uppercase">Breakfast</span>
                    </div>
                    <p className="text-sm font-medium">Aloo Paratha, Curd, Tea</p>
                </div>
                <div className="p-4 flex flex-col gap-2 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Sun className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold uppercase">Lunch</span>
                    </div>
                    <p className="text-sm font-medium">Rice, Dal Tadka, Paneer Butter Masala</p>
                </div>
                <div className="p-4 flex flex-col gap-2 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Coffee className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold uppercase">Snacks</span>
                    </div>
                    <p className="text-sm font-medium">Samosa, Mint Chutney</p>
                </div>
                <div className="p-4 flex flex-col gap-2 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Moon className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold uppercase">Dinner</span>
                    </div>
                    <p className="text-sm font-medium">Roti, Mixed Veg, Kheer</p>
                </div>
             </div>
          </Card>
        </div>

        {/* Right Col: Status & Contacts */}
        <div className="space-y-4">
          {currentUser.hostel_status === 'APPROVED' ? (
             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Key className="w-20 h-20" /></div>
                    <div className="p-6 relative z-10">
                        <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">Room Allocated!</h3>
                        <p className="text-emerald-50 text-xs mb-5 font-medium opacity-90">Room B-304 has been assigned to you.</p>
                        <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 border-0 shadow-sm font-semibold">View Digital Key</Button>
                    </div>
                </Card>
             </motion.div>
          ) : (
            <Card className="border-l-4 border-l-yellow-500">
                <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-sm uppercase tracking-wide">{currentUser.hostel_status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        {currentUser.hostel_status === 'WAITLISTED' 
                            ? 'You are currently #4 on the waitlist. Improve your attendance to boost your score.' 
                            : 'Your application is under review.'}
                    </p>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 w-[70%] animate-pulse" />
                    </div>
                    <p className="text-xs text-right mt-1.5 text-muted-foreground font-medium">Processing Round 2...</p>
                </div>
            </Card>
          )}

          {/* Swap Market (Gamified) */}
          {currentUser.is_local_resident && currentUser.hostel_status === 'APPROVED' && (
             <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 relative overflow-hidden">
               <div className="p-5 relative z-10">
                   <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                       <Coins className="w-4 h-4" />
                       <h3 className="font-bold text-sm">Swap Opportunity</h3>
                   </div>
                   <p className="text-xs text-foreground/80 mb-4 leading-relaxed">
                     High demand from outstation students. Vacate your room to earn <span className="font-bold text-indigo-500">20 Campus Credits</span>?
                   </p>
                   <Button onClick={volunteerToVacate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20">
                       Volunteer & Earn
                   </Button>
               </div>
             </Card>
          )}

          {/* New: Important Contacts */}
          <Card className="p-4 bg-secondary/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                 <ShieldAlert className="w-3.5 h-3.5" /> Emergency
              </h3>
              <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-background border border-border rounded-md">
                      <div>
                          <p className="text-xs font-semibold">Chief Warden</p>
                          <p className="text-[10px] text-muted-foreground">Dr. S. Patil</p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Phone className="w-3.5 h-3.5 text-emerald-500" /></Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background border border-border rounded-md">
                      <div>
                          <p className="text-xs font-semibold">Ambulance</p>
                          <p className="text-[10px] text-muted-foreground">24x7 Campus</p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Phone className="w-3.5 h-3.5 text-red-500" /></Button>
                  </div>
              </div>
          </Card>
        </div>

      </div>
    </div>
  );
}