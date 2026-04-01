import React from 'react';
import { MoreVertical, ArrowUpRight, ArrowDownLeft, Eye, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const transactions = [
  { id: 1, name: 'Stripe Payout', date: 'Jul 24, 2026', amount: '+ $4,500.00', status: 'Completed', type: 'in' },
  { id: 2, name: 'AWS Cloud Services', date: 'Jul 23, 2026', amount: '- $120.00', status: 'Pending', type: 'out' },
  { id: 3, name: 'Salary Disbursement', date: 'Jul 22, 2026', amount: '+ $12,800.00', status: 'Completed', type: 'in' },
  { id: 4, name: 'Uber Business', date: 'Jul 20, 2026', amount: '- $45.20', status: 'Failed', type: 'out' },
];

export default function TransactionTable() {
  const handleAction = (id, action, name) => {
    if (action === 'Delete') {
      toast.error(`Deleting transaction #${id} (${name})`, {
        description: 'This action cannot be undone.'
      });
    } else {
      toast.info(`${action} transaction #${id} (${name})`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-primary-400 bg-primary-400/10';
      case 'Pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'Failed': return 'text-rose-500 bg-rose-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  };

  return (
    <div className="monetra-card bg-slate-900 border-slate-800 overflow-hidden">
      <div className="p-8 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black tracking-tight mb-1">Recent Activity</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Transaction log history</p>
        </div>
        <button 
          onClick={() => toast.info('Exporting transaction history...')}
          className="monetra-btn-secondary px-6"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/50 bg-slate-950/30">
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Transaction</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Date</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Amount</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Status</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {transactions.map((tx) => (
              <tr 
                key={tx.id} 
                className="hover:bg-slate-800/20 group transition-colors cursor-pointer"
                onClick={() => handleAction(tx.id, 'View Detail', tx.name)}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${tx.type === 'in' ? 'bg-primary-400/10 text-primary-400' : 'bg-rose-500/10 text-rose-500'}`}>
                      {tx.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white group-hover:text-primary-400 transition-colors uppercase tracking-tight">{tx.name}</p>
                      <p className="text-[10px] font-bold text-slate-600">TXN_ID_{tx.id}0384</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase">{tx.date}</td>
                <td className={`px-8 py-5 text-right font-black text-sm tabular-nums ${tx.type === 'in' ? 'text-primary-400' : 'text-slate-100'}`}>
                  {tx.amount}
                </td>
                <td className="px-8 py-5 text-center">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAction(tx.id, 'Edit', tx.name); }}
                      className="p-1.5 text-slate-500 hover:text-white transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAction(tx.id, 'Delete', tx.name); }}
                      className="p-1.5 text-slate-500 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <MoreVertical size={16} className="text-slate-700 group-hover:hidden ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-slate-950/50 flex justify-center border-t border-slate-800">
        <button 
          onClick={() => toast.info('Loading more transactions...')}
          className="text-[10px] font-black text-slate-500 hover:text-primary-400 uppercase tracking-widest active:scale-95 transition-all"
        >
          View Full History (54 more)
        </button>
      </div>
    </div>
  );
}
