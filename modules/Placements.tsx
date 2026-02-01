import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui/Primitives';
import { Briefcase, Building, MapPin, DollarSign, TrendingUp, Calendar, ArrowUpRight, Lock, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function Placements() {
  const { jobList } = useStore();
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const currentJob = jobList.find(j => j.id === selectedJob);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Placement Cell</h1>
          <p className="text-sm text-muted-foreground mt-1">Track opportunities, stats, and recruitment drives.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-500">
                  <Briefcase className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Placement Rate</p>
                  <p className="text-2xl font-bold text-foreground">84%</p>
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
               <TrendingUp className="w-3 h-3" />
               <span>+5% from last year</span>
            </div>
         </Card>

         <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border-indigo-500/20">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-500">
                  <DollarSign className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg Package</p>
                  <p className="text-2xl font-bold text-foreground">₹12.5 LPA</p>
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-indigo-600 font-medium">
               <ArrowUpRight className="w-3 h-3" />
               <span>Highest: ₹52 LPA</span>
            </div>
         </Card>

         <Card className="p-6 bg-secondary/30 border-border/60">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-secondary rounded-full text-foreground">
                  <Building className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visiting Companies</p>
                  <p className="text-2xl font-bold text-foreground">42</p>
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
               <Calendar className="w-3 h-3" />
               <span>Next Drive: 24th Oct</span>
            </div>
         </Card>
      </div>

      {/* Opportunities List */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
           <Briefcase className="w-4 h-4 text-primary" /> Active Opportunities
        </h2>
        <div className="grid gap-4">
          {jobList.map((job) => (
             <Card key={job.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary/40 transition-colors group">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl font-bold text-black border border-gray-200 shadow-sm">
                      {job.logo}
                   </div>
                   <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{job.role}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground/80">
                         <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded"><MapPin className="w-3 h-3" /> {job.location}</span>
                         <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded"><DollarSign className="w-3 h-3" /> {job.pkg}</span>
                         <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded">{job.type}</span>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-3 min-w-[160px]">
                   {job.deadline === "Closed" ? (
                      <Badge variant="secondary" className="px-3 py-1">Applications Closed</Badge>
                   ) : (
                      <Button variant="outline" className="w-full gap-2" onClick={() => setSelectedJob(job.id)}>
                         <Lock className="w-3 h-3" /> View Criteria
                      </Button>
                   )}
                   <p className="text-xs text-muted-foreground font-medium">{job.deadline}</p>
                </div>
             </Card>
          ))}
        </div>
      </div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && currentJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-card w-full max-w-md rounded-xl border border-border shadow-2xl overflow-hidden"
             >
                <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/20">
                   <span className="font-semibold text-sm">Opportunity Details</span>
                   <button onClick={() => setSelectedJob(null)}><X className="w-5 h-5 text-muted-foreground hover:text-foreground" /></button>
                </div>
                <div className="p-6 space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl font-bold text-black border border-gray-200">
                         {currentJob.logo}
                      </div>
                      <div>
                         <h3 className="font-bold text-lg">{currentJob.role}</h3>
                         <p className="text-sm text-muted-foreground">{currentJob.company}</p>
                      </div>
                   </div>
                   
                   <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">Strict Eligibility</h4>
                      <p className="text-sm text-foreground">{currentJob.eligibility}</p>
                   </div>

                   <p className="text-sm text-muted-foreground leading-relaxed">
                      Applicants must meet the strict eligibility criteria. 
                      Shortlisted candidates will receive an email for the coding round.
                      Please apply on the company portal using your college email ID.
                   </p>
                   
                   <Button className="w-full gap-2">
                      <ExternalLink className="w-4 h-4" /> Visit Company Portal
                   </Button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}