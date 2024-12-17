import { ObjectId } from 'mongodb';

interface PlaylistItem {
  _id: ObjectId;  // Add _id to each playlist item
  title: string;
  description: string;
  videoUrl: string; 
}

export interface Courses {
  _id?: ObjectId; 
  title: string;
  description: string;
  photo: string;
  playlist?: PlaylistItem[];
}
