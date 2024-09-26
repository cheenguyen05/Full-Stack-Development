const http = require('http');
const fs = require('fs');

const readFileSendResponse = (fileName, contentType, response) => {
    fs.readFile(path.resolve(fileName), function (error, file) {
      if (error) {
        response.writeHead(404);
        response.write('Requested content not found', error);
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.write(file);
      }
      response.end();
    })
}

http.createServer(function(request, response) {
    if (request.headers['accept'] && request.headers['accept'].includes('text/html')) {
        if (request.url === '/'){
            readFileSendResponse('index.html', 'text/html', response);
        } else if (request.url === '/classical'){
            readFileSendResponse('homer.html', 'text/html', response);
        } else if (request.url === '/dystopia'){
            readFileSendResponse('bradbury.html', 'text/html', response);
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('Requested content not found');
            response.end();
        }
    } else {
        response.statusCode = 406;
        response.statusMessage = 'Content type not available';
        response.end();
      }
}).listen(3000);