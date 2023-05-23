import selectorParser from 'postcss-selector-parser';
import type { ClassName, Root } from 'postcss-selector-parser';
import escapeStringRegexp from 'escape-string-regexp';
import { parse as styleParser } from 'postcss';
import type { Rule } from 'postcss';

import generate from '@babel/generator';
import { parseExpression } from '@babel/parser';
import traverse from '@babel/traverse';

import { SimpleMappingChars2String } from '../lib/dict';
import {
  tagWithEitherClassAndHoverClassRegexp,
  vueTemplateClassRegexp,
  variableRegExp,
} from '../lib/reg';

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
      const regexp = new RegExp(escapeStringRegexp(k), 'g');
      if (regexp.test(className)) {
        className = className.replaceAll(regexp, v);
      }
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
    super({ customMappingChars2String });
  }

  selectorHandler(selector: string) {
    const result = selectorParser((selector: Root) => {
      selector.walkClasses((classNode: ClassName) => {
        if (classNode.type === 'class') {
          classNode.value = this.transform(classNode.value);
        }

        // 如果最后长度为0，则直接删掉该类
        if (classNode.value.length === 0) {
          classNode.remove();
        }
      });
    }).processSync(selector);

    return result;
  }

  styleHandler(rawSource: string): string {
    const root = styleParser(rawSource);
    root.walkRules((rule: Rule) => {
      rule.selector = this.selectorHandler(rule.selector);
    });

    return root.toString();
  }

  /**
   * @description: 处理html代码中的class
   * @param {string} rawSource
   * @return {*}
   */
  templateHandler(rawSource: string): string {
    // 这里匹配开头的标签，例如：<view class="content">
    return rawSource.replace(tagWithEitherClassAndHoverClassRegexp, (m0) => {
      return m0.replace(vueTemplateClassRegexp, (match, className) => {
        // match 匹配的结构为 class="font-bold"
        // className的结构为 font-bold flex-[0_0_300rpx] 等
        return match.replace(className, this.templateReplacer(className));
      });
    });
  }

  templateReplacer(className: string): string {
    function variableMatch(original: string) {
      return variableRegExp.exec(original);
    }
    // 检查class属性是否传入了变量
    let match = variableMatch(className);
    const sources = [];

    while (match !== null) {
      sources.push({
        start: match.index,
        end: variableRegExp.lastIndex,
        raw: match[1],
      });

      match = variableMatch(className);
    }

    if (sources.length) {
      const resultArray: string[] = [];

      let p = 0;
      for (let i = 0; i < sources.length; i++) {
        const m = sources[i];
        resultArray.push(this.transform(className.slice(p, m.start)));

        p = m.start;

        // 匹配后值
        if (m.raw.trim().length) {
          const code = this.generateCode(m.raw);
          m.raw = `{{${code}}}`;
        } else {
          m.raw = '';
        }

        resultArray.push(m.raw);

        p = m.end;
      }

      return resultArray.filter((x) => x).join('');
    } else {
      return this.transform(className);
    }
  }

  private generateCode(code: string) {
    const ast = parseExpression(code);

    traverse(ast, {
      StringLiteral: (path) => {
        path.node.value = this.transform(path.node.value);
      },
      noScope: true,
    });

    const { code: newCode } = generate(ast, {
      compact: true,
      minified: true,
      jsescOption: {
        quotes: 'single',
      },
    });

    return newCode;
  }
}
