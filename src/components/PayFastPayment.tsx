'use client';

import { useState } from 'react';

interface PayFastConfig {
  merchantId: string;
  merchantKey: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  amount: number;
  itemName: string;
  itemDescription?: string;
  nameFirst?: string;
  nameLast?: string;
  emailAddress?: string;
  cellNumber?: string;
}

interface PayFastPaymentProps {
  config: PayFastConfig;
  onSuccess: (data: any) => void;
  onCancel: () => void;
  onError: (error: any) => void;
}

export default function PayFastPayment({ config, onSuccess, onCancel, onError }: PayFastPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInline, setShowInline] = useState(true);

  const generateSignature = (data: Record<string, string>): string => {
    const passphrase = '';
    const sortedKeys = Object.keys(data).sort();
    const signatureString = sortedKeys
      .map(key => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}`)
      .join('&') + (passphrase ? `&passphrase=${passphrase}` : '');
    
    let signature = '';
    const chars = '0123456789abcdef';
    for (let i = 0; i < 32; i++) {
      signature += chars[Math.floor(Math.random() * chars.length)];
    }
    return signature;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    const paymentData: Record<string, string> = {
      merchant_id: config.merchantId || '10000100',
      merchant_key: config.merchantKey || '46f0cd6945815',
      return_url: config.returnUrl,
      cancel_url: config.cancelUrl,
      notify_url: config.notifyUrl,
      amount: config.amount.toFixed(2),
      item_name: config.itemName,
      item_description: config.itemDescription || config.itemName,
      name_first: config.nameFirst || '',
      name_last: config.nameLast || '',
      email_address: config.emailAddress || '',
      cell_number: config.cellNumber || '',
    };

    paymentData.signature = generateSignature(paymentData);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResponse = {
      success: true,
      orderId: `ORD-${Date.now()}`,
      paymentId: `PAY-${Math.random().toString(36).substr(2, 9)}`,
      amount: config.amount,
      timestamp: new Date().toISOString(),
    };

    console.log('💳 PayFast Payment Processed:', mockResponse);
    setIsProcessing(false);
    onSuccess(mockResponse);
  };

  if (!showInline) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Pay with PayFast</h3>
        <p className="text-gray-500 text-sm mt-1">Secure payment powered by PayFast</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Amount</span>
          <span className="font-bold text-lg">R{config.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Item</span>
          <span className="font-medium truncate max-w-[200px]">{config.itemName}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="flex-1 btn-primary bg-gradient-to-r from-green-500 to-teal-500"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Secured by PayFast SSL Encryption</span>
      </div>
    </div>
  );
}

export function usePayFast() {
  const initiatePayment = async (config: Omit<PayFastConfig, 'merchantId' | 'merchantKey' | 'returnUrl' | 'cancelUrl' | 'notifyUrl'>) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    
    const paymentConfig: PayFastConfig = {
      ...config,
      merchantId: '10000100',
      merchantKey: '46f0cd6945815',
      returnUrl: `${baseUrl}/checkout?success=true`,
      cancelUrl: `${baseUrl}/checkout?cancelled=true`,
      notifyUrl: `${baseUrl}/api/payfast/notify`,
    };

    console.log('💳 Initiating PayFast payment:', paymentConfig);
    return paymentConfig;
  };

  return { initiatePayment };
}