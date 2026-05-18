"use client";

import { useState, useRef } from "react";
import { usePhotoWall, PhotoItem } from "@/hooks/usePhotoWall";

export default function PhotoWall() {
  const { photos, isUploading, error, uploadPhoto, toggleLike } = usePhotoWall();
  const [guestName, setGuestName] = useState("");
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const success = await uploadPhoto(file, guestName || "Invitado");
    if (success) {
      setGuestName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="py-20 px-6 max-w-lg mx-auto flex flex-col items-center">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 font-sans mb-2">
        Muro de Recuerdos
      </span>
      <h2 className="text-3xl font-serif text-text-custom tracking-wide mb-3 text-center">
        Live Photo Wall
      </h2>
      <p className="text-xs text-text-light font-light text-center max-w-xs mb-10 leading-relaxed">
        ¡Comparte tus momentos favoritos del día! Sube tus fotos en directo para que todos formen parte del recuerdo.
      </p>

      {/* Guest Upload Ingestion Card */}
      <div className="w-full bg-white/40 border border-primary/10 rounded-2xl p-5 shadow-sm mb-10 select-none">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-custom mb-3 font-sans">
          Subir Foto en Directo
        </h4>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Tu nombre (ej. Prima Marta)"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            disabled={isUploading}
            className="w-full bg-white/70 border border-primary/10 rounded-xl px-4 py-2.5 text-xs text-text-custom focus:outline-none focus:border-primary/45 transition-colors placeholder:text-text-light/50"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />

          <button
            onClick={triggerUpload}
            disabled={isUploading}
            className={`w-full text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all duration-300 border flex items-center justify-center gap-2 ${
              isUploading
                ? "bg-primary/20 border-primary/10 text-primary cursor-not-allowed animate-pulse"
                : "bg-primary border-primary text-white hover:bg-primary-hover shadow-md active:scale-98"
            }`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Subiendo a la nube...
              </>
            ) : (
              <>
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Seleccionar e Iniciar Subida
              </>
            )}
          </button>

          {error && (
            <p className="text-[11px] text-red-600 font-medium mt-1 select-none animate-shake">
              ⚠️ {error}
            </p>
          )}
        </div>
      </div>

      {/* Responsive Masonry-Inspired Image Grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group aspect-square rounded-2xl overflow-hidden border border-primary/5 shadow-sm cursor-pointer active:scale-98 transition-all duration-300 animate-scale-up"
            onClick={() => setLightboxPhoto(photo)}
          >
            {/* Image Frame */}
            <img
              src={photo.url}
              alt={`Foto de ${photo.guestName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />

            {/* Hover Dark Vignette Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-xs font-bold truncate">
                {photo.guestName}
              </span>
              <div className="flex justify-between items-center mt-1.5 select-none">
                <span className="text-[9px] text-white/80 font-light">
                  {photo.timestamp}
                </span>
                
                <span className="flex items-center gap-1 text-[10px] text-white font-bold bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                  ❤️ {photo.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Premium Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in">
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 text-xl font-bold bg-white/10 rounded-full border border-white/15 focus:outline-none transition-colors duration-200"
          >
            ✕
          </button>
          
          <div className="max-w-md w-full bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between max-h-[85vh] animate-scale-up">
            {/* Full Image */}
            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[250px]">
              <img
                src={lightboxPhoto.url}
                alt={`Subida por ${lightboxPhoto.guestName}`}
                className="max-h-[50vh] w-auto object-contain"
              />
            </div>

            {/* Modal Bottom Panel */}
            <div className="p-5 bg-neutral-900/95 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {lightboxPhoto.guestName}
                  </h4>
                  <p className="text-[10px] text-white/50 mt-0.5">
                    Subido {lightboxPhoto.timestamp}
                  </p>
                </div>

                {/* Heart Like Trigger Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(lightboxPhoto.id);
                    
                    // Update active state inside modal locally
                    setLightboxPhoto((prev) => {
                      if (!prev) return null;
                      const hasLiked = !prev.hasLiked;
                      return {
                        ...prev,
                        hasLiked,
                        likes: prev.likes + (hasLiked ? 1 : -1),
                      };
                    });
                  }}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    lightboxPhoto.hasLiked
                      ? "bg-red-500/20 border-red-500/35 text-red-400"
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <svg
                    className={`w-3.5 h-3.5 ${lightboxPhoto.hasLiked ? "fill-current" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{lightboxPhoto.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
