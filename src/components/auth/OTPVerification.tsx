'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, RefreshCw, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  role: string;
  generatedOtp: string;
  onVerifySuccess: () => void;
  onResendOtp: () => void;
  onBack: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  role,
  generatedOtp,
  onVerifySuccess,
  onResendOtp,
  onBack
}) => {
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setError(null);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFillDemoOtp = () => {
    const digits = generatedOtp.split('');
    setOtpDigits(digits);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    if (entered !== generatedOtp) {
      setError(`Invalid OTP code. Try entering: ${generatedOtp}`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onVerifySuccess();
    }, 1000);
  };

  return (
    <div className="glass-panel w-full max-w-md rounded-2xl p-8 space-y-6 border border-indigo-500/30 shadow-2xl backdrop-blur-2xl">
      
      {/* Security Badge */}
      <div className="text-center space-y-2">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
            <KeyRound className="h-7 w-7 text-indigo-400 animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-2xl font-extrabold text-white tracking-tight">2FA Security Verification</h2>
        <p className="text-xs text-slate-300">
          We sent a 6-digit authentication code to <span className="font-semibold text-indigo-300">{email}</span> for your <span className="font-semibold capitalize text-emerald-400">{role.replace('_', ' ')}</span> session.
        </p>
      </div>

      {/* Generated Demo OTP Toast Banner */}
      <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30 text-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Generated Security OTP:</span>
          <span className="font-mono text-base font-extrabold text-amber-400 tracking-widest">{generatedOtp}</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemoOtp}
          className="rounded-lg bg-indigo-600/30 border border-indigo-500/40 px-3 py-1.5 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition"
        >
          Auto-Fill OTP
        </button>
      </div>

      {/* 6 Digit Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="h-12 w-12 rounded-xl border border-slate-800 bg-slate-900 text-center font-mono text-xl font-extrabold text-white shadow-inner focus:border-indigo-500 focus:bg-slate-950 focus:outline-none transition"
            />
          ))}
        </div>

        {error && (
          <p className="text-xs text-rose-400 text-center font-semibold bg-rose-500/10 p-2 rounded-xl border border-rose-500/20">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-bold text-white hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-600/30"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Verifying Cryptographic Session...</span>
            </>
          ) : (
            <>
              <span>Verify & Access Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer Timer & Resend */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-white transition"
        >
          ← Change Email / Role
        </button>

        <div>
          {timer > 0 ? (
            <span>Resend in <strong className="font-mono text-indigo-400">{timer}s</strong></span>
          ) : (
            <button
              onClick={() => {
                onResendOtp();
                setTimer(60);
              }}
              className="text-indigo-400 font-semibold hover:underline"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
