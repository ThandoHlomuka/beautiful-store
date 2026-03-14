'use client';

import { useState, useEffect } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: string;
  message: string;
  details?: any;
}

class UpdateLogger {
  private logs: LogEntry[] = [];
  private storageKey = 'app_update_logs';

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.logs = JSON.parse(saved);
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.logs));
  }

  private addLog(type: LogEntry['type'], category: string, message: string, details?: any) {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2),
      timestamp: new Date().toISOString(),
      type,
      category,
      message,
      details
    };
    this.logs.unshift(entry);
    if (this.logs.length > 500) this.logs = this.logs.slice(0, 500);
    this.save();
    console.log(`[${type.toUpperCase()}] ${category}: ${message}`, details || '');
  }

  info(category: string, message: string, details?: any) {
    this.addLog('info', category, message, details);
  }

  warn(category: string, message: string, details?: any) {
    this.addLog('warning', category, message, details);
  }

  error(category: string, message: string, details?: any) {
    this.addLog('error', category, message, details);
  }

  success(category: string, message: string, details?: any) {
    this.addLog('success', category, message, details);
  }

  getLogs() {
    return this.logs;
  }

  getLogsByCategory(category: string) {
    return this.logs.filter(l => l.category === category);
  }

  clear() {
    this.logs = [];
    this.save();
  }
}

export const updateLogger = new UpdateLogger();

export function useUpdateLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    setLogs(updateLogger.getLogs());
  }, []);

  return { logs, logger: updateLogger };
}

export function logUpdate(type: LogEntry['type'], category: string, message: string, details?: any) {
  switch (type) {
    case 'info':
      updateLogger.info(category, message, details);
      break;
    case 'warning':
      updateLogger.warn(category, message, details);
      break;
    case 'error':
      updateLogger.error(category, message, details);
      break;
    case 'success':
      updateLogger.success(category, message, details);
      break;
  }
}