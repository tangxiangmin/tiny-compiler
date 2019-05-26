// function sayHello({name, msg}){
//     console.log(`${name} -> ${msg}`)
// }
// sayHello({name: 'shymean', msg: 'hello'})
let { tokenizer, parser, compiler } = require("./tiny-compiler");

let input = `sayHello(userName:getUsername("shymean"), msg:"hello");`;

// let input = `sayHello(userName:"shymean", msg:"hello");`;

// let tokens = tokenizer(input);
// console.log(tokens);
// let ast = parser(tokens);
// console.log(JSON.stringify(ast));

let code = compiler(input)
console.log(code)
