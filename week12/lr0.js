function parse(source = ""){
	let stack = [];
	for(let c of source) {
		if(c === '{' || c === '[' || c === '('){
			stack.push(c);
		} else if(c === '}' ){
			let last = stack.pop();
			if(last !== '{'){
				return false;
			}
		}  else if(c === ']' ){
			let last = stack.pop();
			if(last !== '['){
				return false;
			}
		}  else if(c === ')' ){
			let last = stack.pop();
			if(last !== '('){
				return false;
			}
		}
	}
	return !stack.length;
}
parse("()");
parse("(");
parse("([)");
parse("([abd])");
parse("k{abd([abd]dda)}");