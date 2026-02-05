
import React, { useState } from 'react';
import { researchMarketTrends } from '../services/geminiService';

const Researcher: React.FC = () => {
  const [query, setQuery] = useState('Gold Paper vs Physical Supply 2024');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);

  const handleResearch = async () => {
    setLoading(true);
    try {
      const data = await researchMarketTrends(query);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h2 className="text-3xl font-bold text-white mb-2">Deep Market Researcher</h2>
          <p className="text-slate-400">Accessing global financial databases, journals, and real-time exchange data.</p>
        </header>

        <div className="flex gap-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter commodity or market trend..."
          />
          <button 
            onClick={handleResearch}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 px-8 py-3 rounded-lg text-slate-950 font-bold disabled:bg-slate-700"
          >
            {loading ? <i className="fas fa-spinner animate-spin"></i> : 'RESEARCH'}
          </button>
        </div>

        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {result.text}
              </div>
            </div>

            {result.sources.length > 0 && (
              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-sm font-bold text-amber-500 uppercase mb-4 tracking-widest">Grounding Sources</h4>
                <div className="flex flex-wrap gap-3">
                  {result.sources.map((chunk, i) => (
                    chunk.web && (
                      <a 
                        key={i} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        className="bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full text-xs text-blue-400 flex items-center gap-2 transition-all"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        {chunk.web.title || 'Market Source'}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Researcher;
