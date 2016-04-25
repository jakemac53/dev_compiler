import 'package:args/args.dart';
import 'package:barback/barback.dart';
import 'package:build/build.dart';

import 'builder.dart';
import 'src/compiler/compiler.dart';

class DevCompilerTransformer extends BuilderTransformer with LazyTransformer {
  final List<Builder> builders;

  DevCompilerTransformer(CompilerOptions compilerOptions)
      : builders =
            new List.unmodifiable([new DevCompilerBuilder(compilerOptions)]);

  factory DevCompilerTransformer.asPlugin(BarbackSettings settings) {
    var argParser = new ArgParser();
    CompilerOptions.addArguments(argParser);
    var parsedArgs = argParser.parse(settings.configuration['compiler_args']);
    return new DevCompilerTransformer(
        new CompilerOptions.fromArguments(parsedArgs));
  }
}
