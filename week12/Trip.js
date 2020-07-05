class Trip{
   constructor(){
    this.root = Object.create(null);
  }
  insert(word){
	 let node = this.root;
	 for(let key of word){
		if(!(key in node)){
			node[key] = Object.create(null);
		}
		node = node[key];
	 }
	 if(!('$' in node)){
		 node.$ = 0;
	 }
	 node.$++;
  }
  most(){
	let most = 0;
	let mostWord = "";
	let select = function(node, word){
		for(let key in node){
			let nextNode = node[key];
			let nextWord = word + key;
			if(nextNode.$ && nextNode.$ > most){
				mostWord = nextWord;
				most = nextNode.$;
		    }
			select(nextNode, nextWord);
		}
	}
	select(this.root, "");
	return {
		most,
		mostWord
	}
  }
}

let trip = new Trip();
for(let i = 0 ; i < 10000; i++){
   let randomNum = Math.ceil( Math.random() * 20);
   let str = "";
   for(let j = 0; j < randomNum; j++){
      str += String.fromCharCode( Math.random() * 26 + "a".charCodeAt(0));
   }
   trip.insert(str);
}
trip.most();

