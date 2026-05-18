"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

interface MapProps {
  lat: number;
  lng: number;
  salonName: string;
  salonAddress: string;
}

export default function Map({ lat, lng, salonName, salonAddress }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize leaflet map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false, // Prevents disrupting window scrolling
      });

      // Muted watercolor/artistic tile layer to fit our premium aesthetic
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(mapRef.current);

      // Custom marker icon using HTML/SVG styled with theme CSS variables
      const customIcon = L.divIcon({
        className: "custom-map-icon",
        html: `
          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary border-4 border-white shadow-xl animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(
        mapRef.current
      );

      marker
        .bindPopup(
          `
        <div style="font-family: var(--font-sans), sans-serif; text-align: center; padding: 4px;">
          <h4 style="margin: 0 0 4px 0; font-family: var(--font-serif); font-size: 14px; font-weight: 700; color: var(--primary);">${salonName}</h4>
          <p style="margin: 0; font-size: 11px; color: var(--text-light); line-height: 1.3;">${salonAddress}</p>
        </div>
      `
        )
        .openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, salonName, salonAddress]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md border border-primary/10">
      <div ref={mapContainerRef} className="w-full h-full min-h-[300px]" />
    </div>
  );
}
