"use client";

import { useParams, useRouter } from "next/navigation";
import { useAegisStore } from "@/stores/useAegisStore";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, ShieldCheck, Database, Wrench, Lock, ArrowLeft, AlertTriangle } from "lucide-react";
import { useMemo } from "react";

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;
  const agents = useAegisStore(state => state.agents);
  const agent = useMemo(() => agents.find(a => a.id === agentId), [agents, agentId]);

  if (!agent) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl text-primary">Agent Not Found</h1>
        <button onClick={() => router.back()} className="mt-4 text-muted-foreground hover:text-primary">Go Back</button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-status-healthy/20 text-status-healthy border-status-healthy/30';
      case 'Monitoring': return 'bg-status-ai/20 text-status-ai border-status-ai/30';
      case 'Waiting Approval': return 'bg-status-warning/20 text-status-warning border-status-warning/30';
      case 'Failed': return 'bg-status-critical/20 text-status-critical border-status-critical/30';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center space-x-4 mb-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-heading font-bold text-primary">{agent.name}</h1>
            <Badge variant="outline" className={getStatusColor(agent.status)}>
              {agent.status}
            </Badge>
          </div>
          <p className="text-muted-foreground font-mono mt-1">ID: {agent.id} | Role: {agent.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-status-healthy" />
              Trust Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold font-heading">{agent.trustScore}</span>
              <span className="text-muted-foreground">/ 100</span>
            </div>
            <Progress value={agent.trustScore} className="h-2" indicatorColor={agent.trustScore > 90 ? "bg-status-healthy" : "bg-status-warning"} />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Task Success:</span> <span className="font-mono text-status-healthy">97%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Policy Compliance:</span> <span className="font-mono text-status-healthy">99%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tool Reliability:</span> <span className="font-mono text-primary">92%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Human Approval Rate:</span> <span className="font-mono">91%</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Runtime Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-background rounded-lg border border-border/50 text-center">
                <p className="text-muted-foreground text-xs mb-1">Memory Usage</p>
                <p className="text-xl font-mono text-primary">{agent.memoryUsage}MB</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50 text-center">
                <p className="text-muted-foreground text-xs mb-1">Success Rate</p>
                <p className="text-xl font-mono text-status-healthy">{agent.successRate}%</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50 text-center">
                <p className="text-muted-foreground text-xs mb-1">Failure Rate</p>
                <p className="text-xl font-mono text-status-critical">{agent.failureRate}%</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50 text-center">
                <p className="text-muted-foreground text-xs mb-1">Avg Latency</p>
                <p className="text-xl font-mono">142ms</p>
              </div>
            </div>
            
            <h4 className="text-sm font-medium mb-3 mt-6">Capabilities & Permissions</h4>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map(cap => (
                <Badge key={cap} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Wrench className="w-3 h-3 mr-1" /> {cap}
                </Badge>
              ))}
              {agent.permissions.map(perm => (
                <Badge key={perm} variant="outline" className="border-status-warning text-status-warning">
                  <Lock className="w-3 h-3 mr-1" /> {perm}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}