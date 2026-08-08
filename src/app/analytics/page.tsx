"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, PieChart, LineChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl  font-bold text-primary mb-2">System Analytics</h1>
        <p className="text-muted-foreground">Aggregated performance, trust, and resource metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card className="shadow-sm border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center ">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Agent Success Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Bar label="Planner Agent" value={98} color="bg-status-healthy" />
              <Bar label="Research Agent" value={95} color="bg-status-healthy" />
              <Bar label="Risk Guardian" value={99} color="bg-status-healthy" />
              <Bar label="Execution Agent" value={91} color="bg-status-warning" />
              <Bar label="Recovery Agent" value={100} color="bg-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center ">
              <PieChart className="w-5 h-5 mr-2 text-primary" />
              Failure Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-48">
            <div className="relative w-40 h-40 rounded-full bg-muted overflow-hidden flex items-center justify-center">
              {/* Very simple CSS pie chart simulation */}
              <div className="absolute inset-0" style={{ background: 'conic-gradient(hsl(var(--status-critical)) 0% 25%, hsl(var(--status-warning)) 25% 60%, hsl(var(--primary)) 60% 85%, hsl(var(--muted-foreground)) 85% 100%)' }} />
              <div className="w-24 h-24 bg-card rounded-full z-10 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-bold">142</span>
                <span className="text-[10px] text-muted-foreground uppercase">Incidents</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/50 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center ">
              <LineChart className="w-5 h-5 mr-2 text-primary" />
              System Trust Trend (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 relative">
            {/* Simple CSS Line Chart Simulation */}
            <div className="absolute inset-0 p-6 flex items-end">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d">
                <path d="M 0,30 L 10,25 L 20,28 L 30,20 L 40,22 L 50,15 L 60,18 L 70,10 L 80,12 L 90,5 L 100,2" fill="none" stroke="hsl(var(--status-healthy))" strokeWidth="1" vectorEffect="non-scaling-stroke" className="drop-shadow-sm" />
                <path d="M 0,30 L 10,25 L 20,28 L 30,20 L 40,22 L 50,15 L 60,18 L 70,10 L 80,12 L 90,5 L 100,2 L 100,40 L 0,40 Z" fill="url(#gradient)" opacity="0.2" />
                <defs>
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--status-healthy))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--status-healthy))" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Grid lines */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full border-b border-border border-dashed h-0" />
              <div className="w-full border-b border-border border-dashed h-0" />
              <div className="w-full border-b border-border border-dashed h-0" />
              <div className="w-full border-b border-foreground border-solid h-0 opacity-50" />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function Bar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className="text-foreground">{label}</span>
        <span className="text-sm">{value}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}