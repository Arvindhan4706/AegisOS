"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAegisStore } from "@/stores/useAegisStore";
import {
  LayoutDashboard,
  Users,
  Target,
  Network,
  BrainCircuit,
  Wrench,
  ShieldAlert,
  CheckSquare,
  History,
  PlaySquare,
  BarChart3,
  Settings,
  Activity,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents", href: "/agents", icon: Users },
  { name: "Missions", href: "/missions", icon: Target },
  { name: "Orchestrator", href: "/orchestrator", icon: Network },
  { name: "Memory", href: "/memory", icon: BrainCircuit },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Security", href: "/security", icon: ShieldAlert },
  { name: "Approvals", href: "/approvals", icon: CheckSquare },
  { name: "Audit Trail", href: "/audit", icon: History },
  { name: "Mission Replay", href: "/replay", icon: PlaySquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const currentUser = useAegisStore((state) => state.currentUser);
  const logout = useAegisStore((state) => state.logout);

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card/50 glass-panel">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Activity className="h-6 w-6 text-primary mr-3" />
        <span className="font-heading text-xl font-bold tracking-wider text-primary shadow-primary/20 drop-shadow-md">
          AEGIS<span className="text-foreground">OS</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.1)]"
                    : "text-muted-foreground hover:bg-card hover:text-foreground border border-transparent"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-border p-4 bg-background/50 space-y-4">
        {/* System Status Compact */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span>Sys: <span className="text-status-healthy">OK</span></span>
          <span>Net: <span className="text-status-healthy">99%</span></span>
          <span className="text-[10px] bg-primary/10 text-primary border border-primary/30 px-1 rounded">SIM</span>
        </div>

        {/* User Profile */}
        {currentUser && (
          <div className="flex flex-col bg-card border border-border/50 rounded-lg p-3">
            <div className="flex items-center space-x-3 mb-3">
              <img src={currentUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-muted border border-border/50" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.role}</p>
              </div>
            </div>
            <button 
              onClick={() => logout()}
              className="w-full flex items-center justify-center space-x-2 text-xs font-medium text-status-critical/80 hover:text-status-critical bg-status-critical/10 hover:bg-status-critical/20 border border-status-critical/20 py-1.5 rounded transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
