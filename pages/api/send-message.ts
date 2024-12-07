import type { NextApiRequest, NextApiResponse } from 'next';
 import { initializeWhatsApp, sendMessage } from '../../lib/whatsapp';


// Initialize WhatsApp Web Client
initializeWhatsApp();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
     

    

        try {
            const response = await sendMessage("7004678895", "hello");
            res.status(200).json({ success: true, response });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
