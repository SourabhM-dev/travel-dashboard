import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const doSearch = () => {
  const q = search.trim();
  window.location.href = q ? `/trips?q=${encodeURIComponent(q)}` : '/trips';
  };


  return (
    <header className="bg-white/80 backdrop-blur shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-bold text-slate-800"
            aria-label="Home"
          >
            TravelDash
          </button>

          <nav className="hidden md:flex gap-4 text-sm" aria-label="Primary">
            <Link to="/trips" className="hover:text-slate-700">Trips</Link>
            <Link to="/dashboard" className="hover:text-slate-700">Dashboard</Link>
            <Link to="/admin" className="hover:text-slate-700">Admin</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
           <div className="hidden sm:flex items-center border rounded overflow-hidden bg-white">
            <input
              className="px-3 py-1 w-56 focus:outline-none"
              placeholder="Search trips, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                 if (e.key === 'Enter') doSearch();
              }}
            />
            <button
              className="px-3 py-2 bg-slate-50 text-slate-700 text-sm"
               onClick={doSearch}
            >
              Search
            </button>
          </div>

          <div className="hidden md:flex gap-3 items-center">
            <Link to="/auth" className="px-3 py-1 text-sm border rounded">Sign in</Link>
          </div>

          {/* mobile menu */}
          <button
            className="md:hidden p-2 rounded hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link to="/trips" onClick={() => setOpen(false)}>Trips</Link>
            <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
            <Link to="/auth" onClick={() => setOpen(false)}>Sign in</Link>
          </div>
        </div>
      )}
    </header>
  );
}
