import { MongoClient, Db } from 'mongodb';
import { MongoDBConnection } from '../types/mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<MongoDBConnection> {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    // Check if MONGODB_URI and MONGODB_DB are defined in environment variables
    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable in .env.local');
    }

    if (!dbName) {
        throw new Error('Please define the MONGODB_DB environment variable in .env.local');
    }

    // If cached client and database are available, return them
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    // Create a new MongoClient instance without deprecated options
    const client = new MongoClient(uri);

    // Connect to the database
    await client.connect();
    const db = client.db(dbName);

    // Cache the client and database for future use
    cachedClient = client;
    cachedDb = db;

    return { client, db };
}
