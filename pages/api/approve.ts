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
import ejs from 'ejs';


// Set up AWS S3 client
const s3 = new AWS.S3();

// // Define the file to upload
const filePath = path.join(__dirname, 'myfile.txt');
const bucketName = 'curetribevideo';
const keyName = '6GitgH1vV5vHuVsJk/0MWZfrSfDGbTGYI2GOPWX9';

import nodemailer from "nodemailer";
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
    
      const refral = fields.refral?fields.refral[0] as string : '';
      if (!photo || !photo.filepath) {
        return res.status(400).json({ message: 'Photo is required or file path is missing' });
      }
      if(refral && refral!==''){
        
        const user = await db.collection('users').findOne({ referralCode: refral });


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
        const existingPayment = await db.collection('payment').findOne({
          userId: new ObjectId(userId),
          course: new ObjectId(course),
        });
        let data:any
        if (existingPayment) {
          // If the payment exists, update it
           data = await db.collection('payment').updateOne(
            { _id: existingPayment._id }, // Match the existing document
            {
              $set: {
                transactionId: transactionId,
                photo: uploadedFileUrl.Location, // S3 URL
                additionalNotes: additionalNotes,
                status:null
              },
            }
          );
          console.log('Payment updated', data);
        } else {  const data = await db.collection('payment').insertOne({
    transactionId: transactionId,
    userId: new ObjectId(userId),
    course: new ObjectId(course),
    photo: uploadedFileUrl.Location, // S3 URL
    additionalNotes: additionalNotes,
  });
  console.log('Payment inserted', data);}

        // Respond with success
        return res.status(200).json({
          type: "S",
          message: 'Course Added successfully',
          data: data, // Return the MongoDB course ID and data
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
      const { status='rejected', _id ,...otherfield} = fields; // Status and id fields should be in the form data
      console.log('Form data:', fields);
      console.log('otherfield:', otherfield);
  
      if (!_id || !status) {
        return res.status(400).json({
          type: 'E',
          message: 'ID and status are required',
        });
      }
  
      const { db } = await connectToDatabase();
      try {
        const data=await db.collection('payment').findOne( { _id: new ObjectId(_id) },)
        console.log(data,"dkn")
        const existingMeeting = await db.collection('coursemeetings').findOne({
          userId: new ObjectId(data.userId),
          courseId: new ObjectId(data.course),
        });
        console.log(existingMeeting,"dkn",!existingMeeting)
        if (!existingMeeting) {
         
     
          const meeting = await db.collection('coursemeetings').insertOne({
            userId: new ObjectId(data.userId),
            courseId: new ObjectId(data.course),
            meetingDate:  null,
            day:1,
            meetingLink:""
          });
      }
        const updatedCourse = await db.collection('payment').updateOne(
          { _id: new ObjectId(_id) },
          { $set: { status } }
        );
  
       console.log(updatedCourse,status,status=="approved","----------")
       if (status=="approved") {
        
        const renderTemplate = async (data: object) => {
          try {
            const templatePath = path.resolve(`./lib/mailbuyedsuccess.ejs`);
            return await ejs.renderFile(templatePath, data);
          } catch (error) {
            console.error("Error rendering template:", error);
            throw new Error("Failed to render email template");
          }
        };
        const templateData = {
          EMAIL:otherfield.userEmail,
          NAME:otherfield.name,
          COURSE_NAME:otherfield.coursename,
          COURSE_LINK: "https://physiyoga-test.netlify.app/"+otherfield.course,
          SUPPORT_EMAIL:"mynameisayush007@gmail.com"
         
        };
        
        const html = await renderTemplate(templateData);
          const receiver = {
        from: "mynameisayush008@gmail.com",
        to: `${otherfield.userEmail}`,
        subject: 'physiyoga-login',
        html: html,
      };

      const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "mynameisayush008@gmail.com",
          pass: "ftyk hlvt jvll avau"
        }
      });
       const sendEmailPromise = new Promise<void>((resolve, reject) => {
   auth.sendMail(receiver, (error) => {
     if (error) {
       reject(error);
     } else {
       resolve();
     }
   });
 });

 await sendEmailPromise;
        
       }
     
  
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
     
      try {
        const course = await db.collection<Courses>('payment').find().toArray();
       
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
              userEmail: { $ifNull: ['$userDetails.mobileOrEmail', 'No email provided'] },
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
