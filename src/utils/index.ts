
// 匹配uniapp中的main.wxss文件
export function cssMatcher(filename:string) {
  const mainCssFileReg = /main\.wxss$/
  return mainCssFileReg.test(filename);
}

