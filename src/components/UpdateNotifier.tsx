'use client';

import { useState, useEffect } from 'react';
import { logUpdate } from '@/lib/updateLogger';

export default function UpdateNotifier() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    logUpdate('info', 'System', 'Application initialized successfully');

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setUpdateAvailable(true);
      logUpdate('info', 'Updates', 'Update available, waiting for user action');
    };

    const handleOnline = () => {
      logUpdate('success', 'Network', 'Connection restored');
    };

    const handleOffline = () => {
      logUpdate('warning', 'Network', 'Connection lost, working offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    logUpdate('info', 'Updates', 'Refreshing application...');
    
    window.location.reload();
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Update Available!</h3>
            <p className="text-sm text-white/80 mt-1">
              A new version is available with improvements.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
              >
                Later
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isRefreshing ? 'Updating...' : 'Update Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white py-2 px-4 text-center text-sm font-medium z-50">
      You're offline. Some features may be unavailable.
    </div>
  );
}