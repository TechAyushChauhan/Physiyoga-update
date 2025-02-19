import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Define API handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    // Handle new course purchase
    const { userId, courseId } = req.body;

    if (!userId || !courseId ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // Insert a new purchase record in the 'purchases' collection
      const newPurchase = await db.collection('purchases').insertOne({
        userId,
        courseId,
        purchaseDate: new Date(),
        
      });

      res.status(201).json({
        type: 'S',
        message: 'Course purchased successfully',
        data: newPurchase, // Return the purchase data
      });
    } catch (error) {
      console.error('Error purchasing course:', error);
      res.status(500).json({ message: 'Error purchasing course', error: error.message });
    }
  } else 
  if (req.method === 'GET') {
    // Handle getting a user's purchased courses
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      // Find all purchases for a specific user
      const purchases = await db.collection('purchases').find({ userId }).toArray();

      if (purchases.length === 0) {
        return res.status(404).json({ message: 'No purchases found for this user' });
      }

      res.status(200).json({
        type: 'S',
        message: 'Purchased courses retrieved successfully',
        data: purchases,
      });
    } catch (error) {
      console.error('Error fetching purchases:', error);
      res.status(500).json({ message: 'Error fetching purchases', error: error.message });
    }
  } else if (req.method === 'PATCH') {
    // Handle updating a course purchase (e.g., marking as paid)
    const { purchaseId, status } = req.body;

    if (!purchaseId || !status) {
      return res.status(400).json({ message: 'Purchase ID and status are required' });
    }

    try {
      // Update the purchase status
      const updatedPurchase = await db.collection('purchases').updateOne(
        { _id: new ObjectId(purchaseId) },
        { $set: { status } }  // You can store the status such as 'paid', 'pending', etc.
      );

      if (updatedPurchase.modifiedCount === 0) {
        return res.status(404).json({ message: 'Purchase not found' });
      }

      res.status(200).json({
        type: 'S',
        message: 'Purchase status updated successfully',
        data: updatedPurchase,
      });
    } catch (error) {
      console.error('Error updating purchase:', error);
      res.status(500).json({ message: 'Error updating purchase', error: error.message });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
