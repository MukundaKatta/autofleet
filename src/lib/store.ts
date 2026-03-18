import { create } from 'zustand'
import { City, FleetVehicle, ChargingStation, WeatherData, DemandZone, OptimizationResult } from '@/types'
import { mockCities, mockVehicles, mockChargingStations, mockWeather, mockDemandZones, mockOptimization } from './mock-data'

interface AppState {
  activeTab: string
  cities: City[]
  vehicles: FleetVehicle[]
  stations: ChargingStation[]
  weather: WeatherData[]
  demandZones: DemandZone[]
  optimization: OptimizationResult[]
  selectedCity: string | null
  setActiveTab: (t: string) => void
  setSelectedCity: (c: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'multiCity',
  cities: mockCities,
  vehicles: mockVehicles,
  stations: mockChargingStations,
  weather: mockWeather,
  demandZones: mockDemandZones,
  optimization: mockOptimization,
  selectedCity: null,
  setActiveTab: (t) => set({ activeTab: t }),
  setSelectedCity: (c) => set({ selectedCity: c }),
}))
