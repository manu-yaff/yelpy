const http = require('node:http');
const fs = require('fs');
const path = require('path');

const PORT = 9000;

const publicDir = path.join(__dirname, '');
const indexFilePath = path.join(__dirname, '/index.html');

const server = http.createServer((req, res) => {
  const requestedPath = path.join(publicDir, req.url);
  console.log(requestedPath);

  // Check if the requested file exists and is a file
  fs.stat(requestedPath, (err, stats) => {
    if (!err && stats.isFile()) {
      // Serve the static file
      const ext = path.extname(req.url).toLowerCase();
      const mimeTypes = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      };

      const contentType = mimeTypes[ext] || 'application/octet-stream';
      fs.readFile(requestedPath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error when serving static file');
          return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    } else {
      // Serve index.html for non-static requests (SPA behavior)
      fs.readFile(indexFilePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error when serving HTML');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
