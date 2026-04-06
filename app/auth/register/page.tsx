"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Lock, Mail, Sparkles, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(fullName, email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background selection:bg-tertiary selection:text-black">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-tertiary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link 
          href="/auth/login" 
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-tertiary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Operator Login
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold tracking-tighter mb-2">
            Establish <span className="text-tertiary">Node</span>
          </h1>
          <p className="text-foreground/50 text-sm font-sans">
            Provision a new kinetic queue operator account.
          </p>
        </div>

        <div className="glass p-8 rounded-3xl shadow-glow relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                Full Legal Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-tertiary transition-colors" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface-low/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-tertiary/20 placeholder:text-foreground/10 outline-none transition-all"
                  placeholder="Abebe Bikila"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                Operational Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-tertiary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-low/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-tertiary/20 placeholder:text-foreground/10 outline-none transition-all"
                  placeholder="operator@system.io"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                Security Secret
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-tertiary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-low/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-tertiary/20 placeholder:text-foreground/10 outline-none transition-all"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-foreground text-background font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group hover:bg-tertiary hover:text-black transition-all duration-300 active:scale-[0.98]"
            >
              Initialize Operator
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-[10px] text-foreground/20 font-bold uppercase tracking-[0.3em]">
          Protocol v1.0.4 Built for Kinetic Businesses
        </p>
      </motion.div>
    </main>
  );
}
