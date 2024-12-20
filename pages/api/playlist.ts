import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Courses } from './../../models/addcourse';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';  // Correct import of ObjectId

// Disable Next.js's body parsing to allow Formidable to handle it
export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    const { db } = await connectToDatabase();

    const uploadDir = process.env.NODE_ENV_test === 'production'
      ? path.join('/tmp', 'uploads') 
      : path.join(process.cwd(), 'public', 'uploads'); 

    // @ts-expect-error: 'keepExtensions' property is not typed in the formidable package 
    form.uploadDir = uploadDir;
    // @ts-expect-error: 'keepExtensions' property is not typed in the formidable package 
    form.keepExtensions = true;

    // Ensure the upload directory exists locally (serverless environment uses /tmp)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Parse the incoming request
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }

      const courseId = fields.courseId[0] as string; 
      console.log(courseId); // Course ID to associate the playlist with
      const playlistTitle = fields.title[0] as string;
      const playlistDescription = fields.description[0] as string;

      const video = Array.isArray(files.video) ? files.video[0] : files.video; // Handle array if multiple files

      if (!video || !video.filepath) {
        return res.status(400).json({ message: 'Video is required or file path is missing' });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(video.originalFilename || '');
      const newFilename = uniqueSuffix + fileExtension;
      const filePath = path.join(uploadDir, newFilename);

      try {
        // Rename the file to the new file path
        fs.renameSync(video.filepath, filePath);

        const videoPath = `/uploads/${newFilename}`;
        console.log(playlistTitle, playlistDescription, videoPath);

        // Prepare the new playlist item
        const playlistItem = {
            _id:new ObjectId(), 
          title: playlistTitle,
          description: playlistDescription,
          videoUrl: videoPath,
        };
        console.log(videoPath)

        // Update the course with the new playlist item
        const updatedCourse = await db.collection<Courses>('courses').updateOne(
          { _id: new ObjectId(courseId) }, // Correct way to use ObjectId
          {
            $push: {

              playlist: playlistItem, // Push the new playlist item to the playlist array
            },
          }
        );

        if (!updatedCourse.modifiedCount) {
          return res.status(404).json({ message: 'Course not found' });
        }

      
        res.status(200).json({
          type: "S",
          message: 'Playlist added to course successfully',
          data: updatedCourse, 
        });
      } catch (dbError) {
        console.error('Error saving playlist to MongoDB:', dbError);
        res.status(500).json({ message: 'Error saving playlist to MongoDB', error: dbError.message });
      }
    });
  } else if (req.method === 'GET') {
    try {
        const { db } = await connectToDatabase();
      const { courseId } = req.query;
      
      // Ensure the courseId is passed as a string and is a valid ObjectId
      if (!courseId || typeof courseId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing courseId' });
      }

      console.log('courseId:', courseId); // Debug: Log the courseId

      // Convert courseId to ObjectId type
      const courseObjectId = new ObjectId(courseId);
      const course = await db
      .collection('courses')
      .find({ _id: courseObjectId })
      .toArray(); // Convert the cursor to an array

      res.status(200).json({
        type: 'S',
        message: 'Course retrieved successfully',
        data: course,
      });
    } catch (err) {
      console.error('Error retrieving courses:', err);
      res.status(500).json({ message: 'Error retrieving courses', error: err.message });
    }
 } else
 if (req.method === 'DELETE') {
    try {
      const { db } = await connectToDatabase();
      const { courseId, playlistItemId } = req.query;
     

      // Validate the parameters
      if (!courseId || !playlistItemId || typeof courseId !== 'string' || typeof playlistItemId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing parameters' });
      }

      const courseObjectId = new ObjectId(courseId);
      const playlistItemObjectId = new ObjectId(playlistItemId);

      // Find the course with the given courseId
      const course = await db.collection('courses').findOne({ _id: courseObjectId });

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Find the playlist item to be deleted
      const playlistItem = course.playlist?.find(item => item._id.toString() === playlistItemObjectId.toString());

      if (!playlistItem) {
        return res.status(404).json({ message: 'Playlist item not found' });
      }

      // Get the path of the video to be deleted
      const videoPath = path.join(process.cwd(), 'public', playlistItem.videoUrl);

      // Delete the video file from the server
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath); // Delete the file from the server
      }
      const data={ playlist: { _id: playlistItemObjectId }}

      // Remove the playlist item from the MongoDB course document
      const updatedCourse = await db.collection('courses').updateOne(
        { _id: courseObjectId },
        {
          $pull: data, // Remove the playlist item by _id
        }
      );

      if (!updatedCourse.modifiedCount) {
        return res.status(404).json({ message: 'Course or playlist item not found' });
      }

      // Send success response
      res.status(200).json({
        type: 'S',
        message: 'Playlist item and video deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting playlist item and video:', err);
      res.status(500).json({ message: 'Error deleting playlist item and video', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
