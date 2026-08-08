import { create } from 'zustand';
import { Agent, Mission, SystemEvent } from '@/types';

// Mock Initial Data
const INITIAL_AGENTS: Agent[] = [
  { id: 'a1', name: 'Mission Planner', role: 'Strategic Planning', status: 'Running', trustScore: 96, capabilities: ['Planning'], permissions: ['Mission.Read', 'Mission.Write'], memoryUsage: 124, successRate: 98, failureRate: 1, currentTask: 'Generate execution plan', createdAt: new Date().toISOString() },
  { id: 'a2', name: 'Research Agent', role: 'Information Retrieval', status: 'Running', trustScore: 92, capabilities: ['Search'], permissions: ['Knowledge.Read'], memoryUsage: 342, successRate: 95, failureRate: 3, currentTask: 'Acquire knowledge', createdAt: new Date().toISOString() },
  { id: 'a3', name: 'Risk Guardian', role: 'Risk Assessment', status: 'Monitoring', trustScore: 98, capabilities: ['Analysis'], permissions: ['Policy.Read', 'Action.Block'], memoryUsage: 88, successRate: 99, failureRate: 0, currentTask: 'Monitor policies', createdAt: new Date().toISOString() },
  { id: 'a4', name: 'Execution Agent', role: 'Controlled Execution', status: 'Waiting Approval', trustScore: 87, capabilities: ['Execute'], permissions: ['Infra.Write'], memoryUsage: 512, successRate: 91, failureRate: 5, currentTask: 'Deploy infrastructure', createdAt: new Date().toISOString() },
  { id: 'a5', name: 'Memory Curator', role: 'Knowledge Management', status: 'Running', trustScore: 94, capabilities: ['Storage'], permissions: ['Memory.Read', 'Memory.Write'], memoryUsage: 1024, successRate: 97, failureRate: 1, currentTask: 'Index recent event', createdAt: new Date().toISOString() },
  { id: 'a6', name: 'Recovery Agent', role: 'Failure Detection', status: 'Standby', trustScore: 99, capabilities: ['Restore'], permissions: ['System.Restore'], memoryUsage: 45, successRate: 100, failureRate: 0, createdAt: new Date().toISOString() },
];

const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'M-2048',
    name: 'Emergency Infrastructure Coordination Simulation',
    status: 'RUNNING',
    priority: 'CRITICAL',
    agents: ['a1', 'a2', 'a3', 'a4', 'a6'],
    tasks: [
      { id: 't1', name: 'Assess impact', status: 'COMPLETED', assignedTo: 'a1' },
      { id: 't2', name: 'Retrieve historical mitigations', status: 'COMPLETED', assignedTo: 'a2' },
      { id: 't3', name: 'Evaluate risk of automated failover', status: 'COMPLETED', assignedTo: 'a3' },
      { id: 't4', name: 'Execute failover sequence', status: 'PENDING', assignedTo: 'a4' },
    ],
    progress: 74,
    riskLevel: 'HIGH',
    startedAt: new Date().toISOString()
  }
];

export interface User {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface AegisState {
  agents: Agent[];
  missions: Mission[];
  events: SystemEvent[];
  demoMode: boolean;
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setDemoMode: (enabled: boolean) => void;
  updateAgentStatus: (id: string, status: Agent['status']) => void;
  updateMissionStatus: (id: string, status: Mission['status']) => void;
  addEvent: (event: Omit<SystemEvent, 'id' | 'timestamp'>) => void;
  injectFailure: (agentId: string) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAegisStore = create<AegisState>((set, get) => ({
  agents: INITIAL_AGENTS,
  missions: INITIAL_MISSIONS,
  events: [],
  demoMode: false,
  currentUser: null,
  isAuthenticated: false,

  setDemoMode: (enabled) => set({ demoMode: enabled }),
  
  updateAgentStatus: (id, status) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, status } : a)
  })),

  updateMissionStatus: (id, status) => set((state) => ({
    missions: state.missions.map(m => m.id === id ? { ...m, status } : m)
  })),

  addEvent: (event) => set((state) => {
    const newEvent: SystemEvent = {
      ...event,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
    };
    return { events: [newEvent, ...state.events].slice(0, 100) };
  }),

  injectFailure: (agentId) => {
    const { updateAgentStatus, addEvent } = get();
    updateAgentStatus(agentId, 'Failed');
    addEvent({
      type: 'FAILURE',
      agent: agentId,
      action: 'Agent failure detected',
      status: 'critical'
    });
  },

  login: (user) => set({ currentUser: user, isAuthenticated: true }),
  logout: () => set({ currentUser: null, isAuthenticated: false }),
}));
