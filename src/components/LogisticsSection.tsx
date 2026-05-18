"use client";

import dynamic from "next/dynamic";
import { ScheduleEvent, SalonInfo, LogisticsInfo } from "@/types/tenant";

// Dynamic import of Leaflet Map with no Server-Side Rendering (SSR)
const MapComponent = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-primary/5 rounded-2xl flex items-center justify-center animate-pulse border border-primary/10">
      <span className="text-sm text-text-light font-sans font-medium tracking-wide">
        Cargando mapa interactivo...
      </span>
    </div>
  ),
});

interface LogisticsSectionProps {
  schedule: ScheduleEvent[];
  salon: SalonInfo;
  logistics: LogisticsInfo;
}

// Custom Premium SVG Icons Map
function EventIcon({ icon }: { icon: string }) {
  const baseClass = "w-5 h-5 text-primary";
  switch (icon) {
    case "heart":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case "glass":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v12m0 0l-5 4m5-4l5 4m-8-12h6M5 6a7 7 0 0114 0" />
        </svg>
      );
    case "utensils":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      );
    case "music":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    default:
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

export default function LogisticsSection({
  schedule,
  salon,
  logistics,
}: LogisticsSectionProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${salon.coordinates.lat},${salon.coordinates.lng}`;

  return (
    <section className="py-20 px-6 max-w-lg mx-auto flex flex-col gap-20">
      
      {/* 1. TIMELINE MODULE */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 font-sans mb-2">
          ¿Qué pasará?
        </span>
        <h2 className="text-3xl font-serif text-text-custom tracking-wide mb-10 text-center">
          Horario de Bodas
        </h2>
        
        {/* Timeline Line & Grid */}
        <div className="relative w-full border-l border-primary/20 pl-6 ml-3 flex flex-col gap-10">
          {schedule.map((event, index) => (
            <div
              key={index}
              className="relative group transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Event Bubble Pin */}
              <div className="absolute -left-[37px] top-1 w-6 h-6 rounded-full bg-secondary border-2 border-primary/10 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/25 transition-transform duration-300">
                <EventIcon icon={event.icon} />
              </div>

              {/* Card Copy */}
              <div>
                <span className="inline-block text-xs font-bold text-primary font-sans tracking-wide bg-primary/5 px-2.5 py-0.5 rounded-full mb-1 shadow-sm">
                  {event.time}
                </span>
                <h4 className="text-lg font-serif font-bold text-text-custom mt-1 group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h4>
                <p className="text-sm text-text-light font-light leading-relaxed mt-1.5">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SALON / MAP MODULE */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 font-sans mb-2">
          ¿Dónde ir?
        </span>
        <h2 className="text-3xl font-serif text-text-custom tracking-wide mb-4 text-center">
          El Salón de Bodas
        </h2>
        <h3 className="text-lg font-bold text-primary font-serif tracking-wide text-center">
          {salon.name}
        </h3>
        <p className="text-xs text-text-light font-light tracking-wide text-center max-w-xs mt-1.5 leading-relaxed">
          {salon.address}
        </p>

        {/* Map Container */}
        <div className="w-full h-[300px] mt-8 rounded-2xl overflow-hidden shadow-lg border border-primary/5 relative">
          <MapComponent
            lat={salon.coordinates.lat}
            lng={salon.coordinates.lng}
            salonName={salon.name}
            salonAddress={salon.address}
          />
        </div>

        {/* Directions Link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-xs font-semibold text-primary hover:text-primary-hover border-b border-primary/30 pb-0.5 tracking-wider transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          Abrir en Google Maps
        </a>
      </div>

      {/* 3. LOGISTICS / BUSES MODULE */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 font-sans mb-2">
          ¿Cómo volver?
        </span>
        <h2 className="text-3xl font-serif text-text-custom tracking-wide mb-8 text-center">
          Servicio de Autobús
        </h2>

        <div className="w-full flex flex-col gap-6">
          {logistics.buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white/40 border border-primary/10 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex gap-4 items-start"
            >
              {/* Bus icon container */}
              <div className="p-2.5 bg-primary/10 rounded-xl mt-1 border border-primary/5">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>

              {/* Bus details */}
              <div className="flex-1 select-none">
                <h4 className="text-sm font-bold text-text-custom font-sans leading-snug">
                  {bus.route}
                </h4>
                
                {bus.departureTime && (
                  <p className="text-xs font-semibold text-primary mt-1.5 flex items-center gap-1 font-sans">
                    <strong>Salida:</strong> {bus.departureTime}
                  </p>
                )}

                {bus.departureTimes && (
                  <p className="text-xs font-semibold text-primary mt-1.5 flex items-center gap-1 font-sans">
                    <strong>Horarios:</strong> {bus.departureTimes.join(" | ")}
                  </p>
                )}

                <div className="mt-3 text-xs text-text-light font-light leading-relaxed">
                  <p className="mb-1">
                    <strong>Parada:</strong> {bus.pickupLocation}
                  </p>
                  {bus.notes && (
                    <p className="italic text-[11px] text-text-light/80 mt-1">
                      * {bus.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
