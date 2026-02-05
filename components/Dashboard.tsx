
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { INITIAL_COMMODITIES } from '../constants';

const Dashboard: React.FC = () => {
  const chartData = INITIAL_COMMODITIES.map(c => ({
    name: c.name,
    ratio: c.leverageRatio,
    premium: c.premium
  }));

  return (
    <div className="p-8 h-full overflow-y-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Global Commodity Intelligence</h2>
        <p className="text-slate-400">Monitoring divergence in paper vs. physical markets across COMEX, LBMA, CME, and ICE.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {INITIAL_COMMODITIES.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{c.exchange}</span>
                <h3 className="text-2xl font-bold text-white">{c.name}</h3>
              </div>
              <div className="bg-slate-800 px-3 py-1 rounded text-sm text-slate-300">
                {c.symbol}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 text-sm">Paper Price</span>
                <span className="text-xl font-mono text-white">${c.paperPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-slate-500 text-sm">Physical Est.</span>
                <span className="text-xl font-mono text-amber-500">${c.physicalPrice.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-400">Paper-to-Physical Leverage</span>
                  <span className="text-xs font-bold text-red-500">{c.leverageRatio}:1</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-red-500 h-full" 
                    style={{ width: `${Math.min(c.leverageRatio / 3, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h4 className="text-lg font-bold mb-6 text-white">Leverage Ratio by Commodity</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Bar dataKey="ratio" fill="#f59e0b">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.ratio > 100 ? '#ef4444' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h4 className="text-lg font-bold mb-6 text-white">Physical Scarcity Premium (%)</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="premium" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPremium)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
