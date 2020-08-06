let css = require('css');
module.exports = function(source, map) {
    let stylesheet = css.parse(source);
    console.log(stylesheet);
    let name = this.resourcePath.match(/([^\\]+).css$/)[1]
    for(let rule of stylesheet.stylesheet.rules){
        console.log(rule);
        rule.selectors = rule.selectors.map(selector => {
            return selector.match(new RegExp('^.' +name)) ? selector : `.${name} ${selector}`
        })
    }
    return `
       let style = document.createElement('style');
       style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}
       document.documentElement.appendChild(style);
    `;
}