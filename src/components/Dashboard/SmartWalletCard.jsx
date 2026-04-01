import React from 'react';
import { Plus, Hotel, Plane, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const goals = [
  { icon: Hotel, label: 'Property', color: 'bg-orange-500/20 text-orange-500' },
  { icon: Plane, label: 'Travel', color: 'bg-emerald-500/20 text-emerald-500' },
  { icon: GraduationCap, label: 'Education', color: 'bg-purple-500/20 text-purple-500' },
];

export default function SmartWalletCard({ balance }) {
  const handleGoalClick = (label) => {
    toast.info(`Viewing ${label} goal progress`, {
      description: 'You are 65% closer to your target.',
    });
  };

  const handleAddGoal = () => {
    toast.success('Goal creation wizard opened');
  };

  return (
    <div className="monetra-card p-8 bg-primary-400 text-black h-full flex flex-col justify-between group cursor-pointer active:scale-[0.98] transition-all shadow-xl shadow-primary-400/10">
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="font-black text-[10px] uppercase tracking-widest opacity-60">Smart Wallet</span>
          <Plus 
            size={20} 
            className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" 
            onClick={(e) => { e.stopPropagation(); handleAddGoal(); }}
          />
        </div>
        <h2 className="text-4xl font-black tracking-tighter mb-1">${balance.toLocaleString()}</h2>
        <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Total Savings</p>
      </div>

      <div className="flex gap-3 mt-8">
        {goals.map((goal, i) => (
          <button 
            key={i}
            onClick={(e) => { e.stopPropagation(); handleGoalClick(goal.label); }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-75 ${goal.color} bg-black/10 hover:bg-black/20`}
          >
            <goal.icon size={18} />
          </button>
        ))}
        <button 
          onClick={(e) => { e.stopPropagation(); handleAddGoal(); }}
          className="w-10 h-10 rounded-2xl border-2 border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/30 transition-all active:scale-75"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
