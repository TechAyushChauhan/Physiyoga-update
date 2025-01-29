import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { User } from "../../models/login";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'xxasd7885[';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const { db } = await connectToDatabase();
  
      try {
        // Extract token from headers
        const token = req.headers.authorization?.split(' ')[1];
  
        if (!token) {
          return res.status(401).json({ msg: 'Authorization token missing' });
        }
  
        // Verify and decode the token
        let decodedToken: unknown;
        try {
          decodedToken = jwt.verify(token, JWT_SECRET);
        } catch (err) {
          return res.status(401).json({ msg: 'Invalid token' });
        }
  
        const username = decodedToken?.username;
  
        // Find the user in the database
        const user = await db.collection('users').findOne({ mobileOrEmail: username });
  
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
        const userdata = await db.collection('users').find().toArray();
        // Send user data (excluding sensitive fields like password)
        return res.status(200).json({
          type: 'S',
          data:userdata
        
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
    else {
      return res.status(405).json({ msg: 'Method Not Allowed' });
    }
  };
  
  export default handler;
  