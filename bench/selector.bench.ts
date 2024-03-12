import { bench, describe } from 'vitest';
import { WechatSelectorTransformer } from '@/formats/selector';
import { SimpleMappingChars2String } from '@/lib/dict';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// 有点尴尬，使用htmlparser2 对wxml的解析速度没有正则快
describe('wxmlHandler的性能测试', () => {
  const selectorTransformer = new WechatSelectorTransformer({
    customMappingChars2String: SimpleMappingChars2String,
  });

  const wxmlString = readFileSync(resolve(__dirname, 'test.wxml'), {
    encoding: 'utf-8',
  });

  bench(
    'new wxmlHandler',
    () => {
      selectorTransformer.wxmlHandler(wxmlString);
    },
    { time: 1000 }
  );

  bench(
    'old wxmlHandler',
    () => {
      selectorTransformer.wxmlHandlerOld(wxmlString);
    },
    { time: 1000 }
  );
});
