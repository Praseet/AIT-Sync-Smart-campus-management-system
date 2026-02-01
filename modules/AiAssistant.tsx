import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Badge } from '../components/ui/Primitives';
import { Send, Bot, User, Sparkles, Database, FileText, X, Cpu, Search, ArrowRight, Zap, TrendingUp, HelpCircle, GraduationCap, Building, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, SearchResult } from '../types';
import { searchKnowledgeBase, generateBotResponse } from '../lib/mockVectorDb';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function AiAssistant() {
  const { currentUser } = useStore();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi ${currentUser.name.split(' ')[0]}! I'm your AI Campus Assistant. I can help with hostel rules, placement criteria, faculty schedules, and more. What's on your mind?`,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'searching' | 'reasoning' | 'typing'>('idle');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStep]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    // 1. Vector Search Step
    setCurrentStep('searching');
    const sources = await searchKnowledgeBase(userMsg.content);
    
    // 2. Reasoning Step
    setCurrentStep('reasoning');
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate "Thinking"
    
    // 3. Generation Step
    setCurrentStep('typing');
    const responseText = await generateBotResponse(userMsg.content, sources);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
      sources: sources
    };

    setMessages(prev => [...prev, botMsg]);
    setIsProcessing(false);
    setCurrentStep('idle');
  };

  const SUGGESTIONS = [
      "What is the eligibility for Google placements?",
      "How is the hostel merit score calculated?",
      "Is Dr. Rajesh Kumar available right now?",
      "What is the menu for dinner in Hostel B?",
      "Procedure to apply for sick leave?"
  ];

  return (
    <div className="h-[calc(100vh-8rem)] max-w-7xl mx-auto flex gap-6 overflow-hidden">
      
      {/* Left Pane: Chat Interface */}
      <Card className="flex-1 flex flex-col overflow-hidden border-border/60 shadow-xl bg-background/50 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="p-4 border-b border-border/40 flex justify-between items-center bg-secondary/20">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                    <Bot className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-foreground">AIT Sync AI</h2>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Online • RAG Enabled</p>
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMessages([])} title="Clear Chat">
                <X className="w-4 h-4 text-muted-foreground" />
            </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {messages.map((msg) => (
                <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1 ${
                        msg.role === 'user' 
                        ? 'bg-secondary text-foreground' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[80%] space-y-2`}>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user'
                            ? 'bg-secondary text-foreground rounded-tr-sm'
                            : 'bg-card border border-border text-foreground rounded-tl-sm shadow-sm'
                        }`}>
                            {msg.content}
                        </div>
                        {/* Source citations for assistant */}
                        {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {msg.sources.slice(0, 2).map((src, idx) => (
                                    <Badge key={idx} variant="outline" className="text-[10px] bg-background/50 text-muted-foreground gap-1 hover:bg-secondary transition-colors max-w-[200px] truncate">
                                        <Database className="w-3 h-3 flex-shrink-0" /> {src.source}
                                    </Badge>
                                ))}
                                <span className="text-[10px] text-muted-foreground pt-1 ml-auto">{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}

            {/* Processing States */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="p-3 rounded-2xl bg-card border border-border text-xs font-mono text-muted-foreground flex items-center gap-3">
                            {currentStep === 'searching' && (
                                <>
                                    <Search className="w-3 h-3 animate-spin" /> 
                                    <span>Searching vector database...</span>
                                </>
                            )}
                            {currentStep === 'reasoning' && (
                                <>
                                    <Cpu className="w-3 h-3 animate-pulse text-amber-500" />
                                    <span>Analyzing context chunks...</span>
                                </>
                            )}
                             {currentStep === 'typing' && (
                                <>
                                    <span className="flex gap-1">
                                        <span className="w-1 h-1 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1 h-1 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1 h-1 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </span>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/40 bg-background/50">
            <div className="relative flex items-center gap-2">
                <Input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask anything (e.g., 'What is the placement criteria?')"
                    className="pr-12 h-12 bg-secondary/50 border-transparent focus:border-primary/50 text-base"
                    disabled={isProcessing}
                />
                <Button 
                    size="icon" 
                    className="absolute right-1.5 h-9 w-9" 
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isProcessing}
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-60">AI can make mistakes. Check official documents.</p>
        </div>
      </Card>

      {/* Right Pane: Suggestions & Shortcuts */}
      <div className="hidden lg:flex w-80 flex-col gap-4">
          
          {/* Section 1: Suggested Queries */}
          <Card className="flex flex-col p-4 space-y-4 border-border/60 bg-secondary/10">
              <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/10 rounded-md text-indigo-500">
                      <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Suggested</h3>
              </div>
              <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((query, idx) => (
                      <button
                         key={idx}
                         onClick={() => handleSendMessage(query)}
                         className="text-left text-xs p-2.5 rounded-lg bg-card border border-border/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-start gap-2 group"
                      >
                         <span className="mt-0.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                            <ArrowRight className="w-3 h-3" />
                         </span>
                         <span className="leading-tight">{query}</span>
                      </button>
                  ))}
              </div>
          </Card>

          {/* Section 2: Quick Navigation */}
          <Card className="flex flex-col p-4 space-y-4 border-border/60 bg-secondary/10">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-500/10 rounded-md text-emerald-500">
                      <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shortcuts</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2 text-xs border-dashed" onClick={() => navigate('/faculty')}>
                      <User className="w-5 h-5 text-indigo-500" /> Faculty
                  </Button>
                  <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2 text-xs border-dashed" onClick={() => navigate('/hostel')}>
                      <Building className="w-5 h-5 text-emerald-500" /> Hostel
                  </Button>
                  <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2 text-xs border-dashed" onClick={() => navigate('/placements')}>
                      <GraduationCap className="w-5 h-5 text-amber-500" /> Jobs
                  </Button>
                   <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2 text-xs border-dashed" onClick={() => navigate('/maintenance')}>
                      <Wrench className="w-5 h-5 text-red-500" /> Issues
                  </Button>
              </div>
          </Card>

          {/* Section 3: Trending Topics (Static Social Proof) */}
          <Card className="flex-1 flex flex-col p-4 space-y-4 border-border/60 bg-secondary/10">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-500/10 rounded-md text-red-500">
                      <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Trending Now</h3>
              </div>
              <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs group cursor-pointer">
                      <span className="text-foreground group-hover:text-primary transition-colors">#Hackathon2024</span>
                      <span className="text-muted-foreground">245 queries</span>
                  </div>
                  <div className="flex items-center justify-between text-xs group cursor-pointer">
                      <span className="text-foreground group-hover:text-primary transition-colors">#WifiIssues</span>
                      <span className="text-muted-foreground">112 queries</span>
                  </div>
                   <div className="flex items-center justify-between text-xs group cursor-pointer">
                      <span className="text-foreground group-hover:text-primary transition-colors">#GuestLecture</span>
                      <span className="text-muted-foreground">89 queries</span>
                  </div>
              </div>
          </Card>

      </div>

    </div>
  );
}