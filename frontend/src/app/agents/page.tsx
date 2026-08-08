"use client";

import { useState } from "react";
import Link from "next/link";
import { useAegisStore } from "@/stores/useAegisStore";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, Activity, Brain, ServerCrash, Play, Pause, RotateCcw, StopCircle, Eye } from "lucide-react";
import { Agent, AgentStatus } from "@/types";

export default function AgentsPage() {
  const agents = useAegisStore(state => state.agents);
  const updateAgentStatus = useAegisStore(state => state.updateAgentStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-status-healthy/20 text-status-healthy border-status-healthy/30';
      case 'Monitoring': return 'bg-status-ai/20 text-status-ai border-status-ai/30';
      case 'Waiting Approval': return 'bg-status-warning/20 text-status-warning border-status-warning/30';
      case 'Standby': return 'bg-muted/50 text-muted-foreground border-border';
      case 'Failed': return 'bg-status-critical/20 text-status-critical border-status-critical/30';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const getTrustColor = (score: number) => {
    if (score >= 95) return 'text-status-healthy';
    if (score >= 90) return 'text-status-ai';
    if (score >= 80) return 'text-status-warning';
    return 'text-status-critical';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl  font-bold text-primary mb-2">Agent Registry</h1>
          <p className="text-muted-foreground">Manage and monitor autonomous AI agents</p>
        </div>
        <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-border px-4 py-2 rounded-md font-medium transition-colors flex items-center shadow-sm">
          <Brain className="w-4 h-4 mr-2" /> Create Agent
        </button>
      </div>

      <div className="shadow-sm border rounded-xl overflow-hidden border border-border/50">
        <Table>
          <TableHeader className="bg-card/50">
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Trust Score</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id} className="hover:bg-primary/5 group transition-colors">
                <TableCell>
                  <div className="font-semibold text-foreground flex items-center">
                    <Activity className={`w-4 h-4 mr-2 ${agent.status === 'Running' ? 'text-status-healthy animate-pulse' : 'text-muted-foreground'}`} />
                    {agent.name}
                  </div>
                  <div className="text-xs text-muted-foreground text-sm mt-1">{agent.id}</div>
                </TableCell>
                <TableCell className="text-muted-foreground">{agent.role}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className={`w-4 h-4 ${getTrustColor(agent.trustScore)}`} />
                    <span className={`text-sm font-medium ${getTrustColor(agent.trustScore)}`}>{agent.trustScore}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between w-32">
                      <span className="text-muted-foreground">Success:</span>
                      <span className="text-status-healthy text-sm">{agent.successRate}%</span>
                    </div>
                    <div className="flex justify-between w-32">
                      <span className="text-muted-foreground">Failure:</span>
                      <span className="text-status-critical text-sm">{agent.failureRate}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <ActionButton icon={Play} onClick={() => updateAgentStatus(agent.id, 'Running')} title="Start" disabled={agent.status === 'Running'} />
                    <ActionButton icon={Pause} onClick={() => updateAgentStatus(agent.id, 'Standby')} title="Pause" disabled={agent.status === 'Standby' || agent.status === 'Failed'} />
                    <ActionButton icon={RotateCcw} onClick={() => updateAgentStatus(agent.id, 'Running')} title="Restart" disabled={agent.status !== 'Failed'} />
                    <Link href={`/agents/${agent.id}`}>
                      <ActionButton icon={Eye} onClick={() => {}} title="Inspect" />
                    </Link>
                    <ActionButton icon={StopCircle} onClick={() => updateAgentStatus(agent.id, 'Terminated')} title="Terminate" className="text-status-critical hover:text-status-critical hover:bg-status-critical/20" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}

function ActionButton({ icon: Icon, onClick, title, disabled, className = "" }: { icon: any, onClick: () => void, title: string, disabled?: boolean, className?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-colors ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-accent hover:text-accent-foreground'} ${className}`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}