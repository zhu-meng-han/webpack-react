module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  "printWidth": 100,

  // 一个tab代表几个空格数，默认为80
  "tabWidth": 2,

  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  "useTabs": false,

  // 行位是否使用分号，默认为true
  "semi": true,

  // 字符串是否使用单引号，默认为false，使用双引号
  "singleQuote": true,

  // 是否使用尾逗号，有三个可选值 <none|es5|all>
  // none 无尾逗号；
  // es5 添加es5中被支持的尾逗号
  // all 所有可能的地方都被添加尾逗号
  "trailingComma": "none",

  // 对象大括号直接是否有空格，默认为true
  // true: { foo: bar }
  // false: {foo: bar}
  "bracketSpacing": true,

  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  "jsxBracketSameLine": false,

  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略,例如 x => x
  // always 总是有括号,例如 (x) => x
  "arrowParens": "avoid",


  // 代码的解析引擎，默认为babylon，与babel相同。
  "parser": "babylon",
}
