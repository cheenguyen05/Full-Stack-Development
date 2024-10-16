const http = require('http');
const port = 3000;
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, HEAD',
    'Access-Control-Max-Age': '14400' // Cache CORS preflight response for 4 hours
  };

  // TODO 2: Check if Origin header is set
  if (!req.headers['origin']) {
    res.writeHead(400, headers);
    res.end('Origin header not in the request'); // Adjusted message
    return;
  }

  // TODO 3: Handle GET request
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end('I was requested using CORS!'); // Fixed expected response
    return;
  } 
  // TODO 4: Handle POST request
  else if (req.method === 'POST') {
    res.writeHead(200, headers);
    res.end('I was requested using CORS!'); // Fixed expected response
    return;
  }
  // TODO 5: Handle HEAD request
  else if (req.method === 'HEAD') {
    res.writeHead(200, headers);
    res.end(); // No body content for HEAD requests
    return;
  } 
  // Handle unsupported methods
  else {
    res.writeHead(405, headers);
    res.end('Request used a HTTP method which is not allowed.'); // Adjusted message
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
