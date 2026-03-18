'use client'

import { useStore } from '@/lib/store'
import { Cloud, Sun, CloudRain, Snowflake, CloudFog, CloudLightning, Wind, Eye, Thermometer, AlertTriangle } from 'lucide-react'

const weatherIcons: Record<string, any> = {
  clear: Sun, cloudy: Cloud, rain: CloudRain, snow: Snowflake, fog: CloudFog, storm: CloudLightning,
}
const impactColors: Record<string, string> = {
  none: 'text-green-400 bg-green-600/20', minor: 'text-yellow-400 bg-yellow-600/20',
  moderate: 'text-orange-400 bg-orange-600/20', severe: 'text-red-400 bg-red-600/20',
}

export default function WeatherIntegration() {
  const { weather, cities } = useStore()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Weather Integration</h2>
        <p className="text-gray-400">Real-time weather conditions and fleet impact analysis</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {weather.map(w => {
          const city = cities.find(c => c.id === w.cityId)
          const Icon = weatherIcons[w.condition] || Cloud
          return (
            <div key={w.cityId} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{city?.name}</h3>
                <Icon className="w-8 h-8 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{w.temperature}F</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{w.visibility} mi visibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{w.windSpeed} mph</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${impactColors[w.impact]}`}>
                    {w.impact} impact
                  </span>
                </div>
              </div>

              {w.impact !== 'none' && (
                <div className="mt-4 pt-3 border-t border-gray-800">
                  <p className="text-xs text-gray-400">Recommendation:</p>
                  <p className="text-xs mt-1">
                    {w.impact === 'severe' ? 'Reduce fleet activity. Enable cautious mode.' :
                     w.impact === 'moderate' ? 'Lower speed limits. Increase following distance.' :
                     'Monitor conditions. Minor adjustments needed.'}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Fleet Impact Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          {(['none', 'minor', 'moderate', 'severe'] as const).map(level => {
            const count = weather.filter(w => w.impact === level).length
            return (
              <div key={level} className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{count}</p>
                <p className={`text-xs capitalize ${impactColors[level]?.split(' ')[0]}`}>{level} Impact</p>
                <p className="text-xs text-gray-500 mt-1">{count} {count === 1 ? 'city' : 'cities'}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
