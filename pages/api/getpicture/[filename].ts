import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// The path to your 'uploads' folder (outside of the 'public' directory)
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query; 
console.log(filename)
  if (req.method === 'GET') {
    const filePath = path.join(UPLOADS_DIR, filename as string);

    // Check if the file exists
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
    default:
      return 'application/octet-stream';
  }
}
