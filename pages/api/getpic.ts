import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// The path to your 'uploads' folder (outside of the 'public' directory)
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query.file);

  if (req.method === 'GET') {
    const filePath = path.join(UPLOADS_DIR, req.query.file as string);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const fileSize = stats.size;

      // Check if the client sent a Range header (for seeking)
      const range = req.headers.range;

      if (range) {
        // Parse the range to get the start and end byte positions
        const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
        const start = parseInt(startStr, 10);
        const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

        if (start >= fileSize) {
          res.status(416).send('Requested Range Not Satisfiable');
          return;
        }

        // Set the response status to Partial Content (206)
        res.status(206);
        res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', end - start + 1);
        res.setHeader('Content-Type', getContentType(filePath));

        const fileStream = fs.createReadStream(filePath, { start, end });
        fileStream.pipe(res);
      } else {
        // If no range header, serve the full file
        res.setHeader('Content-Type', getContentType(filePath));
        res.setHeader('Content-Length', fileSize);
        fs.createReadStream(filePath).pipe(res);
      }
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
