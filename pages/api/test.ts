import { createReadStream, statSync, existsSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const videoPath = path.resolve(process.cwd(), 'upload/sample-5.mp4');
      console.log('Resolved Video Path:', videoPath);

      if (!existsSync(videoPath)) {
        res.status(404).json({ error: 'Video file not found.' });
        return;
      }

      const videoStats = statSync(videoPath);
      const fileSize = videoStats.size;
      console.log('Video File Size:', fileSize);

      const range = req.headers.range;
      if (range) {
        const [startPart, endPart] = range.replace(/bytes=/, '').split('-');
        const start = parseInt(startPart, 10);
        const end = endPart ? parseInt(endPart, 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
          res.status(416).json({ error: 'Requested range not satisfiable' });
          return;
        }

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': end - start + 1,
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'inline; filename="video.mp4"',
        });

        const videoStream = createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'inline; filename="video.mp4"',
        });

        const videoStream = createReadStream(videoPath);
        videoStream.pipe(res);
      }
    } catch (error) {
      console.error('Error streaming video:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
