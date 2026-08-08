"use client";

import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Activity, ShieldCheck, AlertTriangle, ShieldAlert, Brain } from 'lucide-react';
import { useAegisStore } from '@/stores/useAegisStore';

// Custom Node Component
const AgentNode = ({ data }: { data: any }) => {
  const isFailed = data.status === 'Failed';
  const isRunning = data.status === 'Running';
  const isWaiting = data.status === 'Waiting Approval';

  const bgClass = isFailed 
    ? 'bg-status-critical/10 border-status-critical/50' 
    : isRunning 
      ? 'bg-status-healthy/10 border-status-healthy/50 shadow-sm'
      : isWaiting
        ? 'bg-status-warning/10 border-status-warning/50 animate-pulse'
        : 'bg-card border-border';

  const textClass = isFailed 
    ? 'text-status-critical' 
    : isRunning 
      ? 'text-status-healthy'
      : isWaiting
        ? 'text-status-warning'
        : 'text-foreground';

  const Icon = data.icon || Brain;

  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${bgClass} w-[200px] backdrop-blur-md transition-all duration-300`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-muted-foreground border-none" />
      <div className="flex items-center space-x-3 mb-2">
        <div className={`p-2 rounded-md ${isFailed ? 'bg-status-critical/20' : isRunning ? 'bg-status-healthy/20' : 'bg-muted'} ${textClass}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-bold">{data.label}</div>
          <div className={`text-[10px] uppercase text-sm ${textClass}`}>{data.status}</div>
        </div>
      </div>
      {data.task && (
        <div className="text-[10px] text-muted-foreground border-t border-border/50 pt-2 mt-1 truncate">
          Task: {data.task}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-muted-foreground border-none" />
    </div>
  );
};

const nodeTypes = { agentNode: AgentNode };

const initialNodes = [
  { id: 'controller', type: 'agentNode', position: { x: 400, y: 50 }, data: { label: 'Mission Controller', status: 'Running', icon: Activity, task: 'Orchestrate agents' } },
  { id: 'memory', type: 'agentNode', position: { x: 700, y: 200 }, data: { label: 'Memory Manager', status: 'Running', icon: Brain, task: 'Context injection' } },
  { id: 'planner', type: 'agentNode', position: { x: 250, y: 200 }, data: { label: 'Planner Agent', status: 'Standby', icon: Brain } },
  { id: 'research', type: 'agentNode', position: { x: 100, y: 350 }, data: { label: 'Research Agent', status: 'Standby', icon: Brain } },
  { id: 'risk', type: 'agentNode', position: { x: 400, y: 350 }, data: { label: 'Risk Guardian', status: 'Standby', icon: ShieldCheck } },
  { id: 'execution', type: 'agentNode', position: { x: 250, y: 500 }, data: { label: 'Execution Agent', status: 'Standby', icon: AlertTriangle } },
  { id: 'validator', type: 'agentNode', position: { x: 400, y: 650 }, data: { label: 'Validator Agent', status: 'Standby', icon: ShieldCheck } },
  { id: 'recovery', type: 'agentNode', position: { x: 550, y: 500 }, data: { label: 'Recovery Agent', status: 'Standby', icon: ShieldAlert } },
];

const initialEdges = [
  { id: 'e1', source: 'controller', target: 'planner', animated: true, style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e2', source: 'controller', target: 'memory', animated: true, style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e3', source: 'planner', target: 'research', animated: true },
  { id: 'e4', source: 'planner', target: 'risk', animated: true },
  { id: 'e5', source: 'risk', target: 'execution', animated: true },
  { id: 'e6', source: 'execution', target: 'validator', animated: true },
  { id: 'e7', source: 'execution', target: 'recovery', animated: false, style: { stroke: 'hsl(var(--status-critical))', strokeDasharray: '5,5' } },
  { id: 'e8', source: 'recovery', target: 'execution', animated: false, style: { stroke: 'hsl(var(--status-healthy))' } },
  { id: 'e9', source: 'memory', target: 'planner', animated: true },
];

export function OrchestrationGraph({ missionId }: { missionId?: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const agents = useAegisStore(state => state.agents);

  // Sync React Flow nodes with Zustand agent states
  useEffect(() => {
    setNodes((nds) => 
      nds.map((node) => {
        // Find corresponding agent in store (rough matching by name/role for demo)
        const storeAgent = agents.find(a => a.name.includes(node.data.label.split(' ')[0]));
        if (storeAgent) {
          return {
            ...node,
            data: {
              ...node.data,
              status: storeAgent.status,
              task: storeAgent.currentTask
            }
          };
        }
        return node;
      })
    );
  }, [agents, setNodes]);

  return (
    <div className="h-full w-full bg-background/50 rounded-xl border border-border/50 relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="dark"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#ffffff" gap={16} size={1} opacity={0.05} />
        <Controls className="bg-card border-border fill-foreground" />
      </ReactFlow>
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="bg-card/80 backdrop-blur text-xs px-3 py-1.5 rounded border border-border flex items-center">
          <span className="w-2 h-2 rounded-full bg-status-healthy animate-pulse mr-2"></span>
          Running
        </div>
        <div className="bg-card/80 backdrop-blur text-xs px-3 py-1.5 rounded border border-border flex items-center">
          <span className="w-2 h-2 rounded-full bg-status-critical mr-2"></span>
          Failed
        </div>
        <div className="bg-card/80 backdrop-blur text-xs px-3 py-1.5 rounded border border-border flex items-center">
          <span className="w-2 h-2 rounded-full bg-status-warning mr-2"></span>
          Waiting Approval
        </div>
      </div>
    </div>
  );
}
