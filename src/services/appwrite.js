
import { Client, Account, Databases, ID, Permission, Role } from 'appwrite';

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_ID;
export const TRIPS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_TRIPS;

/* --------------------------
   Auth helpers
   -------------------------- */

export async function signUp(email, password) {
  // create account — newer SDKs accept an object
  return account.create({ userId: ID.unique(), email, password });
}

export async function signIn(email, password) {
  // createEmailPasswordSession is current in Appwrite docs; if your SDK is older/newer check docs.
  return account.createEmailPasswordSession({ email, password });
}

export async function signOut() {
  // log out current session
  return account.deleteSession('current');
}

export async function getCurrentUser() {
  return account.get(); // throws if not logged in
}

/* --------------------------
   DB helpers (Trips collection)
   -------------------------- */

export async function listTrips() {
  const res = await databases.listDocuments(DATABASE_ID, TRIPS_COLLECTION_ID);
  // response shape: { documents: [...] } for collections
  return res.documents || [];
}

export async function getTrip(tripId) {
  return databases.getDocument(DATABASE_ID, TRIPS_COLLECTION_ID, tripId);
}

export async function createTrip(data, ownerUserId) {
  // data: { title, short, description, price, duration, image }
  // give public read (any) but owner read/write/update/delete (common pattern)
  const permissions = [
    Permission.read(Role.any()),
    Permission.write(Role.user(ownerUserId)),
    Permission.update(Role.user(ownerUserId)),
    Permission.delete(Role.user(ownerUserId)),
  ];

  return databases.createDocument(
    DATABASE_ID,
    TRIPS_COLLECTION_ID,
    ID.unique(),
    data,
    permissions
  );
}

export async function updateTrip(tripId, data) {
  return databases.updateDocument(DATABASE_ID, TRIPS_COLLECTION_ID, tripId, data);
}

export async function deleteTrip(tripId) {
  return databases.deleteDocument(DATABASE_ID, TRIPS_COLLECTION_ID, tripId);
}
