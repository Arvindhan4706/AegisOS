import { create } from 'zustand';
import { Agent, Mission, SystemEvent } from '@/types';
import { supabase } from '@/lib/supabase';

// Helper to map DB row to Agent object
const mapAgent = (row: any): Agent => ({
  id: row.id,
  name: row.name,
  role: row.role,
  status: row.status,
  trustScore: row.trust_score,
  capabilities: row.capabilities,
  permissions: row.permissions,
  memoryUsage: row.memory_usage,
  successRate: row.success_rate,
  failureRate: row.failure_rate,
  currentTask: row.current_task,
  createdAt: row.created_at,
});

// Helper to map DB row to Mission object
const mapMission = (row: any): Mission => ({
  id: row.id,
  name: row.name,
  status: row.status,
  priority: row.priority,
  agents: row.agents,
  tasks: row.tasks,
  progress: row.progress,
  riskLevel: row.risk_level,
  startedAt: row.started_at,
});

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
  isRealtimeInitialized: boolean;
  
  // Actions
  initializeRealtime: () => Promise<void>;
  setDemoMode: (enabled: boolean) => void;
  updateAgentStatus: (id: string, status: Agent['status']) => Promise<void>;
  updateMissionStatus: (id: string, status: Mission['status']) => Promise<void>;
  addEvent: (event: Omit<SystemEvent, 'id' | 'timestamp'>) => void;
  injectFailure: (agentId: string) => Promise<void>;
  login: (user: User) => void;
  logout: () => void;
}

export const useAegisStore = create<AegisState>((set, get) => ({
  agents: [],
  missions: [],
  events: [],
  demoMode: false,
  currentUser: null,
  isAuthenticated: false,
  isRealtimeInitialized: false,

  initializeRealtime: async () => {
    if (get().isRealtimeInitialized || !supabase) return;
    set({ isRealtimeInitialized: true });

    // 1. Initial Fetch
    const [agentsRes, missionsRes] = await Promise.all([
      supabase.from('agents').select('*'),
      supabase.from('missions').select('*'),
    ]);

    if (agentsRes.data) set({ agents: agentsRes.data.map(mapAgent) });
    if (missionsRes.data) set({ missions: missionsRes.data.map(mapMission) });

    // 2. Realtime Subscriptions
    supabase.channel('public:agents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agents' }, (payload) => {
        const row = payload.new as any;
        if (!row || !row.id) return;
        set((state) => {
          const exists = state.agents.find(a => a.id === row.id);
          if (exists) {
            return { agents: state.agents.map(a => a.id === row.id ? mapAgent(row) : a) };
          }
          return { agents: [...state.agents, mapAgent(row)] };
        });
      }).subscribe();

    supabase.channel('public:missions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'missions' }, (payload) => {
        const row = payload.new as any;
        if (!row || !row.id) return;
        set((state) => {
          const exists = state.missions.find(m => m.id === row.id);
          if (exists) {
            return { missions: state.missions.map(m => m.id === row.id ? mapMission(row) : m) };
          }
          return { missions: [...state.missions, mapMission(row)] };
        });
      }).subscribe();
  },

  setDemoMode: (enabled) => set({ demoMode: enabled }),
  
  updateAgentStatus: async (id, status) => {
    if (supabase) {
      await supabase.from('agents').update({ status }).eq('id', id);
    } else {
      set((state) => ({ agents: state.agents.map(a => a.id === id ? { ...a, status } : a) }));
    }
  },

  updateMissionStatus: async (id, status) => {
    if (supabase) {
      await supabase.from('missions').update({ status }).eq('id', id);
    } else {
      set((state) => ({ missions: state.missions.map(m => m.id === id ? { ...m, status } : m) }));
    }
  },

  addEvent: (event) => set((state) => {
    const newEvent: SystemEvent = {
      ...event,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
    };
    return { events: [newEvent, ...state.events].slice(0, 100) };
  }),

  injectFailure: async (agentId) => {
    const { updateAgentStatus, addEvent } = get();
    await updateAgentStatus(agentId, 'Failed');
    addEvent({
      type: 'FAILURE',
      agent: agentId,
      action: 'Agent failure detected',
      status: 'critical'
    });
  },

  login: (user) => set({ currentUser: user, isAuthenticated: true }),
  logout: () => {
    if (supabase) supabase.auth.signOut();
    set({ currentUser: null, isAuthenticated: false });
  },
}));
