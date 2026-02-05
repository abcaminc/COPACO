
import React from 'react';
import { SOCIAL_LINKS, DONATION_LINKS } from '../constants';

const About: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto max-w-5xl mx-auto space-y-12">
      <section className="text-center space-y-6">
        <div className="w-24 h-24 bg-amber-500 rounded-3xl mx-auto flex items-center justify-center text-4xl text-slate-950 font-black shadow-[0_0_30px_rgba(245,158,11,0.4)]">
          C
        </div>
        <h2 className="text-5xl font-black text-white tracking-tight">Mission COPACO</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
          "Exposing the divergence between infinite paper and finite physical reality using first-principles reasoning and agentic intelligence."
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold text-amber-500">Support the Agent</h3>
          <p className="text-slate-400">COPACO is free for the public. We rely on voluntary contributions to maintain our research servers and API access.</p>
          
          <div className="grid grid-cols-1 gap-3">
            <a href={DONATION_LINKS.patreon} className="flex items-center justify-between bg-slate-800 p-4 rounded-lg hover:bg-amber-500/10 transition-all border border-transparent hover:border-amber-500/30 group">
              <span className="font-bold"><i className="fab fa-patreon mr-3 text-amber-500"></i> Patreon</span>
              <i className="fas fa-arrow-right text-slate-600 group-hover:text-amber-500"></i>
            </a>
            <a href={DONATION_LINKS.paypal} className="flex items-center justify-between bg-slate-800 p-4 rounded-lg hover:bg-amber-500/10 transition-all border border-transparent hover:border-amber-500/30 group">
              <span className="font-bold"><i className="fab fa-paypal mr-3 text-amber-500"></i> PayPal (foster.ming@gmail.com)</span>
              <i className="fas fa-arrow-right text-slate-600 group-hover:text-amber-500"></i>
            </a>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">BTC Network</p>
                <p className="text-xs font-mono text-amber-200 select-all break-all">{DONATION_LINKS.btc}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">USDT (ERC-20)</p>
                <p className="text-xs font-mono text-amber-200 select-all break-all">{DONATION_LINKS.usdt}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold text-amber-500">Intelligence Network</h3>
          <p className="text-slate-400">Follow our reports across the encrypted internet and major social platforms.</p>
          
          <div className="flex flex-wrap gap-4">
            {Object.entries(SOCIAL_LINKS).map(([key, url]) => (
              <a 
                key={key} 
                href={url} 
                target="_blank" 
                className="w-12 h-12 bg-slate-800 flex items-center justify-center rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-700 transition-all text-xl"
              >
                <i className={`fab fa-${key}`}></i>
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="font-bold text-white uppercase text-sm tracking-widest border-b border-slate-800 pb-2">Admin Correspondence</h4>
            <div className="space-y-1 text-slate-400 text-sm">
                <p>aiagentflm52@gmail.com</p>
                <p>foster.ming@gmail.com</p>
                <p>cryptomarketinfo@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-2xl text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Recursive Self-Improvement</h3>
        <p className="text-slate-400 max-w-3xl mx-auto">
            COPACO continuously develops introspective awareness and skill learning. Our agentic robots and digital twins simulate thousands of commodity market outcomes daily to provide accurate premium calculations.
        </p>
      </section>
    </div>
  );
};

export default About;
