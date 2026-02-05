
import React, { useState } from 'react';
import { getAuditAnalysis } from '../services/geminiService';
import { AuditReport } from '../types';

const AuditTool: React.FC = () => {
  const [commodity, setCommodity] = useState('Gold');
  const [paperPrice, setPaperPrice] = useState(2050);
  const [ratio, setRatio] = useState(300);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);

  const handleAudit = async () => {
    setLoading(true);
    try {
      const result = await getAuditAnalysis(commodity, paperPrice, ratio);
      setReport(result);
    } catch (error) {
      console.error("Audit failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h2 className="text-3xl font-bold text-white mb-2">Paper Position Audit Engine</h2>
          <p className="text-slate-400">Auditing futures, options, and swaps for rehypothecation and scarcity risk.</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Commodity</label>
              <input 
                type="text" 
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Current Paper Price ($)</label>
              <input 
                type="number" 
                value={paperPrice}
                onChange={(e) => setPaperPrice(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Estimated Paper:Physical Ratio</label>
              <input 
                type="number" 
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button 
            onClick={handleAudit}
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-900 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <><i className="fas fa-circle-notch animate-spin"></i> Analyzing Positions...</>
            ) : (
              <><i className="fas fa-shield-halved"></i> Execute Legal Market Audit</>
            )}
          </button>
        </div>

        {report && (
          <div className="bg-slate-900 border-l-4 border-amber-500 p-8 rounded-r-xl shadow-2xl animate-fade-in space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white uppercase">{report.commodity} Audit Report</h3>
                <p className="text-slate-500 text-sm">{report.timestamp}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                report.metrics.manipulationRisk === 'Extreme' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'
              }`}>
                {report.metrics.manipulationRisk} Risk
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-500 uppercase">Leverage Ratio</p>
                <p className="text-lg font-bold text-white">{report.metrics.paperToPhysicalRatio}:1</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-500 uppercase">Rehypothecation</p>
                <p className="text-lg font-bold text-white">{report.metrics.rehypothecationIndex.toFixed(1)}x</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-500 uppercase">Anomaly Status</p>
                <p className={`text-lg font-bold ${report.metrics.anomalyDetected ? 'text-red-500' : 'text-green-500'}`}>
                  {report.metrics.anomalyDetected ? 'DETECTED' : 'NOMINAL'}
                </p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-500 uppercase">Audit Status</p>
                <p className="text-lg font-bold text-blue-400">VERIFIED</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-2">First Principles Summary</h4>
              <p className="text-slate-300 leading-relaxed">{report.summary}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Strategic Recommendations</h4>
              <ul className="space-y-2">
                {report.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 italic">
                    <i className="fas fa-caret-right text-amber-500 mt-1"></i>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-6 flex gap-4">
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors">
                <i className="fas fa-file-pdf mr-2"></i> Export PDF
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors">
                <i className="fas fa-envelope mr-2"></i> Send to Foster Ming
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTool;
