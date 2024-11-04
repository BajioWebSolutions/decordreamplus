import { useState, useEffect } from 'react';

interface Subscription {
  isPro: boolean;
  remainingFreeUses: number;
  plan: string | null;
}

const STORAGE_KEY = 'interior_ai_subscription';
const FREE_USES_LIMIT = 5;

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      isPro: false,
      remainingFreeUses: FREE_USES_LIMIT,
      plan: null
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  }, [subscription]);

  const useDesign = () => {
    if (subscription.isPro) return true;
    
    if (subscription.remainingFreeUses > 0) {
      setSubscription(prev => ({
        ...prev,
        remainingFreeUses: prev.remainingFreeUses - 1
      }));
      return true;
    }
    
    return false;
  };

  const subscribe = (plan: string) => {
    setSubscription({
      isPro: true,
      remainingFreeUses: 0,
      plan
    });
  };

  return {
    subscription,
    useDesign,
    subscribe
  };
}