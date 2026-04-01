import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { categories } from '../../data/mockData';

const COLORS = ['#a3e635', '#65a30d', '#4d7c0f', '#3f6212', '#1a2e05'];

export default function SpendingBreakdown() {
  const { state } = useFinance();

  // Calculate spending per category
  const spendingData = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const chartData = Object.entries(spendingData)
    .map(([key, value]) => ({
      name: categories.find(c => c.id === key)?.name || key,
      value
    }))
    .sort((a, b) => b.value - a.value);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
    return (
      <g>
        <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="#fff" className="font-black text-xs uppercase tracking-widest">{payload.name}</text>
        <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#a3e635" className="font-black text-base">${value.toLocaleString()}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = React.useState(0);

  if (chartData.length === 0) {
    return (
      <div className="monetra-card p-8 bg-slate-900 border-slate-800 h-full flex items-center justify-center">
        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">No spending data available</p>
      </div>
    );
  }

  return (
    <div className="monetra-card p-8 bg-slate-900 border-slate-800 h-full">
      <div className="mb-6">
        <h3 className="text-xl font-black tracking-tight mb-1">Expense Breakdown</h3>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Spending by category</p>
      </div>
      
      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === activeIndex ? '#a3e635' : '#1e293b'} 
                  style={{ outline: 'none' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {chartData.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-primary-400' : 'bg-slate-700'}`} />
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
