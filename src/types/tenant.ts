export interface Couple {
  partner1: string;
  partner2: string;
  conjunction: string;
}

export interface WeddingInfo {
  couple: Couple;
  date: string;
  heroBgImage: string;
  rsvpDeadline: string;
}

export interface ThemeConfig {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
}

export interface SalonCoordinates {
  lat: number;
  lng: number;
}

export interface SalonInfo {
  name: string;
  address: string;
  coordinates: SalonCoordinates;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface BusRoute {
  id: string;
  route: string;
  departureTime?: string;
  departureTimes?: string[];
  pickupLocation: string;
  notes?: string;
}

export interface LogisticsInfo {
  buses: BusRoute[];
}

export interface TenantConfig {
  theme: ThemeConfig;
  wedding: WeddingInfo;
  salon: SalonInfo;
  schedule: ScheduleEvent[];
  logistics: LogisticsInfo;
}
