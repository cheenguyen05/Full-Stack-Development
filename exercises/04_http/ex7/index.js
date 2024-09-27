const http = require('http');
const fs = require("fs");

// Export the server created by http.createServer
module.exports = http.createServer((request, response) => {
    if (request.url === "/") {
        fs.readFile("index.html", (err, pagersp) => {
            if (err) {
                response.writeHead(404);
                response.end('Requested content not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(pagersp);
            }
        });
    } else if (request.url === "/classical") {
        fs.readFile("homer.html", (err, pagersp) => {
            if (err) {
                response.writeHead(404);
                response.end('Requested content not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(pagersp);
            }
        });
    } else if (request.url === "/dystopy") {
        fs.readFile("bradbury.html", (err, pagersp) => {
            if (err) {
                response.writeHead(404);
                response.end('Requested content not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(pagersp);
            }
        });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});

// Start the server on port 3000
const server = module.exports.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
