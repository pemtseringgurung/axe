import Image from "next/image";
import Navbar from "@/components/navbar";

const team = [
  {
    name: "Pem Tsering Gurung",
    role: "Co-Founder",
    description: "Designing financial tools that make budgeting feel effortless, not overwhelming.",
    image: "/profile.jpeg",
    accent: "#D4FF00"
  },
  {
    name: "Kien Quoc (Bill) Do",
    role: "Co-Founder",
    description: "Building intelligent systems that turn financial data into actionable insights.",
    image: "/quo.png",
    accent: "#D4FF00"
  }
];

export default function TeamPage() {
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
        <main className="max-w-5xl mx-auto pt-48 pb-20 px-4">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-24 text-center tracking-tight" style={{fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>Meet Our Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, idx) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="w-64 h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <Image src={member.image} alt={member.name} width={256} height={256} className="object-cover w-full h-full" />
                </div>
                <h2 className="text-2xl font-bold mb-1" style={{color: member.accent, fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>{member.name}</h2>
                <h3 className="text-base font-semibold mb-3 text-white/90" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>{member.role}</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xs" style={{fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif'}}>{member.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
