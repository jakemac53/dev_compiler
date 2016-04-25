import 'dart:async';

import 'package:build/build.dart';
import 'package:dev_compiler/builder.dart';
import 'package:dev_compiler/src/compiler/compiler.dart';

Future main() async {
  var builder =
      new DevCompilerBuilder(new CompilerOptions(summarizeApi: false));

  var phases = new PhaseGroup.singleAction(builder,
      new InputSet('dev_compiler', ['example/hello_world.dart']));

  serve(phases);
}
