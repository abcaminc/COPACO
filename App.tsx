
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AuditTool from './components/AuditTool';
import ChatBot from './components/ChatBot';
import About from './components/About';
import Researcher from './components/Researcher';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'audit':
        return <AuditTool />;
      case 'research':
        return <Researcher />;
      case 'chat':
        return <ChatBot />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a,transparent)] pointer-events-none opacity-50"></div>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
