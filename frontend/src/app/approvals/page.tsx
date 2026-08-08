"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, XCircle, CheckCircle2, ShieldAlert, FileCode2 } from "lucide-react";
import { useState } from "react";
import { useAegisStore } from "@/stores/useAegisStore";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState([
    { id: 'REQ-1092', agent: 'Execution Agent', mission: 'M-2048', action: 'Execute bash script on prod-db-01', risk: 'CRITICAL', status: 'PENDING', time: '2 mins ago', details: '#!/bin/bash\nsystemctl restart postgresql\nrm -rf /tmp/cache/*' },
    { id: 'REQ-1091', agent: 'Risk Guardian', mission: 'M-2047', action: 'Modify firewall rule port 443', risk: 'HIGH', status: 'APPROVED', time: '1 hour ago', details: 'ufw allow 443/tcp' },
    { id: 'REQ-1090', agent: 'Planner Agent', mission: 'M-2047', action: 'Allocate $50 from budget', risk: 'MEDIUM', status: 'REJECTED', time: '3 hours ago', details: 'API call to billing endpoint' },
  ]);

  const handleAction = (id: string, newStatus: string) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Human Approvals</h1>
          <p className="text-muted-foreground">Review and authorize high-risk autonomous actions</p>
        </div>
        <div className="bg-status-warning/10 text-status-warning border border-status-warning/30 px-4 py-2 rounded-md font-medium flex items-center shadow-[0_0_15px_rgba(var(--status-warning),0.2)]">
          <ShieldAlert className="w-5 h-5 mr-2 animate-pulse" /> 1 Pending Request
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pending Requests */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading text-foreground flex items-center">
            <CheckSquare className="w-5 h-5 mr-2 text-status-warning" />
            Pending Authorization
          </h2>
          
          {approvals.filter(a => a.status === 'PENDING').map(req => (
            <Card key={req.id} className="glass-panel border-status-warning/50 shadow-[0_0_20px_rgba(var(--status-warning),0.1)]">
              <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-foreground">{req.action}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Requested by <span className="text-primary font-semibold">{req.agent}</span> • Mission {req.mission}</p>
                  </div>
                  <Badge variant="outline" className="border-status-critical text-status-critical animate-pulse">{req.risk} RISK</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="bg-background/80 border border-border rounded-md p-3 relative group">
                  <div className="absolute top-2 right-2 text-muted-foreground opacity-50"><FileCode2 className="w-4 h-4" /></div>
                  <pre className="text-xs font-mono text-primary/90 overflow-x-auto whitespace-pre-wrap">{req.details}</pre>
                </div>
                
                <div className="p-3 bg-status-critical/10 border border-status-critical/30 rounded-md text-xs text-status-critical flex items-start">
                  <ShieldAlert className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                  <p>This action executes arbitrary code on production infrastructure. Policy <b>SEC-04</b> requires explicit human authorization.</p>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button onClick={() => handleAction(req.id, 'APPROVED')} className="flex-1 bg-status-healthy/20 hover:bg-status-healthy/30 text-status-healthy border border-status-healthy/50 py-2 rounded-md font-semibold transition-colors flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                  </button>
                  <button onClick={() => handleAction(req.id, 'REJECTED')} className="flex-1 bg-status-critical/20 hover:bg-status-critical/30 text-status-critical border border-status-critical/50 py-2 rounded-md font-semibold transition-colors flex items-center justify-center">
                    <XCircle className="w-4 h-4 mr-2" /> Reject
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
          {approvals.filter(a => a.status === 'PENDING').length === 0 && (
            <div className="text-center p-12 glass-panel rounded-xl border border-border/50">
              <CheckCircle2 className="w-12 h-12 text-status-healthy mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground">All Caught Up</h3>
              <p className="text-sm text-muted-foreground">No pending approval requests.</p>
            </div>
          )}
        </div>

        {/* History */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading text-foreground flex items-center">
            <CheckSquare className="w-5 h-5 mr-2 text-muted-foreground" />
            Decision History
          </h2>
          
          <div className="space-y-4">
            {approvals.filter(a => a.status !== 'PENDING').map(req => (
              <Card key={req.id} className="glass-panel border-border/50 opacity-80">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{req.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{req.agent} • {req.time}</p>
                    </div>
                    <Badge variant="outline" className={req.status === 'APPROVED' ? 'border-status-healthy text-status-healthy' : 'border-status-critical text-status-critical'}>
                      {req.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}