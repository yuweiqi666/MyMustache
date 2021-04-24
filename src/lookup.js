/**
 * 用于在dataObj中寻找连续点符号的keyName属性
 * 比如 obj: { a: { b: { c: 100 } }}
 * 
 * lookup(obj, "a.b.c") 返回100
 */
export default function lookup(dataObj, keyName) {
  // keyName中包含点  同时不能为点
  if(keyName.indexOf(".") !== -1 && keyName !== ".") {
    var keyArr = keyName.split(".")

    keyArr.forEach(item => {
      dataObj = dataObj[item]
    })

    return dataObj
  }

  return dataObj[keyName]
  
}