import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   
    if (req.method === 'GET') {
        const isLoggedIn = true;  // This can be replaced with any condition for testing

        if (isLoggedIn) {
            // If logged in, return a success response
            return res.status(200).json({ message: 'User is logged in', loggedIn: true });
        } else {
            // If not logged in, return a failure response
            return res.status(401).json({ message: 'User is not logged in', loggedIn: false });
        }
    } else {
        // If the request method is not GET, return a method not allowed error
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
