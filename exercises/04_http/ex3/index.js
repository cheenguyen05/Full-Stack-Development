const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function(request, response) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      const hasContentType = response.hasHeader('content-type');
      console.log("header", hasContentType)
      response.write(JSON.stringify(request.headers))
      response.end();
}).listen(3000);