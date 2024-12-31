import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Courses } from './../../models/addcourse';
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

    // Determine the upload directory based on the environment (production vs development)
    // const uploadDir = process.env.NODE_ENV_test === 'production'
    //   ? '/tmp/uploads'  // Use /tmp in production (serverless environments like Vercel)
    //   : path.join(process.cwd(), 'public', 'uploads');  // Local development directory
   const uploadDir = process.env.NODE_ENV_test === 'production' 
   ? '/tmp/uploads' // Use /tmp in production (serverless environments like Vercel)
   : path.join(process.cwd(), 'uploads');
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Set up the Formidable form configuration
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    // Parse the incoming request
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }

      const courseTitle = fields.title[0] as string;
      const courseDescription = fields.description[0] as string;

      const photo = Array.isArray(files.photo) ? files.photo[0] : files.photo;

      if (!photo || !photo.filepath) {
        return res.status(400).json({ message: 'Photo is required or file path is missing' });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(photo.originalFilename || '');
      const newFilename = uniqueSuffix + fileExtension;
      const filePath = path.join(uploadDir, newFilename);

      try {
        // Rename the file to the new file path
        fs.renameSync(photo.filepath, filePath);

        // Create the path for accessing the uploaded file
        const photoPath = `/uploads/${newFilename}`;  // Path for accessing the uploaded photo
        console.log(courseTitle, courseDescription, photoPath);

        // Save course details to the database
        const newCourse = await db.collection<Courses>('courses').insertOne({
          title: courseTitle,
          description: courseDescription,
          photo: photoPath,
        });

        // Respond with success and the uploaded file path
        res.status(200).json({
          type: "S",
          message: 'Course Added successfully',
          data: newCourse, // Return the MongoDB course ID and data
        });
      } catch (dbError) {
        console.error('Error saving course to MongoDB:', dbError);
        res.status(500).json({ message: 'Error saving course to MongoDB', error: dbError.message });
      }
    });
  } else if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const { id } = req.query;

    if (id) {
      console.log(id, "id");

  // Ensure id is a single string
  const courseId = Array.isArray(id) ? id[0] : id;
      // Get a specific course by ID
      try {
        const course = await db.collection<Courses>('courses').findOne(
          { _id: new ObjectId(courseId) },
          { projection: { playlist: 0 } }
        );
        console.log(course, 'course');
        if (!course) {
          return res.status(404).json({
            type: 'E',
            message: 'Course not found',
          });
        }

        res.status(200).json({
          type: 'S',
          message: 'Course retrieved successfully',
          data: course,
        });
      } catch (err) {
        console.error('Error retrieving course:', err);
        res.status(500).json({ message: 'Error retrieving course', error: err.message });
      }
    } else {
      // Get all courses if no ID is provided
      try {
        const { db } = await connectToDatabase();
        const courses = await db.collection<Courses>('courses')
          .find({}, { projection: { playlist: 0 } })
          .toArray();

        res.status(200).json({
          type: 'S',
          message: 'Courses retrieved successfully',
          data: courses,
        });
      } catch (err) {
        console.error('Error retrieving courses:', err);
        res.status(500).json({ message: 'Error retrieving courses', error: err.message });
      }
    }
  }
      else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  };

export default handler;
