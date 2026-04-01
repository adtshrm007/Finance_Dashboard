import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { categories } from '../../data/mockData';

export default function InsightsSection() {
  const { state } = useFinance();

  // Spending by category
  const spendingData = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const highestCatId = Object.keys(spendingData).reduce((a, b) => spendingData[a] > spendingData[b] ? a : b, '');
  const highestCat = categories.find(c => c.id === highestCatId)?.name || 'N/A';

  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0;

  const insights = [
    {
      title: "Highest Spending",
      value: highestCat,
      desc: `Your top expense category is ${highestCat}.`,
      icon: AlertCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      desc: "You are saving 22% more than last month.",
      icon: TrendingUp,
      color: "text-primary-400",
      bg: "bg-primary-400/10"
    },
    {
      title: "Budget Status",
      value: "On Track",
      desc: "All monthly budgets are within limits.",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {insights.map((insight, i) => (
        <div 
          key={i} 
          className="monetra-card p-6 bg-slate-900 border-slate-800 hover:border-slate-700 active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-2xl ${insight.bg} ${insight.color} group-hover:bg-primary-400 group-hover:text-black transition-all`}>
              <insight.icon size={20} />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{insight.title}</h4>
              <p className="text-lg font-black text-white group-hover:text-primary-400 transition-colors uppercase tracking-tight">{insight.value}</p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 leading-relaxed">{insight.desc}</p>
          <div className="mt-4 flex items-center gap-1">
            <Zap size={10} className="text-primary-400" />
            <span className="text-[9px] font-black uppercase text-primary-400 tracking-tighter hover:underline cursor-pointer">Optimize now</span>
          </div>
        </div>
      ))}
    </div>
  );
}
