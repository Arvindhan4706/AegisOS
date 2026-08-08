"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaySquare, FastForward, Rewind, Play, Pause, Activity, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useAegisStore } from "@/stores/useAegisStore";

export default function ReplayPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45);
  const missions = useAegisStore(state => state.missions);
  const events = useAegisStore(state => state.events);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 h-[calc(100vh-2rem)] flex flex-col">
      
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Mission Replay</h1>
          <p className="text-muted-foreground">Post-incident analysis and timeline reconstruction</p>
        </div>
        <select className="bg-card border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:border-primary">
          <option>Mission M-2048 (Emergency Coordination)</option>
          <option>Mission M-2047 (Security Audit)</option>
          <option>Mission M-1992 (Failed DB Migration)</option>
        </select>
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-6">
        
        {/* Replay Controls & Timeline */}
        <Card className="glass-panel shrink-0 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              
              {/* Playback Controls */}
              <div className="flex items-center space-x-6 mb-8">
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><Rewind className="w-6 h-6" /></button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="w-14 h-14 bg-primary/20 text-primary border border-primary/50 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><FastForward className="w-6 h-6" /></button>
              </div>

              {/* Timeline Track */}
              <div className="w-full relative px-4">
                <div className="h-2 w-full bg-muted rounded-full relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                    style={{ width: `${progress}%` }}
                  />
                  
                  {/* Milestones */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-[10%] w-3 h-3 rounded-full bg-background border-2 border-primary z-10" title="Mission Start" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[30%] w-3 h-3 rounded-full bg-background border-2 border-primary z-10" title="Approval Granted" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-4 h-4 rounded-full bg-background border-2 border-status-warning animate-pulse z-10" title="Current Playhead" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[70%] w-3 h-3 rounded-full bg-background border-2 border-status-critical z-10" title="Failure Detected" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[85%] w-3 h-3 rounded-full bg-background border-2 border-status-healthy z-10" title="System Recovered" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-3 font-mono">
                  <span>T-00:00:00</span>
                  <span>T+00:15:30</span>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Replay Data Views */}
        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          
          {/* Reconstructed State */}
          <Card className="glass-panel h-full flex flex-col min-h-0 border-border/50">
            <CardHeader className="py-4 border-b border-border/50 shrink-0">
              <CardTitle className="text-sm font-heading flex items-center text-primary">
                <RotateCcw className="w-4 h-4 mr-2" />
                State Snapshot @ T+00:07:15
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto flex-1 font-mono text-xs">
              <pre className="text-muted-foreground">
{`{
  "mission_id": "M-2048",
  "active_agents": ["Planner", "Risk", "Execution"],
  "memory_context": "M-782",
  "pending_approvals": 0,
  "system_state": {
    "cpu_load": "42%",
    "active_connections": 1024,
    "db_replication_lag": "12ms"
  },
  "last_action": {
    "agent": "Execution Agent",
    "tool": "Infra.Write",
    "status": "IN_PROGRESS"
  }
}`}
              </pre>
            </CardContent>
          </Card>

          {/* Point-in-time Log */}
          <Card className="glass-panel h-full flex flex-col min-h-0 border-border/50">
            <CardHeader className="py-4 border-b border-border/50 shrink-0">
              <CardTitle className="text-sm font-heading flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Event Reconstruction
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto flex-1 space-y-3">
              <div className="text-xs flex flex-col pb-3 border-b border-border/30 opacity-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-muted-foreground">T+00:07:10</span>
                  <Badge variant="outline" className="text-[10px] bg-muted/20">Planning</Badge>
                </div>
                <span className="font-semibold text-primary">Planner Agent</span>
                <span className="text-foreground/80 mt-0.5">Dispatched execution plan to Risk Guardian</span>
              </div>
              <div className="text-xs flex flex-col pb-3 border-b border-border/30 opacity-70">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-muted-foreground">T+00:07:12</span>
                  <Badge variant="outline" className="text-[10px] bg-status-healthy/10 text-status-healthy border-status-healthy/30">Analysis</Badge>
                </div>
                <span className="font-semibold text-status-healthy">Risk Guardian</span>
                <span className="text-foreground/80 mt-0.5">Plan validated. Trust score verified. Approving execution.</span>
              </div>
              <div className="text-xs flex flex-col pb-3 border-b border-border/30 shadow-[0_0_15px_rgba(var(--primary),0.1)] rounded p-2 bg-primary/5 border border-primary/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-primary">T+00:07:15</span>
                  <Badge variant="outline" className="text-[10px] bg-status-warning/10 text-status-warning border-status-warning/30">Execution</Badge>
                </div>
                <span className="font-semibold text-status-warning">Execution Agent</span>
                <span className="text-foreground/80 mt-0.5">Executing failover sequence on secondary cluster... (IN PROGRESS)</span>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}