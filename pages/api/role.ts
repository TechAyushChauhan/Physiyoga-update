import { NextApiRequest, NextApiResponse } from 'next';
 import { Role } from '../../models/role';

import { connectToDatabase } from '../../lib/mongodb';



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase(); 
    try {

       const saverole = await db.collection<Role>('role').insertOne(req.body);

      return res.status(201).json({
        "type": "S",
        "msg": "User registered successfully",
        "role":saverole


    
      });
    } catch (error) {
    
  
      return res.status(500).send({
        "type": "S",
        msg:'Server error' ,error:error});
    }
  } else if (req.method === 'GET') {
    const { db } = await connectToDatabase(); 
    try {

       const saverole = await db.collection<Role>('role').find({}).toArray();

      return res.status(201).json({
        "type": "S",
        "msg": "User registered successfully",
        "roles":saverole


    
      });
    } catch (error) {
    
  
      return res.status(500).send({
        "type": "S",
        msg:'Server error' ,error:error});
    }
    
 
    
  }else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
