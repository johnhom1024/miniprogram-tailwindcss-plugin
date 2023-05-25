import { Compilation, Compiler, WebpackPluginInstance } from 'webpack';
import { PluginOptions } from './types';
import { Source } from 'webpack-sources';
import { WechatSelectorTransformer } from './formats/selector';
import { SimpleMappingChars2String } from './lib/dict';

export class UniappTailwindcssWebpackPlugin implements WebpackPluginInstance {
  options = {};
  selectorTransformer;
  constructor(options = {} as PluginOptions) {
    this.options = options;
    const { customMappingChars2String = SimpleMappingChars2String } = options;
    this.selectorTransformer = new WechatSelectorTransformer({
      customMappingChars2String,
    });
  }

  apply(compiler: Compiler) {
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;

    const pluginName = UniappTailwindcssWebpackPlugin.name;
    compiler.hooks.compilation.tap(pluginName, (compilation: Compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const entries = Object.entries(assets);

          for (const [filename, originalSource] of entries) {
            this.selectorTransformer.traverse(
              filename,
              originalSource as Source,
              (newSource: string) => {
                const newAssets = new RawSource(newSource);

                compilation.updateAsset(filename, newAssets);
              }
            );
          }
        }
      );
    });
  }
}
