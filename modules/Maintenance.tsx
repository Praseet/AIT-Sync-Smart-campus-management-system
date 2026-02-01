import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../components/ui/Primitives';
import { useStore } from '../store/useStore';
import { TicketCategory, TicketStatus } from '../types';
import { Zap, Droplets, Hammer, Wifi, Check, Upload, ChevronRight, ChevronLeft, Activity, Plus, History, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories: { id: TicketCategory, label: string, icon: any }[] = [
  { id: 'ELECTRIC', label: 'Electrical', icon: Zap },
  { id: 'PLUMBING', label: 'Plumbing', icon: Droplets },
  { id: 'CARPENTRY', label: 'Carpentry', icon: Hammer },
  { id: 'WIFI', label: 'Internet/Wifi', icon: Wifi },
];

const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
        case 'REPORTED': return <Badge variant="secondary">Reported</Badge>;
        case 'ASSIGNED': return <Badge variant="outline" className="border-blue-500 text-blue-500">Assigned</Badge>;
        case 'IN_PROGRESS': return <Badge className="bg-amber-500 text-white hover:bg-amber-600">Work In Progress</Badge>;
        case 'VERIFICATION': return <Badge className="bg-purple-500 text-white hover:bg-purple-600">Verify Fix</Badge>;
        case 'CLOSED': return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Closed</Badge>;
    }
}

