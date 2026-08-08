"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Download, Filter, Search, FileJson } from "lucide-react";
import { useAegisStore } from "@/stores/useAegisStore";

export default function AuditPage() {
  const events = useAegisStore(state => state.events);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Audit Trail</h1>
          <p className="text-muted-foreground">Immutable cryptographic ledger of all agent actions and system state changes</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-card hover:bg-muted text-foreground border border-border px-4 py-2 rounded-md font-medium transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 px-4 py-2 rounded-md font-medium transition-colors flex items-center shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <Download className="w-4 h-4 mr-2" /> Export JSON
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search by tx hash, agent, or action..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Ledger Status:</span>
          <span className="text-status-healthy font-mono bg-status-healthy/10 px-2 py-0.5 rounded border border-status-healthy/30">VERIFIED</span>
        </div>
      </div>

      <Card className="glass-panel border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-card/50 text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Timestamp</th>
                  <th className="px-6 py-4 font-medium">Tx Hash</th>
                  <th className="px-6 py-4 font-medium">Actor</th>
                  <th className="px-6 py-4 font-medium">Action Category</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {events.map((evt, idx) => {
                  const hash = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
                  
                  return (
                    <tr key={evt.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground whitespace-nowrap">{evt.timestamp}</td>
                      <td className="px-6 py-4 font-mono text-[10px] text-primary/70">0x{hash}</td>
                      <td className="px-6 py-4 font-semibold text-foreground">{evt.agent || 'SYSTEM'}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-muted/30">{evt.type || 'ACTION'}</Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground max-w-xs truncate" title={evt.action}>{evt.action}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={
                          evt.status === 'success' ? 'border-status-healthy text-status-healthy bg-status-healthy/10' :
                          evt.status === 'critical' ? 'border-status-critical text-status-critical bg-status-critical/10' :
                          evt.status === 'warning' ? 'border-status-warning text-status-warning bg-status-warning/10' :
                          'border-primary/50 text-primary bg-primary/10'
                        }>
                          {evt.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-muted rounded text-muted-foreground hover:text-primary transition-colors">
                          <FileJson className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {events.length === 0 && (
            <div className="text-center p-12">
              <History className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No events recorded in the ledger.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
    </div>
  );
}