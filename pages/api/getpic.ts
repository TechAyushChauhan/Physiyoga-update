import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// The path to your 'uploads' folder (outside of the 'public' directory)
const UPLOADS_DIR = process.env.NODE_ENV === 'production' 
  ? '/tmp/uploads' // Use /tmp in production (serverless environments like Vercel)
  : path.join(process.cwd(), 'uploads');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  console.log(req.query.file);

  if (req.method === 'GET') {
    const filePath = path.join(UPLOADS_DIR, req.query.file as string);

    if (fs.existsSync(filePath)) {
      const file = fs.createReadStream(filePath); // Create a read stream for the file

      // Set the appropriate content type based on the file extension
      res.setHeader('Content-Type', getContentType(filePath));
      file.pipe(res); // Stream the file to the client
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Function to get the correct content type based on the file extension
function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.pdf':
      return 'application/pdf';
    case '.mp4':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    case '.ogg':
      return 'video/ogg';
    default:
      return 'application/octet-stream'; // Generic binary content type for unsupported files
  }
}
