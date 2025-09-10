
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { listTrips } from '../services/trips';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(()=> {
    listTrips().then((t)=> setTrips(t));
    const bookings = JSON.parse(localStorage.getItem('travel_bookings_v1') || '[]');
    setBookingsCount(bookings.length);
  }, []);

  const revenue = trips.reduce((s,t) => s + (t.price || 0), 0);
  const labels = trips.map(t => t.title);
  const bookingsData = trips.map((_, i) => (i+1) * 3); // simulated per-trip bookings

  const barData = {
    labels,
    datasets: [
      {
        label: 'Simulated bookings',
        data: bookingsData,
        backgroundColor: 'rgba(15,23,42,0.8)'
      }
    ]
  };

  const doughData = {
    labels: ['Bookings', 'No Bookings'],
    datasets: [
      { data: [bookingsCount, Math.max(0, trips.length*3 - bookingsCount)], backgroundColor: ['#0f172a', '#94a3b8'] }
    ]
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Total trips</div>
          <div className="text-2xl font-bold">{trips.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Bookings (collected)</div>
          <div className="text-2xl font-bold">{bookingsCount}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Revenue (sum of prices)</div>
          <div className="text-2xl font-bold">${Math.round(revenue)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Bookings by trip (simulated)</h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Bookings overview</h3>
          <Doughnut data={doughData} />
        </div>
      </div>
    </main>
  );
}
