
import React, { useEffect, useState } from 'react';
import { listTrips } from '../services/appwrite';

export default function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const docs = await listTrips();
        setTrips(docs);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="grid gap-4">
      {trips.map(t => (
         <article key={t.$id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={`/images/${t.image}`} alt={t.title} style={{width: '100%', height: 160, objectFit:'cover'}}/>
          <div className="p-3">
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.short}</p>
            <strong>₹{t.price}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}
