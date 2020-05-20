const css = require('css');
const rules = [];
function match(element, selector) {
    if(!element || !element.attributes){
        return false;
    }
    if(selector.startsWith('#')){
        return element.attributes.id === selector.replace('#', '');
    } else if(selector.startsWith('.')){
        return element.attributes.class === selector.replace('.', '');
    } else {
        return element.tagName === selector;
    }
   return false;
}
function specificity(selector){
    const p = [0, 0, 0, 0];
    const selectorParts = selector.split(' ');
    for(let part of selectorParts) {
        if(part.startsWith('#')) {
            p[1]++;
        } else if(part.startsWith('.')) {
            p[2]++;
        } else {
            p[3]++;
        }
    }
    return p;
}
function compare(p1, p2) {
    if(p1[0] - p2[0]) {
        return p1[0] - p2[0];
    } else if(p1[1] - p2[1]) {
        return p1[1] - p2[1];
    } else if(p1[2] - p2[2]) {
        return p1[2] - p2[2];
    } else {
        return p1[3] - p2[3];
    }
}
function addCSSRules(text){
    const ast = css.parse(text);
    console.log(JSON.stringify(ast, null, '  '))
    rules.push(...ast.stylesheet.rules);
    
}
function computeRules(stack, element){
    const elements = stack.slice().reverse();
    for(let rule of rules){
        let selectorParts = rule.selectors[0].split(' ').reverse();
        if(!match(element, selectorParts[0])) {
            continue;
        }
        let matched = false;
        let j = 1;
        for(let i = 0; i < elements.length; i++ ){
            if(!selectorParts[j]){
                break;
            }
            if(match(elements[i], selectorParts[j])){
                j++;
            }
        }
        if(j >= selectorParts.length){
            matched = true;
        }
        if(!element.computedStyle) {
            element.computedStyle = {};
        }
        if(matched) {
            const sp = specificity(rule.selectors[0]);
            rule.declarations.forEach(item => {
                if(!element.computedStyle[item.property]) {
                    element.computedStyle[item.property] = {
                        value: item.value,
                        specificity: sp
                    }
                } else {
                    if (compare(element.computedStyle[item.property].specificity, sp) < 0) {
                        element.computedStyle[item.property] = {
                            value: item.value,
                            specificity: sp
                        }
                    }
                }
            })
        }

    }
}


module.exports.addCSSRules = addCSSRules;
module.exports.computeRules = computeRules;