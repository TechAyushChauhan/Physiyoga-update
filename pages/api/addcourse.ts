import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Courses } from './../../models/addcourse';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import AWS from 'aws-sdk';
// import fs from 'fs';
// import path from 'path';

// Set up AWS S3 client
const s3 = new AWS.S3();
// Disable Next.js's body parsing to allow Formidable to handle it
export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};
const filePath = path.join(__dirname, 'myfile.txt');
const bucketName = 'curetribevideo';
const keyName = '6GitgH1vV5vHuVsJk/0MWZfrSfDGbTGYI2GOPWX9';

// Function to upload the file
const uploadFile = async (file,filename) => {
  try {
    console.log('File details:', file); // Add this to log the file object
    
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
    console.log(`File uploaded successfully: ${data.Location}`);
  } catch (error) {
   return false
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    const { db } = await connectToDatabase();

    // Set up the Formidable form configuration
    form.keepExtensions = true;

    // Parse the incoming request
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);  // Log form parsing error
        return res.status(500).json({ message: 'Error parsing the form data', error: err.message });
      }

      const courseTitle = fields.title[0] as string;
      const courseDescription = fields.description[0] as string;
      const coursepay = fields.price[0] as string;

      // Check if the photo exists in the files object
      const photo = Array.isArray(files.photo) ? files.photo[0] : files.photo;

      if (!photo || !photo.filepath) {
        console.error('Photo is missing or file path is incorrect');
        return res.status(400).json({ message: 'Photo is required or file path is missing' });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(photo.originalFilename || '');
      const newFilename = uniqueSuffix + fileExtension;

      try {
        // Upload the file directly to S3
        const uploadedFileUrl = await uploadFile(photo, newFilename);
console.log(uploadedFileUrl)
        // Save course details to the database with the S3 URL
        const newCourse = await db.collection('courses').insertOne({
          title: courseTitle,
          description: courseDescription,
          photo: uploadedFileUrl.Location, // Store the S3 URL
          pay: Number(coursepay),
        });

        // Respond with success and the uploaded file path
        res.status(200).json({
          type: 'S',
          message: 'Course Added successfully',
          data: newCourse, // Return the MongoDB course ID and data
        });
      } catch (dbError) {
        console.error('Error saving course to MongoDB:', dbError);  // Log database error
        res.status(500).json({ message: 'Error saving course to MongoDB', error: dbError.message });
      }
    });
  }
  
  else if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const { id  ,userId} = req.query;

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
    } else if (userId) {
      console.log(userId,'userId')
      
      try {
        const { db } = await connectToDatabase();
        console.log(userId)
       
        //   .find({}, { projection: { playlist: 0 } })
        //   .toArray();
        const courses = await db.collection('courses')
        .aggregate([
          {
            $lookup: {
              from: 'payment',  // The collection to join with
              localField: '_id', // The field from 'courses' collection to join on
              foreignField: 'course',  // The field from 'payments' collection to join on
              as: 'paymentDetails',
              pipeline: [
                {
                  $match: { userId: new ObjectId(userId) } // Convert userId to ObjectId for comparison
                }
              ]
            }
          },
          {
            $addFields: {
              status: {
                $cond: {
                  if: { $gt: [{ $size: "$paymentDetails" }, 0] },  // If there are payment details
                  then: {
                    $ifNull: [{ $arrayElemAt: ["$paymentDetails.status", 0] }, "pending"]  // Get first payment status or default to "pending"
                  },
                  else: null  // No payments, set status to null
                }
              }
            }
          },
          {
            $addFields: {
              paymentDetails: {
                $map: {
                  input: "$paymentDetails",
                  as: "payment",
                  in: {
                    $mergeObjects: [
                      "$$payment", 
                      {
                        status: {
                          $ifNull: ["$$payment.status", "not found"]  // If status is missing in a payment, set to "not found"
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          {
            $project: {
              playlist: 0  // Exclude the playlist field
            }
          }
        ])
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
      
    }else{
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
  }else  if (req.method === 'DELETE') {
      const { db } = await connectToDatabase();
      const { courseid } = req.query;
      try {
       
  
        // Find the user in the database
        const user = await db.collection('courses').findOne({ _id: new ObjectId(courseid) });
  
        // If user not found
        if (!courseid) {
          return res.status(404).json({ msg: 'course not found' });
        }
  
        // Delete the user from the database
        const deleteResult = await db.collection('courses').deleteOne({ _id: user._id });
  
        // If no document was deleted
     
  
        return res.status(200).json({
          type: 'S',
          msg: 'course deleted successfully',
        });
      } catch (error) {
        console.error('Error deleting course:', error);
        return res.status(500).send('Server error');
      }}
      else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  };

export default handler;
