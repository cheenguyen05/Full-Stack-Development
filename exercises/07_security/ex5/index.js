const http = require('http');
const url = require('url');
const port = 3000;

const server = http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });

  const queryObject = url.parse(request.url, true).query;

  // TODO: sanitize the the 'addThisText' query parameter user input so that injected scripts won't run
  // addThisText from the query parameters is accessed with queryObject['addThisText']. It should be sanitized with encodeURIComponent().
  const sanitizedText = encodeURIComponent(queryObject['addThisText'] || '');
  
  response.write(
    `   <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>XSS alert!</title>
            </head>
            <body>
                <p id="xss">Here be XSS!  queryObject['addThisText'] is now: </p>
                ${sanitizedText}
            </body >
            </html >
    `);
  console.log("queryObject['addThisText']: ", queryObject['addThisText']);
  response.end();
});

// Sanitize HTML function
function sanitizeHTML(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

// DO NOT MODIFY BELOW THIS LINE
module.exports = server;

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}