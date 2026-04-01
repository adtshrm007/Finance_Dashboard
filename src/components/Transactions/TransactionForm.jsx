import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { categories } from '../../data/mockData';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionForm({ open, onClose, transaction }) {
  const { dispatch } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
        date: transaction.date
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: 'food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [transaction, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: transaction ? transaction.id : Math.random().toString(36).substr(2, 9),
      amount: parseFloat(formData.amount)
    };

    if (transaction) {
      dispatch({ type: 'UPDATE_TRANSACTION', payload });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-slate-800"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">
          {transaction ? 'Update Transaction' : 'New Transaction'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Description</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-800 rounded-2xl focus:border-primary-400 outline-none transition-all font-black text-xs text-white placeholder:text-slate-600"
              placeholder="e.g. Lunch with team"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Amount ($)</label>
              <input 
                type="number" 
                required
                className="w-full px-5 py-4 bg-slate-800/50 border border-slate-800 rounded-2xl focus:border-primary-400 outline-none transition-all font-black text-xs text-white"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Type</label>
              <select 
                className="w-full px-5 py-4 bg-slate-800/50 border border-slate-800 rounded-2xl focus:border-primary-400 outline-none transition-all font-black text-xs text-white appearance-none cursor-pointer"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Category</label>
              <select 
                className="w-full px-5 py-4 bg-slate-800/50 border border-slate-800 rounded-2xl focus:border-primary-400 outline-none transition-all font-black text-xs text-white appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Date</label>
              <input 
                type="date" 
                required
                className="w-full px-5 py-4 bg-slate-800/50 border border-slate-800 rounded-2xl focus:border-primary-400 outline-none transition-all font-black text-xs text-white custom-date-input"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary-400 text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-400/10 hover:bg-white transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" strokeWidth={3} />
            {transaction ? 'Save Changes' : 'Create Transaction'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
