const vueTemplateClassRegexp =
  /(?:(?:hover-)?class)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gs;

// 匹配 <tag class=""></tag>
// 匹配 <tag :class="[{}]"></tag>
// 匹配 <tag hover-class=""></tag>
// 匹配 <tag :hover-class="[{}]"></tag>

// 然后拿到
const tagWithEitherClassAndHoverClassRegexp =
  /<(?:[a-z][-a-z]*[a-z]*)\s+[^>]*?(?:(?:hover-)?class="(?:[^"]*)")[^>]*?\/?>/g;
