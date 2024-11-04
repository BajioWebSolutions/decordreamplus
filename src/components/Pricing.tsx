import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 9.99,
    description: 'Perfect for occasional redesigns',
    features: [
      'Up to 20 designs per month',
      'All design styles',
      'HD quality downloads',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    price: 19.99,
    description: 'Ideal for regular home updates',
    features: [
      'Up to 50 designs per month',
      'All design styles',
      'Ultra HD quality downloads',
      'Priority support',
      'Multiple rooms comparison'
    ]
  },
  {
    name: 'Ultimate',
    price: 39.99,
    description: 'Best for interior designers',
    features: [
      'Unlimited designs',
      'All design styles',
      'Ultra HD quality downloads',
      '24/7 Priority support',
      'Multiple rooms comparison',
      'Commercial license',
      'API access'
    ]
  }
];

interface PricingProps {
  onSubscribe: (planName: string) => void;
}

export function Pricing({ onSubscribe }: PricingProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">
            Get started with 5 free designs. Subscribe to continue creating beautiful spaces.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <button
                  onClick={() => onSubscribe(plan.name)}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}