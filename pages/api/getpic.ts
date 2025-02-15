import { NextApiRequest, NextApiResponse } from 'next';

// Base URL for your S3 bucket where videos are hosted
const BASE_URL = 'https://curetribevideo.s3.eu-north-1.amazonaws.com/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.query; // Get the file parameter from the query string

  // Check if the method is GET
  if (req.method === 'GET') {
    // Ensure the file query parameter is provided
    if (!file || typeof file !== 'string') {
      return res.status(400).json({ message: 'File parameter is required' });
    }
    let videoUrl = `${file}`;
    if (!videoUrl.startsWith('https://')) {
      videoUrl = `https://${videoUrl}`;
    }
    // Construct the full URL to the video in S3
   

    try {
      console.log(videoUrl)
      // Check if the file exists in the S3 bucket (optional - might not be needed if you trust the URL)
      const response = await fetch(videoUrl, { method: 'HEAD' });
      if (!response.ok) {
        return res.status(404).json({ message: 'Video file not found' });
      }

      // Redirect the request to the actual video URL (client will handle the streaming)
      res.redirect(videoUrl);  // This will redirect the client to the video URL

      // Or, if you want to stream the video directly (without redirect), you can use:
      // res.status(200).send(await response.buffer());

    } catch (error) {
      console.error('Error fetching the video:', error);
      return res.status(500).json({ message: 'Server error fetching the video' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
