"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      name: "Starter",
      subtitle: "Understand your habits",
      price: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "Basic Spending Analysis",
        "Limited AI Insights (5/mo)",
        "7-Day History",
        "Category Breakdown",
        "Mobile Access"
      ],
      buttonText: "Start Free",
      highlighted: false,
      showInAnnual: false
    },
    {
      name: "Pro",
      subtitle: "Master your psychology",
      price: isAnnual ? "$100" : "$10",
      priceSubtext: isAnnual ? "/year" : "/month",
      monthlyPrice: 10,
      annualPrice: 100,
      features: [
        "Everything in Starter +",
        "Unlimited AI Analysis",
        "Deep Behavioral Insights",
        "Spending Trigger Detection",
        "Personalized Action Plans",
        "Full History & Trends",
        "Priority Processing",
        "Export Data"
      ],
      buttonText: "Go Pro",
      highlighted: true,
      showInAnnual: true
    }
  ];

  const displayedPlans = isAnnual
    ? pricingPlans.filter(plan => plan.showInAnnual)
    : pricingPlans;

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
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-6xl mx-auto pt-24 pb-20 px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-white text-5xl md:text-6xl font-bold mb-6 tracking-tight"
              style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
            >
              Pricing
            </h1>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${!isAnnual
                  ? 'bg-white text-black'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${isAnnual
                  ? 'bg-white text-black'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
              >
                Annual
              </button>
            </div>

            {/* Discount Badge */}
            {isAnnual && (
              <p
                className="text-[#D4FF00] text-sm font-semibold"
                style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
              >
                Save $20 with annual billing
              </p>
            )}
          </div>

          {/* Pricing Cards */}
          <div className={`grid ${isAnnual ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'} gap-6`}>
            {displayedPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:scale-105 flex flex-col ${plan.highlighted ? 'ring-4 ring-[#D4FF00] shadow-2xl' : 'shadow-xl'
                  }`}
              >
                {/* Most Popular Badge */}
                {plan.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4FF00] text-black px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wide"
                    style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
                  >
                    Most Popular Plan
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-4">
                  <h2
                    className="text-2xl font-bold text-black mb-1"
                    style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
                  >
                    {plan.name}
                  </h2>
                  <p
                    className="text-gray-600 text-xs"
                    style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className="text-4xl font-bold text-black"
                      style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "Free" && (
                      <span
                        className="text-gray-600 text-sm"
                        style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
                      >
                        {plan.priceSubtext}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5"
                    >
                      <svg
                        className="w-4 h-4 text-black mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={`text-sm text-gray-700 ${feature.includes('+') ? 'font-semibold text-black' : ''}`}
                        style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${plan.highlighted
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-900 text-white hover:bg-black'
                    }`}
                  style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
