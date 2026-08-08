"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Lock, AlertTriangle, Key } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl  font-bold text-primary mb-2">Security & Policies</h1>
          <p className="text-muted-foreground">Manage agent boundaries, constraints, and trust policies</p>
        </div>
        <div className="bg-status-healthy/10 text-status-healthy border border-status-healthy/30 px-4 py-2 rounded-md font-medium flex items-center shadow-sm">
          <ShieldCheck className="w-5 h-5 mr-2" /> Posture: Secure
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Policies */}
        <div className="space-y-6">
          <h2 className="text-xl  text-foreground flex items-center">
            <Lock className="w-5 h-5 mr-2 text-primary" />
            Active Policies
          </h2>
          
          <div className="space-y-4">
            <PolicyCard 
              id="SEC-01" 
              name="Mandatory Approval for Infra Mutations" 
              desc="Any agent attempting to modify cloud infrastructure must receive explicit human authorization."
              level="CRITICAL"
              active={true}
            />
            <PolicyCard 
              id="SEC-02" 
              name="Trust Score Threshold" 
              desc="Agents with a trust score below 85% are automatically suspended and isolated."
              level="HIGH"
              active={true}
            />
            <PolicyCard 
              id="SEC-03" 
              name="Network Egress Whitelisting" 
              desc="Agents can only make outbound requests to pre-approved domains (e.g., github.com, aws.amazon.com)."
              level="HIGH"
              active={true}
            />
            <PolicyCard 
              id="SEC-04" 
              name="Budget Constraint" 
              desc="Missions exceeding $10/hour spend rate are automatically paused."
              level="MEDIUM"
              active={true}
            />
          </div>
        </div>

        {/* Access Control & Secrets */}
        <div className="space-y-6">
          <h2 className="text-xl  text-foreground flex items-center">
            <Key className="w-5 h-5 mr-2 text-primary" />
            Secrets & Access Control
          </h2>
          
          <Card className="shadow-sm border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Secret Vault</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SecretRow name="AWS_ACCESS_KEY_ID" access="Execution Agent, Infra Tool" />
              <SecretRow name="PROD_DB_PASSWORD" access="None (Requires Approval)" />
              <SecretRow name="GITHUB_TOKEN" access="Research Agent, Planner Agent" />
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-status-warning/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg text-status-warning flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="text-sm p-3 bg-status-warning/10 border border-status-warning/30 rounded flex items-start">
                <ShieldAlert className="w-4 h-4 text-status-warning mr-2 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-status-warning">Anomalous Activity Detected</p>
                  <p className="text-muted-foreground mt-1">Research Agent attempted to access unauthorized endpoint '10.0.0.5:22'. Action blocked by policy SEC-03.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

function PolicyCard({ id, name, desc, level, active }: { id: string, name: string, desc: string, level: string, active: boolean }) {
  return (
    <Card className={`shadow-sm border border-l-4 ${level === 'CRITICAL' ? 'border-l-status-critical' : level === 'HIGH' ? 'border-l-status-warning' : 'border-l-status-healthy'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm text-[10px] bg-muted/50">{id}</Badge>
            <h3 className="font-semibold text-foreground text-sm">{name}</h3>
          </div>
          <Badge variant="outline" className={active ? 'border-status-healthy/50 text-status-healthy' : 'border-muted text-muted-foreground'}>
            {active ? 'Active' : 'Disabled'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}

function SecretRow({ name, access }: { name: string, access: string }) {
  return (
    <div className="flex justify-between items-center p-3 border border-border/50 rounded bg-background/50">
      <div className="flex items-center space-x-2">
        <Key className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-sm">{name}</span>
      </div>
      <div className="text-xs text-muted-foreground max-w-[200px] truncate text-right">
        {access}
      </div>
    </div>
  );
}