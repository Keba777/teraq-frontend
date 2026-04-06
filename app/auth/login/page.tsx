"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-12 text-center">
          <motion.h1 
            className="text-5xl font-display font-bold tracking-tighter mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            ቴራ<span className="text-tertiary">Q</span>
          </motion.h1>
          <p className="text-foreground/50 font-sans tracking-wide uppercase text-xs">
            Kinetic Queue Interface v1.0
          </p>
        </div>

        <div className="glass p-8 rounded-3xl shadow-glow relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                Operator Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-tertiary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-low/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-tertiary/20 placeholder:text-foreground/10 outline-none transition-all"
                  placeholder="name@business.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                Access Secret
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-tertiary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-low/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-tertiary/20 placeholder:text-foreground/10 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-foreground text-background font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group hover:bg-tertiary hover:text-black transition-all duration-300 active:scale-[0.98]"
            >
              Authorize Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-foreground/30">
            New operator?{" "}
            <Link 
              href="/auth/register" 
              className="text-foreground/80 hover:text-tertiary transition-colors font-medium underline underline-offset-4 decoration-white/10 hover:decoration-tertiary"
            >
              Request Access
            </Link>
          </p>
          
          <Link 
            href="/" 
            className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 hover:text-foreground/50 transition-colors"
          >
            System Diagnostics
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
