// /pages/api/telegram.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface TelegramMessage {
  message?: {
    text?: string;
    chat: {
      id: number;
    };
  };
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body: TelegramMessage = req.body;

    if (body.message?.text?.startsWith('http')) {
      const chatId = body.message.chat.id;
      const videoUrl = body.message.text;

      // Respond to the user on Telegram
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Thanks! Video link received: ${videoUrl}`,
        }),
      });

      // (Optional) Save the video URL to your database or pass it to the frontend
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/save-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });
    }

    res.status(200).send('OK');
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
