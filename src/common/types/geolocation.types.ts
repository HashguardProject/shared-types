export interface GeoLocation {
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  ip?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  timestamp?: Date;
  postalCode?: string;
  accuracy?: number;
}

export interface GeoLocationResponse {
  country_name?: string;
  region_name?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  ip: string;
  timezone?: string;
}
