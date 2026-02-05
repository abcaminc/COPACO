
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Market Dashboard', icon: 'fa-chart-line' },
    { id: 'audit', label: 'Paper-to-Physical Audit', icon: 'fa-file-invoice-dollar' },
    { id: 'research', label: 'AI Researcher', icon: 'fa-microscope' },
    { id: 'chat', label: 'COPACO Chat', icon: 'fa-robot' },
    { id: 'about', label: 'Donations & Info', icon: 'fa-circle-info' },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          C
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">COPACO <span className="text-amber-500 text-xs block">AI Agent</span></h1>
      </div>
      
      <nav className="flex-1 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-amber-500/10 border-r-4 border-amber-500 text-amber-500' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${tab.icon} w-5`}></i>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 text-xs text-slate-500 border-t border-slate-800">
        <p className="mb-2">v2.5 Sentinel</p>
        <p>© 2024 ABC AM INC</p>
      </div>
    </div>
  );
};

export default Sidebar;
