'use client';

import { useState } from 'react';
import Image from "next/image";
import Navbar from "@/components/navbar";
import Link from 'next/link';

export default function GetStarted() {
  const [budget, setBudget] = useState('');
  const [impulsiveSpending, setImpulsiveSpending] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ budget, impulsiveSpending });
    // Add your logic here
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg.png"
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
          {/* Form Container */}
          <div className="max-w-2xl w-full mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                Let's get started
              </h1>
              <p className="text-white/80 text-lg" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                Tell us a bit about your spending habits
              </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Budget Input */}
              <div className="mb-8">
                <label 
                  htmlFor="budget-input" 
                  className="block text-gray-800 text-base font-semibold mb-3" 
                  style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                >
                  Monthly Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
                  <input 
                    type="number" 
                    id="budget-input" 
                    name="budget-input"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-gray-50 text-gray-800 text-base rounded-xl px-5 pl-10 py-4 border border-gray-200 focus:outline-none focus:border-[#4F7CFF] focus:bg-white transition-all placeholder:text-gray-400"
                    style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                    required
                  />
                </div>
              </div>

              {/* Impulsive Spending Question */}
              <div className="mb-10">
                <label 
                  className="block text-gray-800 text-base font-semibold mb-3" 
                  style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                >
                  Do you spend impulsively?
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setImpulsiveSpending(true)}
                    className={`flex-1 rounded-xl px-6 py-4 text-base font-semibold transition-all border-2 ${
                      impulsiveSpending === true
                        ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                    style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setImpulsiveSpending(false)}
                    className={`flex-1 rounded-xl px-6 py-4 text-base font-semibold transition-all border-2 ${
                      impulsiveSpending === false
                        ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                    style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!budget || impulsiveSpending === null}
                className="w-full rounded-xl bg-[#D4FF00] text-black text-base font-bold px-8 py-4 transition-all hover:bg-[#c4ef00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4FF00] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4FF00]"
                style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
