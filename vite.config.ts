import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'save-assets-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/assets-manifest' && req.method === 'GET') {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              const jsonPath = path.resolve(__dirname, 'public/uploaded/assets_manifest.json');
              if (fs.existsSync(jsonPath)) {
                try {
                  const content = fs.readFileSync(jsonPath, 'utf-8');
                  res.end(content);
                  return;
                } catch (err) {
                  console.error('Error reading assets manifest:', err);
                }
              }
              res.end(JSON.stringify({}));
              return;
            }

            if (req.url === '/api/save-image' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const { key, base64, value } = data;
                  if (!key) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Missing key' }));
                    return;
                  }

                  const uploadDir = path.resolve(__dirname, 'public/uploaded');
                  if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                  }

                  const jsonPath = path.resolve(__dirname, 'public/uploaded/assets_manifest.json');
                  let manifest = {};
                  if (fs.existsSync(jsonPath)) {
                    try {
                      manifest = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
                    } catch (err) {
                      console.error('Error parsing assets manifest:', err);
                    }
                  }

                  if (base64) {
                    let ext = 'jpg';
                    let base64Data = '';
                    const matches = base64.match(/^data:([a-zA-Z0-9-\+\.]+)\/([a-zA-Z0-9-\+\.]+);base64,(.+)$/s);
                    if (matches && matches.length === 4) {
                      const rawExt = matches[2];
                      ext = rawExt === 'jpeg' ? 'jpg' : rawExt;
                      base64Data = matches[3];
                    } else {
                      const parts = base64.split(';base64,');
                      if (parts.length === 2) {
                        const mime = parts[0];
                        base64Data = parts[1];
                        const rawExt = mime.split('/')[1] || 'jpg';
                        ext = rawExt === 'jpeg' ? 'jpg' : rawExt;
                      }
                    }

                    if (base64Data) {
                      const buffer = Buffer.from(base64Data.trim(), 'base64');
                      const filename = `${key}.${ext}`;
                      const filePath = path.join(uploadDir, filename);
                      fs.writeFileSync(filePath, buffer);
                      
                      manifest[key] = `/uploaded/${filename}`;
                      fs.writeFileSync(jsonPath, JSON.stringify(manifest, null, 2));

                      console.log(`[Asset Saved] Key: ${key} -> /uploaded/${filename}`);

                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ success: true, url: `/uploaded/${filename}` }));
                      return;
                    } else {
                      res.statusCode = 400;
                      res.end(JSON.stringify({ error: 'Invalid base64 format' }));
                      return;
                    }
                  } else if (value !== undefined) {
                    manifest[key] = value;
                    fs.writeFileSync(jsonPath, JSON.stringify(manifest, null, 2));

                    console.log(`[Value Saved] Key: ${key} -> ${value}`);

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, url: value }));
                    return;
                  }
                } catch (e) {
                  console.error('Error saving uploaded asset:', e);
                }
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to process request' }));
              });
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
