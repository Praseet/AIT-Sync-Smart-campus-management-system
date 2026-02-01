import React, { useState } from 'react';
import { Card, Button, Badge, Input } from '../components/ui/Primitives';
import { Search, Filter, Mail, GraduationCap, Linkedin, Coffee, ChevronDown, ChevronUp, Send, Check, X, Clock, Briefcase } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Alumni } from '../types';

export default function AlumniConnect() {
    const { alumniList } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{company: string | null, branch: string | null}>({ company: null, branch: null });
    const [filtersOpen, setFiltersOpen] = useState(true);
    const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
    const [requestCount, setRequestCount] = useState(3); // Simulating weekly limit

    // Filter Logic
    const filtered = alumniList.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              a.position.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompany = filters.company ? a.company === filters.company : true;
        const matchesBranch = filters.branch ? a.branch === filters.branch : true;
        return matchesSearch && matchesCompany && matchesBranch;
    });

    const uniqueCompanies = Array.from(new Set(alumniList.map(a => a.company))).slice(0, 8);
    const uniqueBranches = Array.from(new Set(alumniList.map(a => a.branch)));

    return (
        <div className="flex flex-col gap-6 h-full max-w-7xl mx-auto">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-border/40 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Alumni Network</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Connect with seniors for mentorship and referrals.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Weekly Requests</span>
                        <div className="flex items-center gap-1">
                             <div className={`h-2 w-2 rounded-full ${requestCount > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                             <span className="text-sm font-mono font-medium">{requestCount}/3 left</span>
                        </div>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <Input 
                            placeholder="Search by name, role..." 
                            className="pl-9 bg-background"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Filter Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                    <Card className="overflow-hidden bg-card/50 border-border/60">
                       <button 
                           onClick={() => setFiltersOpen(!filtersOpen)}
                           className="w-full p-4 flex items-center justify-between text-xs font-bold text-foreground uppercase tracking-wide hover:bg-secondary/50 transition-colors"
                       >
                           <span className="flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Filters</span>
                           {filtersOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                       </button>
                       <AnimatePresence>
                           {filtersOpen && (
                               <motion.div 
                                   initial={{ height: 0 }}
                                   animate={{ height: 'auto' }}
                                   exit={{ height: 0 }}
                                   className="overflow-hidden"
                               >
                                   <div className="p-4 pt-0 space-y-6 border-t border-border/50">
                                       
                                       {/* Branch Filter */}
                                       <div className="space-y-2 mt-4">
                                           <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Department</label>
                                           <div className="flex flex-wrap gap-1.5">
                                               {uniqueBranches.map(b => (
                                                   <button 
                                                      key={b}
                                                      onClick={() => setFilters({...filters, branch: filters.branch === b ? null : b})}
                                                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all border ${filters.branch === b ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border text-muted-foreground hover:border-primary/40'}`}
                                                   >
                                                       {b}
                                                   </button>
                                               ))}
                                           </div>
                                       </div>

                                       {/* Company Filter */}
                                       <div className="space-y-2">
                                           <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Organization</label>
                                           <div className="flex flex-col gap-1">
                                               {uniqueCompanies.map(c => (
                                                   <button 
                                                      key={c}
                                                      onClick={() => setFilters({...filters, company: filters.company === c ? null : c})}
                                                      className={`text-left px-2 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between group ${filters.company === c ? 'bg-secondary text-foreground font-semibold' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}
                                                   >
                                                       {c}
                                                       {filters.company === c && <Check className="w-3 h-3 text-primary" />}
                                                   </button>
                                               ))}
                                           </div>
                                       </div>

                                       <div className="pt-2">
                                          <Button variant="ghost" size="sm" className="w-full text-xs h-8" onClick={() => setFilters({company: null, branch: null})}>Clear All Filters</Button>
                                       </div>
                                   </div>
                               </motion.div>
                           )}
                       </AnimatePresence>
                    </Card>

                    {/* Quick Stats Widget */}
                    <Card className="p-5 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 bg-indigo-500/20 rounded-md text-indigo-500">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Placement</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                            Alumni working in <span className="font-semibold text-indigo-400">FAANG</span> companies are 3x more likely to respond on weekends.
                        </p>
                    </Card>
                </div>

                {/* Main List */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filtered.length === 0 ? (
                            <div className="col-span-2 py-12 text-center text-muted-foreground">
                                <div className="inline-flex p-4 rounded-full bg-secondary/50 mb-4">
                                    <Search className="w-6 h-6 opacity-40" />
                                </div>
                                <p>No alumni found matching your criteria.</p>
                                <Button variant="link" onClick={() => {setSearchQuery(''); setFilters({company: null, branch: null})}}>Clear Filters</Button>
                            </div>
                        ) : filtered.map(alum => (
                            <Card key={alum.id} className="p-0 hover:border-primary/40 transition-all duration-300 group overflow-hidden flex flex-col">
                                <div className="p-5 flex gap-4">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-secondary to-background flex items-center justify-center text-sm font-bold text-foreground border border-border group-hover:border-primary/50 transition-colors shadow-sm">
                                        {alum.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-foreground text-sm truncate">{alum.name}</h3>
                                            <a href="#" className="text-muted-foreground hover:text-blue-500 transition-colors" title="LinkedIn Profile"><Linkedin className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <p className="text-sm font-medium text-primary mt-0.5 truncate">{alum.position}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground truncate">{alum.company}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/40"></span>
                                            <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 rounded">{alum.graduating_year}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-auto px-5 py-3 bg-secondary/20 border-t border-border flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                                        <GraduationCap className="w-3.5 h-3.5 opacity-70" />
                                        <span>{alum.branch}</span>
                                    </div>
                                    <div>
                                       {alum.is_open_to_mentorship ? (
                                         <Button 
                                            size="sm" 
                                            variant="outline" 
                                            onClick={() => setSelectedAlumni(alum)}
                                            className="h-7 px-3 text-xs gap-1.5 bg-background hover:bg-emerald-500 hover:text-white border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm transition-all"
                                         >
                                            <Coffee className="w-3 h-3" /> Connect
                                         </Button>
                                       ) : (
                                         <Badge variant="secondary" className="h-7 bg-secondary/50 text-muted-foreground font-normal">
                                            <Clock className="w-3 h-3 mr-1" /> Busy
                                         </Badge>
                                       )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Connection Request Modal */}
            <AnimatePresence>
                {selectedAlumni && (
                    <DraftMessageModal 
                        alumni={selectedAlumni} 
                        onClose={() => setSelectedAlumni(null)} 
                        remainingCredits={requestCount}
                        onSend={() => setRequestCount(p => Math.max(0, p - 1))}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

function DraftMessageModal({ alumni, onClose, remainingCredits, onSend }: { alumni: Alumni, onClose: () => void, remainingCredits: number, onSend: () => void }) {
    const [step, setStep] = useState<'DRAFT' | 'SENT'>('DRAFT');
    const [topic, setTopic] = useState('Guidance');
    const [message, setMessage] = useState('');
    const isSendDisabled = message.length < 20 || remainingCredits === 0;

    const handleSend = () => {
        onSend();
        setStep('SENT');
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-card w-full max-w-lg rounded-xl border border-border shadow-2xl overflow-hidden"
            >
                {step === 'DRAFT' ? (
                    <>
                        <div className="p-5 border-b border-border bg-secondary/20 flex justify-between items-center">
                            <div>
                                <h2 className="text-sm font-bold text-foreground">Draft Request</h2>
                                <p className="text-xs text-muted-foreground">To: {alumni.name} ({alumni.company})</p>
                            </div>
                            <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            {remainingCredits === 0 && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-xs flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> You have reached your weekly connection limit (3/3).
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Topic</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Career Guidance', 'Resume Review', 'Referral'].map(t => (
                                        <button 
                                            key={t}
                                            onClick={() => setTopic(t)}
                                            className={`px-3 py-2 rounded-md text-xs font-medium border transition-colors ${topic === t ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border text-muted-foreground hover:border-primary/30'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</label>
                                <textarea 
                                    className="w-full h-32 rounded-md bg-secondary/30 border border-input p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-muted-foreground/50"
                                    placeholder={`Hi ${alumni.name.split(' ')[0]}, I am a student at AIT interested in your work at ${alumni.company}...`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className="flex justify-between text-[10px] text-muted-foreground">
                                    <span>Be professional and concise.</span>
                                    <span className={message.length < 20 ? 'text-orange-500' : 'text-emerald-500'}>{message.length} chars</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-border bg-secondary/10 flex justify-between items-center">
                            <span className="text-xs text-muted-foreground font-medium">
                                Credits remaining: <span className={remainingCredits > 0 ? 'text-foreground' : 'text-red-500'}>{remainingCredits}</span>
                            </span>
                            <div className="flex gap-3">
                                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                                <Button onClick={handleSend} disabled={isSendDisabled} className="gap-2">
                                    <Send className="w-3.5 h-3.5" /> Send Request
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 text-emerald-500">
                            <Check className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">Request Sent!</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Your request has been forwarded to {alumni.name}. You will be notified via email if they accept.
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}