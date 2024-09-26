const http = require('http');
const fs = require('fs');
const path = require('path');

// Tạo server HTTP
http.createServer((request, response) => {
    // Lấy path từ URL
    const urlPath = request.url;

    // Định tuyến dựa trên path
    if (urlPath === '/') {
        // Đọc và gửi nội dung của file index.html
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Requested content not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (urlPath === '/classical') {
        // Đọc và gửi nội dung của file homer.html
        fs.readFile(path.join(__dirname, 'homer.html'), (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Requested content not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (urlPath === '/dystopy') {
        // Đọc và gửi nội dung của file bradbury.html
        fs.readFile(path.join(__dirname, 'bradbury.html'), (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Requested content not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else {
        // Phản hồi với mã lỗi 404 nếu không tìm thấy đường dẫn
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Requested content not found');
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
