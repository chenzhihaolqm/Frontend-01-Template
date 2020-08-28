const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');

let packname = './package';
let redirect_uri = encodeURIComponent('http://localhost:8081/auth');

child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.c8feb07434f0ef91&redirect_uri=${redirect_uri}&state=abc123`);


const server = http.createServer((request, response) => {

    let result = request.url.match(/token=([^&]+)/);
    let token = result && result[1];
    const options = {
        host: 'localhost',
        port: 8081,
        path: `/?filename=package.zip`,
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/octet-stream'
        }
    };
    
    
    const req = http.request(options, (res) => {
        // console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });
    
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    
    var archive = archiver('zip', {
        zlib: {level: 9}
    });
    
    archive.directory(packname, false);
    
    archive.finalize();
    
    archive.pipe(req);
    
    archive.on('end', () => {
        req.end();
    });
    
    console.log('')
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('real publish !!!!');
})

server.listen(8000);

