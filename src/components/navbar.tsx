import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="w-full px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center gap-2.5">
            {/* Axe Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L10.5 3.5C8.5 5.5 6 8 6 11C6 12.5 6.5 13.5 7.5 14.5L9.5 16.5L7 19L8.5 20.5L11 18L13 20C14 21 15 21.5 16.5 21.5C19.5 21.5 22 19 24 17L22.5 15.5C20.5 17.5 18.5 19 16.5 19C15.5 19 15 18.5 14.5 18L12.5 16L15 13.5L13.5 12L11 14.5L9 12.5C8.5 12 8 11.5 8 10.5C8 8.5 9.5 6.5 11.5 4.5L12 4L12.5 4.5C14.5 6.5 16 8.5 16 10.5C16 11 15.8 11.5 15.5 12L17 13.5C17.5 12.8 18 11.7 18 10.5C18 8 15.5 5.5 13.5 3.5L12 2Z" fill="white"/>
            </svg>
            <span className="text-white text-[28px] font-bold tracking-tight leading-none" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif', fontWeight: 700}}>axe</span>
          </Link>
          
          {/* Center Navigation - Absolute positioned to center */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-12">
            <Link href="/" className="text-white transition-colors text-[15px] font-normal" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
              Company
            </Link>
            <Link href="/pricing" className="text-white/90 hover:text-white transition-colors text-[15px] font-normal" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
              Pricing
            </Link>
            <Link href="/team" className="text-white/90 hover:text-white transition-colors text-[15px] font-normal" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
              Meet the Team
            </Link>
          </div>
          
          {/* CTA Button - Far Right */}
          <Link href="/get-started" className="inline-block rounded-full bg-black text-white text-[14px] font-medium px-7 py-2.5 transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black shadow-md" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>
            Get Started Free
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white ml-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
