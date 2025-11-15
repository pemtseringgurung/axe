'use client';

import Image from "next/image";
import Link from "next/link";
import BudgetInputBox from "@/components/budget_inputbox";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/image.png"
          alt="Background"
          fill
          className="object-cover object-[center_40%]"
          priority
          quality={100}
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center px-8 py-24">
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto text-center">
            <h1 
              className={`text-white text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif',
                transitionDelay: '200ms'
              }}
            >
              Budget smarter.
              <br />
              Spend better.
            </h1>
            
            <p 
              className={`text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif',
                transitionDelay: '600ms'
              }}
            >
              Break free from impulsive spending. A budgeting solution that addresses the behavioral patterns behind overspending, not just the numbers.
            </p>
            
            <Link 
              href="/get-started" 
              className={`inline-block rounded-full bg-[#D4FF00] text-black text-base font-semibold px-10 py-4 transition-all duration-1000 hover:bg-[#c4ef00] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4FF00] shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif',
                transitionDelay: '1000ms'
              }}
            >
              Get Started Free
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
