import { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '900mb' // Set desired value here
        }
    }
}

const TELEGRAM_API_URL = 'https://api.telegram.org/bot7580167715:AAEqAfsidqgvNtqvPsxnUSs9UqBbRiiWqLA/sendVideo';
const TELEGRAM_USER_ID = '1185475721';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      
      const videoFile = req.body.video;
   

      const form = new FormData();
      console.log('Received file:', videoFile);

      form.append('chat_id', TELEGRAM_USER_ID);
      form.append('video', videoFile);

      const telegramResponse = await fetch(TELEGRAM_API_URL, {
        method: 'POST',
        body: form,
      });

      const telegramResult = await telegramResponse.json();
      console.log(telegramResult)

      if (telegramResponse.ok && telegramResult.ok) {
        res.status(200).json({ ok: true, description: 'Video uploaded successfully' });
      } else {
        res.status(500).json({ ok: false, description: telegramResult.description || 'Error uploading video' });
      }
    } catch (error) {
      res.status(500).json({ ok: false, error: 'An error occurred while uploading the video.' });
      console.error('Error uploading video to Telegram:', error);
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
