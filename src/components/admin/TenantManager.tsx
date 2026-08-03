'use client';

import React from 'react';
import { UNIVERSITIES } from '@/lib/mockData';
import { Building, ShieldCheck, Plus, CheckCircle2, Layers, Globe } from 'lucide-react';

export const TenantManager: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Building className="h-6 w-6 text-purple-400" />
            <span>Multi-Tenant University Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global SaaS tenant administration, data isolation, and Polygon contract registry.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition shadow-lg shadow-purple-600/30">
          <Plus className="h-4 w-4" />
          Onboard New University Tenant
        </button>
      </div>

      {/* Tenants Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {UNIVERSITIES.map(uni => (
          <div key={uni.id} className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{uni.name}</h3>
                  <p className="text-xs text-slate-400">{uni.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Tenant Plan:</span>
                <span className="text-purple-400 font-bold">Enterprise SaaS</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Verified Students:</span>
                <span className="text-white font-mono font-bold">4,820</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Polygon Contract Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center text-xs">
              <span className="text-slate-400">ID: {uni.id}</span>
              <button className="text-indigo-400 font-semibold hover:underline">Manage Tenant Config →</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
