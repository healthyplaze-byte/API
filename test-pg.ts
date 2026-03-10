import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  console.log(`Connecting to ${connectionString?.split('@')[1]}`);

  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('Successfully connected to database');
    const res = await client.query('SELECT * FROM "Room"');
    console.log(`Found ${res.rows.length} rooms`);
    console.log(res.rows);
  } catch (err) {
    console.error('Connection error', err);
  } finally {
    await client.end();
  }
}

main();
