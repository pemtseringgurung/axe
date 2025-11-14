'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Navbar from "@/components/navbar";

interface RecommendationItem {
  action: string;
  why: string;
}

interface AnalysisResult {
  underlying_reason: string;
  behavioral_triggers: string[];
  recommendations: RecommendationItem[];
  spending_reason: string;
  actual_spent: number;
  category: string;
}

export default function GetStarted() {
  const [amount, setAmount] = useState('');
  const [isImpulsive, setIsImpulsive] = useState<boolean | null>(null);
  const [reason, setReason] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleImpulsiveClick = (value: boolean) => {
    setIsImpulsive(value);
    setShowReasonInput(value);
    setAnalysisResult(null); // Clear previous results
    if (!value) {
      setReason('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isImpulsive) {
      console.log('User does not spend impulsively');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Always use /api/analyze (works in both vercel dev and production)
      const apiUrl = '/api/analyze';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actual_spent: parseFloat(amount),
          spending_reason: reason,
          spending_category: 'general'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to analyze spending');
      }

      const result = await response.json();
      console.log('AI Analysis:', result);
      setAnalysisResult(result);
      
    } catch (error) {
      console.error('Error analyzing spending:', error);
      alert('Error connecting to AI. Make sure the backend is running (python3 api.py)');
    } finally {
      setIsAnalyzing(false);
    }
  };

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
        <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
          <Navbar />
        </div>
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
              {/* Amount Input */}
              <div className="mb-8">
                <label 
                  htmlFor="amount-input" 
                  className="block text-gray-800 text-base font-semibold mb-3" 
                  style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                >
                  How much did you spend?
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
                  <input 
                    type="number" 
                    id="amount-input" 
                    name="amount-input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-gray-50 text-gray-800 text-base rounded-xl px-5 pl-10 py-4 border border-gray-200 focus:outline-none focus:border-[#D4FF00] focus:bg-white transition-all placeholder:text-gray-400"
                    style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                    required
                  />
                </div>
              </div>

              {/* Impulsive Spending Question */}
              <div className="mb-8">
                <label 
                  className="block text-gray-800 text-base font-semibold mb-3" 
                  style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                >
                  Was this an impulsive purchase?
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleImpulsiveClick(true)}
                    className={`flex-1 rounded-xl px-6 py-4 text-base font-semibold transition-all border-2 ${
                      isImpulsive === true
                        ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                    style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleImpulsiveClick(false)}
                    className={`flex-1 rounded-xl px-6 py-4 text-base font-semibold transition-all border-2 ${
                      isImpulsive === false
                        ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                    style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Reason Input - Only show if impulsive */}
              {showReasonInput && (
                <div className="mb-10">
                  <label 
                    htmlFor="reason-input" 
                    className="block text-gray-800 text-base font-semibold mb-3" 
                    style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                  >
                    Why did you spend impulsively?
                  </label>
                  <textarea 
                    id="reason-input" 
                    name="reason-input"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tell us what happened... (e.g., 'My friends wanted to go out and I didn't want to miss out')"
                    rows={4}
                    className="w-full bg-gray-50 text-gray-800 text-base rounded-xl px-5 py-4 border border-gray-200 focus:outline-none focus:border-[#D4FF00] focus:bg-white transition-all placeholder:text-gray-400 resize-none"
                    style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!amount || isImpulsive === null || (isImpulsive && !reason) || isAnalyzing}
                className="w-full rounded-xl bg-[#D4FF00] text-black text-base font-bold px-8 py-4 transition-all hover:bg-[#c4ef00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4FF00] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4FF00]"
                style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
              >
                {isAnalyzing ? 'Analyzing...' : isImpulsive ? 'Analyze My Spending' : 'Submit'}
              </button>
            </form>


            {analysisResult && (
              <div className="mt-8 bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                    OK, let's talk about it �
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                    You spent <span className="font-semibold">${analysisResult.actual_spent}</span> and it feels bad. Here's what's really happening...
                  </p>
                </div>

                {/* Deep Psychological Reason */}
                <div className="mb-8 p-6 bg-gradient-to-r from-[#D4FF00]/20 to-[#D4FF00]/10 rounded-2xl border border-[#D4FF00]/30">
                  <h3 className="text-lg font-bold text-gray-800 mb-3" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                    Why you really spent this money:
                  </h3>
                  <p className="text-gray-800 text-base leading-relaxed" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                    {analysisResult.underlying_reason}
                  </p>
                </div>

                {/* Behavioral Triggers */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                    Behavioral triggers:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.behavioral_triggers.map((trigger, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border border-gray-200"
                        style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Evidence-Based Recommendations */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                    Evidence-based techniques that actually work:
                  </h3>
                  <div className="space-y-4">
                    {analysisResult.recommendations.map((rec, idx) => (
                      <div 
                        key={idx}
                        className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#D4FF00] transition-all"
                      >
                        <div className="flex gap-3 mb-2">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#D4FF00] flex items-center justify-center font-bold text-black text-sm" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                            {idx + 1}
                          </div>
                          <p className="text-gray-800 font-semibold text-base leading-relaxed flex-1" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                            {rec.action}
                          </p>
                        </div>
                        <div className="ml-10">
                          <p className="text-gray-600 text-sm leading-relaxed italic" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                            <span className="font-semibold text-gray-700">Why it works:</span> {rec.why}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closing Message */}
                <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200">
                  <p className="text-gray-700 text-base leading-relaxed" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
                    You recognized the pattern. That's already progress. Try one thing from above today. 💪
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
