import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <header className="bg-gradient-to-r from-indigo-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Space with AI Interior Design
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload a photo of your room and watch as AI transforms it into your dream space in seconds
          </p>
          <a 
            href="#demo"
            className="inline-flex bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors items-center gap-2"
          >
            Try It Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}