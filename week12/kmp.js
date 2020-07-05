function find(source = '', pattern = ''){
	for(let i = 0, sLen = source.length; i < sLen; i++){
		let match = true;
		for(let j = 0, pLen = pattern.length; j < pLen; j++){
			if(source[i + j] !== pattern[j]){
				match = false;
				break;
			}
		}
        if(match){
			return true;
		}
	}
	return false;
}


function quickFind(source = '', pattern = ''){
	let table = new Array(pattern.length).fill(0);
	let k = 0;
	for(let j = 1, pLen = pattern.length; j < pLen; j++){
		if(pattern[j] === pattern[k]){
			k++
		}else{
			k = 0;
		}
		table[j] = k;
	}
	let j = 0;
	for(let i = 0, sLen = source.length; i < sLen; i++){
		console.log(source[i],pattern[j], i, j);
		if(source[i] === pattern[j]){
			j++
		}else{
			if(j){
				i --;
				j = table[j-1];
			}
		}
		if(j === pattern.length){
			return true;
		}
	}
	return false;
}
quickFind("abcabcabx", "abcabx"); // true
quickFind("abcabcabcabcabcd", "abcabcabcd");