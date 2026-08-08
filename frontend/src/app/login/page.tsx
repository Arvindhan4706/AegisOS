"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAegisStore } from "@/stores/useAegisStore";
import { Activity, ArrowRight, ShieldCheck, Mail, Lock, User as UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const login = useAegisStore((state) => state.login);
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Operations Commander");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (isSignUp && !name.trim()) return;

    setIsAuthenticating(true);
    setErrorMsg("");

    try {
      if (!supabase) throw new Error("Supabase is not configured. Please check your .env.local file.");

      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: role,
              avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=000000`,
            }
          }
        });
        if (error) throw error;
        
        // Auto-login locally after signup
        if (data.user) {
          login({
            name: data.user.user_metadata.full_name || email,
            role: data.user.user_metadata.role || "Operator",
            email: data.user.email!,
            avatar: data.user.user_metadata.avatar_url,
          });
          router.push('/dashboard');
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        if (data.user) {
          login({
            name: data.user.user_metadata.full_name || email,
            role: data.user.user_metadata.role || "Operator",
            email: data.user.email!,
            avatar: data.user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}&backgroundColor=000000`,
          });
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during authentication.");
    } finally {
      setIsAuthenticating(false);
    }
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
            {isSignUp ? "Create AegisOS Account" : "Sign in to AegisOS"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Register for a new operator clearance" : "Welcome back to the command center"}
          </p>
        </div>

        <Card className="premium-card relative overflow-hidden">
          {isAuthenticating && (
            <div className="absolute inset-0 z-50 bg-card/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-medium text-foreground tracking-tight">Authenticating with Supabase...</p>
            </div>
          )}
          
          <CardContent className="p-8">
            <div className="flex p-1 mb-8 bg-background/50 border border-border/50 rounded-xl relative">
              <button 
                type="button" 
                onClick={() => { setIsSignUp(false); setErrorMsg(""); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg z-10 transition-colors ${!isSignUp ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sign In
              </button>
              <button 
                type="button" 
                onClick={() => { setIsSignUp(true); setErrorMsg(""); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg z-10 transition-colors ${isSignUp ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sign Up
              </button>
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-lg transition-transform duration-300 ease-out shadow-[0_0_15px_rgba(var(--primary),0.4)] ${isSignUp ? 'translate-x-full left-1' : 'left-1'}`}
              ></div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              
              {isSignUp && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground transition-all duration-300 shadow-sm outline-none"
                      placeholder="Alex Chen"
                      required={isSignUp}
                      disabled={isAuthenticating}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground transition-all duration-300 shadow-sm outline-none"
                    placeholder="alex@aegis.local"
                    required
                    disabled={isAuthenticating}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground transition-all duration-300 shadow-sm outline-none"
                    placeholder="••••••••"
                    required
                    disabled={isAuthenticating}
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300 delay-75">
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
              )}

              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-medium transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:-translate-y-0.5 flex items-center justify-center group mt-4"
              >
                {isSignUp ? "Register Account" : "Sign In"}
                <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

