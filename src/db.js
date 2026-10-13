const { MongoClient } = require('mongodb');
const dns = require('node:dns');
const dotenv = require('dotenv');
const path = require('node:path');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const dnsServers = (process.env.MONGODB_DNS_SERVERS || '')
  .split(',')
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.DB_NAME || 'rytechhub_crm';

let client;
let database;

async function connectToDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Create a .env file based on .env.example.');
  }

  if (!database) {
    const newClient = new MongoClient(uri);
    try {
      await newClient.connect();
      client = newClient;
      database = client.db(dbName);
    } catch (error) {
      await newClient.close().catch(() => {});
      throw error;
    }
  }

  return database;
}

async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}

module.exports = {
  connectToDatabase,
  closeDatabase,
  getDatabase: () => database,
};
