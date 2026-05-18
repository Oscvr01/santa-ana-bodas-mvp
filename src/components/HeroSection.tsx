"use client";

import { useEffect, useState } from "react";
import { WeddingInfo } from "@/types/tenant";

interface HeroSectionProps {
  wedding: WeddingInfo;
  salonName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

export default function HeroSection({ wedding, salonName }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(wedding.date) - +new Date();
      let newTimeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isOver: true,
      };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isOver: false,
        };
      }

      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [wedding.date]);

  return (
    <section className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden">
      {/* Background Image with Dark Soft Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-out scale-105 animate-pulse-subtle"
        style={{
          backgroundImage: `url('${wedding.heroBgImage}')`,
        }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Top Wedding Date Badge */}
      <div className="relative z-10 pt-16 flex flex-col items-center animate-fade-in-up">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-secondary border border-secondary/30 bg-black/25 backdrop-blur-md">
          ¡Nos Casamos!
        </span>
      </div>

      {/* Core Names Section */}
      <div className="relative z-10 text-center px-4 max-w-lg flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white tracking-wide select-none drop-shadow-lg leading-tight animate-fade-in-up">
          {wedding.couple.partner1}
          <span className="block my-2 text-3xl font-serif italic font-light text-secondary text-center">
            {wedding.couple.conjunction}
          </span>
          {wedding.couple.partner2}
        </h1>
        
        <p className="mt-4 text-sm sm:text-base text-white/95 font-medium tracking-widest uppercase font-sans animate-fade-in-up delay-200">
          {salonName}
        </p>
        <div className="w-12 h-[1px] bg-secondary/60 mt-3 mb-1 animate-fade-in-up delay-200" />
        <p className="text-sm font-light tracking-wide text-secondary/90 animate-fade-in-up delay-300">
          {isMounted
            ? new Date(wedding.date).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""}
        </p>
      </div>

      {/* Countdown Timer Block */}
      <div className="relative z-10 w-full px-6 pb-20 max-w-sm flex flex-col items-center">
        <div className="w-full glass rounded-3xl p-5 shadow-2xl flex flex-col items-center border border-white/20 select-none animate-scale-up">
          <h3 className="text-[10px] uppercase font-bold tracking-widest text-text-custom/75 mb-3 font-sans">
            La Cuenta Atrás
          </h3>
          
          {timeLeft.isOver ? (
            <div className="py-2 text-primary font-serif font-semibold text-lg animate-pulse">
              ¡Ha llegado el gran día! 🎉
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5 w-full">
              {[
                { label: "Días", value: timeLeft.days },
                { label: "Horas", value: timeLeft.hours },
                { label: "Minutos", value: timeLeft.minutes },
                { label: "Segundos", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center bg-primary/10 rounded-xl py-3 border border-primary/5 shadow-inner"
                >
                  <span className="text-2xl font-bold text-primary font-serif tabular-nums tracking-tighter">
                    {isMounted ? String(item.value).padStart(2, "0") : "--"}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-text-light font-medium mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Downward Scroll Trigger */}
        <div className="mt-8 flex flex-col items-center gap-1 opacity-70 animate-bounce">
          <span className="text-[10px] text-white tracking-widest uppercase font-medium">
            Desliza para saber más
          </span>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
