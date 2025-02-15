/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../../lib/mongodb';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongodb';

// Define the structure of the data you want to save
interface Event {
  time: string; // Store date and time as a string or Date object
  reason: string;
  userIds: ObjectId[]; // Store an array of ObjectIds for users
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    // Create a new event (Add)
    try {
      const { time, reason, userIds } = req.body;

      // Ensure all required fields are provided
      if (!time || !reason || !Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ msg: 'Missing required fields or invalid data.' });
      }

      // Convert userIds to ObjectIds (MongoDB format)
      const objectIds = userIds.map((id: string) => new ObjectId(id));

      // Create a new event object
      const newEvent: Event = {
        time: new Date(time).toISOString(), // Ensure the time is in ISO format
        reason,
        userIds: objectIds,
      };

      // Save the event to the database
      const result = await db.collection('events').insertOne(newEvent);

      // Return success message with event ID
      return res.status(200).json({
        type: 'S',
        msg: 'Event created successfully.',
        eventId: result.insertedId,
      });
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).send('Server error');
    }
  }

  if (req.method === 'PUT') {
    // Update an existing event (Edit)
    try {
      const { eventId, time, reason, userIds } = req.body;

      // Validate required fields
      if (!eventId || !time || !reason || !Array.isArray(userIds)) {
        return res.status(400).json({ msg: 'Missing required fields.' });
      }

      // Convert userIds to ObjectIds (MongoDB format)
      const objectIds = userIds.map((id: string) => new ObjectId(id));

      // Update the event data in the database
      const result = await db.collection('events').updateOne(
        { _id: new ObjectId(eventId) },
        {
          $set: {
            time: new Date(time).toISOString(),
            reason,
            userIds: objectIds,
          },
        }
      );

      // If no event was updated, return an error
      if (result.matchedCount === 0) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      return res.status(200).json({ type: 'S', msg: 'Event updated successfully' });
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).send('Server error');
    }
  }

  if (req.method === 'DELETE') {
    // Delete an event (Delete)
    try {
      const { eventId } = req.query;

      if (!eventId) {
        return res.status(400).json({ msg: 'Event ID is required' });
      }

      // Delete the event from the database
      const result = await db.collection('events').deleteOne({
        _id: new ObjectId(eventId as string),
      });

      // If no event was deleted, return an error
      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      return res.status(200).json({ type: 'S', msg: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).send('Server error');
    }
  }

  // If the method is not POST, PUT, or DELETE
  else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
