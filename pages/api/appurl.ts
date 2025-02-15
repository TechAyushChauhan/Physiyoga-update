/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
// import { connectToDatabase } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();

    try {
      const { title, videoLink } = req.body;

      // Validation check for required fields
      if (!title || !videoLink) {
        return res.status(400).json({
          type: 'E',
          msg: 'Title and Video Link are required',
        });
      }

      // Insert video data into the database
      const newVideo = await db.collection('videos').insertOne({
        title,
        videoLink,
        createdAt: new Date(),
      });

      return res.status(200).json({
        type: 'S',
        msg: 'Video added successfully',
        videoId: newVideo.insertedId,
      });
    } catch (error) {
      console.error('Error adding video:', error);
      return res.status(500).send('Server error');
    }
  } else if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    try {
      // Get all videos from the database
      const videos = await db.collection('videos').find().toArray();

      return res.status(200).json({
        type: 'S',
        videos: videos.map((video: any) => ({
          videoId: video._id,
          title: video.title,
          videoLink: video.videoLink,
          createdAt: video.createdAt,
        })),
      });
    } catch (error) {
      console.error('Error fetching videos:', error);
      return res.status(500).send('Server error');
    }
  } else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
