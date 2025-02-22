import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    const { userId, courseId, meetingDate, meetingLink,day } = req.body;

    const meeting = await db.collection('coursemeetings').insertOne({
      userId: new ObjectId(userId),
      courseId: new ObjectId(courseId),
      meetingDate: new Date(meetingDate) || null,
      day:day,
      meetingLink:meetingLink
    });

    res.status(201).json(meeting);
  } else
    if (req.method === 'GET') {
      const { db } = await connectToDatabase();
  
  
    
       
        try {
          const coursemeetings = await db.collection('coursemeetings').find().toArray();
         
          if (!coursemeetings) {
            return res.status(404).json({
              type: 'E',
              message: 'course meetings not found',
            });
          }
  
          res.status(200).json({
            type: 'S',
            message: 'course meetings retrieved successfully',
            data: coursemeetings,
          });
        } catch (err) {
          console.error('Error retrieving course:', err);
          res.status(500).json({ message: 'Error retrieving course', error: err.message });
        }
      
    }
    if (req.method === 'PUT') {
        const { db } = await connectToDatabase();
        const { _id, userId, courseId, meetingDate, meetingLink, day } = req.body;
      
        if (!_id) {
          return res.status(400).json({ message: 'Meeting ID is required' });
        }
      
        try {
          // Find the meeting by its meetingId and update it
          const updatedMeeting = await db.collection('coursemeetings').findOneAndUpdate(
            { _id: new ObjectId(_id) },
            {
              $set: {
              
                meetingDate: new Date(meetingDate) || null,
                day: day,
                meetingLink: meetingLink,
              },
            },
            { returnDocument: 'after' } // Return the updated document
          );
      
         
      
          res.status(200).json({
            type: 'S',
            message: 'Meeting updated successfully',
            data: updatedMeeting,
          });
        } catch (err) {
          console.error('Error updating meeting:', err);
          res.status(500).json({ message: 'Error updating meeting', error: err.message });
        }}
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
