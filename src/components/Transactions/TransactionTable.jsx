import React from 'react';
import { MoreVertical, ArrowUpRight, ArrowDownLeft, Eye, Edit2, Trash2, SearchX } from 'lucide-react';
import { toast } from 'sonner';
import { useFinance } from '../../context/FinanceContext';
import { categories } from '../../data/mockData';

export default function TransactionTable({ onEdit }) {
  const { state, dispatch } = useFinance();
  const { transactions, searchQuery, filterType, role } = state;

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          categories.find(c => c.id === tx.category)?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (id, action, name) => {
    if (role === 'viewer' && (action === 'Edit' || action === 'Delete')) {
      toast.error('Restricted Access', {
        description: 'You must have Admin privileges to perform this action.'
      });
      return;
    }

    if (action === 'Delete') {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      toast.success(`Transaction deleted successfully`, {
        description: `Removed "${name}" from your record.`
      });
    } else if (action === 'Edit') {
      const tx = transactions.find(t => t.id === id);
      onEdit(tx);
      toast.info(`Editing transaction: ${name}`);
    } else {
      toast.info(`${action}: ${name}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-primary-400 bg-primary-400/10';
      case 'Pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'Failed': return 'text-rose-500 bg-rose-500/10';
      default: return 'text-slate-500 bg-slate-500/10'; // Defaulting to Completed for mock data
    }
  };

  return (
    <div className="monetra-card bg-slate-900 border-slate-800 overflow-hidden">
      <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-black tracking-tight mb-1">Recent Activity</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Transaction log history</p>
        </div>
        
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              onClick={() => dispatch({ type: 'SET_FILTER_TYPE', payload: t })}
              className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                filterType === t 
                ? 'bg-slate-800 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        {filteredTransactions.length === 0 ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-slate-500 animate-pulse">
            <SearchX size={48} className="mb-4 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-widest">No matching transactions found</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/50 bg-slate-950/30">
                <th className="px-4 md:px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Transaction</th>
                <th className="hidden sm:table-cell px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Date</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Amount</th>
                <th className="hidden md:table-cell px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Category</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredTransactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  className="hover:bg-slate-800/20 group transition-colors cursor-pointer"
                  onClick={() => handleAction(tx.id, 'View Detail', tx.description)}
                >
                  <td className="px-4 md:px-8 py-5">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`p-2 md:p-2.5 rounded-xl ${tx.type === 'income' ? 'bg-primary-400/10 text-primary-400' : 'bg-rose-500/10 text-rose-500'}`}>
                        {tx.type === 'income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-black text-white group-hover:text-primary-400 transition-colors uppercase tracking-tight">{tx.description}</p>
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-600">ID_{tx.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-8 py-5 text-[10px] font-bold text-slate-400 uppercase">{tx.date}</td>
                  <td className={`px-4 md:px-8 py-5 text-right font-black text-sm tabular-nums ${tx.type === 'income' ? 'text-primary-400' : 'text-slate-100'}`}>
                    {tx.type === 'income' ? '+' : '-'} ${tx.amount.toLocaleString()}
                  </td>
                  <td className="hidden md:table-cell px-8 py-5 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-800/50 text-slate-400`}>
                      {categories.find(c => c.id === tx.category)?.name || tx.category}
                    </span>
                  </td>
                  <td className="px-4 md:px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {role === 'admin' && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction(tx.id, 'Edit', tx.description); }}
                            className="p-1.5 text-slate-500 hover:text-white transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction(tx.id, 'Delete', tx.description); }}
                            className="p-1.5 text-slate-500 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                      {role === 'viewer' && (
                        <button className="p-1.5 text-slate-700">
                          <Eye size={14} />
                        </button>
                      )}
                    </div>
                    <MoreVertical size={16} className="text-slate-700 group-hover:hidden ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
