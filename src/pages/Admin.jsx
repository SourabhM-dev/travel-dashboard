import React, { useEffect, useState } from 'react';
import { listTrips, createTrip, updateTrip, deleteTrip } from '../services/trips';
import Footer from '../components/Footer';

export default function Admin() {
  const [trips, setTrips] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', short: '', price: 0, duration: 1, image: '', tags: '' });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await listTrips();
    setTrips(data);
  }

  function fillForm(t) {
    setEditing(t?.id || null);
    setForm({
      title: t?.title || '',
      short: t?.short || '',
      description: t?.description || '',
      price: t?.price || 0,
      duration: t?.duration || 1,
      image: t?.image || '',
      tags: (t?.tags || []).join(',')
    });
  }

  async function save(e) {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(s => s.trim()).filter(Boolean) };
    if (editing) {
      await updateTrip(editing, payload);
    } else {
      await createTrip(payload);
    }
    setForm({ title: '', short: '', price: 0, duration: 1, image: '', tags: '' });
    setEditing(null);
    load();
  }

  async function remove(id) {
    if (!confirm('Delete this trip?')) return;
    await deleteTrip(id);
    load();
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Create / Edit trip</h2>
            <form onSubmit={save} className="space-y-3 bg-white p-4 rounded shadow">
              <div>
                <label className="text-sm text-slate-600">Title</label>
                <input value={form.title} onChange={(e)=> setForm({...form, title:e.target.value})} className="w-full px-3 py-2 border rounded" required />
              </div>
              <div>
                <label className="text-sm text-slate-600">Short</label>
                <input value={form.short} onChange={(e)=> setForm({...form, short:e.target.value})} className="w-full px-3 py-2 border rounded" required />
              </div>
              <div>
                <label className="text-sm text-slate-600">Image path (public/images/...)</label>
                <input
                  value={form.image}
                  onChange={(e)=> setForm({...form, image:e.target.value})}
                  placeholder="/images/tokyo.jpg"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-sm text-slate-600">Price</label>
                  <input type="number" value={form.price} onChange={(e)=> setForm({...form, price: parseFloat(e.target.value || 0)})} className="w-full px-3 py-2 border rounded" />
                </div>
                <div style={{width: 120}}>
                  <label className="text-sm text-slate-600">Duration</label>
                  <input type="number" value={form.duration} onChange={(e)=> setForm({...form, duration: parseInt(e.target.value || 1)})} className="w-full px-3 py-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e)=> setForm({...form, tags: e.target.value})} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-slate-900 text-white rounded" type="submit">{editing ? 'Save' : 'Create'}</button>
                <button type="button" onClick={()=> { setEditing(null); setForm({ title:'', short:'', price:0, duration:1, image:'', tags:'' }); }} className="px-4 py-2 border rounded">Reset</button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Existing trips</h2>
            <div className="space-y-3">
              {trips.map(t => (
                <div key={t.id} className="bg-white p-3 rounded shadow flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-sm text-slate-500">${t.price} • {t.duration} days</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=> fillForm(t)} className="px-3 py-1 border rounded">Edit</button>
                    <button onClick={()=> remove(t.id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
