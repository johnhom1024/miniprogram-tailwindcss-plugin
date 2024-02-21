import { expect, test } from 'vitest';
import { WechatSelectorTransformer } from '../src/formats/selector';
import { SimpleMappingChars2String } from '../src/lib/dict';

const selectorTransformer = new WechatSelectorTransformer({
  customMappingChars2String: SimpleMappingChars2String,
});

test('测试wxml转换"["或者"]"', () => {

  const wxmlString = `<div class="w-[20rpx]"></div>`;

  expect(selectorTransformer.wxmlHandler(wxmlString)).toBe('<div class="w-_20rpx_"></div>')
});

test('测试wxml转换/', () => {
  const wxmlString = `<view class="w-2/3"></view>`;

  expect(selectorTransformer.wxmlHandler(wxmlString)).toBe('<view class="w-2s3"></view>') 
});


test('测试wxss转换 .hover\\:via-blue-50:hover', () => {
  // \ 这个字符串会被selectorParser吞掉，所以无需转换
  const wxssString = `.hover\\:via-blue-50:hover {
    background-color: blue;
  }`;
  console.log(wxssString);
  expect(selectorTransformer.styleHandler(wxssString)).toBe(`.hovercvia-blue-50:hover {
    background-color: blue;
  }`);
})
