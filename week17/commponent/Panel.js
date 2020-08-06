import { createElement, Text, Wrapper} from './createElement'
class Panel{
	constructor(config){
		this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
	}
	setAttribute(name, value){
		this[name] = value;
	}
	appendChild(child){
		this.children.push(child);
    }
    render(){
        return <div class="panel" style="border:1px solid lightgreen;width:300px;">
            <h1 style="background-color:lightgreen;width:300px;margin:0" >{this.title}</h1>
            {this.children}
        </div>
    }
	mountTo(parent){
		this.render().mountTo(parent);
	}
}

let component = <Panel title="hello" >
	<div>1</div>
	<div>2</div>
	<div>3</div>
</Panel>

component.mountTo(document.body);