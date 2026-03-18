'use client'

import { useStore } from '@/lib/store'
import { Settings, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'

export default function FleetOptimization() {
  const { optimization } = useStore()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Fleet Optimization</h2>
        <p className="text-gray-400">AI-driven optimization results and recommendations</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {optimization.map((opt) => (
          <div key={opt.metric} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-4">{opt.metric}</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-lg text-gray-500">{opt.before}{opt.unit}</p>
                <p className="text-[10px] text-gray-600">Before</p>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400" />
              <div className="text-center">
                <p className="text-lg font-bold text-white">{opt.after}{opt.unit}</p>
                <p className="text-[10px] text-gray-600">After</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">+{opt.improvement}% improvement</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${opt.improvement}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Optimization Recommendations</h3>
        <div className="space-y-3">
          {[
            { title: 'Rebalance SF fleet - Move 15 vehicles from Marina to SOMA', priority: 'high' },
            { title: 'Schedule preventive maintenance for LA fleet batch AV-LA-040 through AV-LA-060', priority: 'medium' },
            { title: 'Open 2 new charging stations in Chicago downtown area', priority: 'high' },
            { title: 'Adjust pricing in NYC during evening rush (5-7 PM)', priority: 'low' },
            { title: 'Increase fleet size in Austin by 50 vehicles for demand growth', priority: 'medium' },
          ].map((rec, i) => (
            <div key={i} className="flex items-center gap-4 bg-gray-800 rounded-xl p-4">
              <div className={`w-2 h-2 rounded-full ${
                rec.priority === 'high' ? 'bg-red-400' : rec.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
              }`} />
              <p className="flex-1 text-sm">{rec.title}</p>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                rec.priority === 'high' ? 'bg-red-600/20 text-red-400' :
                rec.priority === 'medium' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-green-600/20 text-green-400'
              }`}>{rec.priority}</span>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <CheckCircle className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
