import lookup from "./lookup"

import parseArr from "./parseArr"

/**
 * 将处理好的tokens转化为dom字符串
 */
export default function renderTemplate(tokens, data) {
  var resultStr = ""

  for(let i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if(token[0] === "text") {
      resultStr += token[1]
    } else if(token[0] === "name") {
      // lookup解决对象多层嵌套的取值 
      resultStr += lookup(data, token[1])
    } else if(token[0] === "#") {
      resultStr += parseArr(token, data)
    }
  }

  return resultStr
}