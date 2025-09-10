const sdk = require('node-appwrite');
require('dotenv').config();

const client = new sdk.Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);
const ID = sdk.ID;
const Permission = sdk.Permission;
const Role = sdk.Role;

(async function main() {
  try {
    const db = await databases.createDatabase('travel_db', 'Travel DB');
    console.log('DB created:', db.$id);

    const collection = await databases.createCollection(db.$id, 'trips', 'Trips', [
    ]);
    console.log('Collection created:', collection.$id);
    await databases.createStringAttribute(db.$id, collection.$id, 'title', 255, true);
    await databases.createStringAttribute(db.$id, collection.$id, 'short', 255, true);
    await databases.createStringAttribute(db.$id, collection.$id, 'description', 2000, false);
    await databases.createFloatAttribute(db.$id, collection.$id, 'price', 0, true);
    await databases.createIntegerAttribute(db.$id, collection.$id, 'duration', true);
    await databases.createUrlAttribute(db.$id, collection.$id, 'image', 2048, false);

    console.log('Attributes created.');

    const sample = {
      title: 'Goa weekend escape',
      short: '3 days in Goa',
      description: 'Relax on the beach and enjoy sunsets.',
      price: 349.99,
      duration: 3,
      image: 'public\images\paris.jpg'
    };

    const doc = await databases.createDocument(
      db.$id,
      collection.$id,
      ID.unique(),
      sample,
      [Permission.read(Role.any())]
    );

    console.log('Seed document id:', doc.$id);

    console.log('Migration complete. Copy DB/Collection IDs into your .env');
  } catch (err) {
    console.error('Migration error:', err);
  }
})();
