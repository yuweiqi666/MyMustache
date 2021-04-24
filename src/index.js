import parseTemplateToTokens from "./parseTemplateToTokens.js"

import renderTemplate from "./renderTemplate.js";

window.MyMustache = {
  render(templateStr, data) {
    // 将模板字符串转化为tokens
    const tokens = parseTemplateToTokens(templateStr)
    
    // 调用renderTemplate函数，让tokens数组变为dom字符串
    const domStr = renderTemplate(tokens, data)


    console.log("domStr", domStr);

    return domStr

  }
}