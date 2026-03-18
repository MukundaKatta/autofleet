export interface City {
  id: string
  name: string
  lat: number
  lng: number
  vehicleCount: number
  activeVehicles: number
  dailyRides: number
  revenue: number
  status: 'operational' | 'expanding' | 'planned'
}

export interface FleetVehicle {
  id: string
  cityId: string
  name: string
  status: 'active' | 'idle' | 'charging' | 'maintenance' | 'offline'
  lat: number
  lng: number
  battery: number
  speed: number
}

export interface ChargingStation {
  id: string
  name: string
  cityId: string
  lat: number
  lng: number
  totalPorts: number
  availablePorts: number
  chargingSpeed: 'standard' | 'fast' | 'ultra_fast'
  status: 'online' | 'degraded' | 'offline'
  vehiclesCharging: string[]
}

export interface DemandZone {
  lat: number
  lng: number
  intensity: number
  cityId: string
}

export interface WeatherData {
  cityId: string
  condition: 'clear' | 'cloudy' | 'rain' | 'snow' | 'fog' | 'storm'
  temperature: number
  visibility: number
  windSpeed: number
  impact: 'none' | 'minor' | 'moderate' | 'severe'
}

export interface OptimizationResult {
  metric: string
  before: number
  after: number
  improvement: number
  unit: string
}
