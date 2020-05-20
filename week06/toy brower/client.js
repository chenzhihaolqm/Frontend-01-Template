	const net = require('net');
	const { parseHtml } = require('./parser');
	class Request {
		constructor(params = {}) {
			this.host = params.host;
			this.port = params.port || '80';
			this.method = params.method || 'GET';
			this.body = params.body || {};
			this.headers = params.headers || {};
			if(!this.headers['Content-Type']) {
				this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			}
			if(this.headers['Content-Type'] === 'application/json') {
				this.bodyText = JSON.stringify(this.body);
			} else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
				this.bodyText = Object.keys(this.body).map(key => {
					return `${key}=${encodeURIComponent(this.body[key])}`
				}).join('&')
			}
		   this.headers['Content-Length'] = this.bodyText.length;	
		}
		toString() {
			const json = `${this.method} / HTTP/1.1\r
${Object.keys(this.headers).map(key => {
	return `${key}:${this.headers[key]}`
}).join('\r\n')}\r
\r
${this.bodyText}`;
			return json;
		}
		send() {
		   return new Promise(resolve => {
			{
				this.client = net.createConnection({
				   host: this.host,
				   port: this.port }, ()=> {
				   console.log('connected to server');
				   
				   this.client.write(this.toString());
				   });
			   this.client.on('data',(data) => {
				  resolve(data.toString());
				  this.client.end();
			   })
			   this.client.on('end',(data) => {
				   console.log('disconnect ...');
			   })
			  }
		   }) 
		}
	}
	class Response{
		constructor(res) {
			this.res = res;
			this.data = {
				statusLine: '',
				headerName: '',
				headerValue: '',
				header: {},
				bodyLength: 0,
				body: ''
			};
		}
		parseData(){
		  let state = this.parseStateLine;
		  let length = this.res.length, i = 0;
		  while(i < length && typeof state === 'function'){
			  const char = this.res[i];
			  state = state.bind(this)
			  state = state(char);
			  i++;
		  }
		}
		parseStateLine(char){
		  if(char === '\r'){
			return this.waitting(this.parseHeaderName);
		  }else {
			this.data.statusLine += char;
			return this.parseStateLine;
		  }
		}
		waitting(fn, c = '\n') {
		  return function(char) {
			 if(char === c)
			   return fn;
		  }
		}
		parseHeaderName(char){
		  if(char === '\n') {
			return this.parseBodyLength; 
		  }else if(char === ':') {
			return this.waitting(this.parseHeaderValue, ' ');
		  }else {
			this.data.headerName += char;
			return this.parseHeaderName;
		  }
		}
		parseHeaderValue(char){
			if(char === '\r') {
			  this.data.header[this.data.headerName] = this.data.headerValue;
			  this.data.headerName = '';
			  this.data.headerValue = '';
			  return this.waitting(this.parseHeaderName);
			} else {
			  this.data.headerValue += char; 
			  return this.parseHeaderValue;
			}
		}
		parseBodyLength(char) {
			if(char === '\r') {
				return this.waitting(this.parseBody);
			  } else {
				// chunk-length是根据utf-8的长度来计算的, 且是16进制 
				char = char.toLocaleLowerCase();
				const val1 = char.charCodeAt() - 'a'.charCodeAt(); 
				const val2 = char.charCodeAt() - '0'.charCodeAt();
				this.data.bodyLength = this.data.bodyLength * 16 + (val1 >= 0 ? val1 + 10 : val2);
				if(!this.data.bodyLength){
					return;
				}
				return this.parseBodyLength;
			  }
		}
		parseBody(char) {
			while(this.data.bodyLength){
				this.data.body += char;
				const bytesLength = this.getBytesLength(char);
				this.data.bodyLength = this.data.bodyLength - bytesLength;
				return this.parseBody;
			}
			this.data.bodyLength = 0;
			return this.waitting(this.parseBodyLength);
		}
		getBytesLength(val) {  
			var str = new String(val);  
			var bytesCount = 0;  
			for (var i = 0 ,n = str.length; i < n; i++) {  
				var c = str.charCodeAt(i);  
				if (c <= 0x007F) {  
					bytesCount += 1;  
				} else if( c <= 0x07FF) {  
					bytesCount += 2;  
				} else if( c <= 0xFFFF) {  
					bytesCount += 3;  
				} else {
					bytesCount += 4;  
			   }  
			}  
			return bytesCount;  
		}
	}
	const req = new Request({
		host: '127.0.0.1',
		port: '8080',
		method: 'POST',
		headers: {
			'X-foo': '12345',
		},
		body: {
			name: 'winter',
			age: 28
		}
	});
	req.send().then(data => {
		const res = new Response(data);
		res.parseData();
		parseHtml(res.data.body)
	});

