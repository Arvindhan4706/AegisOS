"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Search, Clock, Tag, ArrowDown, Sparkles } from "lucide-react";
import { useState } from "react";

const mockMemories = [
  { id: 'M-782', type: 'Episodic', mission: 'Emergency Infrastructure Coordination', outcome: 'Successful', confidence: 94, lesson: 'High-risk execution should require human approval.', tags: ['emergency', 'approval', 'routing', 'risk'], time: '2 hours ago' },
  { id: 'M-781', type: 'Procedural', mission: 'System Diagnostics', outcome: 'Successful', confidence: 99, lesson: 'Always check redundant paths before marking node dead.', tags: ['diagnostics', 'network', 'protocol'], time: '5 hours ago' },
  { id: 'M-780', type: 'Semantic', mission: 'Knowledge Graph Update', outcome: 'Successful', confidence: 91, lesson: 'API rate limits increased for resource endpoint.', tags: ['api', 'limits', 'knowledge'], time: '1 day ago' },
  { id: 'M-779', type: 'Episodic', mission: 'Database Migration', outcome: 'Failed', confidence: 85, lesson: 'Rollback triggered due to schema mismatch.', tags: ['database', 'migration', 'failure', 'schema'], time: '2 days ago' },
];

export default function MemoryPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Living Memory</h1>
          <p className="text-muted-foreground">Vector-based associative memory and knowledge retrieval</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search memories..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:border-primary transition-colors w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Memories */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex space-x-2 border-b border-border/50 pb-2">
            {['All', 'Working', 'Episodic', 'Semantic', 'Procedural'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? 'bg-primary/20 text-primary border border-primary/50' : 'text-muted-foreground hover:bg-muted'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mockMemories.filter(m => activeTab === 'All' || m.type === activeTab).map(memory => (
              <Card key={memory.id} className="glass-panel border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-status-ai/10 text-status-ai rounded border border-status-ai/20">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm text-primary">{memory.id}</span>
                          <Badge variant="outline" className="text-xs bg-muted/50">{memory.type}</Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground mt-0.5">{memory.mission}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs text-muted-foreground space-x-1 justify-end">
                        <Clock className="w-3 h-3" />
                        <span>{memory.time}</span>
                      </div>
                      <div className="mt-1 flex items-center space-x-1 justify-end">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <span className="text-sm font-mono text-status-healthy">{memory.confidence}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 border border-border/50 rounded p-3 mb-3">
                    <p className="text-sm text-foreground/90"><span className="text-primary font-semibold mr-2">Lesson:</span> {memory.lesson}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {memory.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-accent text-accent-foreground text-[10px]">
                          <Tag className="w-2.5 h-2.5 mr-1 opacity-50" /> {tag}
                        </Badge>
                      ))}
                    </div>
                    <Badge variant="outline" className={memory.outcome === 'Successful' ? 'border-status-healthy/50 text-status-healthy' : 'border-status-critical/50 text-status-critical'}>
                      {memory.outcome}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Col: Retrieval Vis */}
        <div className="space-y-6">
          <Card className="glass-panel border-status-ai/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-status-ai/5 rounded-full blur-3xl" />
            <CardHeader className="pb-3 border-b border-border/30">
              <CardTitle className="text-sm font-heading flex items-center text-status-ai">
                <Sparkles className="w-4 h-4 mr-2" />
                Live Context Injection
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="text-center p-3 border border-border/50 bg-background/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Current Task</p>
                <p className="text-sm font-medium">"Deploy infrastructure configuration"</p>
              </div>
              
              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-status-ai animate-bounce" />
              </div>

              <div className="text-center p-3 border border-status-ai/30 bg-status-ai/5 rounded-lg">
                <p className="text-xs text-status-ai mb-1 font-mono">Embedding Search (simulated)</p>
                <div className="h-1.5 w-full bg-status-ai/20 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-status-ai w-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(var(--status-ai), 1) 50%, transparent)' }} />
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-status-ai animate-bounce" />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-2">Top Relevant Memories</p>
                <div className="p-2 border border-status-healthy/30 bg-status-healthy/5 rounded text-xs flex justify-between items-center">
                  <span className="text-foreground">M-782: High-risk approval req</span>
                  <span className="font-mono text-status-healthy">0.942 sim</span>
                </div>
                <div className="p-2 border border-status-healthy/30 bg-status-healthy/5 rounded text-xs flex justify-between items-center opacity-80">
                  <span className="text-foreground">M-779: DB Migration failure</span>
                  <span className="font-mono text-status-healthy">0.871 sim</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}