var tty = require('tty');
var ttys = require('ttys');
var readline = require('readline');

// var stdin = ttys.stdin;
// var stdout = ttys.stdout;

// stdout.write("hello\n");
// stdout.write("\033[1A");
// stdout.write("winter");

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// });

// async function ask(question){
// 	return new Promise((resolve, reject) => {
// 		rl.question(question, (answer)=> {
// 			resolve(answer)
// 			rl.close();
// 		})
// 	})
// }

// void async function(){
// 	console.log('-------',await ask('your project name:'));
// }();

//rl.question('What do you think?', (answer) => {
//	console.log('------------------------',answer);
//	rl.close();
// })

// console.log('=======hello world========');

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

function getChar(){
	return new Promise(resolve => {
		stdin.on('data', (key) => {
			resolve(key);
		});
	});
}

void async function() {
	while(true) {
		let char = await getChar();
		if(char === '\u0003'){
			process.exit();
			break;
		}
		console.log(char)
		console.log(char.split('').map(c => c.charCodeAt(0)));
	}
}();
