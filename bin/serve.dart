import 'dart:async';

import 'package:analyzer/analyzer.dart';
import 'package:analyzer/src/generated/engine.dart' show AnalysisOptionsImpl;
import 'package:analyzer/src/generated/java_io.dart' show JavaFile;
import 'package:analyzer/src/generated/sdk_io.dart' show DirectoryBasedDartSdk;
import 'package:analyzer/src/generated/source_io.dart' show DartUriResolver;
import 'package:build/build.dart';
import 'package:code_transformers/resolver.dart';
import 'package:dev_compiler/builder.dart';
import 'package:dev_compiler/src/compiler/compiler.dart';

Future main() async {
  var compilerOptions =
      new CompilerOptions(summarizeApi: false, unsafeForceCompile: true);

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
        new DevCompilerBuilder(compilerOptions,
            new AssetId('dev_compiler', 'example/js/${package}.dart.dc.js')),
        new InputSet(package, ['lib/${package}.dart']));
  }

  phase.addAction(
      new DevCompilerBuilder(compilerOptions,
          new AssetId('dev_compiler', 'example/js/angular2.dart.dc.js'),
          extraEntryPoints: ['lib/platform/browser.dart']),
      new InputSet('angular2', ['lib/angular2.dart']));

  /// Set up a custom [Resolvers] instance for dev_compiler.
  var analysisOptions = new AnalysisOptionsImpl()..strongMode = true;
  var dartSdk = new DirectoryBasedDartSdk(
      new JavaFile(dartSdkDirectory), /*useDart2jsPaths:*/ true);
  dartSdk.analysisOptions = analysisOptions;
  var dartUriResolver = new DartUriResolver(dartSdk);
  var resolvers = new Resolvers.fromSdk(dartSdk, dartUriResolver,
      useSharedSources: true, options: analysisOptions);

  serve(phases, deleteFilesByDefault: true, resolvers: resolvers);
}
