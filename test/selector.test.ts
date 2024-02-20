import { expect, test } from 'vitest';
import { WechatSelectorTransformer } from '../src/formats/selector';
import { SimpleMappingChars2String } from '../src/lib/dict';

test('测试wxml转换"["或者"]"', () => {
  const selectorTransformer = new WechatSelectorTransformer({
    customMappingChars2String: SimpleMappingChars2String,
  });

  const wxmlString = `<div class="w-[20rpx]"></div>`;

  expect(selectorTransformer.wxmlHandler(wxmlString)).toBe('<div class="w-_20rpx_"></div>')
});
