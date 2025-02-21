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
import AWS from 'aws-sdk';
import { progress } from 'framer-motion';


// Set up AWS S3 client
const s3 = new AWS.S3();

// // Define the file to upload
const filePath = path.join(__dirname, 'myfile.txt');
const bucketName = 'curetribevideo';
const keyName = '6GitgH1vV5vHuVsJk/0MWZfrSfDGbTGYI2GOPWX9';

// Function to upload the file
const uploadFile = async (file,filename) => {
  try {
 // Add this to log the file object
    
    if (!file || !file.filepath) {
      throw new Error('File path is missing');
    }

    // Read the file content as a buffer
    const fileBuffer = fs.readFileSync(file.filepath);
    
    const obj = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename, // Ensure the key has a proper path
      Body: fileBuffer, // Use fileBuffer here
      ContentType: file.mimetype, // Optional, but good to specify
    };

    // Upload the file to S3
    return await s3.upload(obj).promise();
    // console.log(File uploaded successfully: ${data.Location});
  } catch (error) {
   return false
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const form = new IncomingForm();
    const { db } = await connectToDatabase();

    const uploadDir = process.env.NODE_ENV_test === 'production'
      ? '/tmp/uploads' // Use /tmp in production (serverless environments like Vercel)
      : path.join(process.cwd(), 'uploads');

    // Ensure the upload directory exists (not necessary for S3, but keep it if you want to manage uploads locally)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.keepExtensions = true;

    // Parse the incoming request
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }

      const transactionId = fields.transactionId[0] as string;
      const userId = fields.userId[0] as string;
      const course = fields.course[0] as string;
      const additionalNotes = fields.additionalNotes[0] as string;
      const photo = Array.isArray(files.file) ? files.file[0] : files.file;
      console.log(fields.refral)
      const refral = fields.refral?fields.refral[0] as string : '';
      if (!photo || !photo.filepath) {
        return res.status(400).json({ message: 'Photo is required or file path is missing' });
      }
      if(refral && refral!==''){
        
        const user = await db.collection('users').findOne({ referralCode: refral });
console.log(user);

if (user) {
  // Check if 'referred' exists
  if (user.referred !== undefined) {
    // If 'referred' exists, increment it by 1
    const updatedUser = await db.collection('users').updateOne(
      { referralCode: refral },
      { $inc: { referred: 1 } }  // Increment referred by 1
    );
    console.log('User referral count incremented:', updatedUser);
  } else {
    // If 'referred' does not exist, initialize it to 1
    const updatedUser = await db.collection('users').updateOne(
      { referralCode: refral },
      { $set: { referred: 1 } }  // Initialize referred field to 1
    );
    console.log('User referred initialized:', updatedUser);
  }
} else {
  console.log('User not found');
}
}
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(photo.originalFilename || '');
      const newFilename = uniqueSuffix + fileExtension;

      try {
        // Upload the file to S3
        const uploadedFileUrl = await uploadFile(photo, newFilename);
        if (!uploadedFileUrl) {
          return res.status(500).json({ message: 'Error uploading file to S3' });
        }
console.log(course ,"course")
        // Save payment details to the database with the S3 URL
        const newCourse = await db.collection('payment').insertOne({
          transactionId: transactionId,
          userId: new ObjectId(userId),
          course:new ObjectId(course),
          photo: uploadedFileUrl.Location, // S3 URL
          additionalNotes: additionalNotes,
        });

        // Respond with success
        return res.status(200).json({
          type: "S",
          message: 'Course Added successfully',
          data: newCourse, // Return the MongoDB course ID and data
        });
      } catch (dbError) {
        console.error('Error saving course to MongoDB:', dbError);
        return res.status(500).json({ message: 'Error saving course to MongoDB', error: dbError.message });
      }
    });
  
  } 

  else 
  if (req.method === 'PUT') {
    const form = new IncomingForm(); // Initialize formidable form handler
  
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }
  
      // Access the fields and files from the form data
      const { status, _id } = fields; // Status and id fields should be in the form data
      console.log('Form data:', fields);
      console.log('Files:', files);
  
      if (!_id || !status) {
        return res.status(400).json({
          type: 'E',
          message: 'ID and status are required',
        });
      }
  
      // Now you can access the fields correctly (status and _id)
      const { db } = await connectToDatabase();
      try {
        const updatedCourse = await db.collection('payment').updateOne(
          { _id: new ObjectId(_id) },
          { $set: { status } }
        );
  
       console.log(updatedCourse)
  
        res.status(200).json({
          type: 'S',
          message: 'Course status updated successfully',
          data: {
            _id,
            status,
          },
        });
      } catch (err) {
        console.error('Error updating course:', err);
        res.status(500).json({
          type: 'E',
          message: 'Error updating course status',
          error: err.message,
        });
      }
    });
  }
  else
  
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const { id } = req.query;

    if (id) {
      console.log(id, "id");

  // Ensure id is a single string
  // const courseId = Array.isArray(id) ? id[0] : id;
      // Get a specific course by ID
      try {
        const course = await db.collection<Courses>('payment').find().toArray();
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
        const courses = await db.collection('payment')
        .aggregate([
          // Convert userId to ObjectId if it is stored as a string
          {
            $addFields: {
              userId: { $toObjectId: "$userId" },
              course: { $toObjectId: "$course" }  // Add this line if courseId is a string and needs to be converted
            }
          },
          // Perform the lookup to join with the users collection
          {
            $lookup: {
              from: 'users', // The users collection name
              localField: 'userId', // Field from the 'payment' collection
              foreignField: '_id', // Field from the 'user' collection
              as: 'userDetails', // New array field that will contain the matched user details
            }
          },
          // Unwind the userDetails array to flatten the result
          {
            $unwind: {
              path: '$userDetails',
              preserveNullAndEmptyArrays: true // If there's no match, preserve the original document
            }
          },
          // Perform the lookup to join with the courses collection
          {
            $lookup: {
              from: 'courses', // The courses collection name
              localField: 'course', // Field from the 'payment' collection (courseId)
              foreignField: '_id', // Field from the 'courses' collection
              as: 'courseDetails', // New array field that will contain the matched course details
            }
          },
          // Unwind the courseDetails array to flatten the result
          {
            $unwind: {
              path: '$courseDetails',
              preserveNullAndEmptyArrays: true // If there's no match, preserve the original document
            }
          },
          // Project specific fields from all the collections
          {
            $project: {
              transactionId: 1,
              userId: 1,
              course:1,
              additionalNotes: 1,
              status:1,
              photo: 1,
              username: { $ifNull: ['$userDetails.username', 'Unknown'] }, // Get the username from userDetails
              userEmail: { $ifNull: ['$userDetails.email', 'No email provided'] },
              courseName: { $ifNull: ['$courseDetails.title', 'No course name'] }, // Get the course name from courseDetails
              pay: { $ifNull: ['$courseDetails.pay', 'No course name'] }, 
              time: 1,
            }
          }
        ])
        .toArray();

        res.status(200).json({
          type: 'S',
          message: 'confirm retrieved successfully',
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
  }

export default handler;
