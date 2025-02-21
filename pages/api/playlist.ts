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
   

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({
          message: 'Error parsing the form data',
          error: err.message,
        });
      }

      const courseId = fields.courseId[0] as string;
      const playlistTitle = fields.title[0] as string;
      const playlistDescription = fields.description[0] as string;
      const day = fields.day[0] as string;
      const video =fields.video[0] as string;

      try {
     
        const playlistItem = {
          _id: new ObjectId(),
          title: playlistTitle,
          description: playlistDescription,
          videoUrl: video, // Store the relative video path
          day: day, // Store the day
        };

        // Update the course with the new playlist item
        const updatedCourse = await db.collection<Courses>('courses').updateOne(
          { _id: new ObjectId(courseId) },
          {
            $push: {
              playlist: playlistItem,
            },
          }
        );

        if (!updatedCourse.modifiedCount) {
          return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({
          type: 'S',
          message: 'Playlist added to course successfully',
          data: updatedCourse,
        });
      } catch (dbError) {
        console.error('Error saving playlist to MongoDB:', dbError);
        res.status(500).json({
          message: 'Error saving playlist to MongoDB',
          error: dbError.message,
        });
      }
    });
  } else 

  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const { courseId, watchedBy } = req.query;
  
      if (!courseId || typeof courseId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing courseId' });
      }
  
      // Validate watchedBy, ensure it's a valid ObjectId if provided
      const watchedByID = watchedBy && typeof watchedBy === 'string' ? new ObjectId(watchedBy) : null;
    
      const courseObjectId = new ObjectId(courseId);
    
      const course = await db.collection('courses')
      .aggregate([
        {
          $match: { _id: courseObjectId } // Match the course by its _id
        },
        {
          $lookup: {
            from: 'payment',  // The collection to join with
            localField: '_id', // The field from 'courses' collection to join on
            foreignField: 'course',  // The field from 'payments' collection to join on
            as: 'paymentDetails',
            pipeline: [
              {
                $match: { userId: watchedByID } // Match payments for the specific user (watchedBy)
              }
            ]
          }
        },
        {
          $addFields: {
            status: {
              $cond: {
                if: { $gt: [{ $size: "$paymentDetails" }, 0] }, // If there are payment details
                then: {
                  $ifNull: [{ $arrayElemAt: ["$paymentDetails.status", 0] }, "pending"] // Get the first payment status or default to "pending"
                },
                else: null // No payments, set status to null
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
                        $ifNull: ["$$payment.status", "not found"] // If status is missing, set it to "not found"
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $addFields: {
            playlist: {
              $map: {
                input: "$playlist", // Iterate over each playlist item
                as: "item",
                in: {
                  $mergeObjects: [
                    "$$item", 
                    {
                      watchedBy: {
                        $filter: {
                          input: "$$item.watchedBy", // Filter the watchedBy array in the playlist
                          as: "watchedByUser",
                          cond: { $eq: ["$$watchedByUser", watchedBy] } // Only include the user ID that matches
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      ])
      .toArray();
    
    console.log(course)
    
      // if (course.length === 0) {
      //   return res.status(404).json({ message: 'Course not found' });
      // }
  
      const transformedCourse = course.map(courseItem => {
        // Check if playlist is null or undefined, and initialize it as an empty array if so
        const playlist = courseItem.playlist || [];
      
        const groupedPlaylist = playlist.reduce((acc, item) => {
          const normalizedDay = item.day.padStart(2, '0'); // Ensure day is always 2 digits
          if (!acc[normalizedDay]) {
            acc[normalizedDay] = [];
          }
      
          // If `watchedBy` is provided, filter the items by the user
          if (watchedByID) {
            if (item.watchedBy && item.watchedBy.includes(watchedByID.toString())) {
              // If the user has watched the video, include the `watchedBy` field
              acc[normalizedDay].push(item);
            } else {
              // If the user hasn't watched it, set watchedBy to an empty array
              const { watchedBy, ...itemWithoutWatchedBy } = item;
              acc[normalizedDay].push({
                ...itemWithoutWatchedBy,
                watchedBy: [] // Set watchedBy to an empty array for unwatched videos
              });
            }
          } else {
            // If no `watchedBy` is provided, include all items for that day
            acc[normalizedDay].push(item);
          }
      
          return acc;
        }, {});
      
        // Sort the groupedPlaylist by day number, not as string
        const sortedPlaylist = Object.keys(groupedPlaylist)
          .sort((a, b) => parseInt(a) - parseInt(b))  // Sorting by numeric value of days
          .reduce((acc, key) => {
            acc[key] = groupedPlaylist[key];
            return acc;
          }, {});
      
        return {
          _id: courseItem._id,
          title: courseItem.title,
          description: courseItem.description,
          photo: courseItem.photo,
          pay: courseItem.pay,
          status: courseItem.status,
          playlist: sortedPlaylist, // Return the sorted playlist for the course
        };
      });
      
  
      res.status(200).json({
        type: 'S',
        message: 'Course retrieved successfully',
        data: transformedCourse,
      });
    } catch (err) {
      console.error('Error retrieving courses:', err);
      res.status(500).json({ message: 'Error retrieving courses', error: err.message });
    }
  }
  
  
    else if (req.method === 'DELETE') {
    try {
      const { db } = await connectToDatabase();
      const { courseId, playlistItemId } = req.query;

      if (!courseId || !playlistItemId || typeof courseId !== 'string' || typeof playlistItemId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing parameters' });
      }

      const courseObjectId = new ObjectId(courseId);
      const playlistItemObjectId = new ObjectId(playlistItemId);

      const course = await db.collection('courses').findOne({ _id: courseObjectId });

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      const playlistItem = course.playlist?.find(item => item._id.toString() === playlistItemObjectId.toString());

      if (!playlistItem) {
        return res.status(404).json({ message: 'Playlist item not found' });
      }

      const videoPath = path.join(process.cwd(), 'public', playlistItem.videoUrl);

      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }

      const data = { playlist: { _id: playlistItemObjectId } };

      const updatedCourse = await db.collection('courses').updateOne(
        { _id: courseObjectId },
        {
          $pull: data,
        }
      );

      if (!updatedCourse.modifiedCount) {
        return res.status(404).json({ message: 'Course or playlist item not found' });
      }

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
