'use client';

import React, { useState } from 'react';
import { BlockchainService } from '@/lib/blockchainService';
import { ShieldCheck, Cpu, Key, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

export const BlockchainIssuer: React.FC = () => {
  const [studentRoll, setStudentRoll] = useState('1DT22CS045');
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('A+ Distinction');
  const [isMining, setIsMining] = useState(false);
  const [successTx, setSuccessTx] = useState<string | null>(null);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsMining(true);
    setSuccessTx(null);

    // Simulate block mining delay
    setTimeout(() => {
      const tx = BlockchainService.generateTxHash();
      setSuccessTx(tx);
      setIsMining(false);
      setTitle('');
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-purple-400" />
            <span>Polygon Smart Contract Issuer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directly invoke ERC-721 `issueCredential` smart contract on Polygon PoS mainnet.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-purple-950/40 border border-purple-500/30 px-3.5 py-2 text-xs font-semibold text-purple-300">
          <Key className="h-4 w-4 text-purple-400" />
          <span>Faculty Signer: Dr. Sarah Jenkins (HOD)</span>
        </div>
      </div>

      {/* Form & Contract Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Form */}
        <div className="md:col-span-2 glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Issue Direct Verified Credential</h3>

          <form onSubmit={handleIssue} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Student Roll Number</label>
              <input
                type="text"
                required
                value={studentRoll}
                onChange={e => setStudentRoll(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Credential / Project Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Capstone Project - Autonomous ViT"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Academic Grade / Evaluation</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="A+ Distinction">A+ Distinction (Honors)</option>
                <option value="A Distinction">A Distinction</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isMining}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-500 disabled:opacity-50 transition shadow-lg shadow-purple-600/30"
            >
              {isMining ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Signing & Mining Polygon Transaction...</span>
                </>
              ) : (
                <>
                  <span>Sign & Mint ERC-721 Token</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {successTx && (
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Credential Successfully Minted on Polygon!</span>
              </div>
              <div className="font-mono text-slate-300 text-[11px] break-all">
                Tx Hash: {successTx}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Contract Info */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contract Metadata</h4>
          
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400">Network:</span>
              <div className="text-white font-bold font-mono">Polygon PoS Mainnet</div>
            </div>
            <div>
              <span className="text-slate-400">Contract Standard:</span>
              <div className="text-purple-400 font-mono font-bold">ERC-721 (VerifiableCredential)</div>
            </div>
            <div>
              <span className="text-slate-400">Contract Address:</span>
              <div className="text-slate-200 font-mono text-[10px] break-all bg-slate-950 p-2 rounded border border-slate-800">
                {BlockchainService.CONTRACT_ADDRESS}
              </div>
            </div>
            <div>
              <span className="text-slate-400">IPFS Pinning Service:</span>
              <div className="text-emerald-400 font-bold">Pinata Cloud Gateway</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
