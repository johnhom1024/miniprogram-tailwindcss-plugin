export const vueTemplateClassRegexp =
  /(?:(?:hover-)?class)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gs;

// 匹配 <tag class=""></tag>
// 匹配 <tag :class="[{}]"></tag>
// 匹配 <tag hover-class=""></tag>
// 匹配 <tag :hover-class="[{}]"></tag>

export const tagWithEitherClassAndHoverClassRegexp =
  /<(?:[a-z][-a-z]*[a-z]*)\s+[^>]*?(?:(?:hover-)?class="(?:[^"]*)")[^>]*?\/?>/g;

  // 匹配变量的正则
export const variableRegExp = /{{(.*?)}}/gs;

export function variableMatch(original: string) {
  return variableRegExp.exec(original);
}

// 匹配 main.wxss 文件
export const mainCssFileReg = /main\.wxss$/;

// 匹配 .wxml 文件
export const wxmlFileReg = /.+\.wxml$/;