import lookup from "./lookup"
import renderTemplate from "./renderTemplate"
/**
 * 处理数组， 结合renderTemplate实现递归
 */

export default function parseArr(token, data) {
  console.log(token[1]);

  console.log(data);
  // v是循环的小token的第三个元素对应的data值  是一个数组
  var v = lookup(data, token[1])
  
  console.log("v", v);

  // 结果字符串
  var resultStr = ""

  // 递归次数取决于v  遍历数据  数据有几条就要遍历几次
  v.forEach((item, index) => {
    // 将本身存储在点属性中  为了一般的循环
    resultStr += renderTemplate(token[2], {
      ...v[index],
      //补一个点属性  为了一般的循环
      ".": v[index]
    })
  })

  return resultStr

}