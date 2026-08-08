import Link from "next/link";
import { ArrowRight, Shield, Cpu, Activity, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background selection:bg-primary/30">
      
      {/* Dynamic Premium Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/40 bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold tracking-tight text-lg">AegisOS</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-xs font-medium text-primary mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span>AegisOS v2.0 is now live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl text-balance">
          The autonomous <span className="text-gradient">mission harness</span> for critical AI.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 text-balance leading-relaxed">
          Run, remember, recover, and govern your agent swarms with enterprise-grade security and full auditability. Stop building chatbots. Start building operators.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-foreground text-background font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl flex items-center justify-center group"
          >
            Enter Command Center
            <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-muted/50 border border-border hover:bg-muted text-foreground font-semibold transition-colors flex items-center justify-center">
            Explore Architecture
          </a>
        </div>

        {/* Feature Grid preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left" id="features">
          
          <div className="premium-card p-8 rounded-2xl group hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Agent Orchestration</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Deploy complex, multi-agent missions with state-machine reliability and deterministic human-in-the-loop approvals.
            </p>
          </div>

          <div className="premium-card p-8 rounded-2xl group hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Persistent Memory</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every action, thought, and tool call is permanently logged to Supabase Postgres for absolute traceability and context retention.
            </p>
          </div>

          <div className="premium-card p-8 rounded-2xl group hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Failure Recovery</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Agents automatically diagnose and recover from tool failures, APIs timeouts, and reasoning loops without human intervention.
            </p>
          </div>

        </div>
      </main>

    </div>
  );
}
