"use client";

import { useEffect } from "react";
import { Activity, Users, Zap, ShieldCheck, Database, Server, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAegisStore } from "@/stores/useAegisStore";

export default function Dashboard() {
  const agents = useAegisStore(state => state.agents);
  const missions = useAegisStore(state => state.missions);
  const events = useAegisStore(state => state.events);
  const addEvent = useAegisStore(state => state.addEvent);

  // Simulate incoming events
  useEffect(() => {
    if (events.length === 0) {
      addEvent({ agent: "System", action: "Dashboard initialized", status: "info", type: "SYSTEM" });
    }
  }, [addEvent, events.length]);

  const activeAgentsCount = agents.filter(a => a.status === 'Running').length;
  const avgTrust = agents.reduce((acc, a) => acc + a.trustScore, 0) / agents.length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl  font-bold text-primary mb-2">Command Center</h1>
          <p className="text-muted-foreground">Autonomous Agent Control Plane</p>
        </div>
        <div className="flex items-center space-x-2 bg-status-healthy/10 text-status-healthy px-4 py-2 rounded-full border border-status-healthy/20">
          <span className="w-2.5 h-2.5 rounded-full bg-status-healthy animate-pulse"></span>
          <span className="text-sm font-semibold tracking-wider">SYSTEM OPERATIONAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Active Agents" value={activeAgentsCount.toString()} icon={Users} color="text-primary" trend={`${agents.length} Total`} />
        <MetricCard title="Running Missions" value={missions.filter(m => m.status === 'RUNNING').length.toString()} icon={Zap} color="text-status-warning" trend="Stable" />
        <MetricCard title="Tasks Executed" value="1,284" icon={Activity} color="text-status-ai" trend="+14% vs yesterday" />
        <MetricCard title="Average Trust" value={`${avgTrust.toFixed(1)}%`} icon={ShieldCheck} color="text-status-healthy" trend="Optimal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border border-border h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg  text-primary flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Live Agent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {events.map((evt) => (
                  <ActivityItem key={evt.id} time={evt.timestamp} agent={evt.agent || 'System'} action={evt.action} status={evt.status} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border h-[400px]">
            <CardHeader>
              <CardTitle className="text-lg  flex items-center">
                <Server className="w-5 h-5 mr-2" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <HealthBar label="CPU" value={45} icon={Cpu} />
              <HealthBar label="Memory" value={78} icon={Database} />
              <HealthBar label="Agent Runtime" value={99} icon={Activity} />
              <HealthBar label="Event Bus" value={65} icon={Zap} />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Mission Pipeline */}
      <div>
        <h2 className="text-xl  text-primary mb-4">Mission Pipeline</h2>
        <div className="flex items-center justify-between bg-card/40 border border-border/50 rounded-xl p-6 shadow-sm border">
          <PipelineNode name="Mission" status="done" />
          <PipelineEdge active={true} />
          <PipelineNode name="Planner" status="done" />
          <PipelineEdge active={true} />
          <PipelineNode name="Research" status="done" />
          <PipelineEdge active={true} />
          <PipelineNode name="Risk" status="done" />
          <PipelineEdge active={true} />
          <PipelineNode name="Executor" status="active" />
          <PipelineEdge active={false} />
          <PipelineNode name="Validator" status="pending" />
          <PipelineEdge active={false} />
          <PipelineNode name="Completed" status="pending" />
        </div>
      </div>
      
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, trend }: { title: string, value: string, icon: any, color: string, trend: string }) {
  return (
    <Card className="premium-card group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1 tracking-tight">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl bg-muted/50 border border-border/50 group-hover:scale-110 transition-transform duration-300 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 font-medium">{trend}</p>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ time, agent, action, status }: { time: string, agent: string, action: string, status: 'success' | 'warning' | 'critical' | 'info' }) {
  const colors = {
    success: "text-status-healthy",
    warning: "text-status-warning",
    critical: "text-status-critical",
    info: "text-primary"
  };
  
  return (
    <div className="flex items-start space-x-4 group hover:bg-muted/20 p-2 -mx-2 rounded-lg transition-colors">
      <span className="text-xs text-muted-foreground mt-1 min-w-[70px]">{time}</span>
      <div className="flex-1 border-b border-border/40 pb-2 group-last:border-0">
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 shadow-[0_0_10px_currentColor] ${colors[status].replace('text-', 'bg-')} ${colors[status]}`}></span>
          <span className={`font-semibold tracking-tight ${colors[status]}`}>{agent}</span>
        </div>
        <p className="text-sm text-foreground/80 ml-4 mt-1">{action}</p>
      </div>
    </div>
  )
}

function HealthBar({ label, value, icon: Icon }: { label: string, value: number, icon: any }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center text-muted-foreground">
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </span>
        <span className="text-sm">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" indicatorColor={value > 90 ? "bg-status-critical" : value > 75 ? "bg-status-warning" : "bg-status-healthy"} />
    </div>
  )
}

function PipelineNode({ name, status }: { name: string, status: 'done' | 'active' | 'pending' }) {
  return (
    <div className={`flex flex-col items-center space-y-2 ${status === 'pending' ? 'opacity-50' : ''}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 
        ${status === 'done' ? 'bg-primary/20 border-primary text-primary' : 
          status === 'active' ? 'bg-status-ai/20 border-status-ai text-status-ai shadow-sm animate-pulse' : 
          'bg-card border-muted-foreground text-muted-foreground'}`}>
        {status === 'done' ? <ShieldCheck className="w-6 h-6" /> : 
         status === 'active' ? <Activity className="w-6 h-6" /> : 
         <div className="w-3 h-3 rounded-full bg-muted-foreground" />}
      </div>
      <span className="text-xs font-semibold">{name}</span>
    </div>
  )
}

function PipelineEdge({ active }: { active: boolean }) {
  return (
    <div className="flex-1 h-0.5 mx-2 relative overflow-hidden bg-border">
      {active && (
        <div className="absolute inset-0 bg-primary w-full animate-[shimmer_2s_infinite]" 
             style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(var(--primary), 1) 50%, transparent)' }} />
      )}
    </div>
  )
}