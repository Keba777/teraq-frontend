"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Store,
  Zap,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Live Hub", href: "/dashboard" },
  { icon: Users, label: "Queues", href: "/dashboard/queues" },
  { icon: Bell, label: "Alerts", href: "/dashboard/alerts" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background text-foreground selection:bg-tertiary selection:text-black">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r-0 bg-surface-low p-6 flex flex-col items-center">
        <div className="w-full mb-12 flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-tertiary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">
            ቴራ<span className="text-tertiary">Q</span>
          </span>
        </div>

        <nav className="flex-1 w-full space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                  isActive 
                    ? "bg-surface-high font-bold text-tertiary shadow-glow" 
                    : "text-foreground/40 hover:bg-surface-high hover:text-foreground/80"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-tertiary" : "text-foreground/20 group-hover:text-foreground/60"}`} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="w-full pt-6 space-y-4">
          <div className="px-4 py-4 rounded-3xl bg-surface-high/50 border-0 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
              KB
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Operator X</p>
              <p className="text-[10px] text-foreground/30 truncate">Active Node</p>
            </div>
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 text-foreground/40 hover:text-error transition-colors text-sm group">
            <LogOut className="w-5 h-5 text-foreground/20 group-hover:text-error/60" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-10 relative z-20">
          <div className="flex items-center gap-4">
            <Store className="w-4 h-4 text-foreground/30" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-foreground/60">
              Tech Solutions HQ
            </h2>
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground/40">
              <span className="w-2 h-2 rounded-full bg-primary" />
              API Status: Nominal
            </div>
            <div className="h-6 w-px bg-surface-high" />
            <span className="text-xs text-foreground/60 font-mono">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-10 relative z-10">
          {children}
        </div>

        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />
      </main>
    </div>
  );
}
