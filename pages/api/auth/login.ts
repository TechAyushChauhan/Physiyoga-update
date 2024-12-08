import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/login';
import { connectToDatabase } from '../../../lib/mongodb';




const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase(); 
    try {
        console.log(req.body)
    const {username,password}= req.body

        const existingUser = await db.collection<User>('users').findOne({ mobileOrEmail:username,password:password });
        console.log(existingUser)
       
  
        if (!existingUser) {
            return res.status(201).json(
                
                { 
                    "type": "E",
                    "msg": "Oops! The email, username, or password is incorrect. Please check and try again."
                }
            );

            
        }
        
      

   
   
      return res.status(201).json( { 
        "type": "S",
        "msg": "Success"
    });
    } catch (error) {
        console.log(error)
  
      return res.status(500).send('Server error');
    }
  } else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
