'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Zap, Battery, MapPin, AlertCircle, CheckCircle } from 'lucide-react'

export default function ChargingManagement() {
  const { stations, cities, selectedCity, setSelectedCity } = useStore()
  const [speedFilter, setSpeedFilter] = useState('all')

  const cityId = selectedCity || 'sf'
  const cityStations = stations.filter(s => s.cityId === cityId)
  const filtered = speedFilter === 'all' ? cityStations : cityStations.filter(s => s.chargingSpeed === speedFilter)

  const totalPorts = cityStations.reduce((s, st) => s + st.totalPorts, 0)
  const availablePorts = cityStations.reduce((s, st) => s + st.availablePorts, 0)
  const utilization = totalPorts > 0 ? ((totalPorts - availablePorts) / totalPorts * 100).toFixed(0) : 0

  const speedColors = { standard: '#3b82f6', fast: '#eab308', ultra_fast: '#ef4444' }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Charging Station Management</h2>
          <p className="text-gray-400">Monitor charging infrastructure across all cities</p>
        </div>
        <div className="flex gap-2">
          {cities.filter(c => c.status !== 'planned').map(c => (
            <button key={c.id} onClick={() => setSelectedCity(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${cityId === c.id ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <Zap className="w-8 h-8 text-yellow-400 mb-3" />
          <p className="text-2xl font-bold">{cityStations.length}</p>
          <p className="text-xs text-gray-400">Stations</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <Battery className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-2xl font-bold">{totalPorts}</p>
          <p className="text-xs text-gray-400">Total Ports</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
          <p className="text-2xl font-bold">{availablePorts}</p>
          <p className="text-xs text-gray-400">Available</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <div className="relative w-16 h-16 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#1f2937" strokeWidth="6" fill="none" />
              <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="6" fill="none"
                strokeDasharray={`${Number(utilization) * 1.76} 176`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">{utilization}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">Utilization</p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'standard', 'fast', 'ultra_fast'].map(s => (
          <button key={s} onClick={() => setSpeedFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${speedFilter === s ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
            {s === 'all' ? 'All Types' : s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map(station => {
          const used = station.totalPorts - station.availablePorts
          const pct = (used / station.totalPorts) * 100
          return (
            <div key={station.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium">{station.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                      backgroundColor: `${speedColors[station.chargingSpeed]}20`,
                      color: speedColors[station.chargingSpeed],
                    }}>
                      {station.chargingSpeed.replace('_', ' ')}
                    </span>
                    <span className={`text-xs ${station.status === 'online' ? 'text-green-400' : station.status === 'degraded' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {station.status}
                    </span>
                  </div>
                </div>
                {station.status === 'degraded' && <AlertCircle className="w-5 h-5 text-yellow-400" />}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Ports in use</span>
                  <span>{used}/{station.totalPorts}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all" style={{
                    width: `${pct}%`,
                    backgroundColor: pct > 80 ? '#ef4444' : pct > 50 ? '#eab308' : '#22c55e'
                  }} />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: station.totalPorts }, (_, i) => (
                  <div key={i} className={`h-3 rounded ${i < used ? 'bg-emerald-500' : 'bg-gray-700'}`} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
