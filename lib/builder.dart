import 'dart:async';
import 'dart:convert';

import 'package:analyzer/src/generated/source.dart' show Source;
import 'package:barback/barback.dart' as barback;
import 'package:build/build.dart';
import 'package:build/src/util/barback.dart';
import 'package:code_transformers/src/resolver_impl.dart';
import 'package:dev_compiler/src/compiler/command.dart';
import 'package:dev_compiler/src/compiler/compiler.dart';

class DevCompilerBuilder extends Builder {
  final CompilerOptions compilerOptions;
  final AssetId outputId;
  final List<String> extraEntryPoints;
  AssetId get sourcemapId => outputId.addExtension('.map');
  AssetId get summaryId => outputId.changeExtension('.sum');

  DevCompilerBuilder(this.compilerOptions, this.outputId,
      {this.extraEntryPoints});

  Future build(BuildStep buildStep) async {
    var inputId = buildStep.input.id;
    var resolver = await buildStep.resolve(inputId,
        entryPoints: extraEntryPoints
            ?.map((path) => new AssetId(inputId.package, path))
            ?.toList());
    var resolvedLib = await resolver.getLibrary(inputId);

    var compiler = new ModuleCompiler.withContext(resolvedLib.context);
    var source = resolvedLib.source as AssetBasedSource;

    var inputs = new Set()..add(source.assetId);

    addDependentAssets(barback.AssetId id) {
      var source = resolver.getLibrary(toBuildAssetId(id)).source;
      for (var id in source.dependentAssets) {
        if (id.package != source.assetId.package) continue;
        if (inputs.contains(id)) continue;
        inputs.add(id);
        addDependentAssets(id);
      }
    }
    addDependentAssets(source.assetId);

    /// Add any extra entry points to this module.
    if (extraEntryPoints != null) {
      for (var path in extraEntryPoints) {
        var extraImportId = new AssetId(inputId.package, path);
        // Can bail early in this case.
        if (inputs.contains(extraImportId)) continue;
        var source = resolver.getLibrary(extraImportId).source;
        inputs.add(source.assetId);

        addDependentAssets(source.assetId);
      }
    }

    inputs = inputs
        .map((barback.AssetId id) => 'asset:${id.package}/${id.path}')
        .toList();

    var unit = new BuildUnit(inputId.package, inputs, _moduleForLibrary);

    JSModuleFile module = compiler.compile(unit, compilerOptions);
    module.errors.forEach((error) {
      if (error.contains('[error]')) buildStep.logger.severe(error);
      else buildStep.logger.warning(error);
    });

    if (!module.isValid) throw new CompileErrorException();

    // Write JS file, as well as source map and summary (if requested).
    buildStep.writeAsString(new Asset(outputId, module.code));
    if (module.sourceMap != null) {
      buildStep.writeAsString(new Asset(
          sourcemapId, JSON.encode(module.placeSourceMap(sourcemapId.path))));
    }
    if (module.summaryBytes != null) {
      throw new UnsupportedError('Writing summaries is not yet supported by '
          'the DevCompilerBuilder or DevCompilerTransformer. \nPlease pass '
          '--no-summarize as a command line arg (for the transformer, this '
          'can be passed via the compiler_args option)');
      // TODO(jakemac): Restore once build has support for `writeAsBytes`.
      // buildStep.writeAsBytes(new Asset(
      //     summaryId, module.summaryBytes));
    }

    resolver.release();
  }

  String _moduleForLibrary(AssetBasedSource source) => source.assetId.package;

  List<AssetId> declareOutputs(AssetId input) {
    return [outputId, sourcemapId, summaryId,];
  }
}
