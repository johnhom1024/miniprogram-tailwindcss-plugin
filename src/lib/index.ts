import { parse } from 'postcss';
import { transformSelector } from '../utils';

/**
 * @description: 处理css文本，使用postcss转换成ast节点
 * @param {*} rawSource
 * @param {*} options
 * @return {*}
 */
export function styleHander(rawSource = '', options: {}) {
  const root = parse(rawSource);
  root.walk((node) => {
    const test = node;
    if (node.type === 'rule') {
      // 拿到选择器，然后判断选择器是否匹配某些规则
      const selectors = node.selectors;
    }
    // 在这处理node中小程序不支持的tailwindcss的符号
  });
}

// export function selectorHandler(selector: string) {
//   transformSelector(selector, );
// }
