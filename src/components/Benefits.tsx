import React from 'react';
import { Sparkles, Check, Palette } from 'lucide-react';

const benefits = [
  {
    title: 'Instant Results',
    description: 'Get multiple design options in seconds, not days',
    icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: 'Professional Quality',
    description: 'AI-powered designs that look professionally crafted',
    icon: <Check className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: 'Affordable',
    description: 'Save thousands compared to traditional interior design',
    icon: <Palette className="w-6 h-6 text-indigo-600" />,
  },
];

export function Benefits() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}