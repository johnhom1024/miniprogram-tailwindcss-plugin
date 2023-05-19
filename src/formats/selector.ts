import selectorParser from 'postcss-selector-parser';
import escapeStringRegexp from 'escape-string-regexp';
import { SimpleMappingChars2String } from '../lib/dict';
abstract class SelectorTransformer {
  mappingChars2String: Record<string, string>;
  constructor({
    customMappingChars2String = SimpleMappingChars2String,
  }: {
    customMappingChars2String: Record<string, string>;
  }) {
    this.mappingChars2String = customMappingChars2String;
  }

  /**
   * @description: 将className中匹配chars的值转换成对应的值
   * @param {string} className
   * @return {*}
   */
  transform(className: string) {
    Object.entries(this.mappingChars2String).forEach((item) => {
      const [k, v] = item;

      /**
       * k中特殊的字符需要经过转义，然后再生成正则表达式，例如 k = .时
       * 需要先转换成 \. 然后再给到new RegExp ，最终生成 /\./
       * 这样可以匹配 . 字符 然后替换成 微信小程序中支持的字符
       */
      const regexp = new RegExp(escapeStringRegexp(k));
      className = className.replaceAll(regexp, v);
    });

    return className;
  }
}

export class StyleSelectorTransformer extends SelectorTransformer {
  constructor({
    customMappingChars2String = SimpleMappingChars2String,
  }: {
    customMappingChars2String: Record<string, string>;
  }) {
    super({customMappingChars2String});
  }

  styleHanlder(rawSource: string) {
    selectorParser((root) => {
      root.walkClasses((classNode) => {
        classNode.value = this.transform(classNode.value);
      })
    }).processSync(rawSource);
  }
}
