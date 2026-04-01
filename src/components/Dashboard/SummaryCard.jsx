import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

export default function SummaryCard({ title, amount, icon: Icon, percentage, trend }) {
  const handleCardClick = () => {
    toast.info(`Filtering dashboard by ${title}`, {
      description: 'The charts and tables are now updated.'
    });
  };

  return (
    <div 
      className="monetra-card p-6 bg-slate-900 border-slate-800 hover:border-primary-400 group cursor-pointer active:scale-95 transition-all"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-2xl bg-slate-800 text-slate-400 group-hover:bg-primary-400 group-hover:text-black transition-all">
          <Icon size={20} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black ${trend === 'up' ? 'text-primary-400' : 'text-rose-500'}`}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{percentage}%</span>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-primary-400 transition-colors">
          ${amount.toLocaleString()}
        </h3>
      </div>
    </div>
  );
}
