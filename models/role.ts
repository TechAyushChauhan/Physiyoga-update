import { ObjectId } from 'mongodb';

export interface Role {
    _id?: ObjectId; 
    role: string;    
}