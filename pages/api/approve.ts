
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongodb';

// Define the structure of the payment data
interface Payment {
  imageUrl: string;
  time: string;
  userId: ObjectId;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  // POST - Create a new payment
  if (req.method === 'POST') {
    try {
      const { imageUrl, time, userId } = req.body;

      if (!imageUrl || !time || !userId) {
        return res.status(400).json({ msg: 'Missing required fields' });
      }

      // Validate the imageUrl format
      const imageUrlRegex = /^https?:\/\/[^\s]+$/;
      if (!imageUrlRegex.test(imageUrl)) {
        return res.status(400).json({ msg: 'Invalid image URL format' });
      }

      // Validate the time format
      const parsedTime = new Date(time);
      if (isNaN(parsedTime.getTime())) {
        return res.status(400).json({ msg: 'Invalid time format' });
      }

      // Validate userId (should be a valid MongoDB ObjectId)
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: 'Invalid userId format' });
      }

      const newPayment: Payment = {
        imageUrl,
        time: parsedTime.toISOString(),
        userId: new ObjectId(userId),
      };

      // Insert the payment into the database
      const result = await db.collection('payments').insertOne(newPayment);

      return res.status(201).json({
        type: 'S',
        msg: 'Payment created successfully',
        paymentId: result.insertedId,
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  // GET - Retrieve all payments or a specific payment by ID
  else if (req.method === 'GET') {
    try {
      const { paymentId } = req.query;

      if (paymentId) {
        // Retrieve a single payment by ID
        const payment = await db.collection('payments').findOne({ _id: new ObjectId(paymentId as string) });
        if (!payment) {
          return res.status(404).json({ msg: 'Payment not found' });
        }
        return res.status(200).json({ type: 'S', payment });
      } else {
        // Retrieve all payments
        const payments = await db.collection('payments').find().toArray();
        return res.status(200).json({ type: 'S', payments });
      }
    } catch (error) {
      console.error('Error retrieving payment:', error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  // PUT - Update an existing payment
  else if (req.method === 'PUT') {
    try {
      const { paymentId, imageUrl, time, userId } = req.body;

      if (!paymentId || !imageUrl || !time || !userId) {
        return res.status(400).json({ msg: 'Missing required fields' });
      }

      // Validate the imageUrl format
      const imageUrlRegex = /^https?:\/\/[^\s]+$/;
      if (!imageUrlRegex.test(imageUrl)) {
        return res.status(400).json({ msg: 'Invalid image URL format' });
      }

      // Validate the time format
      const parsedTime = new Date(time);
      if (isNaN(parsedTime.getTime())) {
        return res.status(400).json({ msg: 'Invalid time format' });
      }

      // Validate userId (should be a valid MongoDB ObjectId)
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: 'Invalid userId format' });
      }

      // Update the payment in the database
      const result = await db.collection('payments').updateOne(
        { _id: new ObjectId(paymentId) },
        { $set: { imageUrl, time: parsedTime.toISOString(), userId: new ObjectId(userId) } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ msg: 'Payment not found or no changes made' });
      }

      return res.status(200).json({ type: 'S', msg: 'Payment updated successfully' });
    } catch (error) {
      console.error('Error updating payment:', error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  // DELETE - Delete a payment by ID
  else if (req.method === 'DELETE') {
    try {
      const { paymentId } = req.query;

      if (!paymentId || !ObjectId.isValid(paymentId as string)) {
        return res.status(400).json({ msg: 'Invalid or missing paymentId' });
      }

      const result = await db.collection('payments').deleteOne({ _id: new ObjectId(paymentId as string) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'Payment not found' });
      }

      return res.status(200).json({ type: 'S', msg: 'Payment deleted successfully' });
    } catch (error) {
      console.error('Error deleting payment:', error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  // If method is not supported
  else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
