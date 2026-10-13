const dns = require('node:dns');
const { connectToDatabase, closeDatabase } = require('../src/db');

async function checkDatabaseConnection() {
  try {
    const database = await connectToDatabase();
    await database.admin().command({ ping: 1 });
    console.log('MongoDB connection successful. Atlas responded to a read-only ping.');
  } catch (error) {
    const message = String(error.message || '');

    if (/MONGODB_URI is not set/i.test(message)) {
      console.error('Connection check failed: create a .env file and set MONGODB_URI.');
    } else if (/Password cannot be empty|Username cannot be empty/i.test(message)) {
      console.error('Connection check failed: the URI has an empty database username or password. Create/set a MongoDB database user in Atlas and update .env.');
    } else if (/Authentication failed|bad auth|authenticat/i.test(message)) {
      console.error('Connection check failed: Atlas rejected the database credentials. Check the database username/password and URL-encode special characters.');
    } else if (/querySrv|ECONNREFUSED|ENOTFOUND|ENODATA/i.test(message)) {
      console.error('Connection check failed: Node could not resolve the Atlas DNS records.');
      console.error('Node DNS servers:', dns.getServers().join(', ') || '(none reported)');
      console.error('Check your network DNS settings. If Node uses a broken local resolver, set MONGODB_DNS_SERVERS in .env to a working resolver address.');
    } else if (/IP address|whitelist|not allowed|ETIMEDOUT|server selection/i.test(message)) {
      console.error('Connection check failed: Atlas could not be reached. Check Network Access, cluster status, and outbound network access.');
    } else {
      console.error(`Connection check failed (${error.name}${error.code ? `, ${error.code}` : ''}).`);
      console.error('Details are omitted to avoid exposing connection credentials.');
    }

    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}

checkDatabaseConnection();
