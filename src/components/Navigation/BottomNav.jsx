import React from 'react';
import { LayoutGrid, ArrowLeftRight, BarChart3, Wallet, User } from 'lucide-react';
import { toast } from 'sonner';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Home' },
    { id: 'transactions', icon: ArrowLeftRight, label: 'Transact' },
    { id: 'analytics', icon: BarChart3, label: 'Insights' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 z-50 backdrop-blur-lg bg-opacity-90 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              toast.success(`Active: ${item.label}`);
            }}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-75 ${
              isActive ? 'text-primary-400' : 'text-slate-500'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-primary-400/10' : ''}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
