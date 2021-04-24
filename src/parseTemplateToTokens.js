import Scanner from "./Scanner.js"

import nestTokens from "./nestTokens.js"

/**
 * parseTemplateToTokens函数用于折叠tokens（嵌套结构）
 * 
 * @param {*} templateStr 模板字符串 
 * @returns   折叠好的模板字符串 
 */

export default function parseTemplateToTokens(templateStr) {
  // 实例化扫描器  为模板字符串工作的
  var scanner = new Scanner(templateStr)

  var tokens = []

  var result 

  while(!scanner.eos()) {
    result = scanner.scanUtil("{{")
  
    /**
     * 判一层空主要是因为 当tokens以text数组结尾时 使用scanner.scanUtil("}}") 时
     * 内部执行字符串的substring方法传的两个参数相同
     * （pos_backup === pos 因为已经eos 不会执行循环 pos++了）  返回空字符串      例如："abc".substring(1, 1) 返回 ""
     */
    if(result.length) {
      tokens.push(["text", result])
      
    }
    
    scanner.scan("{{")

    result = scanner.scanUtil("}}")
    // console.log(result);

    if(result.length) {
      if(result[0] === "#") {
        tokens.push(["#", result.substr(1)])
      } else if(result[0] === "/") {
        tokens.push(["/", result.substr(1)])
      } else {
        tokens.push(["name", result])
      }
      
    }
    
    scanner.scan("}}")
  }

  // 折叠tokens
  return nestTokens(tokens)
}
