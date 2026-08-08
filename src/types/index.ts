export type AgentStatus = "Running" | "Monitoring" | "Waiting Approval" | "Standby" | "Failed" | "Terminated";
export type MissionStatus = "PENDING" | "RUNNING" | "PAUSED" | "COMPLETED" | "FAILED";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  trustScore: number;
  capabilities: string[];
  permissions: string[];
  memoryUsage: number;
  successRate: number;
  failureRate: number;
  currentTask?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  name: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  assignedTo?: string;
}

export interface Mission {
  id: string;
  name: string;
  status: MissionStatus;
  priority: RiskLevel;
  agents: string[]; // Agent IDs
  tasks: Task[];
  progress: number;
  riskLevel: RiskLevel;
  startedAt?: string;
  completedAt?: string;
}

export interface SystemEvent {
  id: string;
  timestamp: string;
  type: string;
  agent?: string;
  action: string;
  status: "success" | "warning" | "critical" | "info";
}
