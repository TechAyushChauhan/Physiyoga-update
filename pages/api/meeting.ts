import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    // Fetching meetings by user ID
    const { userid } = req.query; // Using query parameter for `userid`

    if (!userid) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find meetings where the participants array contains a user with the given userid
    const meetings = await db.collection('meetings').find({
        "participants.userid": userid
      }, {
        projection: {
          "participants": 0  
        }
      }).toArray();

    if (meetings.length === 0) {
      return res.status(404).json({ message: 'No meetings found for this user' });
    }

    res.status(200).json(meetings);
    
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
