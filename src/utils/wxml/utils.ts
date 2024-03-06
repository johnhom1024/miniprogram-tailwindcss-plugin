import { variableRegExp } from '@/lib/reg';
import { Parser } from 'htmlparser2';

/**
 * @description: 从一个变量中剥离表达式
 * @param {string} original
 * @param {*} reg
 * @return {*}
 */
export function stripExpression(original: string) {
  function variableMatch(original: string) {
    return variableRegExp.exec(original);
  }

  let match = variableMatch(original);

  const sources = [];

  while (match !== null) {
    // 这里拿到sources是一组数组，一个元素代表了被{{}}包裹的js代码
    sources.push({
      start: match.index,
      end: variableRegExp.lastIndex,
      raw: match[1],
    });
    match = variableMatch(original);
  }

  return sources;
}

function wxmlHandler(rawSource: string) {
  const parser = new Parser({
    onattribute(name, value) {
      console.log('----------johnhomLogDebug name', name);
      console.log('----------johnhomLogDebug value', value);
    },
  });

  parser.write(rawSource);
  parser.end();

  return;
}

export function createWxmlHandler() {
  return (rawSource: string) => {
    return wxmlHandler(rawSource);
  };
}
