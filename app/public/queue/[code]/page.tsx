"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Users, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PublicQueuePage({ params }: { params: { code: string } }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Join logic
  };

  return (
    <main className="min-h-screen bg-background p-6 flex items-center justify-center font-sans tracking-tight">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tertiary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 bg-surface-low rounded-3xl flex items-center justify-center shadow-glow border-0">
               <Users className="w-8 h-8 text-tertiary" />
             </div>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tighter">
            General Support <span className="text-foreground/20">Queue</span>
          </h1>
          <p className="text-foreground/60 font-medium">Tech Solutions HQ</p>
        </div>

        <div className="glass p-8 rounded-[40px] space-y-8 relative overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-low/50 p-6 rounded-3xl text-center space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 leading-none">WAITING</p>
              <p className="text-3xl font-display font-bold text-tertiary">14</p>
            </div>
            <div className="bg-surface-low/50 p-6 rounded-3xl text-center space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 leading-none">TIME</p>
              <p className="text-3xl font-display font-bold">12m</p>
            </div>
          </div>

          <form onSubmit={handleJoin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 ml-2">Display Name (Required)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-low/80 border-0 rounded-2xl py-5 px-6 font-bold text-lg focus:ring-2 focus:ring-tertiary/20 placeholder:text-foreground/10 outline-none transition-all"
                  placeholder="e.g. Abebe B."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 ml-2">Phone Number (Notify me)</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-surface-low/80 border-0 rounded-2xl py-5 px-6 font-bold text-lg focus:ring-2 focus:ring-tertiary/20 placeholder:text-foreground/10 outline-none transition-all"
                  placeholder="+251 ..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-tertiary text-black font-bold py-6 rounded-3xl text-xl hover:scale-[1.02] transition-all shadow-glow flex items-center justify-center gap-3 active:scale-95 duration-200"
            >
              Join Queue
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          <p className="text-center text-[10px] text-foreground/20 font-bold uppercase tracking-widest">
            Protocol secured by ቴራQ Kinetic
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center text-foreground/30 bg-surface-low/30 py-4 px-6 rounded-2xl">
          <AlertCircle className="w-4 h-4" />
          <p className="text-xs">Your data is only stored for this active session.</p>
        </div>
      </motion.div>
    </main>
  );
}
