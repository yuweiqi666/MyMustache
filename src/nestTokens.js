/**
 * 折叠tokens  将#和/之间的tokens折叠起来
 * 
 */
export default function nestTokens(tokens) {
  // 结果数组
  var nestTokens = []
  // 收集器数组  天生指向nestTokens结果数组  引用类型值
  var collector = nestTokens
  // 栈结构   先进后出   存放 # token 
  var sections = []

  for(let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    switch (token[0]) {
      case "#":
        // 收集器放入这个token
        collector.push(token)
        // 入栈
        sections.push(token)
        // 收集器换人 给这个token添加下标为2的项 并让收集器指向他
        collector = token[2] = []
        break;
      case "/":
        // 出栈
        sections.pop()
        /**
         * 切换collector的指向（切换循环层级的切换）  如果栈中没有数据了 说明跳出了最外层的循环 
         * collector重新指向nestTokens结果数组
         * 
         */
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens
        break;

      default: 
        /**
         * 当token[0]既不是"#" 又不是"/"  直接推入collector集合  不用管collector指向谁
         * 
         */
        collector.push(token)
        
    }
  }

  return nestTokens
}
