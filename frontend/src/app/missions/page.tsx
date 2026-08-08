"use client";

import Link from "next/link";
import { useAegisStore } from "@/stores/useAegisStore";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Target, Play, Pause, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function MissionsPage() {
  const missions = useAegisStore(state => state.missions);
  const updateMissionStatus = useAegisStore(state => state.updateMissionStatus);
  const injectFailure = useAegisStore(state => state.injectFailure);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING': return 'bg-status-warning/20 text-status-warning border-status-warning/30 animate-pulse';
      case 'COMPLETED': return 'bg-status-healthy/20 text-status-healthy border-status-healthy/30';
      case 'FAILED': return 'bg-status-critical/20 text-status-critical border-status-critical/30';
      case 'PAUSED': return 'bg-muted/50 text-muted-foreground border-border';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl  font-bold text-primary mb-2">Missions</h1>
          <p className="text-muted-foreground">Manage and orchestrate autonomous agent missions</p>
        </div>
        <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-border px-4 py-2 rounded-md font-medium transition-colors flex items-center shadow-sm">
          <Target className="w-4 h-4 mr-2" /> New Mission
        </button>
      </div>

      <div className="shadow-sm border rounded-xl overflow-hidden border border-border/50">
        <Table>
          <TableHeader className="bg-card/50">
            <TableRow>
              <TableHead>Mission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Agents</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missions.map((mission) => (
              <TableRow key={mission.id} className="hover:bg-primary/5 group transition-colors">
                <TableCell>
                  <Link href={`/missions/${mission.id}`} className="hover:underline hover:text-primary transition-colors block">
                    <div className="font-semibold text-foreground">{mission.name}</div>
                    <div className="text-xs text-muted-foreground text-sm mt-1">{mission.id}</div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(mission.status)}`}>
                    {mission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    mission.riskLevel === 'CRITICAL' ? 'border-status-critical text-status-critical' :
                    mission.riskLevel === 'HIGH' ? 'border-status-warning text-status-warning' :
                    'border-status-healthy text-status-healthy'
                  }>
                    {mission.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="w-[200px]">
                  <div className="flex items-center space-x-2">
                    <Progress value={mission.progress} className="h-2" indicatorColor="bg-primary" />
                    <span className="text-xs text-sm w-8">{mission.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {mission.agents.slice(0, 3).map((agentId, i) => (
                      <div key={agentId} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background z-[${10-i}] bg-card`} title={`Agent ${agentId}`}>
                        {agentId.substring(0,2)}
                      </div>
                    ))}
                    {mission.agents.length > 3 && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background z-0 bg-muted text-muted-foreground">
                        +{mission.agents.length - 3}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <ActionButton icon={Play} onClick={() => updateMissionStatus(mission.id, 'RUNNING')} title="Start Mission" disabled={mission.status === 'RUNNING' || mission.status === 'COMPLETED'} />
                    <ActionButton icon={Pause} onClick={() => updateMissionStatus(mission.id, 'PAUSED')} title="Pause Mission" disabled={mission.status !== 'RUNNING'} />
                    <ActionButton icon={AlertTriangle} onClick={() => injectFailure('a4')} title="Inject Failure (Demo)" className="text-status-warning hover:text-status-warning hover:bg-status-warning/20" />
                    <ActionButton icon={CheckCircle2} onClick={() => updateMissionStatus(mission.id, 'COMPLETED')} title="Complete Mission" className="text-status-healthy hover:text-status-healthy hover:bg-status-healthy/20" disabled={mission.status === 'COMPLETED'} />
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