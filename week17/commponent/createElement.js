export function createElement(Cls, attributes, ...children){
	console.log('Cls', Cls);
	let o = {};
	if(typeof Cls === 'string'){
		o = new Wrapper(Cls);
	}else {
		o = new Cls();
	}
	for(let key in attributes){
		o.setAttribute(key, attributes[key]);
		let reg = /^on([\s\S]+)$/.exec(key);
		if(reg && reg[1]){
			debugger;
			o.addEventListener(reg[1].toLocaleLowerCase(), attributes[key]);
		}
    }
    let visit = (children) => {
        for(let child of children){
            if(typeof child === 'object' && child instanceof Array){
                visit(child);
                continue;
            }
            if(typeof child === "string")
                child = new Text(child);
            o.appendChild(child);
        }
    }
    visit(children);
	return o;
	
}
export class Text{
	constructor(text){
		this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
	}
}
export class Wrapper{
	constructor(type){
		this.children = [];
		this.root = document.createElement(type);
	}
	set class(v){
	}
	setAttribute(name, value){
		this.root.setAttribute(name,value);
	}
	getAttribute(name, value){
		return this.root.getAttribute(name);
	}
	get style(){
		return this.root.style;
	}
	appendChild(child){
		this.children.push(child);
	}
	addEventListener(event, callback){
		this.root.addEventListener(event, callback)
	}
	mountTo(parent){
        parent.appendChild(this.root);
        for(let child of this.children){
            child.mountTo(this.root)
        }
	}
}