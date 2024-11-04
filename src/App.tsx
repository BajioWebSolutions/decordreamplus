import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Demo } from './components/Demo';
import { Benefits } from './components/Benefits';
import { Pricing } from './components/Pricing';

function App() {
  const handleSubscribe = (plan: string) => {
    // Handle subscription (integrate with payment provider)
    console.log('Subscribing to:', plan);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Demo />
      <Benefits />
      <Pricing onSubscribe={handleSubscribe} />
    </div>
  );
}

export default App;