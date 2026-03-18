import { City, FleetVehicle, ChargingStation, WeatherData, DemandZone, OptimizationResult } from '@/types'

export const mockCities: City[] = [
  { id: 'sf', name: 'San Francisco', lat: 37.7749, lng: -122.4194, vehicleCount: 500, activeVehicles: 320, dailyRides: 4200, revenue: 84000, status: 'operational' },
  { id: 'la', name: 'Los Angeles', lat: 34.0522, lng: -118.2437, vehicleCount: 800, activeVehicles: 520, dailyRides: 6800, revenue: 136000, status: 'operational' },
  { id: 'nyc', name: 'New York', lat: 40.7128, lng: -74.0060, vehicleCount: 1200, activeVehicles: 780, dailyRides: 12000, revenue: 240000, status: 'operational' },
  { id: 'chi', name: 'Chicago', lat: 41.8781, lng: -87.6298, vehicleCount: 300, activeVehicles: 180, dailyRides: 2100, revenue: 42000, status: 'expanding' },
  { id: 'mia', name: 'Miami', lat: 25.7617, lng: -80.1918, vehicleCount: 200, activeVehicles: 130, dailyRides: 1500, revenue: 30000, status: 'expanding' },
  { id: 'sea', name: 'Seattle', lat: 47.6062, lng: -122.3321, vehicleCount: 250, activeVehicles: 160, dailyRides: 1800, revenue: 36000, status: 'operational' },
  { id: 'aus', name: 'Austin', lat: 30.2672, lng: -97.7431, vehicleCount: 150, activeVehicles: 90, dailyRides: 900, revenue: 18000, status: 'expanding' },
  { id: 'bos', name: 'Boston', lat: 42.3601, lng: -71.0589, vehicleCount: 0, activeVehicles: 0, dailyRides: 0, revenue: 0, status: 'planned' },
]

export const mockVehicles: FleetVehicle[] = mockCities.flatMap(city =>
  Array.from({ length: Math.min(city.vehicleCount, 10) }, (_, i) => ({
    id: `${city.id}-v${i + 1}`,
    cityId: city.id,
    name: `AV-${city.id.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
    status: (['active', 'idle', 'charging', 'maintenance', 'offline'] as const)[i % 5],
    lat: city.lat + (Math.random() - 0.5) * 0.08,
    lng: city.lng + (Math.random() - 0.5) * 0.08,
    battery: 20 + Math.random() * 80,
    speed: Math.random() * 35,
  }))
)

export const mockChargingStations: ChargingStation[] = mockCities.filter(c => c.status !== 'planned').flatMap(city =>
  Array.from({ length: 4 }, (_, i) => ({
    id: `cs-${city.id}-${i + 1}`,
    name: `${city.name} Station ${i + 1}`,
    cityId: city.id,
    lat: city.lat + (Math.random() - 0.5) * 0.06,
    lng: city.lng + (Math.random() - 0.5) * 0.06,
    totalPorts: [8, 12, 16, 24][i % 4],
    availablePorts: Math.floor(Math.random() * [8, 12, 16, 24][i % 4]),
    chargingSpeed: (['standard', 'fast', 'ultra_fast'] as const)[i % 3],
    status: (['online', 'online', 'degraded', 'online'] as const)[i % 4],
    vehiclesCharging: [],
  }))
)

export const mockWeather: WeatherData[] = [
  { cityId: 'sf', condition: 'cloudy', temperature: 62, visibility: 8, windSpeed: 15, impact: 'minor' },
  { cityId: 'la', condition: 'clear', temperature: 78, visibility: 10, windSpeed: 5, impact: 'none' },
  { cityId: 'nyc', condition: 'rain', temperature: 55, visibility: 5, windSpeed: 20, impact: 'moderate' },
  { cityId: 'chi', condition: 'snow', temperature: 28, visibility: 3, windSpeed: 25, impact: 'severe' },
  { cityId: 'mia', condition: 'clear', temperature: 82, visibility: 10, windSpeed: 8, impact: 'none' },
  { cityId: 'sea', condition: 'rain', temperature: 50, visibility: 6, windSpeed: 12, impact: 'minor' },
  { cityId: 'aus', condition: 'clear', temperature: 85, visibility: 10, windSpeed: 7, impact: 'none' },
  { cityId: 'bos', condition: 'fog', temperature: 45, visibility: 2, windSpeed: 10, impact: 'moderate' },
]

export const mockDemandZones: DemandZone[] = mockCities.flatMap(city =>
  Array.from({ length: 20 }, () => ({
    lat: city.lat + (Math.random() - 0.5) * 0.06,
    lng: city.lng + (Math.random() - 0.5) * 0.06,
    intensity: Math.random(),
    cityId: city.id,
  }))
)

export const mockOptimization: OptimizationResult[] = [
  { metric: 'Avg Wait Time', before: 5.2, after: 3.1, improvement: 40, unit: 'min' },
  { metric: 'Fleet Utilization', before: 62, after: 78, improvement: 26, unit: '%' },
  { metric: 'Energy Consumption', before: 0.32, after: 0.24, improvement: 25, unit: 'kWh/mi' },
  { metric: 'Revenue per Vehicle', before: 180, after: 245, improvement: 36, unit: '$/day' },
  { metric: 'Empty Miles', before: 28, after: 15, improvement: 46, unit: '%' },
  { metric: 'Charging Efficiency', before: 72, after: 91, improvement: 26, unit: '%' },
]
