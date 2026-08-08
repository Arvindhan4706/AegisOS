"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings2, MonitorPlay, Zap, ShieldCheck, HardDrive } from "lucide-react";
import { useAegisStore } from "@/stores/useAegisStore";

export default function SettingsPage() {
  const demoMode = useAegisStore(state => state.demoMode);
  const setDemoMode = useAegisStore(state => state.setDemoMode);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl  font-bold text-primary mb-2">System Configuration</h1>
        <p className="text-muted-foreground">Global settings for the AegisOS harness</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary border border-border rounded-md font-medium flex items-center">
            <MonitorPlay className="w-4 h-4 mr-2" /> Presentation Mode
          </button>
          <button className="w-full text-left px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md font-medium flex items-center transition-colors">
            <Zap className="w-4 h-4 mr-2" /> Performance
          </button>
          <button className="w-full text-left px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md font-medium flex items-center transition-colors">
            <ShieldCheck className="w-4 h-4 mr-2" /> Security Defaults
          </button>
          <button className="w-full text-left px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md font-medium flex items-center transition-colors">
            <HardDrive className="w-4 h-4 mr-2" /> Storage & Memory
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          
          <Card className="shadow-sm border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <MonitorPlay className="w-5 h-5 mr-2" />
                Hackathon Presentation Mode
              </CardTitle>
              <CardDescription>Configure the behavior of the prototype for live demonstrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center justify-between p-4 border border-border/50 bg-background/50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-foreground">Interactive Demo Mode</h3>
                  <p className="text-sm text-muted-foreground mt-1">Enables simulated event streaming, automated UI updates, and mock API responses for a seamless offline demonstration.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={demoMode} onChange={(e) => setDemoMode(e.target.checked)} />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border/50 bg-background/50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-foreground">Auto-approve Low Risk Actions</h3>
                  <p className="text-sm text-muted-foreground mt-1">Automatically grant human approval for actions categorized as LOW risk during the demo.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-border/50 bg-background/50 rounded-lg opacity-50 cursor-not-allowed">
                <div>
                  <h3 className="font-semibold text-foreground">Connect to Live Agent Backend</h3>
                  <p className="text-sm text-muted-foreground mt-1">Require actual API connection. (Disabled in prototype build).</p>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed">
                  <input type="checkbox" className="sr-only peer" disabled />
                  <div className="w-11 h-6 bg-muted rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}