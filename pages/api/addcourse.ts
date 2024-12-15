import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import {  Courses} from "./../../models/addcourse";
import { connectToDatabase } from '../../lib/mongodb';

// Disable Next.js's body parsing to allow Formidable to handle it
export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    const { db } = await connectToDatabase();

    // Set upload directory and preserve file extensions
    const uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Use absolute path to avoid issues
   // @ts-expect-error: 'uploadDir' property is not typed in the formidable package
    form.uploadDir = uploadDir;
  // @ts-expect-error: 'uploadDir' property is not typed in the formidable package
    form.keepExtensions = true; 

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Parse the incoming request
  form.parse(req, async(err, fields, files) => { 
      if (err) {
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }
     
      const courseTitle = fields.title[0] as string;
      const courseDescription = fields.description[0] as string;

      const photo = Array.isArray(files.photo) ? files.photo[0] : files.photo; // Handle array if multiple files

      if (!photo || !photo.filepath) {
        return res.status(400).json({ message: 'Photo is required or file path is missing' });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(photo.originalFilename || '');
      const newFilename = uniqueSuffix + fileExtension;
      const filePath = path.join(uploadDir, newFilename);

      fs.renameSync(photo.filepath, filePath);

      const photoPath = `/uploads/${newFilename}`;
      console.log(courseTitle,courseDescription,photoPath)
      try {
        const newCourse = await db.collection<Courses>('courses').insertOne({
          title: courseTitle,
          description: courseDescription,
          photo: photoPath, 
        });

        res.status(200).json({
            type:"S",
          message: 'Course Added successfully',
          data:newCourse, // Return the MongoDB course ID
        });
      } catch (dbError) {
        console.error('Error saving course to MongoDB:', dbError);
        res.status(500).json({ message: 'Error saving course to MongoDB', error: dbError.message });
      }
 
  
      // Respond with success and the uploaded file path
      res.status(200).json({
        message: 'File uploaded successfully',
        courseTitle,
        courseDescription,
        photoPath, // Path to access the uploaded photo
      });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
