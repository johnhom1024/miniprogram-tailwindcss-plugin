import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

/**
 * @description: 传入css的字符串或数组，返回经过tailwindcss处理后的css字符串
 * @param {string} input
 * @return {*}
 */
export async function getTwCss(input: string | string[]) {
  const css = '@tailwind utilities;';

  if (typeof input === 'string') {
    input = [input];
  }

  const processor = postcss([
    tailwindcss({
      content: input.map((x) => {
        return {
          raw: x,
        };
      }),
    }),
  ]);
  console.log('----------johnhomLogDebug input: ', input);
  const result = await processor.process(css, { from: undefined });

  return result;
}
