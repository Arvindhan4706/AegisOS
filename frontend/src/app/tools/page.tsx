"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ShieldAlert, CheckCircle2, Lock, Terminal, Globe, Database, Network } from "lucide-react";

const tools = [
  { id: 'T-01', name: 'Bash.Exec', category: 'System', risk: 'CRITICAL', status: 'Active', reqApproval: true, icon: Terminal, desc: 'Execute arbitrary bash commands on target infrastructure.' },
  { id: 'T-02', name: 'Infra.Read', category: 'Infrastructure', risk: 'LOW', status: 'Active', reqApproval: false, icon: Network, desc: 'Read state of cloud resources and networks.' },
  { id: 'T-03', name: 'Infra.Write', category: 'Infrastructure', risk: 'HIGH', status: 'Active', reqApproval: true, icon: Network, desc: 'Modify cloud resources (e.g., DNS, VMs, Firewalls).' },
  { id: 'T-04', name: 'Web.Scrape', category: 'Information', risk: 'LOW', status: 'Active', reqApproval: false, icon: Globe, desc: 'Extract information from public internet domains.' },
  { id: 'T-05', name: 'DB.Query', category: 'Data', risk: 'MEDIUM', status: 'Active', reqApproval: false, icon: Database, desc: 'Execute read-only SQL queries against connected databases.' },
  { id: 'T-06', name: 'DB.Mutate', category: 'Data', risk: 'HIGH', status: 'Disabled', reqApproval: true, icon: Database, desc: 'Execute destructive or modifying SQL queries.' },
];

export default function ToolsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Tool Registry</h1>
          <p className="text-muted-foreground">Manage agent capabilities and tool-level permissions</p>
        </div>
        <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 px-4 py-2 rounded-md font-medium transition-colors flex items-center shadow-[0_0_15px_rgba(var(--primary),0.2)]">
          <Wrench className="w-4 h-4 mr-2" /> Register Tool
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <Card key={tool.id} className="glass-panel hover:border-primary/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${tool.risk === 'CRITICAL' ? 'bg-status-critical/10 text-status-critical' : tool.risk === 'HIGH' ? 'bg-status-warning/10 text-status-warning' : 'bg-status-healthy/10 text-status-healthy'}`}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{tool.id}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80 mb-4 h-10">{tool.desc}</p>
              
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="bg-muted/50">{tool.category}</Badge>
                <Badge variant="outline" className={
                  tool.risk === 'CRITICAL' ? 'border-status-critical text-status-critical' :
                  tool.risk === 'HIGH' ? 'border-status-warning text-status-warning' :
                  'border-status-healthy text-status-healthy'
                }>
                  {tool.risk} RISK
                </Badge>
              </div>

              <div className="border-t border-border/50 pt-4 flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  {tool.reqApproval ? (
                    <>
                      <Lock className="w-4 h-4 text-status-warning" />
                      <span className="text-status-warning font-medium text-xs">Approval Req.</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-status-healthy" />
                      <span className="text-status-healthy font-medium text-xs">Auto-Execute</span>
                    </>
                  )}
                </div>
                <div>
                  <span className={`font-semibold text-xs ${tool.status === 'Active' ? 'text-status-healthy' : 'text-muted-foreground'}`}>{tool.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}