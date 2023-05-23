import { wxmlFileReg, mainCssFileReg } from "../lib/reg";


// 匹配uniapp中的main.wxss文件
export function cssMatcher(filename:string) {
  return mainCssFileReg.test(filename);
}


export function wxmlMatcher(filename: string) {
  return wxmlFileReg.test(filename);
}