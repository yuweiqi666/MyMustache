/**
 * 扫描器类Scanner
 */
export default class Scanner {
  constructor(templateStr) {
    // 模板字符串
    this.templateStr = templateStr
    //指针
    this.pos = 0
    // 尾巴
    this.tail = templateStr
  }

  // 走过指定的内容
  scan(tag) {
    if(this.tail.indexOf(tag) === 0) {
      // tag有多长 就让指针后移几位
      this.pos += tag.length
      this.tail = this.templateStr.substr(this.pos)
    }
  }
  
  // 指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
  scanUtil(stopTag) {
    // 记录执行本方法时pos的值
    const pos_backup = this.pos
    // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
    while(!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++
      // 改变尾巴 从当 前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substr(this.pos)
    }

    return this.templateStr.substring(pos_backup, this.pos)
    
  } 

  // 判断指针是否到头 end of string
  eos() {
    return this.pos >= this.templateStr.length
  }
}


