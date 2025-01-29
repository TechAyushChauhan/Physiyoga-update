import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

// GET /api/videos
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const downloadDir = path.join(process.cwd(), 'uploads'); // Your 'downloads' folder path
      const staticDir = '/uploads'; // URL path to serve videos via HTTP

      // Check if the directory exists
      if (!fs.existsSync(downloadDir)) {
        return res.status(404).json({ message: 'uploads folder does not exist' });
      }

      // Read the directory and filter for video files (assuming .mp4, .avi, etc.)
      const videoFiles = fs.readdirSync(downloadDir).filter(file => {
        // Check for video file extensions
        return ['.mp4', '.avi', '.mkv', '.mov'].includes(path.extname(file).toLowerCase());
      });

      if (videoFiles.length === 0) {
        return res.status(404).json({ message: 'No video files found in the downloads folder' });
      }

      // Construct file URLs (assuming you're serving static files from the "public" folder)
      const videoPaths = videoFiles.map(file => {
        return {
          filename: file,
          fileUrl: `${staticDir}/${file}`,  // Path to serve video via HTTP
        };
      });

      // Send the list of video files
      res.status(200).json({
        type: 'S',
        message: 'All video files retrieved successfully',
        data: videoPaths,
      });
    } catch (err) {
      console.error('Error retrieving videos:', err);
      res.status(500).json({ message: 'Error retrieving videos', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
