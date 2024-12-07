import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/login';
import { connectToDatabase } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase(); 
    try {
    const {mobileOrEmail}= req.body

        const existingUser = await db.collection<User>('users').findOne({ mobileOrEmail:mobileOrEmail });
        console.log(existingUser)
        if (existingUser) {
            return res.status(201).json(
                
                { 
                    "type": "E",
                    "msg": "User already exists"
                }
            );

            
        }
       const saveUser = await db.collection<User>('users').insertOne(req.body);

      console.log(saveUser)
   
      return res.status(201).json( { 
        "type": "S",
        "msg": "User registered successfully"
    });
    } catch (error) {
        console.log(error)
    //   console.error(error.message);
      return res.status(500).send('Server error');
    }
  } else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
