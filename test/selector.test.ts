import { describe, expect, it } from 'vitest';
import { WechatSelectorTransformer } from '@/formats/selector';
import { SimpleMappingChars2String } from '@/lib/dict';

describe('测试selector转换', () => {
  const selectorTransformer = new WechatSelectorTransformer({
    customMappingChars2String: SimpleMappingChars2String,
  });

  it('测试wxml转换"["或者"]"', () => {
    const wxmlString = `<div class="w-[20rpx]"></div>`;

    expect(selectorTransformer.wxmlHandler(wxmlString)).toBe(
      '<div class="w-_20rpx_"></div>'
    );
  });

  it('测试wxml转换/', () => {
    const wxmlString = `<view class="w-2/3"></view>`;

    expect(selectorTransformer.wxmlHandler(wxmlString)).toBe(
      '<view class="w-2s3"></view>'
    );
  });

  it('测试wxss转换 .hover\\:via-blue-50:hover', () => {
    // \ 这个字符串会被selectorParser吞掉，所以无需转换
    const wxssString = `.hover\\:via-blue-50:hover {
      background-color: blue;
    }`;

    expect(selectorTransformer.styleHandler(wxssString))
      .toBe(`.hovercvia-blue-50:hover {
      background-color: blue;
    }`);
  });

  it('测试wxml中的class变量转换', () => {
    // 这里是wxml的语法，class变量的语法是{{}}，所以需要转换
    const wxmlString = `<div class="{{show ? 'w-[20rpx]' : 'w-2/3'}}">Hello, world!</div>`;

    expect(selectorTransformer.wxmlHandler(wxmlString)).toBe(`<div class="{{show ? 'w-_20rpx_' : 'w-2s3'}}">Hello, world!</div>`);
  });
});
