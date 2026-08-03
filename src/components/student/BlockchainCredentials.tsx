'use client';

import React, { useState } from 'react';
import { CredentialRecord } from '@/types';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  QrCode, 
  Copy, 
  Check, 
  FileJson,
  Layers,
  Sparkles
} from 'lucide-react';

interface BlockchainCredentialsProps {
  credentials: CredentialRecord[];
}

export const BlockchainCredentials: React.FC<BlockchainCredentialsProps> = ({ credentials }) => {
  const [selectedCred, setSelectedCred] = useState<CredentialRecord | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(type);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="h-6 w-6 text-purple-400" />
            <span>Polygon Verifiable Credentials</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-proof academic certificates and project credentials anchored on Polygon PoS.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-purple-950/40 border border-purple-500/30 px-3.5 py-2 text-xs font-semibold text-purple-300">
          <ShieldCheck className="h-4 w-4 text-purple-400" />
          <span>Smart Contract: ERC-721 Token Standard</span>
        </div>
      </div>

      {/* Credentials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {credentials.map(cred => (
          <div key={cred.id} className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden space-y-4">
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                    <Award className="h-6 w-6 text-purple-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{cred.title}</h3>
                  <p className="text-xs text-slate-400">{cred.universityName}</p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Valid
              </span>
            </div>

            <p className="text-xs text-slate-300">{cred.metadata.description}</p>

            <div className="space-y-2 text-xs font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400">
                <span>Polygon Tx Hash:</span>
                <button
                  onClick={() => handleCopy(cred.txHash, `tx_${cred.id}`)}
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                >
                  {copiedHash === `tx_${cred.id}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{cred.txHash.substring(0, 10)}...</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>IPFS CID:</span>
                <button
                  onClick={() => handleCopy(cred.ipfsHash, `ipfs_${cred.id}`)}
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300"
                >
                  {copiedHash === `ipfs_${cred.id}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{cred.ipfsHash.substring(0, 12)}...</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
              <div className="text-[11px] text-slate-400">
                Issued by <span className="text-slate-200 font-semibold">{cred.issuerName}</span> on {cred.issuedAt}
              </div>

              <button
                onClick={() => setSelectedCred(cred)}
                className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/50 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/60 transition"
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>Verify Credential</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Verification Inspector Modal */}
      {selectedCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 space-y-5 border border-purple-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-400" />
                <span>On-Chain Credential Verification</span>
              </h3>
              <button onClick={() => setSelectedCred(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 bg-white p-4 rounded-2xl shadow-xl">
              <img src={selectedCred.qrCode} alt="Verification QR Code" className="h-40 w-40" />
              <span className="text-[10px] font-mono text-slate-800 font-semibold text-center">
                Scan to verify on Polygon Ledger
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Credential Subject:</span>
                <span className="text-white font-bold">{selectedCred.studentName} ({selectedCred.studentRoll})</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ERC-721 Token ID:</span>
                <span className="text-purple-400 font-mono font-bold">#{selectedCred.tokenId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Contract Address:</span>
                <span className="text-slate-200 font-mono text-[10px]">{selectedCred.contractAddress}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={`https://polygonscan.com/tx/${selectedCred.txHash}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition shadow-md"
              >
                <span>Explorer Link</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
