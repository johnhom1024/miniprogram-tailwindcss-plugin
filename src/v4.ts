import { Compilation, Compiler, WebpackPluginInstance } from 'webpack';

class UniappTailwindcssWebpackPlugin implements WebpackPluginInstance {
  options = {};

  constructor(options: any) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    const pluginName = UniappTailwindcssWebpackPlugin.name;
    compiler.hooks.emit.tap(pluginName, (compilation: Compilation) => {
      const entries = Object.entries(compilation.assets);
      for (const [filename, originalSource] of entries) {
        console.log('----------johnhomLogDebug filename', filename);
        const rawSource = originalSource.source().toString()
        console.log('----------johnhomLogDebug rawSource', rawSource);
      }
    })
  }
}

export default UniappTailwindcssWebpackPlugin;
