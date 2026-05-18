import tenant from "../../config/tenant.json";
import HeroSection from "@/components/HeroSection";
import LogisticsSection from "@/components/LogisticsSection";
import PhotoWall from "@/components/PhotoWall";
import RsvpForm from "@/components/RsvpForm";

function FloralDecorationLeft() {
  return (
    <div className="absolute left-0 w-28 sm:w-40 md:w-56 h-auto pointer-events-none opacity-15 text-primary origin-top-left animate-sway-left select-none -translate-x-4">
      <svg viewBox="0 0 100 200" fill="currentColor" className="w-full h-auto">
        <path d="M0,0 Q30,50 10,120 Q-10,190 20,200" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0,0 Q15,-10 20,5 Q5,15 0,0" />
        <path d="M5,25 Q30,20 25,35 Q10,40 5,25" />
        <path d="M12,50 Q40,55 32,68 Q15,65 12,50" />
        <path d="M15,80 Q45,95 34,105 Q12,95 15,80" />
        <path d="M10,110 Q35,130 22,138 Q5,122 10,110" />
        <path d="M3,140 Q25,165 12,172 Q-5,150 3,140" />
      </svg>
    </div>
  );
}

function FloralDecorationRight() {
  return (
    <div className="absolute right-0 w-28 sm:w-40 md:w-56 h-auto pointer-events-none opacity-15 text-primary origin-top-right scale-x-[-1] animate-sway-right select-none translate-x-4">
      <svg viewBox="0 0 100 200" fill="currentColor" className="w-full h-auto">
        <path d="M0,0 Q30,50 10,120 Q-10,190 20,200" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0,0 Q15,-10 20,5 Q5,15 0,0" />
        <path d="M5,25 Q30,20 25,35 Q10,40 5,25" />
        <path d="M12,50 Q40,55 32,68 Q15,65 12,50" />
        <path d="M15,80 Q45,95 34,105 Q12,95 15,80" />
        <path d="M10,110 Q35,130 22,138 Q5,122 10,110" />
        <path d="M3,140 Q25,165 12,172 Q-5,150 3,140" />
      </svg>
    </div>
  );
}

function BackgroundAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic ambient sun reflections / light leaks */}
      <div className="absolute top-[12%] left-[-15%] w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-accent/6 blur-[80px] sm:blur-[130px] animate-pulse-glow" />
      <div className="absolute top-[32%] right-[-15%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-primary/4 blur-[70px] sm:blur-[120px] animate-pulse-glow-delayed" />
      <div className="absolute top-[52%] left-[10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-accent/5 blur-[60px] sm:blur-[110px] animate-pulse-glow" />
      <div className="absolute top-[78%] right-[-5%] w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full bg-primary/5 blur-[80px] sm:blur-[125px] animate-pulse-glow-delayed" />

      {/* Floating golden sun flecks (luciérnagas / briznas de luz) */}
      <div className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-accent/40 blur-[1px] animate-sparkle-1" />
      <div className="absolute top-[25%] right-[25%] w-3 h-3 rounded-full bg-primary/30 blur-[2.5px] animate-sparkle-2" />
      <div className="absolute top-[42%] left-[15%] w-1.5 h-1.5 rounded-full bg-accent/50 animate-sparkle-3" />
      <div className="absolute top-[60%] right-[30%] w-2.5 h-2.5 rounded-full bg-primary/35 blur-[1.5px] animate-sparkle-4" />
      <div className="absolute top-[72%] left-[25%] w-2 h-2 rounded-full bg-accent/40 blur-[1px] animate-sparkle-1" />
      <div className="absolute top-[85%] right-[20%] w-1.5 h-1.5 rounded-full bg-accent/50 animate-sparkle-3" />
    </div>
  );
}

export default function Home() {
  const { wedding, salon, schedule, logistics } = tenant;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Dynamic Couple Hero Section */}
      <HeroSection wedding={wedding} salonName={salon.name} />

      {/* Main Content Layout with soft ambient dividers */}
      <main className="flex-1 bg-bg-custom relative z-10">
        {/* Background Swaying Leaves & Ambient Light Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Ambient reflections and floating bokeh lights */}
          <BackgroundAtmosphere />

          {/* Swaying branches */}
          <div className="absolute top-[8%] left-0">
            <FloralDecorationLeft />
          </div>
          <div className="absolute top-[28%] right-0">
            <FloralDecorationRight />
          </div>
          <div className="absolute top-[48%] left-0">
            <FloralDecorationLeft />
          </div>
          <div className="absolute top-[68%] right-0">
            <FloralDecorationRight />
          </div>
          <div className="absolute top-[88%] left-0">
            <FloralDecorationLeft />
          </div>
        </div>

        {/* Soft elegant separator */}
        <div className="w-full flex justify-center py-6 relative z-10">
          <div className="w-16 h-[1px] bg-primary/20" />
        </div>

        {/* Schedule, Map, and Transport */}
        <div className="relative z-10">
          <LogisticsSection
            schedule={schedule}
            salon={salon}
            logistics={logistics}
          />
        </div>

        {/* Muted line separator */}
        <div className="w-full flex justify-center py-6 relative z-10">
          <div className="w-24 h-[1px] bg-primary/10" />
        </div>

        {/* Interactive Live Memory Wall */}
        <div className="relative z-10">
          <PhotoWall />
        </div>

        {/* Elegant separator */}
        <div className="w-full flex justify-center py-6 relative z-10">
          <div className="w-16 h-[1px] bg-primary/20" />
        </div>

        {/* Confirmation Form */}
        <div className="relative z-10">
          <RsvpForm
            busRoutes={logistics.buses}
            rsvpDeadline={wedding.rsvpDeadline}
          />
        </div>
      </main>

      {/* Classy B2B2C Wedding Venue Footer */}
      <footer className="py-12 bg-white/40 border-t border-primary/5 text-center px-6 relative z-10">
        <p className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
          Enlace de Ensueño
        </p>
        <p className="text-xs text-text-light font-light mt-1 max-w-xs mx-auto leading-relaxed">
          Esta plataforma web de bodas es un detalle exclusivo de <strong>{salon.name}</strong> para sus novios e invitados.
        </p>
        <div className="mt-6 text-[9px] text-text-light/50 font-light tracking-wide">
          © {new Date().getFullYear()} {salon.name}. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
