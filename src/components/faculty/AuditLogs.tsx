'use client';

import React, { useState } from 'react';
import { AuditLog } from '@/types';
import { History, ShieldCheck, Search, FileText } from 'lucide-react';

interface AuditLogsProps {
  logs: AuditLog[];
}

export const AuditLogs: React.FC<AuditLogsProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = logs.filter(l => 
    l.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <History className="h-6 w-6 text-indigo-400" />
            <span>Cryptographic Audit Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            FERPA & SOC2 compliant immutable action log tracking all verification & blockchain minting events.
          </p>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Artifact</th>
                <th className="py-3.5 px-4">Tx Hash</th>
                <th className="py-3.5 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4 font-semibold text-white">{log.actorName}</td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-indigo-400 border border-slate-800 capitalize">
                      {log.actorRole}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-400">{log.action}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{log.target}</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-purple-400">
                    {log.hash ? `${log.hash.substring(0, 12)}...` : 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
