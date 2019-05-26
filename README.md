tiny-compiler
===

尝试编写一个简单的编译器，感谢[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)。

这个编译器的功能是：将dart函数命名参数调用形式
```dart
sayHello(name: "shymean", msg: 'hello');
```
转换为javascript函数参数调用
```js
sayHello({name: 'shymean', msg: 'hello'})
```

看起来只要加一对大括号就行了吗？不，我们将学习编译原理，并了解编译器的基本工作流程。

## 词法分析
首先分析输入源代码
```dart
let input = `sayHello(userName:getUsername("shymean"), msg:"hello");`;
```
将其拆分成一系列token
```js
[ { type: 'name', value: 'sayHello' },
  { type: 'paren', value: '(' },
  { type: 'name', value: 'userName' },
  { type: 'colon', value: ':' },
  { type: 'name', value: 'getUsername' },
  { type: 'paren', value: '(' },
  { type: 'string', value: 'shymean' },
  { type: 'paren', value: ')' },
  { type: 'comma', value: ',' },
  { type: 'name', value: 'msg' },
  { type: 'colon', value: ':' },
  { type: 'string', value: 'hello' },
  { type: 'paren', value: ')' } 
```

## 语法分析
根据词法分析获取的token，然后将其转换成AST
```js
{
    type: "Program",
    body: [
        {
            type: "CallExpression",
            name: "sayHello",
            params: [
                {
                    type: "NameParam",
                    name: "userName",
                    value: {
                        type: "CallExpression",
                        name: "getUsername",
                        params: [{ type: "StringLiteral", value: "shymean" }]
                    }
                },
                {
                    type: "NameParam",
                    name: "msg",
                    value: { type: "StringLiteral", value: "hello" }
                }
            ]
        }
    ]
}
```

## 代码生成
最后根据AST，输出JavaScript代码
```js
sayHello({userName:getUsername("shymean"), msg:"hello"})
```

如果从源代码获取的AST直接转换成JS代码比较麻烦，还可以进行中间步骤，即遍历旧的AST，然后输出更符合JavaScript语义的新AST，然后根据新的AST，输出JS代码