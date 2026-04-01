import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || initialTransactions,
  role: localStorage.getItem('role') || 'admin',
  theme: localStorage.getItem('theme') || 'dark',
  searchQuery: '',
  filterType: 'all',
  sortBy: 'date',
  sortOrder: 'desc'
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      const newTransactionsAdd = [action.payload, ...state.transactions];
      localStorage.setItem('transactions', JSON.stringify(newTransactionsAdd));
      return { ...state, transactions: newTransactionsAdd };
    case 'DELETE_TRANSACTION':
      const newTransactionsDel = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(newTransactionsDel));
      return { ...state, transactions: newTransactionsDel };
    case 'UPDATE_TRANSACTION':
      const newTransactionsUpdate = state.transactions.map(t => 
        t.id === action.payload.id ? action.payload : t
      );
      localStorage.setItem('transactions', JSON.stringify(newTransactionsUpdate));
      return { ...state, transactions: newTransactionsUpdate };
    case 'SET_ROLE':
      localStorage.setItem('role', action.payload);
      return { ...state, role: action.payload };
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTER_TYPE':
      return { ...state, filterType: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.by, sortOrder: action.payload.order };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
