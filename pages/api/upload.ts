// import { NextApiRequest, NextApiResponse } from 'next';
// import FormData from 'form-data';
// import fetch from 'node-fetch';
// import axios from 'axios';

// // Increase body parser limit in the config
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '700mb', // Set the size limit to 10MB (you can adjust as needed)
//     },
//   },
// };

// // const TELEGRAM_BOT_TOKEN = '7580167715:AAEqAfsidqgvNtqvPsxnUSs9UqBbRiiWqLA';
// const TELEGRAM_API_URL = 'https://api.telegram.org/bot7580167715:AAEqAfsidqgvNtqvPsxnUSs9UqBbRiiWqLA/sendVideo';
// const TELEGRAM_USER_ID = '1185475721'; // Replace with your Telegram user ID

// // Handle the file upload and send to Telegram
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//       try {
//         // Ensure the file exists in the request
//         const videoFile = req.body.video;
  
//         if (!videoFile) {
//           return res.status(400).json({ error: 'No video file found in the request.' });
//         }
  
//         // FormData setup
//         const form = new FormData();
//         form.append('chat_id', TELEGRAM_USER_ID); // Your Telegram chat ID
//         form.append('video', videoFile, videoFile.name); // Append video file with name
  
//         // Sending video to Telegram
//         const response = await axios.post(TELEGRAM_API_URL, form, {
//           headers: {
//             ...form.getHeaders(),
//           },
//         });
  
//         res.status(200).json({ message: 'Video uploaded successfully!', response });
//       } catch (error) {
//         console.error('Error uploading video to Telegram:', error);
//         res.status(500).json({ error: 'Failed to upload video.' });
//       }
//     } else {
//       res.status(405).json({ error: 'Method not allowed.' });
//     }
//   }