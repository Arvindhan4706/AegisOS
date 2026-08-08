"use client";

import { OrchestrationGraph } from "@/components/OrchestrationGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Play, Save, Plus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OrchestratorPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 h-[calc(100vh-2rem)] flex flex-col">
      
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl  font-bold text-primary mb-2">Orchestrator</h1>
          <p className="text-muted-foreground">Design and simulate autonomous agent workflows</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-card hover:bg-muted text-foreground border border-border px-4 py-2 rounded-md font-medium transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" /> Save Workflow
          </button>
          <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-border px-4 py-2 rounded-md font-medium transition-colors flex items-center shadow-sm">
            <Play className="w-4 h-4 mr-2" /> Run Simulation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Left Panel: Available Agents */}
        <Card className="shadow-sm border h-full flex flex-col min-h-0 border-border/50">
          <CardHeader className="py-4 border-b border-border/50 shrink-0">
            <CardTitle className="text-sm  flex items-center">
              <Plus className="w-4 h-4 mr-2 text-primary" />
              Available Agents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 overflow-y-auto flex-1">
            {['Planner', 'Researcher', 'Risk Guardian', 'Executor', 'Validator', 'Memory', 'Recovery'].map(agent => (
              <div key={agent} className="p-3 bg-background border border-border/50 rounded-lg cursor-grab hover:border-border transition-colors">
                <p className="font-semibold text-sm">{agent} Agent</p>
                <p className="text-xs text-muted-foreground mt-1">Drag to add to workflow</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Center: React Flow Canvas */}
        <div className="col-span-2 rounded-xl overflow-hidden shadow-sm border border border-border/50 flex flex-col relative h-full">
          <OrchestrationGraph />
        </div>

        {/* Right Panel: Node Configuration */}
        <Card className="shadow-sm border h-full flex flex-col min-h-0 border-border/50">
          <CardHeader className="py-4 border-b border-border/50 shrink-0">
            <CardTitle className="text-sm  flex items-center">
              <Settings className="w-4 h-4 mr-2 text-primary" />
              Node Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Selected Node</label>
              <div className="font-semibold p-2 bg-background border border-border rounded text-sm">Execution Agent</div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Task Description</label>
              <textarea className="w-full bg-background border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-primary" rows={3} defaultValue="Execute failover sequence" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
                <select className="w-full bg-background border border-border rounded p-2 text-sm focus:outline-none">
                  <option>CRITICAL</option>
                  <option>HIGH</option>
                  <option>MEDIUM</option>
                  <option>LOW</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Timeout (ms)</label>
                <input type="number" className="w-full bg-background border border-border rounded p-2 text-sm focus:outline-none" defaultValue={5000} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Retry Count</label>
                <input type="number" className="w-full bg-background border border-border rounded p-2 text-sm focus:outline-none" defaultValue={3} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Min Trust</label>
                <input type="number" className="w-full bg-background border border-border rounded p-2 text-sm focus:outline-none" defaultValue={85} />
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <label className="text-xs text-muted-foreground mb-2 block">Assigned Tools</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">Infra.Write</Badge>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">Bash.Exec</Badge>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/50">
              <label className="text-xs text-muted-foreground mb-2 block">Approval Policy</label>
              <div className="p-2 border border-status-warning/30 bg-status-warning/5 rounded text-xs text-status-warning flex items-start">
                <AlertTriangle className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
                <span>Human approval required before execution</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}