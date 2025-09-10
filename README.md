# Travel Dashboard (skeleton)

This is a lightweight skeleton inspired by the travel-agency-dashboard. It contains a React + Vite + Tailwind setup, simple routing and a sample dashboard with a chart.

## Quick start (without cloning the original repo)

1. Download the provided zip and extract it.
2. In the project folder run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

## What this skeleton contains
- React + Vite app
- Tailwind CSS config
- Basic pages: Home, Trips, Trip detail, Dashboard
- Sample Chart using chart.js + react-chartjs-2
- `src/data/trips.js` as a small local dataset (so no external DB required)

## Making it more like the original project
- Add Syncfusion UI components (note: some Syncfusion features require a license key).
- Replace local dataset with Appwrite/Firebase/your backend for authentication & persistence.
- Integrate AI itinerary generation via an API (e.g. OpenAI / Gemini) — keep API keys in .env.
- Add Stripe or other payment provider for bookings.

## Notes on licensing
This skeleton is created for educational purposes. If you re-use code from other public repos, check their license.

