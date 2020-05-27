const { addCSSRules, computeRules } = require('./cssHelper');
const EOF = Symbol('EOF');
const layout = require('./layout.js');
let currentToken = null;
let currentAttributeName = '';
let currentTextNode = null;
const stack = [{ type: 'document', children: []}]

function emit(token) {
    let top = stack[stack.length -1];
    if(token.type === 'startTag') {
        let element = {
            type: 'element',
            tagName: token.tagName,
            children: [],
            attributes: {}
        }
        for(let key in token){
            if(key !== 'type' && key !== 'tagName' && key !== 'isSelefClosing') {
                element.attributes[key] = token[key];
             }
        }
        computeRules(stack,element);
        if(!token.isSelefClosing) {
            stack.push(element);
        }
        top.children.push(element);
        currentTextNode = null;
    } else if (token.type === 'endTag') {
        stack.pop();
        if(top.tagName === 'style'){
            addCSSRules(top.children[0].content);
        }
        layout(top);
        currentTextNode = null;
    } else {
        if(!currentTextNode){
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content;
    }
}
function data(c){
  if(c === '<'){
      return tagOpen;
  } else if(c === EOF){
    emit({
        type: 'EOF'
    })
      return;
  } else {   
    emit({
        type: 'text',
        content: c
    })
    return data;
  }
}
function tagOpen(c) {
  if(c === '/') {
      return endTagOpen;
  } else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
      return tagName(c)
  } else{
      return '';
  }
}
function endTagOpen(c){
  if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
        type: 'endTag',
        tagName: ''
    }
    return tagName(c);
  }else if(c === '>'){
     return data;
  }
}
function tagName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName;
  } else if(c.match(/^[a-zA-Z1-9]$/)) {
    currentToken.tagName += c.toLowerCase();
    return tagName;
  } else if(c === '>'){
    emit(currentToken);
    return data;
  } else if(c === '/'){
    return selfClosingStartTag; 
  } 
}
function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName;
    } else if(c.match(/^[/>]$/) || c===EOF){
      return afterAttributeName(c); 
    } else if(c === '='){
        console.log('beforeAttributeName error =')
        return ''; 
    }else {
        currentAttributeName = '';
        return attributeName(c);
    }
}
function afterAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if(c === '/'){
        return selfClosingStartTag; 
    } else if(c === '='){
        return beforeAttributeValue; 
    } else if(c === '>'){
        emit(currentToken);
        return data; 
    } else{
       currentAttributeName = '';
       return attributeName(c) 
    }
}
function attributeName(c){
    if(c.match(/^[\t\n\f />]$/) || c===EOF) {
        return afterAttributeName;
    } else if(c === '='){
     return beforeAttributeValue; 
    } else if(c.match(/^["'<]$/)){
     console.log('beforeAttributeName error ' +c)  
     return ''; 
    } else{
     currentAttributeName += c;
     return attributeName;
   }
}
function beforeAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeValue;
    } else if (c === '\"'){
        return doubleQuotedAttributeValue;
    } else if (c === '\''){
        return singleQuotedAttributeValue;
    } else {
        return noQuotedAttributeValue(c);
    }
}
function setAttributeValue(c) {
    if(currentToken[currentAttributeName]) {
        currentToken[currentAttributeName] += c;
    } else {
        currentToken[currentAttributeName] = c;
    }
}
function singleQuotedAttributeValue(c) {
    if (c === '\"'){
        return afterAttributeValueWithQuoted;
    } else {
        setAttributeValue(c);
        return singleQuotedAttributeValue;
    }
}
function doubleQuotedAttributeValue(c) {
    if (c === '\"'){
        return afterAttributeValueWithQuoted;
    } else {
        setAttributeValue(c);
        return doubleQuotedAttributeValue;
    }
}
function noQuotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c === '>'){
        return data; 
    } else {
        setAttributeValue(c);
        return noQuotedAttributeValue;
    }
}
function afterAttributeValueWithQuoted(c){
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c === '/'){
        return selfClosingStartTag; 
    } else if(c === '>'){
        return data; 
    } else{
       return ''
    }
}
function selfClosingStartTag(c) {
    if(c === '>'){
        currentToken.isSelefClosing = true;
        emit(currentToken);
        return data; 
    } else if(c === EOF){
        return;
    } 
}
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve(); 
        }, time)
    });
}

module.exports.parseHtml = async function(html){
   let state = data;
   for(let i = 0; i < html.length; i++) {
      await sleep(20);
      // console.log('--------------------',i, html[i])
      state = state(html[i]); 
   }
   console.log(JSON.stringify(stack[0], null , 4));
   state = state(EOF);
}