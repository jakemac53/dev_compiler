import 'dart:async';

import 'package:build/build.dart';
import 'package:dev_compiler/builder.dart';
import 'package:dev_compiler/src/compiler/compiler.dart';

Future main() async {
  var compilerOptions = new CompilerOptions(summarizeApi: false);

  var phases = new PhaseGroup();
  var phase = phases.newPhase();
  phase.addAction(
      new DevCompilerBuilder(compilerOptions,
          new AssetId('dev_compiler', 'example/js/hello_world.dart.dc.js')),
      new InputSet('dev_compiler', ['example/hello_world.dart']));

  var packages = [
    // 'angular2', // special rule for this one below
    'async',
    'func',
    'intl',
    'logging',
    'observe',
    'path',
    'smoke',
    'stack_trace',
    'utf',
  ];

  for (var package in packages) {
    phase.addAction(
        new DevCompilerBuilder(
            compilerOptions,
            new AssetId(
                'dev_compiler', 'example/js/${package}.dart.dc.js')),
        new InputSet(package, ['lib/${package}.dart']));
  }

  phase.addAction(
      new DevCompilerBuilder(
          compilerOptions,
          new AssetId('dev_compiler',
              'example/js/angular2.dart.dc.js'),
          extraEntryPoints: ['lib/platform/browser.dart']),
      new InputSet('angular2', ['lib/angular2.dart']));

  serve(phases, deleteFilesByDefault: true);
}
