import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import tenant from "../../config/tenant.json";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Boda de ${tenant.wedding.couple.partner1} ${tenant.wedding.couple.conjunction} ${tenant.wedding.couple.partner2}`,
  description: `Acompáñanos a celebrar la boda de ${tenant.wedding.couple.partner1} y ${tenant.wedding.couple.partner2} en ${tenant.salon.name}. Consulta el horario, cómo llegar y confirma tu asistencia.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = tenant;

  // Dynamically generate styles using the central tenant.json values
  const dynamicStyles = `
    :root {
      --primary: ${theme.primary};
      --primary-hover: ${theme.primaryHover};
      --secondary: ${theme.secondary};
      --accent: ${theme.accent};
      --background-custom: ${theme.background};
      --text-custom: ${theme.text};
      --text-light: ${theme.textLight};
    }
  `;

  return (
    <html
      lang="es"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
        {/* Leaflet CSS loaded globally for smooth map performance */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-custom text-text-custom">
        {children}
      </body>
    </html>
  );
}
