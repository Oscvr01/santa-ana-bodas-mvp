"use client";

import { useState, useEffect } from "react";

export interface PhotoItem {
  id: string;
  url: string;
  guestName: string;
  likes: number;
  hasLiked?: boolean;
  timestamp: string;
}

const LOCAL_STORAGE_KEY = "wedding_photo_wall_items";

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: "photo-default-1",
    url: "/images/photo-1.png",
    guestName: "Tía Carmen",
    likes: 12,
    hasLiked: false,
    timestamp: "Hace 10 minutos",
  },
  {
    id: "photo-default-2",
    url: "/images/photo-2.png",
    guestName: "Carlos (Amigo)",
    likes: 24,
    hasLiked: false,
    timestamp: "Hace 25 minutos",
  },
  {
    id: "photo-default-3",
    url: "/images/photo-3.png",
    guestName: "Laura & Dani",
    likes: 8,
    hasLiked: false,
    timestamp: "Hace 1 hora",
  },
  {
    id: "photo-default-4",
    url: "/images/photo-4.png",
    guestName: "Juan (Primo)",
    likes: 19,
    hasLiked: false,
    timestamp: "Hace 2 horas",
  },
];

export function usePhotoWall() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage or use defaults
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setPhotos(JSON.parse(stored));
      } catch {
        setPhotos(DEFAULT_PHOTOS);
      }
    } else {
      setPhotos(DEFAULT_PHOTOS);
    }
  }, []);

  const saveToStorage = (updatedPhotos: PhotoItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPhotos));
    setPhotos(updatedPhotos);
  };

  const uploadPhoto = (file: File, guestName: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setIsUploading(true);
      setError(null);

      // Validate File Type
      if (!file.type.startsWith("image/")) {
        setError("El archivo seleccionado debe ser una imagen.");
        setIsUploading(false);
        resolve(false);
        return;
      }

      // Validate File Size (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen supera el límite de 5 MB.");
        setIsUploading(false);
        resolve(false);
        return;
      }

      // Read file and mock upload latency
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          const dataUrl = reader.result as string;

          const newPhoto: PhotoItem = {
            id: `photo-guest-${Date.now()}`,
            url: dataUrl,
            guestName: guestName.trim() || "Invitado Anónimo",
            likes: 0,
            hasLiked: false,
            timestamp: "Justo ahora",
          };

          const updated = [newPhoto, ...photos];
          saveToStorage(updated);
          setIsUploading(false);
          resolve(true);
        }, 1200); // Simulated 1.2s S3 upload & API ingestion latency
      };

      reader.onerror = () => {
        setError("Error al procesar el archivo local.");
        setIsUploading(false);
        resolve(false);
      };

      reader.readAsDataURL(file);
    });
  };

  const toggleLike = (id: string) => {
    const updated = photos.map((photo) => {
      if (photo.id === id) {
        const hasLiked = !photo.hasLiked;
        return {
          ...photo,
          hasLiked,
          likes: photo.likes + (hasLiked ? 1 : -1),
        };
      }
      return photo;
    });
    saveToStorage(updated);
  };

  return {
    photos,
    isUploading,
    error,
    uploadPhoto,
    toggleLike,
  };
}
