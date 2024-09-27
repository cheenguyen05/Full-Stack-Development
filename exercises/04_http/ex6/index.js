const http = require('http');
const fs = require("fs");


const server = http.createServer((req,res)=>{
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
    }else if(req.url==="/respond"){
        fs.readFile("index.html",(err,pagersp)=>{
            if(err){
                res.writeHead(404);
                res.write('Requested content not found',err)
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(pagersp);
            }
        })
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


