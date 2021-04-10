import parseTemplateToTokens from "./parseTemplateToTokens.js"

window.MyMustache = {
  render(templateStr, data) {
    // 将模板字符串转化为tokens
    const tokens = parseTemplateToTokens(templateStr)
    

    console.log("tokens", tokens);
  }
}