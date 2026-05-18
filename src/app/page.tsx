import tenant from "../../config/tenant.json";
import HeroSection from "@/components/HeroSection";
import LogisticsSection from "@/components/LogisticsSection";
import PhotoWall from "@/components/PhotoWall";
import RsvpForm from "@/components/RsvpForm";

export default function Home() {
  const { wedding, salon, schedule, logistics } = tenant;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Couple Hero Section */}
      <HeroSection wedding={wedding} salonName={salon.name} />

      {/* Main Content Layout with soft ambient dividers */}
      <main className="flex-1 bg-bg-custom relative z-10">
        
        {/* Soft elegant separator */}
        <div className="w-full flex justify-center py-6">
          <div className="w-16 h-[1px] bg-primary/20" />
        </div>

        {/* Schedule, Map, and Transport */}
        <LogisticsSection
          schedule={schedule}
          salon={salon}
          logistics={logistics}
        />

        {/* Muted line separator */}
        <div className="w-full flex justify-center py-6">
          <div className="w-24 h-[1px] bg-primary/10" />
        </div>

        {/* Interactive Live Memory Wall */}
        <PhotoWall />

        {/* Elegant separator */}
        <div className="w-full flex justify-center py-6">
          <div className="w-16 h-[1px] bg-primary/20" />
        </div>

        {/* Confirmation Form */}
        <RsvpForm
          busRoutes={logistics.buses}
          rsvpDeadline={wedding.rsvpDeadline}
        />
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
