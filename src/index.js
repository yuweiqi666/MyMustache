import Scanner from "./Scanner.js"

window.MyMustache = {
  render(templateStr, data) {


    // 实例化扫描器  为模板字符串工作的
    var scanner = new Scanner(templateStr)

    scanner.scanUtil("{{")
    // console.log(templateStr);
    var result = scanner.scanUtil("{{")
    console.log(result);
  }
}