import { ObjectId } from 'mongodb';

export interface Courses {
    _id?: ObjectId; 
    title: string;
    description: string;
    photo: string;
}
