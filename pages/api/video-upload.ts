import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

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

    // Determine the upload directory for video files (can be a different directory for videos)
    const uploadDir = process.env.NODE_ENV === 'production' 
      ? '/tmp/uploads' // Use /tmp in production (serverless environments like Vercel)
      : path.join(process.cwd(), 'uploads'); // Local development directory

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Set up the Formidable form configuration for video upload
    form.uploadDir = uploadDir;
    form.keepExtensions = true; // Keep file extensions

    // Parse the incoming request
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }

      const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;

      // Check if video file exists and has a valid filepath
      if (!videoFile || !videoFile.filepath) {
        return res.status(400).json({ message: 'Video file is required or file path is missing' });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(videoFile.originalFilename || '');
      const newFilename = uniqueSuffix + fileExtension;
      const filePath = path.join(uploadDir, newFilename);

      try {
        // Rename the file to the new file path
        fs.renameSync(videoFile.filepath, filePath);

        // Create the path for accessing the uploaded video
        const videoPath = `/uploads/videos/${newFilename}`;

        // Respond with success and the uploaded file path
        res.status(200).json({
          type: 'S',
          message: 'Video uploaded successfully',
          data: {
            fileUrl: videoPath, // Provide the file URL to the frontend
            filename: newFilename, // The filename in the storage
          },
        });
      } catch (dbError) {
        console.error('Error uploading video:', dbError);
        res.status(500).json({ message: 'Error uploading video', error: dbError.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
