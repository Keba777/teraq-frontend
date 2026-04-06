"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Play, 
  SkipForward, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  QrCode
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Session Status Header */}
      <section className="flex flex-col lg:flex-row gap-8 items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">
            <span className="flex h-2 w-2 rounded-full bg-tertiary shadow-[0_0_8px_#98da27]" />
            Session Live
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tighter">
            General Support <span className="text-foreground/20">Queue</span>
          </h1>
          <p className="text-foreground/40 text-sm">
            Current Session ID: <code className="text-primary/60">Q-882-990-1</code>
          </p>
        </div>

        <div className="flex gap-4">
          <button className="glass px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold hover:bg-surface-high transition-all group">
            <QrCode className="w-4 h-4 text-foreground/40 group-hover:text-tertiary" />
            Share Join Link
          </button>
          <button className="bg-foreground text-background px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold hover:bg-tertiary hover:text-black transition-all group">
            <ExternalLink className="w-4 h-4" />
            Public View
          </button>
        </div>
      </section>

      {/* Main Control Terminal */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Ticket Card */}
        <div className="lg:col-span-2 ticket-stub glass p-10 bg-surface-low/30 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tertiary/20 to-transparent" />
          
          <div className="text-center space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30">
              Now Serving
            </p>
            <motion.h2 
              className="text-[12rem] font-display font-bold leading-none tracking-tighter text-tertiary drop-shadow-glow"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              042
            </motion.h2>
            <p className="text-xl font-bold tracking-tight text-foreground/60">
              Abebe Bikila
            </p>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <button className="px-8 py-4 rounded-2xl border-0 bg-surface-high font-bold text-sm tracking-wide hover:bg-error/10 hover:text-error transition-all group flex items-center gap-3">
              <SkipForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Skip
            </button>
            <button className="px-10 py-5 rounded-2xl border-0 bg-tertiary font-bold text-black text-lg tracking-tight hover:scale-105 transition-all shadow-glow flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6" />
              Serve Next
            </button>
          </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30">
              Queue Insight
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm text-foreground/60">Waiting</span>
                <span className="text-2xl font-display font-bold">14</span>
              </div>
              <div className="w-full h-1 bg-surface-high rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-tertiary rounded-full" />
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm text-foreground/60">Est. Wait Time</span>
                <span className="text-2xl font-display font-bold">12m</span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl flex items-center gap-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">Session Trend</p>
              <p className="text-[10px] text-foreground/40 tracking-wider">UP 12% SINCE START</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waiting List Section */}
      <section className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30 ml-2">
          Waiting List (Live)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[43, 44, 45, 46, 47].map((num) => (
            <motion.div 
              key={num}
              whileHover={{ scale: 1.02 }}
              className="glass p-6 rounded-3xl flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-high flex items-center justify-center font-display font-bold text-lg group-hover:text-tertiary transition-colors">
                  {num}
                </div>
                <div>
                  <p className="text-sm font-bold">Anonymous Operator</p>
                  <p className="text-[10px] text-foreground/30">Joined 4m ago</p>
                </div>
              </div>
              <div className="text-[10px] font-bold text-foreground/20 group-hover:text-foreground/50 transition-colors uppercase tracking-widest">
                Waiting
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
