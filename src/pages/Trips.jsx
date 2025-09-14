import React, { useEffect, useState } from 'react';
import TripCard from '../components/TripCard';
import { listTrips } from '../services/trips';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('all');
  const q = useQuery();

  useEffect(() => {
    const s = q.get('q') || '';
    setQuery(s);
  }, [q]);

  useEffect(() => {
    let mounted = true;
    listTrips().then((data) => { if (mounted) setTrips(data); });
    return () => (mounted = false);
  }, []);

  const tags = ['all', ...new Set(trips.flatMap((t) => t.tags || []))];

  const filtered = trips.filter((t) => {
    const text = (t.title + ' ' + t.short + ' ' + (t.tags || []).join(' ')).toLowerCase();
    const matchesSearch = !query || text.includes(query.toLowerCase());
    const matchesTag = tag === 'all' || (t.tags || []).includes(tag);
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Trips</h1>
          <div className="flex gap-3 bg-white p-2 rounded-lg shadow">
            <input value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search trips..." className="px-3 py-2 border rounded-lg shadow-sm" />
            <select value={tag} onChange={(e)=> setTag(e.target.value)} className="px-3 py-2 border rounded-lg shadow-sm">
              {tags.map((t)=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => <TripCard key={t.id} trip={t} />)}
          {filtered.length === 0 && <div className="text-slate-600">No trips found.</div>}
        </div>
      </main>
      <Footer />
    </>
  );
}




// const trips = [
//   {
//     id: 'tokyo-1',
//     title: 'New Delhi',
//     short: 'India Gate, Parliament & Good Food',
//     description:
//       "Explore Delhi's neighborhoods, amazing food, visit Lotus Temple, and experience city views from Delhi Metro.",
//     price: 1200,
//     duration: 5,
//     tags: ['city', 'food', 'art'],
//     image: '/public/images/new-delhi.jpg'
//   },
//   {
//     id: 'paris-1',
//     title: 'Darjeeling',
//     short: 'Snow, cafes & mountains',
//     description:
//       'Stroll along the snow, visit Mountains, and enjoy a comfort living.',
//     price: 1500,
//     duration: 4,
//     tags: ['snow', 'city'],
//     image: '/public/images/darjeeling.jpg'
//   },
//   {
//     id: 'bali-1',
//     title: 'Agra',
//     short: 'Taj Mahal, temples & food',
//     description:
//       'Visit the Taj Mahal, pray in temples, and discover tasty food and temples in a divine atmosphere.',
//     price: 900,
//     duration: 7,
//     tags: ['energy', 'relax'],
//     image: '/public/images/agra.png'
//   },
//   {
//     id: 'nyc-1',
//     title: 'Goa',
//     short: 'Beach, food & luxury',
//     description:
//       'Experience Beach, shows, Park, and iconic eats across the city that never sleeps.',
//     price: 1100,
//     duration: 4,
//     tags: ['city', 'nightlife'],
//     image: '/public/images/goa.jpg'
//   },
//   {
//     id: 'safari-1',
//     title: 'Mumbai',
//     short: 'Busy life of Mumbai',
//     description:
//       'Witness the life in Mumbai, stay in Taj hotel, explore Gateway of India and eat Vada Pav',
//     price: 2200,
//     duration: 6,
//     tags: ['food', 'adventure'],
//     image: '/public/images/Mumbai.jpg'
//   }
// ];

// export default trips;