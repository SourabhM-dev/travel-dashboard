import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
          Plan your perfect destination with TravelDash 
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Tailor-made itineraries, beautiful destinations, and an admin dashboard to manage your offerings.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/trips" className="px-5 py-3 bg-slate-900 text-white rounded-md shadow hover:opacity-95">
            Browse Trips
          </Link>
          <Link to="/dashboard" className="px-5 py-3 border rounded-md text-slate-900">
            View dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
