import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { categories } from '../../data/mockData';
import { TrendingUp, Award, Target, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Insights() {
  const { state } = useFinance();

  const expenses = state.transactions.filter(t => t.type === 'expense');
  const income = state.transactions.filter(t => t.type === 'income');
  
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const highestCategory = sortedCategories[0];
  const highestCategoryName = highestCategory ? categories.find(c => c.id === highestCategory[0])?.name : 'N/A';

  const insightCards = [
    {
      title: 'Current Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      description: 'Of total monthly income',
      icon: Target,
      color: 'bg-indigo-600',
      trend: savingsRate > 20 ? 'Positive' : 'Low',
      progress: savingsRate
    },
    {
      title: 'Maximum Spend',
      value: highestCategoryName,
      description: `Target: < $${(totalIncome * 0.2).toLocaleString()}`,
      icon: Zap,
      color: 'bg-rose-600',
      trend: 'Review',
      progress: highestCategory ? (highestCategory[1] / totalIncome) * 100 : 0
    },
    {
      title: 'Financial Health',
      value: savings > 0 ? 'Surplus' : 'Deficit',
      description: `$${Math.abs(savings).toLocaleString()} ${savings > 0 ? 'saved' : 'overspent'}`,
      icon: Award,
      color: 'bg-emerald-600',
      trend: savings > 0 ? 'Good' : 'Critical',
      progress: totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 100
    }
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {insightCards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="premium-card p-8 flex flex-col gap-6"
          >
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-3xl text-white ${card.color} shadow-lg shadow-${card.color.split('-')[1]}-500/20`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${
                card.trend === 'Positive' || card.trend === 'Good' 
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30' 
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30'
              }`}>
                {card.trend}
              </span>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 ml-1">{card.title}</h4>
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{card.value}</span>
              <p className="text-xs font-bold text-slate-400 mt-2 ml-1">{card.description}</p>
            </div>

            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(card.progress, 100)}%` }}
                className={`h-full rounded-full ${card.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Spending Categories List */}
        <div className="premium-card p-8">
          <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8">Spending Metrics</h4>
          <div className="space-y-6">
            {sortedCategories.slice(0, 4).map(([catId, amount], idx) => {
              const cat = categories.find(c => c.id === catId);
              const percentage = (amount / totalExpenses) * 100;
              return (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.color }} />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{cat?.name}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white">${amount.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat?.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden flex flex-col justify-center border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4 leading-tight">Smart Analysis</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Based on your habits, you spend the most on <span className="text-white font-bold">{highestCategoryName}</span>. 
              {savingsRate > 20 ? " Great job keeping your savings rate healthy!" : " Reducing discretionary spend could help reach your goals faster."}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Income +12%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                <ArrowDownRight className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold">Spend -5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
