// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '../../lib/mongodb'; // Import database connection
// import { User } from '../../models/test'; // Import the User model

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         if (req.method === 'Post') {
//             const { db } = await connectToDatabase(); 

           
//             const isLoggedIn = true;

//             if (isLoggedIn) {
//                 // Fetch user data if required (optional based on your needs)
//                 // const users = await db.collection<User>('users').insertOne({
//                 //     name:'test'
//                 // });

//                 // Return success response
//                 return res.status(200).json({
//                     message: 'User is logged in',
//                     loggedIn: true,
//                     data: users, // Send user data
//                 });
//             } else {
//                 // Return unauthorized response
//                 return res.status(401).json({
//                     message: 'User is not logged in',
//                     loggedIn: false,
//                 });
//             }
//         } else {
//             // Return method not allowed response
//             return res.status(405).json({
//                 message: 'Method Not Allowed',
//             });
//         }
//     } catch (error) {
//         console.error('Error in handler:', error);

//         // Return internal server error response
//         return res.status(500).json({
//             message: 'Internal Server Error',
//             error: error.message,
//         });
//     }
// }
