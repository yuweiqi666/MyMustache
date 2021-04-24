## 手写mustache库

> 1. 采用es6 class类的写法（官方原版是es5构造函数的写法）

### 源码思路

1. 全局window变量定义Mustache对象， 对象中定义render方法， 传入参数templateStr和data
2. render函数中定义parseTemplateTokens方法，用于将templateStr模板字符串转化为tokens
3. 在parseTemplateToken方法中定义nestTokens方法用于将tokens的嵌套结构折叠
4. 将嵌套好的nestTokens和data数据形成dom字符串



### Scanner类

> 转化templateStr为teokens

* scanner类中的属性

  * templateStr模板字符串
    * 将templateStr作为参数传入并保存
  * pos指针
    * 初始值为0
  * tail尾部
    * 初始值为templateStr

* scanner类中的方法

  * scanUtil

    * 扫描直到指定的内容停止， 返回之前扫描的内容

      > 1. 先保存pos指针的初始位置
      > 2. 再循环 每次循环前先判断指针是否在模板字符串的末尾，同时判断tail的第一位是否为指定内容
      > 3. 退出循环返回扫描过的内容  通过substring

  * scan

    * 跳过指定的内容

  * eos

    * 判断指针是否位于模板字符串最后一位

      

### nestTokens

> nestTokens方法是对循环结构token嵌套的处理
>
> **核心思路： 栈结构 + 收集器**

* nestTokens中定义的变量
  * nestTokens循环结构嵌套后的tokens
  * collector 收集器数组   天生指向nestTokens   函数执行过程中不断改变指向形成嵌套
  * sections 栈结构   先进后出



* 执行步骤
  1. 遍历原始tokens
  2. 判断每一个token的第一个元素
     1. 如果第一个元素为“#”
        1. 先collector.push()  加入收集器
        2. 再 sections.push()  入栈  （后面决定了collector的指向）
        3. 最后token的第三个元素定义一个空数组  同时改变collector的指向为这个空数组
     2. 如果第一个元素为“/”（改变collector指向）
        1. sections.pop()   出栈
        2. 判断sections中是否还有元素  如果栈中还有元素  将collector指向栈中的最后一个元素的索引为2的空数组、如果栈中没有元素了，将collector指向nestTokens
     3. 如果第一个元素为text 或者name时
        1. collector.push()  不用再考虑collector的指向



### lookup函数

> 用于在对象中寻找连续点符号的keyName属性

````javascript
/**
 * 用于在dataObj中寻找连续点符号的keyName属性
 * 比如 obj: { a: { b: { c: 100 } }}
 * 
 * lookup(obj, "a.b.c") 返回100
 */
export default function lookup(dataObj, keyName) {
  // 字符串按"."隔开 然后转化为数组 
  var keyArr = keyName.split(".")

  keyArr.forEach(item => {
    console.log(item);
    dataObj = dataObj[item]
  })

  return dataObj
}
````

