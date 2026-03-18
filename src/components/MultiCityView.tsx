'use client'

import { useStore } from '@/lib/store'
import { MapPin, Car, DollarSign, TrendingUp, Globe } from 'lucide-react'

const statusColors = { operational: '#22c55e', expanding: '#eab308', planned: '#6b7280' }

export default function MultiCityView() {
  const { cities, selectedCity, setSelectedCity, vehicles } = useStore()

  // Simple US map positions (approximate)
  const cityPositions: Record<string, { x: number; y: number }> = {
    sf: { x: 12, y: 42 }, la: { x: 14, y: 55 }, nyc: { x: 82, y: 35 },
    chi: { x: 62, y: 30 }, mia: { x: 78, y: 75 }, sea: { x: 14, y: 18 },
    aus: { x: 45, y: 68 }, bos: { x: 87, y: 28 },
  }

  const selected = selectedCity ? cities.find(c => c.id === selectedCity) : null
  const cityVehicles = selectedCity ? vehicles.filter(v => v.cityId === selectedCity) : []

  return (
    <div className="h-full flex">
      <div className="flex-1 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Map background */}
          <svg className="w-full h-full opacity-10">
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#10b981" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="#10b981" strokeWidth="0.5" />
            ))}
          </svg>

          {/* City markers */}
          {cities.map(city => {
            const pos = cityPositions[city.id]
            if (!pos) return null
            const isSelected = selectedCity === city.id
            const size = Math.max(30, Math.min(60, city.vehicleCount / 20))
            return (
              <button
                key={city.id}
                onClick={() => setSelectedCity(isSelected ? null : city.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div
                  className={`rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'ring-4 ring-white/30 scale-110' : 'hover:scale-110'
                  }`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: statusColors[city.status],
                    boxShadow: `0 0 ${size}px ${statusColors[city.status]}60`,
                  }}
                >
                  <span className="text-xs font-bold text-white">{city.vehicleCount > 0 ? city.vehicleCount : '?'}</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-medium bg-gray-900/80 px-2 py-0.5 rounded">{city.name}</span>
                </div>
                {city.status === 'planned' && (
                  <div className="absolute -top-2 -right-2 text-[10px] bg-gray-600 rounded px-1">Soon</div>
                )}
              </button>
            )
          })}

          {/* Connection lines between major cities */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {[['sf', 'la'], ['la', 'aus'], ['aus', 'chi'], ['chi', 'nyc'], ['nyc', 'bos'], ['nyc', 'mia'], ['sf', 'sea']].map(([a, b]) => {
              const pa = cityPositions[a]
              const pb = cityPositions[b]
              if (!pa || !pb) return null
              return (
                <line key={`${a}-${b}`} x1={`${pa.x}%`} y1={`${pa.y}%`} x2={`${pb.x}%`} y2={`${pb.y}%`}
                  stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" />
              )
            })}
          </svg>
        </div>

        <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <p className="text-sm font-medium">Multi-City Fleet View</p>
          <p className="text-xs text-emerald-400 mt-1">Mapbox GL integration ready</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
          <div className="space-y-1.5">
            {Object.entries(statusColors).map(([s, c]) => (
              <div key={s} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                <span className="text-xs text-gray-300 capitalize">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-96 bg-gray-900 border-l border-gray-800 p-6 overflow-y-auto">
          <h3 className="text-xl font-bold mb-1">{selected.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full capitalize ${
            selected.status === 'operational' ? 'bg-green-600/20 text-green-400' :
            selected.status === 'expanding' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-gray-600/20 text-gray-400'
          }`}>{selected.status}</span>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-gray-800 rounded-xl p-4">
              <Car className="w-5 h-5 text-emerald-400 mb-2" />
              <p className="text-xl font-bold">{selected.vehicleCount}</p>
              <p className="text-xs text-gray-400">Total Vehicles</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <TrendingUp className="w-5 h-5 text-blue-400 mb-2" />
              <p className="text-xl font-bold">{selected.activeVehicles}</p>
              <p className="text-xs text-gray-400">Active Now</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <MapPin className="w-5 h-5 text-purple-400 mb-2" />
              <p className="text-xl font-bold">{selected.dailyRides.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Daily Rides</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <DollarSign className="w-5 h-5 text-yellow-400 mb-2" />
              <p className="text-xl font-bold">${(selected.revenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-400">Daily Revenue</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Fleet Status</h4>
            <div className="space-y-2">
              {(['active', 'idle', 'charging', 'maintenance', 'offline'] as const).map(status => {
                const count = cityVehicles.filter(v => v.status === status).length
                const pct = cityVehicles.length > 0 ? (count / cityVehicles.length) * 100 : 0
                const colors = { active: 'bg-green-500', idle: 'bg-yellow-500', charging: 'bg-blue-500', maintenance: 'bg-orange-500', offline: 'bg-gray-500' }
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300 capitalize">{status}</span>
                      <span>{count}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${colors[status]}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Hourly Activity</h4>
            <div className="flex items-end gap-1 h-20">
              {Array.from({ length: 24 }, (_, i) => {
                const h = 10 + Math.random() * 90
                return (
                  <div key={i} className="flex-1">
                    <div className="w-full bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
