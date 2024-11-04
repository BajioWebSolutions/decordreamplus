import React from 'react';
import { Camera, Palette, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Camera className="w-8 h-8 text-blue-600" />,
    title: 'Upload Your Room',
    description: 'Take a photo of your empty room from any angle',
    bgColor: 'bg-blue-100'
  },
  {
    icon: <Palette className="w-8 h-8 text-purple-600" />,
    title: 'Choose Your Style',
    description: 'Select from various design styles and color schemes',
    bgColor: 'bg-purple-100'
  },
  {
    icon: <Sparkles className="w-8 h-8 text-green-600" />,
    title: 'Get AI Designs',
    description: 'Receive multiple design variations in seconds',
    bgColor: 'bg-green-100'
  }
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}