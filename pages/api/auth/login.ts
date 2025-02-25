/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/login';
import { connectToDatabase } from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

// Make sure to add your secret key in .env file
const JWT_SECRET = process.env.JWT_SECRET || 'xxasd7885['; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();

    try {
      const { username, password } = req.body;

      // Find the user by username or email
      const existingUser = await db
        .collection<User>('users')
        .findOne({ mobileOrEmail: username, password: password });

      // If the user is not found, return error message
      if (!existingUser) {
        return res.status(401).json({
          type: 'E',
          msg: 'Oops! The email, username, or password is incorrect. Please check and try again.',
        });
      }

      // Generate JWT token with user data (e.g., userId, username)
        const token = jwt.sign(
          {  username: existingUser.mobileOrEmail },
          JWT_SECRET,
          // Token expires in 1 hour
        );

      // Send the token in the response as part of the success message
      return res.status(200).json({
        type: 'S',
        msg: 'Login Successful',
        token, // Send token back to client
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).send('Server error');
    }
  } else if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    try {
      // Get token from headers
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ msg: 'Authorization token missing' });
      }

      // Verify and decode the token
 
      let decodedToken: any;
      try {
        decodedToken = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return res.status(401).json({ msg: 'Invalid token' });
      }

      const username = decodedToken?.username;

      // Find the user in the database
      const user = await db.collection<User>('users').findOne({ mobileOrEmail: username });

      // If user not found
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Send user data (exclude sensitive fields like password)
      return res.status(200).json({
        type: 'S',
        user: {
          id: user._id,      
          name: user.username,
          mobileOrEmail: user.mobileOrEmail,
          // @ts-expect-error: 'keepExtensions' property is not typed in the formidable package 
          referralCode:user.referralCode
          // Include additional user fields as needed
        },
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).send('Server error');
    }
  } else  if (req.method === 'DELETE') {
    const { db } = await connectToDatabase();
    const { userid } = req.query;
    try {
     

      // Find the user in the database
      const user = await db.collection<User>('users').findOne({ _id: new ObjectId(userid) });

      // If user not found
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Delete the user from the database
      const deleteResult = await db.collection<User>('users').deleteOne({ _id: user._id });

      // If no document was deleted
      if (deleteResult.deletedCount === 0) {
        return res.status(500).json({ msg: 'Failed to delete the user' });
      }

      return res.status(200).json({
        type: 'S',
        msg: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).send('Server error');
    }}
  
  else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
