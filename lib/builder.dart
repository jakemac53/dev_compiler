import 'dart:async';
import 'dart:convert';

import 'package:analyzer/src/generated/source.dart' show Source;
import 'package:build/build.dart';
import 'package:dev_compiler/src/compiler/command.dart';
import 'package:dev_compiler/src/compiler/compiler.dart';
import 'package:path/path.dart' as path;

class DevCompilerBuilder extends Builder {
  final CompilerOptions compilerOptions;

  DevCompilerBuilder(this.compilerOptions);

  Future build(BuildStep buildStep) async {
    var inputId = buildStep.input.id;
    var resolver = await buildStep.resolve(inputId);
    var resolvedLib = await resolver.getLibrary(inputId);

    var compiler = new ModuleCompiler.withContext(resolvedLib.context);
    var unit = new BuildUnit(
        path.basenameWithoutExtension(inputId.path),
        ['asset:${inputId.package}/${inputId.path}'],
        _moduleForLibrary);

    JSModuleFile module = compiler.compile(unit, compilerOptions);
    module.errors.forEach(buildStep.logger.severe);

    if (!module.isValid) throw new CompileErrorException();

    // Write JS file, as well as source map and summary (if requested).
    var outId = declareOutputs(buildStep.input.id).first;
    buildStep.writeAsString(new Asset(outId, module.code));
    if (module.sourceMap != null) {
      var mapId = outId.addExtension('.map');
      buildStep.writeAsString(
          new Asset(mapId, JSON.encode(module.placeSourceMap(mapId.path))));
    }
    if (module.summaryBytes != null) {
      throw new UnsupportedError('Writing summaries is not yet supported by '
          'the DevCompilerBuilder or DevCompilerTransformer. \nPlease pass '
          '--no-summarize as a command line arg (for the transformer, this '
          'can be passed via the compiler_args option)');
      // TODO(jakemac): Restore once build has support for `writeAsBytes`.
      // buildStep.writeAsBytes(new Asset(
      //     outId.changeExtension('.sum'), module.summaryBytes));
    }

    resolver.release();
  }

  String _moduleForLibrary(Source source) {
    return path.basenameWithoutExtension(source.uri.path);
  }

  List<AssetId> declareOutputs(AssetId input) {
    var jsOutput = input.addExtension('.dc.js');
    return [
      jsOutput,
      jsOutput.addExtension('.map'),
      input.addExtension('.dc.sum'),
    ];
  }
}
