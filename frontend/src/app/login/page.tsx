"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAegisStore } from "@/stores/useAegisStore";
import { Activity, ShieldCheck, Fingerprint, Lock, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const login = useAegisStore((state) => state.login);
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("Operations Commander");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsAuthenticating(true);
    
    // Simulate biometric/terminal authentication animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        clearInterval(interval);
        setAuthProgress(100);
        
        setTimeout(() => {
          login({
            name,
            role,
            email: `${name.toLowerCase().replace(/\s/g, '.')}@aegis.local`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          });
          router.push('/dashboard');
        }, 500);
      } else {
        setAuthProgress(progress);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-status-ai/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5" />

      {/* Main Login Card */}
      <Card className="w-full max-w-md glass-panel border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)] relative z-10 backdrop-blur-xl">
        <CardContent className="p-8">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-card border border-primary/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
              <Activity className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-wider text-primary shadow-primary/20 drop-shadow-md">
              AEGIS<span className="text-foreground">OS</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2 tracking-widest uppercase font-mono">Terminal Authorization</p>
          </div>

          {!isAuthenticating ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase flex items-center">
                  <Key className="w-3 h-3 mr-2" /> Operator ID / Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all font-mono"
                  placeholder="e.g. Alex Chen"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-2" /> Security Clearance
                </label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm text-foreground transition-all"
                >
                  <option value="Operations Commander">Operations Commander</option>
                  <option value="Security Auditor">Security Auditor</option>
                  <option value="AI Overseer">AI Overseer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 py-3 rounded-md font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(var(--primary),0.2)] hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] flex items-center justify-center group"
              >
                <Lock className="w-4 h-4 mr-2 group-hover:hidden" />
                <Fingerprint className="w-4 h-4 mr-2 hidden group-hover:block animate-pulse" />
                Authenticate
              </button>
            </form>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <Fingerprint className="w-16 h-16 text-primary/50 animate-pulse" />
                <div 
                  className="absolute bottom-0 left-0 w-full bg-primary overflow-hidden transition-all duration-200" 
                  style={{ height: `${authProgress}%`, opacity: 0.8, mixBlendMode: 'screen' }}
                >
                  <Fingerprint className="w-16 h-16 text-primary absolute bottom-0 left-0" />
                </div>
              </div>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs font-mono text-primary">
                  <span>Verifying clearance...</span>
                  <span>{authProgress}%</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-200" style={{ width: `${authProgress}%` }} />
                </div>
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      <div className="absolute bottom-8 text-xs font-mono text-muted-foreground opacity-50">
        AEGIS SECURE INFRASTRUCTURE • RESTRICTED ACCESS
      </div>

    </div>
  );
}
