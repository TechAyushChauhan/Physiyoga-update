import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();
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
// const filePath = path.join(__dirname, 'myfile.txt');
// const bucketName = 'curetribevideo';
// const keyName = '6GitgH1vV5vHuVsJk/0MWZfrSfDGbTGYI2GOPWX9';

// Function to upload the file
// const uploadFile = async (file,filename) => {
//   try {
//     console.log('File details:', file); // Add this to log the file object
    
//     if (!file || !file.filepath) {
//       throw new Error('File path is missing');
//     }

//     // Read the file content as a buffer
//     const fileBuffer = fs.readFileSync(file.filepath);
    
//     const obj = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: filename, // Ensure the key has a proper path
//       Body: fileBuffer, // Use fileBuffer here
//       ContentType: file.mimetype, // Optional, but good to specify
//     };

//     // Upload the file to S3
//     return await s3.upload(obj).promise();
//     console.log(`File uploaded successfully: ${data.Location}`);
//   } catch (error) {
//    return false
//   }
// };




const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    const { db } = await connectToDatabase();
console.log(req.body)
    // Determine the upload directory for video files (can be a different directory for videos)


    // Ensure the upload directory exists


    // Parse the incoming request
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }

     console.log(req.body)

      

      try {
        // Rename the file to the new file path
      

        // Create the 

        // Respond with success and the uploaded file path
        res.status(200).json({
          type: 'S',
          message: 'Video uploaded successfully',
          data: {
           // The filename in the storage
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
