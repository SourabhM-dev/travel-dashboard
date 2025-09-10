import defaultTrips from '../data/trips.js';

// localStorage key
const KEY = "travel_trips_v1";

// helpers
function readStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(defaultTrips));
      return [...defaultTrips];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("readStore error", e);
    return [...defaultTrips];
  }
}

function writeStore(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export async function listTrips() {
  await new Promise((r) => setTimeout(r, 150));
  return readStore();
}

export async function getTripById(id) {
  const trips = readStore();
  return trips.find((t) => t.id === id);
}

export async function createTrip(payload) {
  const trips = readStore();
  const newItem = { ...payload, id: payload.id || `${Date.now()}` };
  trips.unshift(newItem);
  writeStore(trips);
  return newItem;
}

export async function updateTrip(id, payload) {
  const trips = readStore();
  const idx = trips.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Trip not found");
  trips[idx] = { ...trips[idx], ...payload };
  writeStore(trips);
  return trips[idx];
}

export async function deleteTrip(id) {
  let trips = readStore();
  trips = trips.filter((t) => t.id !== id);
  writeStore(trips);
  return true;
}


