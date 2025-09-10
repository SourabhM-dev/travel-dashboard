// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-slate-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="px-4 py-2 bg-slate-900 text-white rounded">
        Go to Homepage
      </Link>
    </main>
  );
}