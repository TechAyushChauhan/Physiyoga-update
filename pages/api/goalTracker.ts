import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: true, // Enable JSON body parsing
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
   
    const { userId, goalTitle, state, progress =0, category, totalDays=1 } = req.body;

    if (!userId || !goalTitle || !state || progress === undefined || !category || !totalDays) {
      return res.status(400).json({ message: 'userId, goalTitle, state, progress, category, and totalDays are required' });
    }

    try {
      // Create a new goal
      const newGoal = await db.collection('goals').insertOne({
        userId: new ObjectId(userId),
        goalTitle,
        state,  // "pending", "in progress", or "completed"
        progress,  // Integer (0 to 100)
        category,
        totalDays,  // Total number of days
        createdAt: new Date(),
      });

      return res.status(201).json({
        type: 'S',
        message: 'Goal created successfully',
        data: newGoal, // Return the created goal
      });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: 'Error creating goal', error: error.message });
    }
  }

  if (req.method === 'GET') {
    // GET request to retrieve all goals for a specific user
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    try {
      // Find all goals for the given user
      const goals = await db.collection('goals').find({ userId: new ObjectId(userId as string) }).toArray();

      return res.status(200).json({
        type: 'S',
        message: 'Goals retrieved successfully',
        data: goals,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving goals', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    // PUT request to update the goal
    const { _id, goalTitle, state, progress, category, totalDays } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'goalId is required' });
    }

    const updateData: any = {};
    if (goalTitle) updateData.goalTitle = goalTitle;
    if (state) updateData.state = state;
    if (progress !== undefined) updateData.progress = progress;
    if (category) updateData.category = category;
    if (totalDays !== undefined) updateData.totalDays = totalDays;

    try {
      // Update the goal with the new data
      const updatedGoal = await db.collection('goals').updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );

    

      return res.status(200).json({
        type: 'S',
        message: 'Goal updated successfully',
        data:updatedGoal
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating goal', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    // DELETE request to delete a goal
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    try {
      // Delete the goal by goalId
      const deletedGoal = await db.collection('goals').deleteOne({ _id: new ObjectId(id) });

      if (deletedGoal.deletedCount === 0) {
        return res.status(404).json({ message: 'Goal not found' });
      }

      return res.status(200).json({
        type: 'S',
        message: 'Goal deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting goal', error: error.message });
    }
  }

  // If the method is not supported
  res.status(405).json({ message: 'Method Not Allowed' });
};

export default handler;
