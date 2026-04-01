import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'sonner';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 600 },
  { name: 'Jun', value: 400 },
  { name: 'Jul', value: 700 }, // Current highlighted
  { name: 'Aug', value: 350 },
  { name: 'Sep', value: 450 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
        <p className="text-sm font-black text-primary-400">${payload[0].value}k</p>
      </div>
    );
  }
  return null;
};

export default function ChartSection() {
  const handleClick = (data) => {
    if (data) {
      toast.info(`Data for ${data.name}: $${data.value}k`, {
        description: 'Cash flow analysis updated for this period.'
      });
    }
  };

  return (
    <div className="monetra-card p-8 bg-slate-900 border-slate-800">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-black tracking-tight mb-1">Cash Flow</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Revenue Analytics</p>
        </div>
        <div className="flex gap-2">
          {['Income', 'Expense'].map((type) => (
            <button 
              key={type}
              onClick={() => toast.success(`Viewing ${type} trends`)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-[10px] font-black text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-95"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} onClick={(data) => data && handleClick(data.activePayload?.[0]?.payload)}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(163, 230, 53, 0.05)' }} />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 6, 6]} 
              barSize={32}
              className="cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === 'Jul' ? '#a3e635' : '#1e293b'} 
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
