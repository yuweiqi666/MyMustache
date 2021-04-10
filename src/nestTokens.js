/**
 * 折叠tokens  将#和/之间的tokens折叠起来
 * 
 */
export default function nestTokens(tokens) {
  // 结果数组
  var nestTokens = []
  // 栈结构
  var sections = []

  for(let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    switch (token[0]) {
      case "#":
        sections.push(token)
        break;
      case "/":
        let aa = sections.pop()
        break;

      default:
        break;
    }
  }

  return nestTokens
}
