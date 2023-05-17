import { Compilation, Compiler, WebpackPluginInstance } from 'webpack';

class UniappTailwindcssWebpackPlugin implements WebpackPluginInstance {
  options = {};

  constructor(options: any) {
    this.options = options;
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
          console.log('----------johnhomLogDebug hello world', )
        }
      );
    });
  }
}

export default UniappTailwindcssWebpackPlugin;
