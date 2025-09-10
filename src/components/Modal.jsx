
import React from 'react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-slate-100">
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
