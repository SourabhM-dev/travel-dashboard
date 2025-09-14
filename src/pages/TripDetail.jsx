
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTripById } from '../services/trips';
import Modal from '../components/Modal';

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [openBook, setOpenBook] = useState(false);
  const [openItin, setOpenItin] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    getTripById(id).then(setTrip);
  }, [id]);

  if (!trip) {
    return <main className="max-w-4xl mx-auto p-6">Loading...</main>;
  }

  const handleBook = (formData) => {
    const bookings = JSON.parse(localStorage.getItem('travel_bookings_v1') || '[]');
    bookings.push({
      id: Date.now().toString(),
      tripId: trip.id,
      name: formData.name,
      email: formData.email,
      date: formData.date
    });
    localStorage.setItem('travel_bookings_v1', JSON.stringify(bookings));
    alert('Booking saved locally — check Admin > Bookings (not implemented).');
    setOpenBook(false);
  };

  const handleGenerateItinerary = async () => {
    setOpenItin(true);
    setItinerary('Generating itinerary... (this is a stub).');
    await new Promise((r) => setTimeout(r, 900));
    setItinerary(
      `Sample ${trip.duration}-day itinerary for ${trip.title}:\n\n` +
      (new Array(trip.duration).fill(0).map((_, i) => `Day ${i+1}: Explore, relax, and enjoy.`).join('\n'))
    );
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <img src={trip.image} alt={trip.title} className="w-full h-72 object-cover rounded-md mb-4" />
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{trip.title}</h1>
          <p className="text-slate-600 mt-2">{trip.description}</p>
          <div className="flex gap-4 mt-4">
            <div className="bg-slate-50 p-3 rounded">
              <div className="text-xs text-slate-500">Duration</div>
              <div className="font-bold">{trip.duration} days</div>
            </div>
            <div className="bg-slate-50 p-3 rounded">
              <div className="text-xs text-slate-500">Price</div>
              <div className="font-bold">₹{trip.price}</div>
            </div>
          </div>
        </div>

        <div className="w-56">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-slate-500 text-sm mb-2">Book this trip</div>
            <div className="text-2xl font-bold mb-3">${trip.price}</div>
            <button className="w-full px-4 py-2 bg-slate-900 text-white rounded mb-2" onClick={()=> setOpenBook(true)}>Book now</button>
            <button className="w-full px-4 py-2 border rounded" onClick={handleGenerateItinerary}>Generate itinerary</button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/trips" className="text-sm text-slate-600">← Back to trips</Link>
      </div>

      <Modal open={openBook} onClose={()=> setOpenBook(false)} title={`Book: ${trip.title}`}>
        <BookingForm onSubmit={(d)=> handleBook(d)} />
      </Modal>

      <Modal open={openItin} onClose={()=> setOpenItin(false)} title={`Itinerary for ${trip.title}`}>
        <pre className="whitespace-pre-wrap text-sm text-slate-700">{itinerary}</pre>
      </Modal>
    </main>
  );
}

function BookingForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name, email, date }); }}>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-slate-600">Full name</label>
          <input required value={name} onChange={(e)=> setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-slate-600">Email</label>
          <input required type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-slate-600">Preferred date</label>
          <input required type="date" value={date} onChange={(e)=> setDate(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={()=> onSubmit({ name, email, date })} className="px-4 py-2 bg-slate-900 text-white rounded">Confirm</button>
        </div>
      </div>
    </form>
  );
}
