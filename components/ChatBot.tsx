
import React, { useState, useRef, useEffect } from 'react';
import { chatWithCOPACO } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings. I am COPACO. I am currently monitoring global commodity exchanges for paper-to-physical divergence. How can I assist your market research today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithCOPACO(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || 'I encountered a processing anomaly. Please retry.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Error accessing the financial databases. Connection failure.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">COPACO Agent Terminal</h2>
        <p className="text-slate-400">Direct neural interface with the Commodity Paper Contract monitoring system.</p>
      </header>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-amber-500 text-slate-900 font-medium ml-12' 
                  : 'bg-slate-800 text-slate-200 mr-12 border border-slate-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-amber-500 px-4 py-2 rounded-2xl animate-pulse">
                Agent COPACO is reasoning...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-800/50 border-t border-slate-800 flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Gold rehypothecation, LBMA silver inventory, or market manipulation..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button 
            onClick={handleSend}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
          >
            SEND <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
