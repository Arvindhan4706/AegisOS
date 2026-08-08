"use client";

import { useParams, useRouter } from "next/navigation";
import { useAegisStore } from "@/stores/useAegisStore";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Play, Pause, AlertTriangle, ArrowLeft, Activity, ShieldCheck, Zap } from "lucide-react";
import { useMemo } from "react";
import { OrchestrationGraph } from "@/components/OrchestrationGraph";

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.id as string;
  
  const missions = useAegisStore(state => state.missions);
  const updateMissionStatus = useAegisStore(state => state.updateMissionStatus);
  const injectFailure = useAegisStore(state => state.injectFailure);
  const events = useAegisStore(state => state.events);

  const mission = useMemo(() => missions.find(m => m.id === missionId), [missions, missionId]);

  if (!mission) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl text-primary">Mission Not Found</h1>
        <button onClick={() => router.back()} className="mt-4 text-muted-foreground hover:text-primary">Go Back</button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING': return 'bg-status-warning/20 text-status-warning border-status-warning/30 animate-pulse';
      case 'COMPLETED': return 'bg-status-healthy/20 text-status-healthy border-status-healthy/30';
      case 'FAILED': return 'bg-status-critical/20 text-status-critical border-status-critical/30';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 h-[calc(100vh-2rem)] flex flex-col">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl  font-bold text-primary">MISSION {mission.id}</h1>
              <Badge variant="outline" className={getStatusColor(mission.status)}>
                {mission.status}
              </Badge>
              <Badge variant="outline" className={mission.riskLevel === 'CRITICAL' ? 'border-status-critical text-status-critical' : 'border-status-warning text-status-warning'}>
                {mission.riskLevel} RISK
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{mission.name}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button onClick={() => updateMissionStatus(mission.id, 'RUNNING')} disabled={mission.status === 'RUNNING'} className="bg-primary/20 hover:bg-primary/30 text-primary border border-border px-4 py-2 rounded-md font-medium transition-colors flex items-center shadow-sm disabled:opacity-50 disabled:shadow-none">
            <Play className="w-4 h-4 mr-2" /> Start Mission
          </button>
          <button onClick={() => updateMissionStatus(mission.id, 'PAUSED')} disabled={mission.status !== 'RUNNING'} className="bg-card hover:bg-muted text-foreground border border-border px-4 py-2 rounded-md font-medium transition-colors flex items-center disabled:opacity-50">
            <Pause className="w-4 h-4 mr-2" /> Pause
          </button>
          <button onClick={() => injectFailure('a4')} className="bg-status-critical/20 hover:bg-status-critical/30 text-status-critical border border-status-critical/50 px-4 py-2 rounded-md font-medium transition-colors flex items-center shadow-sm">
            <AlertTriangle className="w-4 h-4 mr-2" /> Inject Failure
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-4 shrink-0">
        <div className="shadow-sm border rounded-lg p-4 border border-border/50 flex justify-between items-center">
          <div><p className="text-xs text-muted-foreground">Elapsed Time</p><p className="text-lg text-sm">00:04:23</p></div>
          <Activity className="text-primary w-5 h-5" />
        </div>
        <div className="shadow-sm border rounded-lg p-4 border border-border/50 flex justify-between items-center">
          <div><p className="text-xs text-muted-foreground">Agents Deployed</p><p className="text-lg text-sm">{mission.agents.length}</p></div>
          <Target className="text-status-warning w-5 h-5" />
        </div>
        <div className="shadow-sm border rounded-lg p-4 border border-border/50 flex justify-between items-center">
          <div className="w-full">
            <div className="flex justify-between items-center mb-1"><p className="text-xs text-muted-foreground">Progress</p><p className="text-sm text-sm">{mission.progress}%</p></div>
            <Progress value={mission.progress} className="h-1.5" />
          </div>
        </div>
        <div className="shadow-sm border rounded-lg p-4 border border-border/50 flex justify-between items-center">
          <div><p className="text-xs text-muted-foreground">Mission Trust</p><p className="text-lg text-sm text-status-healthy">94.2%</p></div>
          <ShieldCheck className="text-status-healthy w-5 h-5" />
        </div>
      </div>

      {/* Main Orchestration Graph & Log */}
      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Side: React Flow Canvas */}
        <div className="col-span-2 rounded-xl overflow-hidden shadow-sm border border border-border/50 flex flex-col relative shadow-sm">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-primary tracking-widest shadow-sm">
            LIVE ORCHESTRATION GRAPH
          </div>
          <OrchestrationGraph missionId={mission.id} />
        </div>

        {/* Right Side: Live Logs & Tasks */}
        <div className="space-y-6 flex flex-col h-full overflow-hidden">
          
          <Card className="shadow-sm border flex-1 flex flex-col min-h-0">
            <CardHeader className="py-4 border-b border-border/50 shrink-0">
              <CardTitle className="text-sm  text-primary flex items-center tracking-widest">
                <Zap className="w-4 h-4 mr-2" />
                EVENT LOG
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {events.slice(0, 15).map(evt => (
                <div key={evt.id} className="text-xs flex items-start space-x-2 pb-2 border-b border-border/30 last:border-0 animate-in slide-in-from-top-2">
                  <span className="text-sm text-muted-foreground shrink-0">{evt.timestamp}</span>
                  <div>
                    <span className={`font-semibold ${evt.status === 'critical' ? 'text-status-critical' : evt.status === 'healthy' ? 'text-status-healthy' : 'text-primary'}`}>{evt.agent || 'SYSTEM'}</span>
                    <span className="text-foreground/80 block mt-0.5">{evt.action}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border shrink-0">
            <CardHeader className="py-3 border-b border-border/50">
              <CardTitle className="text-sm  text-foreground">Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-40 overflow-y-auto">
                {mission.tasks.map(task => (
                  <div key={task.id} className="flex justify-between items-center p-3 border-b border-border/30 last:border-0 text-sm">
                    <span className="text-foreground/80">{task.name}</span>
                    <Badge variant="outline" className={task.status === 'COMPLETED' ? 'text-status-healthy' : task.status === 'PENDING' ? 'text-muted-foreground' : 'text-primary animate-pulse'}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>

    </div>
  );
}