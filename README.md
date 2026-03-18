# AutoFleet

Autonomous fleet management platform for monitoring, optimizing, and managing electric vehicle fleets across cities.

<!-- Add screenshot here -->

## Features

- **Multi-City View** — Monitor vehicle fleets across multiple cities on interactive maps
- **Demand Heatmap** — Visualize ride demand patterns with real-time heatmap overlays
- **Charging Station Management** — Track charging station status, availability, and utilization
- **Fleet Optimization** — AI-driven route and dispatch optimization for maximum efficiency
- **Weather Integration** — Factor weather conditions into fleet planning and operations
- **Revenue Analytics** — Track revenue and vehicle utilization metrics across cities
- **Real-Time Tracking** — Live vehicle positions with Mapbox GL integration

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Maps:** Mapbox GL, react-map-gl
- **Charts:** Recharts
- **Animation:** Framer Motion
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Mapbox API token
- Supabase project

### Installation

```bash
git clone <repo-url>
cd autofleet
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/
│   ├── MultiCityView.tsx
│   ├── DemandHeatmap.tsx
│   ├── ChargingManagement.tsx
│   ├── FleetOptimization.tsx
│   └── WeatherIntegration.tsx
├── lib/              # Store, utilities, Supabase client
└── types/            # TypeScript type definitions
```

## License

MIT
