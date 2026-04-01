import React, { useState } from 'react';
import { Bell, Search, User, ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useFinance } from '../../context/FinanceContext';

export default function Topbar() {
  const { state, dispatch } = useFinance();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navItems = ['Overview', 'Opportunity', 'My Shares', 'Performance'];

  const handleNavClick = (item) => {
    toast.success(`Switching to ${item} view`);
  };

  const handleAction = (action) => {
    toast.info(`${action} clicked`);
  };

  const toggleRole = () => {
    const newRole = state.role === 'admin' ? 'viewer' : 'admin';
    dispatch({ type: 'SET_ROLE', payload: newRole });
    toast.success(`Role switched to ${newRole.toUpperCase()}`, {
      description: newRole === 'admin' ? 'You now have full access.' : 'You are now in view-only mode.'
    });
  };

  return (
    <nav className="h-20 px-4 md:px-8 flex items-center justify-between bg-slate-950 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
      {/* Brand */}
      <div className="flex items-center gap-4 lg:gap-10">
        <div 
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform shrink-0"
          onClick={() => handleAction('Home')}
        >
          <div className="w-8 h-8 md:w-9 md:h-9 bg-primary-400 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <div className="w-4 h-4 border-2 border-black rounded-sm" />
          </div>
          <span className="font-black text-base md:text-lg tracking-tighter group-hover:text-primary-400 transition-colors">MONETRA</span>
        </div>

        {/* Desktop Global Search */}
        <div className="relative w-48 xl:w-64 group hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2 pl-10 pr-4 outline-none focus:border-primary-400 transition-all text-[10px] font-black uppercase tracking-tight"
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
          />
        </div>
      </div>

      {/* Desktop/Table Center Nav */}
      <div className="hidden lg:flex items-center bg-slate-900/50 p-1 rounded-full border border-slate-800">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleNavClick(item)}
            className={`monetra-pill text-[10px] ${
              item === 'Overview' 
              ? 'bg-slate-800 text-white shadow-lg shadow-black/40' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Actions & Role Switcher */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Search Toggle */}
        <button 
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          className="md:hidden p-2.5 text-slate-400 hover:text-white transition-all active:scale-90"
        >
          <Search size={18} />
        </button>

        {/* Role Switcher - Compact on mobile */}
        <div className="flex flex-col items-end mr-1 md:mr-2">
          <span className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 md:mb-1">Access Level</span>
          <button 
            onClick={toggleRole}
            className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-xl border transition-all active:scale-95 ${
              state.role === 'admin' 
              ? 'bg-primary-400/10 border-primary-400/50 text-primary-400' 
              : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight">{state.role}</span>
            <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${state.role === 'admin' ? 'bg-primary-400 animate-pulse' : 'bg-slate-700'}`} />
          </button>
        </div>

        <button 
          onClick={() => handleAction('Notifications')}
          className="p-2 md:p-2.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all active:scale-90 relative"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary-400 rounded-full border-2 border-slate-950" />
        </button>

        <div 
          className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-slate-800 cursor-pointer group active:scale-95 transition-transform"
          onClick={() => handleAction('User Profile')}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:border-primary-400 group-hover:text-primary-400 transition-all">
            <User size={18} />
          </div>
          <ChevronDown size={14} className="text-slate-500 group-hover:text-white transition-colors hidden md:block" />
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 md:p-2.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all active:scale-90"
        >
          <MenuIcon size={20} />
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchVisible && (
        <div className="absolute top-20 left-0 right-0 bg-slate-950 border-b border-slate-800 p-4 md:hidden z-50 animate-in slide-in-from-top duration-300">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search data..."
              className="w-full bg-slate-900 border border-primary-400/50 rounded-2xl py-3.5 pl-12 pr-4 outline-none text-xs font-bold text-white shadow-xl"
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
              onBlur={() => !state.searchQuery && setIsSearchVisible(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Center nav menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-slate-900 border border-slate-800 rounded-[2rem] p-4 lg:hidden z-50 shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => { handleNavClick(item); setIsMenuOpen(false); }}
                className="w-full text-left px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-800 hover:text-white transition-all active:scale-[0.98]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
