// pages/api/watch.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { courseId, playlistItemId, userId } = req.body;

    if (!courseId || !playlistItemId || !userId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
      const { db } = await connectToDatabase();
      const courseObjectId = new ObjectId(courseId);
      const playlistItemObjectId = new ObjectId(playlistItemId);

      // Update the playlist item to add the userId to the watchedBy array
      const updatedCourse = await db.collection('courses').updateOne(
        { _id: courseObjectId, 'playlist._id': playlistItemObjectId },
        {
          $addToSet: { 'playlist.$.watchedBy': userId } // Use $addToSet to avoid duplicate userIds
        }
      );
  
      res.status(200).json({
        type: 'S',
        message: 'User marked as watched successfully',
      });
    } catch (err) {
      console.error('Error marking video as watched:', err);
      res.status(500).json({ message: 'Error marking video as watched', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
