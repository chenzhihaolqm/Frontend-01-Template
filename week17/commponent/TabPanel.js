import { createElement, Text, Wrapper} from './createElement'
class TabPanel{
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
    select(i) {
        for(let view of this.childViews){
            view.style.display = 'none';
        }
        this.childViews[i].style.display = 'block'
    }
    render(){
        this.childViews = this.children.map(child => {
            return <div style="width:300px;min-height:300px;">{child}</div>
        })
        this.titleViews = this.children.map((child,i) => {
            return <span onClick={() => this.select(i)}>{child.getAttribute('title')}</span>
        })
        this.select(0);
        return <div class="panel" style="border:1px solid lightgreen;width:300px;">
            <h1 style="background-color:lightgreen;width:300px;margin:0" >{this.titleViews}</h1>
            {this.childViews}
        </div>
    }
	mountTo(parent){
		this.render().mountTo(parent);
	}
}

let component = <TabPanel >
	<span title="title1">This is Content1</span>
	<span title="title2">This is Content2</span>
	<span title="title3">This is Content3</span>
</TabPanel>

component.mountTo(document.body);