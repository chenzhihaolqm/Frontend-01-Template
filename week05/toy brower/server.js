const http = require('http');
const server = http.createServer((req, res) => {
   console.log(req);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('中国心中');
  res.end('defg');
});
server.listen(8080);