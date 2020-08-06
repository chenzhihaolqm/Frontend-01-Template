import { createElement, Text, Wrapper} from './createElement'
import css from './carousel.css'
class ListView{
	constructor(config){
		this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
	}
	setAttribute(name, value){
		this[name] = value;
    }
    getAttribute(name, value){
		return this[name];
	}
	appendChild(child){
		this.children.push(child);
    }
    render(){
        let data = this.getAttribute('data');
        return <div class="carousel">
            {data.map(this.children[0])}
        </div>
    }
	mountTo(parent){
		this.render().mountTo(parent);
	}
}
let data = [
    {text: "一", src: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
    {text: "二", src: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
    {text: "三", src: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
    {text: "四", src: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}
];
let component = <ListView data= {data}>
    {
        record => <figure>
            <img src={record.src} />
            <figcaption>{record.text}</figcaption>
        </figure>
    }
</ListView>

component.mountTo(document.body);