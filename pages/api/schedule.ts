import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    
    const { topic = '', start_time = "", duration = "", link = '', participants = [] } = req.body;
    const meeting = await db.collection('meetings').insertOne({
      topic,
      start_time,
      link,
      duration,
      participants: participants,
    });
    res.status(201).json(meeting);

  } else if (req.method === 'GET') {
  
    const meetings = await db.collection('meetings').find({}).toArray();
    res.status(200).json(meetings);

  } else if (req.method === 'PUT') {
    
    const { _id, topic, start_time, duration, link, participants } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'Meeting ID is required' });
    }

    const updatedMeeting = await db.collection('meetings').updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          topic,
          start_time,
          link,
          duration,
          participants,
        }
      }
    );

    if (updatedMeeting.modifiedCount === 0) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json({ message: 'Meeting updated successfully' });
    
  } else {
  
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
