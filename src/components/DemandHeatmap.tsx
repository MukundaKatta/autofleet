'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Flame, MapPin } from 'lucide-react'

export default function DemandHeatmap() {
  const { cities, demandZones, selectedCity, setSelectedCity } = useStore()
  const [timeSlot, setTimeSlot] = useState('now')

  const cityId = selectedCity || 'sf'
  const zones = demandZones.filter(z => z.cityId === cityId)
  const city = cities.find(c => c.id === cityId)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold">Demand Heatmap</h2>
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

      <div className="flex-1 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
          <svg className="w-full h-full opacity-5">
            {Array.from({ length: 20 }, (_, i) => (
              <line key={i} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#fff" strokeWidth="0.5" />
            ))}
          </svg>

          {zones.map((z, i) => {
            const x = 20 + (i % 5) * 15 + Math.random() * 10
            const y = 15 + Math.floor(i / 5) * 20 + Math.random() * 10
            const size = 30 + z.intensity * 60
            const r = Math.floor(255 * z.intensity)
            const g = Math.floor(100 * (1 - z.intensity))
            return (
              <div key={i} className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${x}%`, top: `${y}%`, width: `${size}px`, height: `${size}px`,
                  background: `radial-gradient(circle, rgba(${r},${g},0,0.6) 0%, transparent 70%)`,
                  transform: 'translate(-50%,-50%)',
                }} />
            )
          })}
        </div>

        <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <p className="text-sm font-medium">{city?.name} Demand</p>
          <p className="text-xs text-gray-400 mt-1">{zones.length} data points</p>
        </div>

        <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Low</span>
            <div className="w-24 h-3 rounded-full" style={{
              background: 'linear-gradient(to right, rgba(0,100,0,0.6), rgba(255,255,0,0.6), rgba(255,0,0,0.6))'
            }} />
            <span className="text-xs text-gray-500">High</span>
          </div>
        </div>
      </div>
    </div>
  )
}