export default function Maintenance() {
  const { addTicket, tickets, voteTicket } = useStore();
  const [activeTab, setActiveTab] = useState<'NEW' | 'HISTORY'>('HISTORY'); // Default to History to show voting features
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '' as TicketCategory | '',
    description: '',
    image: null as File | null
  });

  const handleNext = () => setStep(p => p + 1);
  const handleBack = () => setStep(p => p - 1);
  
  const handleSubmit = () => {
    if (!formData.category) return;
    
    addTicket({
      id: Math.random().toString(),
      category: formData.category,
      description: formData.description,
      status: 'REPORTED',
      severity: 'MEDIUM',
      created_at: new Date().toISOString(),
      upvotes: 0,
      user_vote: null
    });
    setStep(4);
  };

  const resetForm = () => {
      setStep(1);
      setFormData({ category: '', description: '', image: null });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Facilities Support</h1>
          <p className="text-sm text-muted-foreground mt-1">Report issues and track maintenance requests.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-secondary/50 rounded-lg border border-border/50">
            <button 
                onClick={() => setActiveTab('NEW')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'NEW' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <Plus className="w-4 h-4" /> New Request
            </button>
            <button 
                onClick={() => setActiveTab('HISTORY')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'HISTORY' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <History className="w-4 h-4" /> Community Issues
                {tickets.length > 0 && <span className="bg-primary/20 text-primary text-[10px] px-1.5 rounded-full">{tickets.length}</span>}
            </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
      {activeTab === 'NEW' ? (
        <motion.div
           key="new-ticket"
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.2 }}
           className="max-w-2xl mx-auto"
        >
          {/* Progress Indicators */}
          {step < 4 && (
             <div className="flex justify-between items-center px-12 mb-8">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= i ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground'}`}>
                        {i}
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{i === 1 ? 'Category' : i === 2 ? 'Details' : 'Upload'}</span>
                 </div>
               ))}
             </div>
          )}

          <Card className="min-h-[400px] flex flex-col relative overflow-hidden bg-card border-border/60 shadow-lg">
            <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {/* Step 1: Category */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 p-8"
                >
                  <h2 className="text-lg font-semibold text-foreground text-center mb-6">What type of issue is it?</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 group ${
                          formData.category === cat.id 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/50 hover:bg-secondary/60 hover:text-foreground'
                        }`}
                      >
                        <cat.icon className={`w-8 h-8 mb-3 transition-transform duration-200 ${formData.category === cat.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span className="text-sm font-semibold">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Description */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 p-8"
                >
                  <h2 className="text-lg font-semibold text-foreground text-center mb-6">Describe the problem</h2>
                  <textarea
                    className="w-full h-40 rounded-xl bg-secondary/30 border border-input p-4 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    placeholder="E.g., The fan in Room 302 makes a loud noise..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    autoFocus
                  />
                </motion.div>
              )}

              {/* Step 3: Upload */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 p-8 flex flex-col items-center"
                >
                  <h2 className="text-lg font-semibold text-foreground text-center mb-6">Add a photo (Optional)</h2>
                  <div className="w-full h-40 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer group bg-secondary/10">
                     <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                     <p className="text-muted-foreground text-xs font-medium">Click to upload or drag and drop</p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-8"
                >
                   <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 mb-4 animate-in zoom-in spin-in-12 duration-500">
                      <Check className="w-8 h-8 text-emerald-500" />
                   </div>
                   <h2 className="text-xl font-bold text-foreground">Ticket Created Successfully!</h2>
                   <p className="text-muted-foreground text-sm mt-2 mb-6">Your request has been routed to the maintenance team.</p>
                   <div className="flex gap-3">
                       <Button onClick={resetForm} variant="outline">Report Another</Button>
                       <Button onClick={() => setActiveTab('HISTORY')}>View Status</Button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            {step < 4 && (
                <div className="p-6 border-t border-border/50 bg-muted/20 flex justify-between">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1} className="w-24">
                        {step > 1 && <><ChevronLeft className="w-4 h-4 mr-2" /> Back</>}
                    </Button>
                    <Button onClick={step === 3 ? handleSubmit : handleNext} disabled={step === 1 && !formData.category || step === 2 && !formData.description} className="w-32 bg-primary text-primary-foreground hover:bg-primary/90">
                        {step === 3 ? 'Submit' : 'Next'} <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
          </Card>
        </motion.div>
      ) : (
        <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
             {tickets.length === 0 ? (
                 <Card className="p-12 flex flex-col items-center justify-center text-center">
                     <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                         <Activity className="w-6 h-6 text-muted-foreground" />
                     </div>
                     <h3 className="text-lg font-medium text-foreground">No active tickets</h3>
                     <p className="text-sm text-muted-foreground mt-1 max-w-sm">You haven't reported any issues yet. Use the "New Request" tab to get started.</p>
                 </Card>
             ) : (
                 <div className="grid gap-4">
                     {tickets.sort((a,b) => b.upvotes - a.upvotes).map(t => (
                        <Card key={t.id} className="flex flex-row overflow-hidden hover:border-primary/30 transition-colors group">
                           {/* Vote Column */}
                           <div className="w-12 bg-secondary/30 border-r border-border/40 flex flex-col items-center justify-start py-4 gap-1 flex-shrink-0">
                                <button 
                                    onClick={() => voteTicket(t.id, 'UP')}
                                    className={`p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${t.user_vote === 'UP' ? 'text-orange-500' : 'text-muted-foreground hover:text-orange-500/70'}`}
                                >
                                    <ArrowBigUp className={`w-7 h-7 ${t.user_vote === 'UP' ? 'fill-current' : ''}`} />
                                </button>
                                
                                <span className={`text-xs font-bold ${t.user_vote === 'UP' ? 'text-orange-500' : t.user_vote === 'DOWN' ? 'text-blue-500' : 'text-foreground'}`}>
                                    {t.upvotes}
                                </span>
                                
                                <button 
                                     onClick={() => voteTicket(t.id, 'DOWN')}
                                     className={`p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${t.user_vote === 'DOWN' ? 'text-blue-500' : 'text-muted-foreground hover:text-blue-500/70'}`}
                                >
                                    <ArrowBigDown className={`w-7 h-7 ${t.user_vote === 'DOWN' ? 'fill-current' : ''}`} />
                                </button>
                           </div>

                           {/* Content Column */}
                           <div className="flex-1 p-5 flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                        <div className="p-3 rounded-xl bg-secondary/50 border border-border group-hover:border-primary/20 transition-colors">
                                            {categories.find(c => c.id === t.category)?.icon && React.createElement(categories.find(c => c.id === t.category)!.icon, { className: "w-5 h-5 text-foreground" })}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-sm text-foreground">{categories.find(c => c.id === t.category)?.label}</span>
                                                <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary/50 font-mono">#{t.id.slice(0, 5)}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                                            <p className="text-xs text-muted-foreground/60 mt-1.5">{new Date(t.created_at).toLocaleDateString()} at {new Date(t.created_at).toLocaleTimeString()}</p>
                                        </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 pl-4">
                                        {getStatusBadge(t.status)}
                                        {t.status === 'VERIFICATION' && (
                                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white h-7 text-xs animate-pulse">Confirm Fix</Button>
                                        )}
                                </div>
                           </div>
                        </Card>
                     ))}
                 </div>
             )}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}