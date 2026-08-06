'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  Smartphone,
  Copy,
  Check,
  Bell,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  phone?: string;
  role: string;
  generatedOtp: string;
  onVerifySuccess: () => void;
  onResendOtp: () => void;
  onBack: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  phone = '+91 98765 43210',
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [mfaMethod, setMfaMethod] = useState<'email' | 'authenticator'>('email');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    const code = otpDigits.join('');
    if (code.length === 6 && !isSubmitting && !isSuccess) {
      verifyCode(code);
    }
  }, [otpDigits]);

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    const lastChar = value.slice(-1);
    if (value && isNaN(Number(lastChar))) return;

    const newDigits = [...otpDigits];
    newDigits[index] = lastChar;
    setOtpDigits(newDigits);
    setError(null);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Paste event (e.g. pasting "849201")
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digitsOnly = pastedData.replace(/\D/g, '').slice(0, 6);

    if (digitsOnly.length > 0) {
      const newDigits = ['', '', '', '', '', ''];
      for (let i = 0; i < digitsOnly.length; i++) {
        newDigits[i] = digitsOnly[i];
      }
      setOtpDigits(newDigits);
      setError(null);
      
      // Focus appropriate box
      const nextIndex = Math.min(digitsOnly.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Handle keyboard navigation (Backspace, Arrow keys)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Copy simulated code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedOtp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Auto-fill code from toast banner
  const handleAutoFill = () => {
    const digits = generatedOtp.split('');
    setOtpDigits(digits);
    setError(null);
  };

  // Verification Logic
  const verifyCode = (code: string) => {
    if (code !== generatedOtp) {
      setError(`Invalid verification code. Try entering: ${generatedOtp}`);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        onVerifySuccess();
      }, 900);
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }
    verifyCode(entered);
  };

  const handleResend = () => {
    onResendOtp();
    setTimer(60);
    setOtpDigits(['', '', '', '', '', '']);
    setError(null);
    setShowToast(true);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-md space-y-4">
      
      {/* Simulated Email / SMS Dispatch Toast Alert */}
      {showToast && (
        <div className="bg-slate-900/95 border border-indigo-500/40 p-3.5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center justify-between text-xs animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Mail className="h-4 w-4 animate-bounce" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Security Code Sent</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">Inbox</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Code for <span className="text-slate-200 font-medium">{email}</span>: <strong className="font-mono text-amber-400 font-extrabold">{generatedOtp}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
              title="Copy code"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleAutoFill}
              className="rounded-lg bg-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white hover:bg-indigo-500 transition shadow"
            >
              Auto-Fill
            </button>
          </div>
        </div>
      )}

      {/* Main 2FA Security Card */}
      <div className="glass-panel w-full rounded-2xl p-8 space-y-6 border border-indigo-500/30 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        
        {/* Success Overlay Animation */}
        {isSuccess && (
          <div className="absolute inset-0 bg-slate-950/95 z-30 flex flex-col items-center justify-center p-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-extrabold text-white">2FA Verification Approved</h3>
            <p className="text-xs text-slate-400">Cryptographic session initialized. Redirecting to workspace...</p>
          </div>
        )}

        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
              <KeyRound className="h-7 w-7 text-indigo-400 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Two-Factor Authentication</h2>
          <p className="text-xs text-slate-300">
            Enter the 6-digit SMS security code sent to <span className="font-semibold text-amber-300">{phone}</span> ({email}) to authorize your <span className="font-semibold capitalize text-emerald-400">{role.replace('_', ' ')}</span> session.
          </p>
        </div>

        {/* 2FA Method Selector */}
        <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMfaMethod('email')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition ${
              mfaMethod === 'email'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email / SMS OTP</span>
          </button>
          <button
            type="button"
            onClick={() => setMfaMethod('authenticator')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition ${
              mfaMethod === 'authenticator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Authenticator TOTP</span>
          </button>
        </div>

        {/* 6-Digit Code Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
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
                  onPaste={handlePaste}
                  className={`h-12 w-12 rounded-xl border text-center font-mono text-xl font-extrabold text-white shadow-inner focus:outline-none transition ${
                    error
                      ? 'border-rose-500/60 bg-rose-950/20 focus:border-rose-500'
                      : digit
                        ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300'
                        : 'border-slate-800 bg-slate-900 focus:border-indigo-500 focus:bg-slate-950'
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 text-center">
              Tip: You can paste a 6-digit code directly into any box.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-bold text-white hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Verifying 2FA Session Hash...</span>
              </>
            ) : (
              <>
                <span>Verify & Complete Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation & Resend Timer */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-white transition font-medium"
          >
            ← Change Email / Role
          </button>

          <div>
            {timer > 0 ? (
              <span>Resend code in <strong className="font-mono text-indigo-400 font-bold">{timer}s</strong></span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-indigo-400 font-semibold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Resend Code</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
