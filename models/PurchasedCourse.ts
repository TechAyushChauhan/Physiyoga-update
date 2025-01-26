
import { ObjectId } from 'mongodb';

export interface PurchasedCourse {
  _id?: ObjectId; 
  courseId: ObjectId;
  userId: ObjectId;
  purchaseDate: Date;
  status: string;
}

