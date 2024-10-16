const http = require('http');
const port = 3000;
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, HEAD',
    'Access-Control-Allow-Headers': '14400'
  };

  let filePath = path.join(__dirname, 'index.html');
  let stat = fs.statSync(filePath);

  // TODO 2: Check if Origin header is set
  if (!req.headers['origin']) {
    res.writeHead(400, headers);
    res.end('Origin header is missing');
    return;
  }

  // TODO 3, 4, 5: Handle HTTP methods
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    const data = fs.readFileSync(filePath, 'utf8');
    res.end(data);
    return;
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      res.writeHead(200, headers);
      res.end(`Received POST data: ${body}`);
    });
    return;
  } else if (req.method === 'HEAD') {
    res.writeHead(200, headers);
    res.end(); // No content for HEAD
    return;
  } else {
    res.writeHead(405, headers); // Method not allowed
    res.end(`Method ${req.method} not allowed`);
    return;
  }
});

// DO NOT MODIFY BELOW THIS LINE
module.exports = server;

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
