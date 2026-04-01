import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Sun, Moon, Shield, Eye, Bell, Search, ChevronDown, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onMenuClick }) {
  const { state, dispatch } = useFinance();
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRoleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
  };

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
    setIsRoleOpen(false);
  };

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-6 glass dark:bg-slate-900/80 mb-6">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative w-full max-w-md hidden md:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium text-sm"
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all ${
              state.role === 'admin' 
              ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/30 dark:border-primary-800 dark:text-primary-400'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400'
            }`}
          >
            {state.role === 'admin' ? <Shield className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-xs font-black capitalize tracking-wider">{state.role}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isRoleOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isRoleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
              >
                <button
                  onClick={() => setRole('admin')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    state.role === 'admin' ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Administrator
                </button>
                <button
                  onClick={() => setRole('viewer')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    state.role === 'viewer' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  View Only
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all shadow-sm"
        >
          {state.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <button className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 relative hover:scale-110 active:scale-95 transition-all shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></span>
        </button>

        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-500 to-indigo-600 border-2 border-white dark:border-slate-800 shadow-lg shadow-primary-500/20 cursor-pointer ml-2 hover:-translate-y-0.5 transition-transform"></div>
      </div>
    </nav>
  );
}
