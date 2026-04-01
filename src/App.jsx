import React, { useState } from 'react';
import Sidebar from './components/Navigation/Sidebar';
import Topbar from './components/Navigation/Topbar';
import SummaryCard from './components/Dashboard/SummaryCard';
import SmartWalletCard from './components/Dashboard/SmartWalletCard';
import ChartSection from './components/Dashboard/ChartSection';
import TransactionTable from './components/Transactions/TransactionTable';
import TransactionForm from './components/Transactions/TransactionForm';
import RightSidebar from './components/Dashboard/RightSidebar';
import SpendingBreakdown from './components/Dashboard/SpendingBreakdown';
import InsightsSection from './components/Dashboard/InsightsSection';
import BottomNav from './components/Navigation/BottomNav';
import { useFinance } from './context/FinanceContext';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Search, Target, Plus } from 'lucide-react';
import { Toaster, toast } from 'sonner';

function App() {
  const { state, dispatch } = useFinance();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;

  const handleEdit = (transaction) => {
    if (state.role === 'viewer') {
      toast.error('Restricted', { description: 'Viewers cannot edit transactions.' });
      return;
    }
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    if (state.role === 'viewer') {
      toast.error('Restricted', { description: 'Viewers cannot add transactions.' });
      return;
    }
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden selection:bg-primary-400 selection:text-black">
      <Toaster 
        theme="dark" 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#171717',
            border: '1px solid #262626',
            color: '#fff',
            fontFamily: 'JetBrains Mono, monospace',
          },
        }}
      />
      
      {/* Slim Vertical Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-20 md:pb-0">
        <Topbar />
        
        <div className="flex-1 flex flex-col xl:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 px-4 md:px-8 pb-12 min-w-0">
            {/* Greeting */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pt-8 md:pt-0">
              <div className="animate-monetra">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Good morning, Oripio</h1>
                <p className="text-slate-500 font-medium text-xs md:text-sm">Stay on top of your tasks, monitor progress, and track status.</p>
              </div>
            </header>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
              <div className="lg:col-span-12 xl:col-span-4 animate-monetra" style={{ animationDelay: '0.2s' }}>
                <SmartWalletCard balance={balance} />
              </div>
              <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Current Balance", amount: balance, icon: Wallet, percentage: 34.5, trend: "up", delay: '0.3s' },
                  { title: "Savings Goal", amount: 5300.50, icon: Target, percentage: 12.01, trend: "up", delay: '0.4s' },
                  { title: "Income", amount: totalIncome, icon: ArrowUpCircle, percentage: 7.76, trend: "up", delay: '0.5s' },
                  { title: "Expenses", amount: totalExpenses, icon: ArrowDownCircle, percentage: 8.12, trend: "down", delay: '0.6s' }
                ].map((stat, i) => (
                  <div key={i} className="animate-monetra" style={{ animationDelay: stat.delay }}>
                    <SummaryCard {...stat} />
                  </div>
                ))}
              </div>
            </div>

            {/* Insights Section */}
            <div className="mb-10 animate-monetra" style={{ animationDelay: '0.7s' }}>
              <InsightsSection />
            </div>

            {/* Main Content (Charts & Activity) */}
            <div className="grid grid-cols-1 gap-8 items-start">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="animate-monetra" style={{ animationDelay: '0.8s' }}>
                  <ChartSection />
                </div>
                <div className="animate-monetra" style={{ animationDelay: '0.9s' }}>
                  <SpendingBreakdown />
                </div>
              </div>

              {/* Transaction Activity */}
              <div className="animate-monetra" style={{ animationDelay: '1s' }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight mb-1">Activity Tracking</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time financial logs</p>
                  </div>
                  {state.role === 'admin' && (
                    <button 
                      onClick={handleAdd}
                      className="monetra-btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      <Plus size={16} />
                      Add Transaction
                    </button>
                  )}
                </div>
                <TransactionTable onEdit={handleEdit} />
              </div>
            </div>
          </div>

          {/* Right Action Sidebar */}
          <div className="xl:border-l border-slate-800">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <TransactionForm 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        transaction={editingTransaction} 
      />
    </div>
  );
}

export default App;
