'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'order' | 'payment' | 'refund' | 'login' | 'signup' | 'update';
  userId?: string;
  userEmail?: string;
  amount?: number;
  currency?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

interface TransactionLogContextType {
  transactions: Transaction[];
  logTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getTransactionsByUser: (userId: string) => Transaction[];
  getTransactionsByType: (type: Transaction['type']) => Transaction[];
  getRecentTransactions: (count: number) => Transaction[];
}

const TransactionLogContext = createContext<TransactionLogContextType | undefined>(undefined);

export function TransactionLogProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const logTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ipAddress: 'client-ip',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
    };
    
    setTransactions(prev => [newTransaction, ...prev].slice(0, 1000));
    console.log(`📝 Transaction logged: ${transaction.type}`, newTransaction);
  };

  const getTransactionsByUser = (userId: string) => {
    return transactions.filter(t => t.userId === userId);
  };

  const getTransactionsByType = (type: Transaction['type']) => {
    return transactions.filter(t => t.type === type);
  };

  const getRecentTransactions = (count: number) => {
    return transactions.slice(0, count);
  };

  return (
    <TransactionLogContext.Provider value={{ 
      transactions, 
      logTransaction, 
      getTransactionsByUser, 
      getTransactionsByType,
      getRecentTransactions 
    }}>
      {children}
    </TransactionLogContext.Provider>
  );
}

export function useTransactionLog() {
  const context = useContext(TransactionLogContext);
  if (!context) throw new Error('useTransactionLog must be used within TransactionLogProvider');
  return context;
}