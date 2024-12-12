import { Db, MongoClient } from 'mongodb';

export type MongoDBConnection = {
    client: MongoClient;
    db: Db;
};
