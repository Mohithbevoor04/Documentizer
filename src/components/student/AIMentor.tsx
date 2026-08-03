'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AIService } from '@/lib/aiService';
import { Bot, Send, Sparkles, User, Cpu, BookOpen, ChevronRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: string[];
}

export const AIMentor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_01',
      sender: 'ai',
      text: 'Hello Alex! I am your AI Career Mentor powered by GPT-5.5 and Qdrant RAG. I have indexed your university curriculum, verified project credentials on Polygon, and current top corporate hiring benchmarks. How can I guide your career today?',
      timestamp: '10:42 AM',
      citations: ['University Syllabus 2026', 'Polygon Verified Profile', 'Qdrant Job Embedding Engine']
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate RAG retrieval & response generation
    const responseText = await AIService.queryAIMentor(query, 'Alex Rivera');

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: ['Polygon Credential #7482', 'DSATM Academic Database', 'Vector Job Match Index']
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const suggestedPrompts = [
    'How do my verified projects match with Polygon Labs?',
    'What skills should I learn to reach a 98 AI Career Score?',
    'Evaluate my resume for AI Systems Engineer roles.'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-indigo-400" />
            <span>AI Career Mentor (RAG Engine)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Contextual reasoning powered by GPT-5.5, student profile vectors & Qdrant database.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 text-xs text-indigo-300 font-semibold">
          <Cpu className="h-4 w-4 text-indigo-400" />
          <span>Active Context: Alex Rivera (CGPA: 9.4)</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel rounded-2xl p-6 h-[480px] flex flex-col justify-between overflow-hidden">
        
        <div className="overflow-y-auto space-y-4 pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-md">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-lg'
                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                
                {msg.citations && (
                  <div className="border-t border-slate-800/80 pt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">RAG Sources:</span>
                    {msg.citations.map((c, i) => (
                      <span key={i} className="text-[9px] bg-slate-950 px-2 py-0.5 rounded text-indigo-300 border border-slate-800">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-[9px] opacity-60 text-right">{msg.timestamp}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="h-8 w-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <Bot className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
                <span>Searching vector database & synthesizing response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="flex items-center gap-1 text-[11px] rounded-lg bg-slate-900 px-3 py-1.5 text-slate-300 hover:bg-indigo-600 hover:text-white transition border border-slate-800"
              >
                <span>{prompt}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask your AI Career Mentor anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="rounded-xl bg-indigo-600 p-2.5 text-white hover:bg-indigo-500 disabled:opacity-50 transition shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
