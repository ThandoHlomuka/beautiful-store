'use client';

import { useState, useEffect } from 'react';

export type ShipmentStatus = 'ordered' | 'processing' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered';

interface ShipmentEvent {
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
}

interface Shipment {
  orderId: string;
  trackingNumber: string;
  status: ShipmentStatus;
  estimatedDelivery: string;
  events: ShipmentEvent[];
}

interface ShipmentTrackerProps {
  orderId: string;
}

const statusSteps: { key: ShipmentStatus; label: string; icon: string }[] = [
  { key: 'ordered', label: 'Order Placed', icon: '📦' },
  { key: 'processing', label: 'Processing', icon: '⚙️' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'in_transit', label: 'In Transit', icon: '🛣️' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '📍' },
  { key: 'delivered', label: 'Delivered', icon: '✅' },
];

export default function ShipmentTracker({ orderId }: ShipmentTrackerProps) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const shipments = JSON.parse(localStorage.getItem('shipments') || '[]');
    const orderShipment = shipments.find((s: Shipment) => s.orderId === orderId);
    if (orderShipment) {
      setShipment(orderShipment);
      setIsAnimating(orderShipment.status !== 'delivered');
    } else {
      const mockShipment: Shipment = {
        orderId,
        trackingNumber: `MF-${orderId.substring(0, 8).toUpperCase()}`,
        status: 'in_transit',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        events: [
          { status: 'ordered', location: 'Online', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), description: 'Order placed successfully' },
          { status: 'processing', location: 'Warehouse', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'Order is being processed' },
          { status: 'shipped', location: 'Metra Hub', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: 'Package has been shipped' },
          { status: 'in_transit', location: 'In Transit', timestamp: new Date().toISOString(), description: 'Package is on its way' },
        ],
      };
      setShipment(mockShipment);
    }
  }, [orderId]);

  const getCurrentStepIndex = () => {
    if (!shipment) return 0;
    return statusSteps.findIndex(s => s.key === shipment.status);
  };

  const currentStep = getCurrentStepIndex();

  if (!shipment) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <p className="text-gray-500 text-center">No shipment data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Track Your Shipment</h3>
          <p className="text-sm text-gray-500">Tracking: {shipment.trackingNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Estimated Delivery</p>
          <p className="font-semibold text-purple-600">
            {new Date(shipment.estimatedDelivery).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 -translate-y-1/2 transition-all duration-1000"
          style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'scale-110 ring-4 ring-purple-200' : ''}`}
                >
                  {isAnimating && isCurrent ? (
                    <div className="animate-pulse">🚚</div>
                  ) : (
                    step.icon
                  )}
                </div>
                <p className={`mt-2 text-xs text-center ${isCompleted ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400'}`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {isAnimating && (
        <div className="mb-6 relative h-20 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-gray-300" />
          </div>
          <div 
            className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 transition-all duration-[2000ms]"
            style={{ left: `${Math.min(90, currentStep * 18)}%` }}
          >
            <div className="animate-bounce">🚚</div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              🏠
            </div>
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
              📦
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-4">
        <h4 className="font-semibold mb-3">Shipment History</h4>
        <div className="space-y-3">
          {shipment.events.slice().reverse().map((event, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{event.description}</p>
                <p className="text-sm text-gray-500">{event.location} • {new Date(event.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {shipment.status === 'delivered' && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-semibold text-green-700 dark:text-green-400">Package Delivered!</p>
          <p className="text-sm text-green-600 dark:text-green-500">Thank you for shopping with Metra Marketplace</p>
        </div>
      )}
    </div>
  );
}