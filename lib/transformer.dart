import 'package:args/args.dart';
import 'package:barback/barback.dart' as barback;
import 'package:build/build.dart';

import 'builder.dart';
import 'src/compiler/compiler.dart';

class DevCompilerTransformer extends BuilderTransformer
    with barback.LazyTransformer {
  final List<Builder> builders;

  DevCompilerTransformer(CompilerOptions compilerOptions, AssetId outputId)
      : builders = new List.unmodifiable(
            [new DevCompilerBuilder(compilerOptions, outputId)]);

  factory DevCompilerTransformer.asPlugin(barback.BarbackSettings settings) {
    var argParser = new ArgParser();
    CompilerOptions.addArguments(argParser);
    var config = settings.configuration;
    var parsedArgs = argParser.parse(config['compiler_args']);
    assert(config['output'] != null);
    var outputId = new AssetId.parse(config['output']);
    return new DevCompilerTransformer(
        new CompilerOptions.fromArguments(parsedArgs),
        outputId);
  }
}
