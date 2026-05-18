"use client";

import { useState } from "react";
import { BusRoute } from "@/types/tenant";

interface RsvpFormProps {
  busRoutes: BusRoute[];
  rsvpDeadline: string;
}

export default function RsvpForm({ busRoutes, rsvpDeadline }: RsvpFormProps) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [allergies, setAllergies] = useState("");
  const [needBus, setNeedBus] = useState<"yes" | "no">("no");
  const [selectedRoute, setSelectedRoute] = useState(busRoutes[0]?.id || "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    // Validation
    if (!name.trim()) {
      setFieldError("Por favor, introduce tu nombre completo.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attending,
          allergies: attending === "yes" ? allergies : "",
          bus: attending === "yes" ? needBus : "no",
          routeId: attending === "yes" && needBus === "yes" ? selectedRoute : "",
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: resData.message,
        });
      } else {
        setFieldError(resData.error || "Ocurrió un error inesperado.");
      }
    } catch {
      setFieldError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDeadline = new Date(rsvpDeadline).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="py-20 px-6 max-w-lg mx-auto flex flex-col items-center">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 font-sans mb-2">
        Confirmación
      </span>
      <h2 className="text-3xl font-serif text-text-custom tracking-wide mb-3 text-center">
        ¿Nos Acompañas?
      </h2>
      <p className="text-xs text-text-light font-light text-center max-w-xs mb-10 leading-relaxed">
        Agradecemos que nos confirmes tu asistencia antes del <strong>{formattedDeadline}</strong> para ayudarnos con los preparativos.
      </p>

      {/* Main card */}
      <div className="w-full bg-white/40 border border-primary/10 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden select-none">
        
        {submitResult?.success ? (
          /* GORGEOUS SUCCESS STATE */
          <div className="flex flex-col items-center py-6 text-center animate-scale-up">
            {/* Animated Checkmark Icon */}
            <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse-subtle">
              <svg
                className="w-8 h-8 text-accent animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-text-custom mb-3">
              ¡Confirmación Recibida!
            </h3>
            <p className="text-sm text-text-light leading-relaxed max-w-xs mb-6">
              {submitResult.message}
            </p>
            
            <button
              onClick={() => {
                setSubmitResult(null);
                setName("");
                setAttending("yes");
                setAllergies("");
                setNeedBus("no");
              }}
              className="text-xs font-semibold text-primary hover:text-primary-hover border-b border-primary/30 pb-0.5 tracking-wider transition-colors duration-200"
            >
              Modificar o enviar otra confirmación
            </button>
          </div>
        ) : (
          /* RSVP FORM BODY */
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Input Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-custom/80 font-sans">
                Nombre Completo *
              </label>
              <input
                type="text"
                placeholder="Escribe tu nombre y apellidos"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldError) setFieldError(null);
                }}
                disabled={isSubmitting}
                className="w-full bg-white/70 border border-primary/10 rounded-xl px-4 py-3 text-xs text-text-custom focus:outline-none focus:border-primary/45 transition-colors placeholder:text-text-light/40"
              />
            </div>

            {/* Attendance Toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-custom/80 font-sans">
                ¿Asistirás a la boda? *
              </label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  disabled={isSubmitting}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 border ${
                    attending === "yes"
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-white/40 border-primary/10 text-text-custom/70 hover:bg-white/60"
                  }`}
                >
                  Sí, ¡asistiré! 🎉
                </button>
                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  disabled={isSubmitting}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 border ${
                    attending === "no"
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-white/40 border-primary/10 text-text-custom/70 hover:bg-white/60"
                  }`}
                >
                  No podré ir 😔
                </button>
              </div>
            </div>

            {/* COLLAPSIBLE LOGISTICS DETAILS (Only show if guest is attending) */}
            {attending === "yes" && (
              <div className="flex flex-col gap-6 animate-scale-up border-t border-primary/5 pt-5">
                
                {/* Allergies / Diets */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-custom/80 font-sans">
                    Alergias o Restricciones Alimenticias
                  </label>
                  <input
                    type="text"
                    placeholder="Celíaco, vegetariano, alérgico a frutos secos..."
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-white/70 border border-primary/10 rounded-xl px-4 py-3 text-xs text-text-custom focus:outline-none focus:border-primary/45 transition-colors placeholder:text-text-light/40"
                  />
                  <span className="text-[9px] text-text-light/70 font-light mt-0.5">
                    Deja vacío si no tienes ninguna restricción.
                  </span>
                </div>

                {/* Bus Logistics Option */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-custom/80 font-sans">
                    ¿Necesitas plaza de Autobús?
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <button
                      type="button"
                      onClick={() => setNeedBus("yes")}
                      disabled={isSubmitting}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 border ${
                        needBus === "yes"
                          ? "bg-primary/20 border-primary/20 text-primary"
                          : "bg-white/40 border-primary/10 text-text-custom/70 hover:bg-white/60"
                      }`}
                    >
                      Sí, reservar plaza 🚌
                    </button>
                    <button
                      type="button"
                      onClick={() => setNeedBus("no")}
                      disabled={isSubmitting}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 border ${
                        needBus === "no"
                          ? "bg-primary/20 border-primary/20 text-primary"
                          : "bg-white/40 border-primary/10 text-text-custom/70 hover:bg-white/60"
                      }`}
                    >
                      No lo necesito
                    </button>
                  </div>
                </div>

                {/* Bus route selector (Only show if Bus is requested) */}
                {needBus === "yes" && busRoutes.length > 0 && (
                  <div className="flex flex-col gap-1.5 animate-scale-up bg-primary/5 p-4 rounded-2xl border border-primary/5">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-custom/80 font-sans">
                      Selecciona tu Ruta de Autobús
                    </label>
                    <select
                      value={selectedRoute}
                      onChange={(e) => setSelectedRoute(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-white border border-primary/10 rounded-xl px-3 py-2.5 text-xs text-text-custom focus:outline-none focus:border-primary/45 transition-colors mt-1"
                    >
                      {busRoutes.map((route) => (
                        <option key={route.id} value={route.id}>
                          {route.route}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              </div>
            )}

            {/* Error messaging */}
            {fieldError && (
              <p className="text-[11px] text-red-600 font-medium text-center bg-red-500/10 py-2.5 px-4 rounded-xl border border-red-500/15">
                ⚠️ {fieldError}
              </p>
            )}

            {/* Form submit trigger */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isSubmitting
                  ? "bg-primary/30 text-primary/70 cursor-not-allowed animate-pulse"
                  : "bg-primary text-white hover:bg-primary-hover shadow-lg active:scale-98"
              }`}
            >
              {isSubmitting ? "Enviando confirmación..." : "Confirmar Asistencia"}
            </button>

          </form>
        )}

      </div>
    </section>
  );
}
