'use client'

import { useStore } from '@/lib/store'
import { Globe, Flame, Zap, Settings, Cloud, MapPin, BarChart3 } from 'lucide-react'
import MultiCityView from '@/components/MultiCityView'
import DemandHeatmap from '@/components/DemandHeatmap'
import ChargingManagement from '@/components/ChargingManagement'
import FleetOptimization from '@/components/FleetOptimization'
import WeatherIntegration from '@/components/WeatherIntegration'

const tabs = [
  { id: 'multiCity', label: 'Multi-City View', icon: Globe },
  { id: 'demand', label: 'Demand Heatmap', icon: Flame },
  { id: 'charging', label: 'Charging Stations', icon: Zap },
  { id: 'optimization', label: 'Fleet Optimization', icon: Settings },
  { id: 'weather', label: 'Weather Impact', icon: Cloud },
]

export default function HomePage() {
  const { activeTab, setActiveTab, cities } = useStore()

  const totalVehicles = cities.reduce((s, c) => s + c.vehicleCount, 0)
  const totalRevenue = cities.reduce((s, c) => s + c.revenue, 0)

  const renderContent = () => {
    switch (activeTab) {
      case 'multiCity': return <MultiCityView />
      case 'demand': return <DemandHeatmap />
      case 'charging': return <ChargingManagement />
      case 'optimization': return <FleetOptimization />
      case 'weather': return <WeatherIntegration />
      default: return <MultiCityView />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">AutoFleet</h1>
              <p className="text-xs text-gray-400">Fleet Operations</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-400">Global Fleet</p>
            <p className="text-lg font-bold">{totalVehicles.toLocaleString()} AVs</p>
            <p className="text-xs text-emerald-400">{cities.filter(c => c.status === 'operational').length} cities active</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400">Daily Revenue</p>
            <p className="text-lg font-bold text-emerald-400">${(totalRevenue / 1000).toFixed(0)}K</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
