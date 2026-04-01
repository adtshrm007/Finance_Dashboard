import React from 'react';
import { 
  LayoutGrid, 
  ArrowLeftRight, 
  BarChart3, 
  Wallet, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { toast } from 'sonner';

const topIcons = [
  { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { id: 'transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'wallet', icon: Wallet, label: 'Wallet' },
  { id: 'history', icon: FileText, label: 'History' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const bottomIcons = [
  { id: 'help', icon: HelpCircle, label: 'Support' },
  { id: 'logout', icon: LogOut, label: 'Logout' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const handleNavClick = (id, label) => {
    setActiveTab(id);
    toast.success(`Navigated to ${label}`);
  };

  const handleActionClick = (label) => {
    toast.info(`Opening ${label}...`);
  };

  return (
    <aside className="hidden md:flex w-20 h-screen sticky top-0 flex-col items-center py-8 bg-slate-950 border-r border-slate-800 z-50">
      <div className="flex-1 flex flex-col items-center gap-4">
        {topIcons.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.label)}
              className={`p-3 rounded-2xl transition-all relative group active:scale-75 ${
                isActive 
                ? 'bg-primary-400 text-black shadow-lg shadow-primary-400/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {!isActive && (
                <div className="absolute left-16 bg-slate-900 border border-slate-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 font-bold shadow-xl">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 border-t border-slate-800 pt-6">
        {bottomIcons.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => item.id === 'logout' ? toast.error('Logging out...') : handleActionClick(item.label)}
              className="p-3 rounded-2xl text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition-all group relative active:scale-75"
            >
              <Icon size={20} />
              <div className="absolute left-16 bg-slate-900 border border-slate-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 font-bold shadow-xl">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
