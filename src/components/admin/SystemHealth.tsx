'use client';

import React from 'react';
import { INITIAL_SYSTEM_METRICS } from '@/lib/mockData';
import { Server, Cpu, Database, Flame, ShieldCheck, Activity } from 'lucide-react';

export const SystemHealth: React.FC = () => {
  const metrics = INITIAL_SYSTEM_METRICS;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Server className="h-6 w-6 text-purple-400" />
            <span>Infrastructure System & Polygon Gas Monitor</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry for Docker microservices, Qdrant vector DB, and Polygon node RPC response.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 text-xs font-semibold text-emerald-400">
          <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>All Systems Operational (99.99% Uptime)</span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Polygon Gas Price</span>
          <div className="text-3xl font-extrabold text-purple-400 mt-2 font-mono">{metrics.polygonGasGwei} Gwei</div>
          <p className="mt-2 text-xs text-emerald-400 font-semibold">✓ Low Network Congestion</p>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Qdrant Vector Index</span>
          <div className="text-3xl font-extrabold text-indigo-400 mt-2 font-mono">148.2k</div>
          <p className="mt-2 text-xs text-slate-400">Dense Vectors (1536 dim)</p>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">AI Model Latency</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">{metrics.aiModelLatencyMs} ms</div>
          <p className="mt-2 text-xs text-slate-400">P95 Response (GPT-5.5)</p>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Docker Microservices</span>
          <div className="text-3xl font-extrabold text-cyan-400 mt-2 font-mono">7 / 7</div>
          <p className="mt-2 text-xs text-slate-400">Fargate Container Clusters</p>
        </div>

      </div>

      {/* Service Telemetry Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">
          Microservice Container Status
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="py-3 px-4">Container</th>
              <th className="py-3 px-4">Tech Stack</th>
              <th className="py-3 px-4">CPU Usage</th>
              <th className="py-3 px-4">Memory</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {[
              { name: 'auth-service', tech: 'Node.js / Express', cpu: '0.4%', mem: '142 MB', status: 'Healthy' },
              { name: 'core-api', tech: 'Node.js / Express', cpu: '1.2%', mem: '210 MB', status: 'Healthy' },
              { name: 'ai-service', tech: 'FastAPI / Python', cpu: '3.8%', mem: '580 MB', status: 'Healthy' },
              { name: 'blockchain-service', tech: 'Node / Hardhat', cpu: '0.8%', mem: '185 MB', status: 'Healthy' },
              { name: 'notification-service', tech: 'BullMQ / Redis', cpu: '0.2%', mem: '98 MB', status: 'Healthy' },
              { name: 'qdrant-db', tech: 'Qdrant Rust Engine', cpu: '2.1%', mem: '840 MB', status: 'Healthy' },
            ].map(svc => (
              <tr key={svc.name} className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-mono font-semibold text-white">{svc.name}</td>
                <td className="py-3 px-4 text-slate-400">{svc.tech}</td>
                <td className="py-3 px-4 font-mono">{svc.cpu}</td>
                <td className="py-3 px-4 font-mono">{svc.mem}</td>
                <td className="py-3 px-4 font-bold text-emerald-400">● {svc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
