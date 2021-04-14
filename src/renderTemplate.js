/**
 * 将处理好的tokens转化为dom字符串
 */

export default function renderTemplate(tokens, data) {
  var result = ""

  for(let i = 0; i < tokens.length; i++) {
    if(tokens[i][0] === "text") {

    }else if(tokens[i][0] === "name") {
      tokens[i][1] = data[tokens[i][1]]
      // console.log(tokens[i][1]);
    }
  }

  return result
}