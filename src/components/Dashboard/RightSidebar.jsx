import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Plus, MoreHorizontal, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useFinance } from '../../context/FinanceContext';

const avatars = [
  { name: 'Aditya', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya', amount: '$45.00' },
  { name: 'Sarah', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', amount: '$120.00' },
  { name: 'Mike', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', amount: '$80.00' },
];

export default function RightSidebar() {
  const { state } = useFinance();
  const { role } = state;

  const handleQuickSend = (name) => {
    if (role === 'viewer') {
      toast.error('Restricted', { description: 'Viewers cannot initiate transfers.' });
      return;
    }
    toast.success(`Transfer initiated to ${name}`, {
      description: 'The transaction will be processed shortly.',
    });
  };

  const handleAction = (type) => {
    if (role === 'viewer' && (type === 'Transfer' || type === 'Deposit' || type === 'Quick Action')) {
      toast.error('Restricted', { description: 'Admin privileges required.' });
      return;
    }
    toast.info(`${type} action triggered`);
  };

  const handleDeposit = () => {
    if (role === 'viewer') {
      toast.error('Restricted', { description: 'Viewers cannot make deposits.' });
      return;
    }
    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: 'Opening deposit portal...',
      success: 'Deposit successful!',
      error: 'Failed to connect to gateway',
    });
  };

  return (
    <aside className="w-full xl:w-80 h-full bg-slate-950 border-l border-slate-800 p-8 flex flex-col gap-8">
      {/* Visa Card Visualization */}
      <section className="animate-monetra" style={{ animationDelay: '0.9s' }}>
        <div 
          className="relative h-48 rounded-[2rem] bg-gradient-to-br from-primary-400 to-lime-600 p-6 flex flex-col justify-between overflow-hidden group cursor-pointer active:scale-95 transition-all shadow-2xl shadow-primary-400/10"
          onClick={() => handleAction('Card Details')}
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="w-6 h-4 bg-yellow-400/80 rounded-sm" />
            </div>
            <span className="font-black italic text-black/80 tracking-tighter">VISA</span>
          </div>
          
          <div>
            <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mb-1">Card Holder</p>
            <p className="text-black font-black text-sm tracking-tight capitalize">Oripio Ventures Ltd.</p>
          </div>

          <div className="flex justify-between items-end">
            <p className="text-black font-black text-base tracking-[0.2em]">**** 8842</p>
            <p className="text-black/80 font-black text-xs">12/26</p>
          </div>

          {/* Decorative pattern */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button 
            onClick={handleDeposit}
            className="monetra-btn-primary flex items-center justify-center gap-2"
          >
            Deposit
          </button>
          <button 
            onClick={() => handleAction('Transfer')}
            className="monetra-btn-secondary flex items-center justify-center gap-2"
          >
            Transfer
          </button>
        </div>
      </section>

      {/* Quick Send */}
      <section className="animate-monetra" style={{ animationDelay: '1s' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">Quick Send</h3>
          <button className="text-primary-400 hover:text-primary-300 transition-colors">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex gap-4">
          {avatars.map((avatar, i) => (
            <button 
              key={i} 
              className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
              onClick={() => handleQuickSend(avatar.name)}
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-1 group-hover:border-primary-400 transition-all shadow-lg">
                <img src={avatar.img} alt={avatar.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors">{avatar.name}</span>
            </button>
          ))}
          <button 
            className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 border-dashed flex items-center justify-center text-slate-500 hover:text-primary-400 hover:border-primary-400 transition-all active:scale-90"
            onClick={() => handleAction('Search Contacts')}
          >
            <Send size={16} />
          </button>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="animate-monetra" style={{ animationDelay: '1.1s' }}>
        <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-4">Quick Action</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: ArrowDownLeft, label: 'Received' },
            { icon: ArrowUpRight, label: 'Request' },
            { icon: MoreHorizontal, label: 'More' }
          ].map((action, i) => (
            <button 
              key={i}
              onClick={() => handleAction(action.label)}
              className="flex flex-col items-center justify-center gap-2 aspect-square rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary-400/50 hover:bg-slate-800/50 transition-all group active:scale-90"
            >
              <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-primary-400 group-hover:text-black transition-all">
                <action.icon size={16} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Upgrade Plan */}
      <section className="mt-auto animate-monetra" style={{ animationDelay: '1.2s' }}>
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="font-black text-sm mb-2">Unlock Pro Features</h4>
            <p className="text-[10px] text-slate-500 font-bold mb-4">Get unlimited transactions & premium support.</p>
            <button 
              onClick={() => toast.success('Upgrading to Pro Plan...', { duration: 5000 })}
              className="w-full bg-white text-black py-2.5 rounded-xl text-xs font-black hover:bg-primary-400 transition-all active:scale-95 shadow-xl"
            >
              Upgrade Now
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
        </div>
      </section>
    </aside>
  );
}
