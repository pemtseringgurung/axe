import Image from "next/image";
import Navbar from "@/components/navbar";

const team = [
  {
    name: "Pem Tsering Gurung",
    role: "Co-Founder",
    image: "/profile.jpeg",
    accent: "#D4FF00"
  },
  {
    name: "Kien Quoc (Bill) Do",
    role: "Co-Founder",
    image: "/quo.png",
    accent: "#D4FF00"
  }
];

export default function TeamPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Image
          src="/image.png"
          alt="Background"
          fill
          className="object-cover object-[center_40%]"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-5xl mx-auto pt-24 pb-20 px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-10 md:mb-16 text-center tracking-tight" style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}>Meet Our Team</h1>
          <div className="grid grid-cols-2 gap-4 md:gap-12">
            {team.map((member, idx) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="w-full aspect-square max-w-[256px] rounded-2xl overflow-hidden mb-3 md:mb-6 shadow-lg">
                  <Image src={member.image} alt={member.name} width={256} height={256} className="object-cover w-full h-full" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold mb-1" style={{ color: member.accent, fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}>{member.name}</h2>
                <h3 className="text-sm md:text-base font-semibold mb-3 text-white/90" style={{ fontFamily: 'Switzer, -apple-system, BlinkMacSystemFont, \'Segoe UI\', system-ui, sans-serif' }}>{member.role}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
