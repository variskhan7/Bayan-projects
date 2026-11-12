import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function bayanApiPlugin(): Plugin {
  const getPublicPath = (subPath: string) => path.resolve(process.cwd(), 'public', subPath);

  const handleApiRequest = (req: any, res: any, next: any) => {
    const reqUrl = req.url || '';
    const pathname = reqUrl.split('?')[0];

    // 1. GET /api/site-settings
    if (pathname === '/api/site-settings' && req.method === 'GET') {
      const filePath = getPublicPath('site-settings.json');
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({}));
      }
      return;
    }

    // 2. POST /api/site-settings
    if (pathname === '/api/site-settings' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          const filePath = getPublicPath('site-settings.json');
          fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // 3. GET /api/jobs
    if (pathname === '/api/jobs' && req.method === 'GET') {
      const filePath = getPublicPath('site-jobs.json');
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([]));
      }
      return;
    }

    // 4. POST /api/jobs
    if (pathname === '/api/jobs' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          const filePath = getPublicPath('site-jobs.json');
          fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // 5. POST /api/upload-video
    if (pathname === '/api/upload-video' && req.method === 'POST') {
      const urlObj = new URL(reqUrl, 'http://localhost');
      const rawName = urlObj.searchParams.get('filename') || 'corporate-video.mp4';
      const cleanExt = path.extname(rawName) || '.mp4';
      const filename = `spotlight-${Date.now()}${cleanExt}`;
      const uploadDir = getPublicPath(path.join('uploads', 'videos'));
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const targetPath = path.join(uploadDir, filename);

      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(targetPath, buffer);
          const publicUrl = `/uploads/videos/${filename}`;
          
          // Also update site-settings.json automatically
          const settingsPath = getPublicPath('site-settings.json');
          let currentSettings: any = {};
          if (fs.existsSync(settingsPath)) {
            try { currentSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8')); } catch (_) {}
          }
          currentSettings.spotlight_video_url = publicUrl;
          currentSettings.spotlight_video_source = 'upload';
          currentSettings.spotlight_video_name = rawName;
          fs.writeFileSync(settingsPath, JSON.stringify(currentSettings, null, 2), 'utf-8');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: true, 
            url: publicUrl, 
            filename: rawName 
          }));
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // 6. POST /api/upload-image — saves image to public/uploads/images/ and returns public URL
    if (pathname === '/api/upload-image' && req.method === 'POST') {
      const urlObj = new URL(reqUrl, 'http://localhost');
      const rawName = urlObj.searchParams.get('filename') || 'image.jpg';
      const keyParam = urlObj.searchParams.get('key') || 'custom_image';
      const cleanExt = path.extname(rawName) || '.jpg';
      const filename = `${keyParam}-${Date.now()}${cleanExt}`;
      const uploadDir = getPublicPath(path.join('uploads', 'images'));
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const targetPath = path.join(uploadDir, filename);

      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(targetPath, buffer);
          const publicUrl = `/uploads/images/${filename}`;

          // Update site-settings.json with the public URL for this key
          const settingsPath = getPublicPath('site-settings.json');
          let currentSettings: any = {};
          if (fs.existsSync(settingsPath)) {
            try { currentSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8')); } catch (_) {}
          }
          currentSettings[keyParam] = publicUrl;
          fs.writeFileSync(settingsPath, JSON.stringify(currentSettings, null, 2), 'utf-8');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, url: publicUrl }));
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    next();
  };

  return {
    name: 'bayan-api-plugin',
    configureServer(server) {
      server.middlewares.use(handleApiRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApiRequest);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), bayanApiPlugin()],
  server: {
    host: true // Expose to LAN so mobile phones and other devices can access via Wi-Fi IP
  }
});
