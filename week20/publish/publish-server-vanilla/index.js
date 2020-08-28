const http = require('http');
const https = require('https');
const fs = require('fs');
const unzipper = require('unzipper');

const server = http.createServer((req, res) => {

    if (req.url.match(/^\/auth/))
        return auth(req, res);
    if (!req.url.match(/^\/?/)) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('not found!');
        return;
    }

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/user',
        method: 'GET',
        headers: {
            Authorization: 'token ' + req.headers.token,
            'User-Agent': 'toy-publish-tool'
        }
    };

    const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (d) => {
            body = d.toString();
            console.log('body  :::: ', body)
        });
        response.on('end',() => {
            let user = JSON.parse(body);
            console.log(user);
            // 检查权限
            
            let writeStream = unzipper.Extract({path: '../server/public'});
            req.pipe(writeStream);

            req.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end();
                console.log('publish success!!');
                server.close();
            })
        })
    });
  
    request.on('error', (e) => {
        console.error(e);
    });
    request.end(); 
});

function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];

    let client_id = 'Iv1.c8feb07434f0ef91';
    let client_secret = '622f82b41a6bfbe9058bd2e0bf100886e3ad1c14';
    let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
    let state = 'abc123';

    let params = `client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&state=${state}`;

    // let apiUrl = `https://github.com/login/oauth/access_token?${params}`;

    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}`,
        method: 'POST'
    };
    const request = https.request(options, (response) => {
  
        response.on('data', (d) => {
            let result = d.toString().match(/access_token=([^&]+)/);
            if (result) {
                let token = result[1];
                console.log('token:::: ', token)
                res.writeHead(200, {
                    'access_token': token
                });
                res.end(`<a href="http://localhost:8000/publish?token=${token}">publish</a>`);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end('error!');
            }
        });
    });
  
    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
}

server.listen(8081);