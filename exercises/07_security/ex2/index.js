const http = require('http');
const port = 3000;
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  /** TODO 1: add the required CORS headers 
   * as speciiied in the exercise instructions.
   * You can define your CORS header with something
   * like the following:
   * const headers = {
      'header_1_name': 'header_1_value',
      'header_2_name': 'header_2_value',
      ...
      };
      This syntax enables using the defined CORS headers with  writeHead() method in the TODOs below. See writeHead() method parameters: (https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers).
  */
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "HEAD, GET, POST",
    "Access-Control-Max-Age": 1440,

  };

  let filePath = path.join(__dirname, 'index.html');
  let stat = fs.statSync(filePath);

  // TODO 2: check that Origin header is set in all incoming requests
  // You can access the header with req.headers['origin']
  // You can check if a header is present in request headers with if(!req.headers['yourHeaderNameHere']){..
  if(!req.headers['origin']) {
    res.writeHead(400, headers); //400 bad request if no origin header
    res.end('Origin header is missing');
    return;
  }

  // TODO 3: handle GET and POST HTTP methods
  // You can use req.method to access the request method 
  // remember to add CORS headers to response, you can use writeHead() here 
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    const data = fs.readFileSync(filePath, 'utf8');
    res.end(data);
    return;
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;chunk
    });
    req.on('end', () => {
      res.writeHead(200, headers);
      res.end('Received POST data: ${body}');
    });
    return;
  }

  // TODO 4: handle HEAD HTTP method, 
  // remember to add CORS headers to response
  else if (req.method === 'HEAD') {
    res.writeHead(200, headers);
    res.end(); // No content for HEAD requests
    return;
  } else {
  // TODO 5: handle HTTP methods that are not allowed, 
  // remember to add CORS headers to response
  res.writeHead(405, headers);
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