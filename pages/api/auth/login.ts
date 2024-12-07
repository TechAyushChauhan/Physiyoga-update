// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import { body, validationResult } from 'express-validator';
// import connectDB from '../../../lib/connectDB'; // Your MongoDB connection utility
//  import { User} from '../../../models/login';
// import { connectToDatabase } from '../../../lib/mongodb';



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // const { db } = await connectToDatabase(); 
    // Validate input data
   

   console.log(req.body)
    

    try {
      // Check if user already exists
   
      return res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
    //   console.error(error.message);
      return res.status(500).send('Server error');
    }
  } else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
