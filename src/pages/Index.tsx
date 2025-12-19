import Header from '@/components/Header';
import Footer1 from '@/components/Footer1';
import HeroSection from '@/components/HeroSection';
import { useState, useMemo, useEffect } from 'react';
const Index = () => {
    
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
      </main>
      <Footer1 />
    </div>
  );
};

export default Index;
