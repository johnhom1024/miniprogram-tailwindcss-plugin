import { parse } from 'postcss';

/**
 * @description: 处理css文本，使用postcss转换成ast节点
 * @param {*} rawSource
 * @param {*} options
 * @return {*}
 */
export function styleHander(rawSource = '') {
  const root = parse(rawSource);
  root.walk((node) => {
    const test = node;
    if (node.type === 'rule') {
      // 拿到选择器，然后判断选择器是否匹配某些规则
      const selectors = node.selectors;
    }
    // 这里 处理node中包含tailwindcss的类
  });
}
