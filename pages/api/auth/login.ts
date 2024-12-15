import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/login';
import { connectToDatabase } from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

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
  } else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
