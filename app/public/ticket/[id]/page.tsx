"use client";

import { motion } from "framer-motion";
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Share2
} from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useQueueEvents } from "@/hooks/use-queue-events";

export default function TicketStatusPage({ params }: { params: { id: string } }) {
  const [queueId, setQueueId] = useState<string | undefined>("some-queue-uuid"); // Fetched from ticket data
  const [ticketStatus, setTicketStatus] = useState("waiting");

  const handleQueueEvent = useCallback((event: any) => {
    if (event.type === "TicketCalled" && event.data.ticket_id === params.id) {
       setTicketStatus("called");
    }
    if (event.type === "TicketUpdated" && event.data.ticket_id === params.id) {
       setTicketStatus(event.data.status);
    }
  }, [params.id]);

  useQueueEvents(queueId, handleQueueEvent);

  return (
    <main className="min-h-screen bg-background p-6 flex flex-col items-center justify-center font-sans tracking-tight">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-tertiary/5 blur-[120px] rounded-full -translate-x-1/2" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg space-y-8 relative z-10"
      >
        <div className="flex justify-between items-center px-4">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 hover:text-foreground/60 transition-colors">
            Exit Session
          </Link>
          <button className="text-foreground/30 hover:text-tertiary transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="glass p-10 rounded-[50px] space-y-10 text-center relative overflow-hidden">
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 ${
              ticketStatus === 'called' 
              ? "bg-tertiary text-black animate-bounce" 
              : "bg-surface-high text-foreground/40"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${ticketStatus === 'called' ? 'bg-black' : 'bg-primary'}`} />
              {ticketStatus === 'called' ? "Proceed Now" : "Currently Waiting"}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/20">Your Ticket</p>
            <h1 className="text-[10rem] font-display font-bold leading-none tracking-tighter text-foreground drop-shadow-glow">
              045
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-low/50 p-6 rounded-3xl space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">People Ahead</p>
              <p className="text-3xl font-display font-bold text-primary">2</p>
            </div>
            <div className="bg-surface-low/50 p-6 rounded-3xl space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Now Serving</p>
              <p className="text-3xl font-display font-bold text-tertiary">042</p>
            </div>
          </div>

          <div className="pt-4">
             <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-surface-high/30 border-0 group">
               <Clock className="w-5 h-5 text-foreground/20 group-hover:text-tertiary transition-colors" />
               <p className="text-xs font-medium text-foreground/60">
                 Estimated wait: <span className="text-foreground font-bold">~6 mins</span>
               </p>
             </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">
            Tech Solutions HQ | Protocol v1.0
          </p>
          
          <div className="flex justify-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-surface-high" />
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#98da27]" />
            <div className="w-1.5 h-1.5 rounded-full bg-surface-high" />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
