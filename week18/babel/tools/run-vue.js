const compiler = require('@vue/compiler-sfc');
let output = compiler.compileTemplate({
    filenme: "example.vue",
    source: "<div>hello world!</div>"
})
console.log(output);