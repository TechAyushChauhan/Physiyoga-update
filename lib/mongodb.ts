import { MongoClient, Db } from 'mongodb';
import { MongoDBConnection } from '../types/mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<MongoDBConnection> {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable in .env.local');
    }

    if (!dbName) {
        throw new Error('Please define the MONGODB_DB environment variable in .env.local');
    }

    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}
