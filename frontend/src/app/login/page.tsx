"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAegisStore } from "@/stores/useAegisStore";
import { Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const login = useAegisStore((state) => state.login);
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("Operations Commander");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsAuthenticating(true);
    
    // Simulate standard authentication delay
    setTimeout(() => {
      login({
        name,
        role,
        email: `${name.toLowerCase().replace(/\s/g, '.')}@aegis.local`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=000000`,
      });
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      
      {/* Subtle Premium Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-status-ai/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        <div className="flex flex-col items-center mb-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center shadow-xl">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sign in to AegisOS
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to the command center
          </p>
        </div>

        <Card className="premium-card relative overflow-hidden">
          {isAuthenticating && (
            <div className="absolute inset-0 z-50 bg-card/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-medium text-foreground tracking-tight">Authenticating...</p>
            </div>
          )}
          
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-xl px-4 py-2.5 text-sm text-foreground transition-all duration-300 shadow-sm outline-none"
                  placeholder="e.g. Alex Chen"
                  required
                  disabled={isAuthenticating}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Security Clearance
                </label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-xl px-4 py-2.5 text-sm text-foreground transition-all duration-300 shadow-sm outline-none appearance-none"
                  disabled={isAuthenticating}
                >
                  <option value="Operations Commander">Operations Commander</option>
                  <option value="Security Auditor">Security Auditor</option>
                  <option value="AI Overseer">AI Overseer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-medium transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:-translate-y-0.5 flex items-center justify-center group mt-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}

