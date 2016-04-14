// Copyright (c) 2016, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:convert' show JSON;
import 'dart:io';
import 'package:args/args.dart';
import 'package:args/command_runner.dart';
import 'package:analyzer/src/generated/source.dart' show Source;
import 'package:analyzer/src/summary/package_bundle_reader.dart'
    show InSummarySource;
import 'package:bazel_worker/bazel_worker.dart';
import 'compiler.dart'
    show BuildUnit, CompilerOptions, JSModuleFile, ModuleCompiler;
import '../analyzer/context.dart' show AnalyzerOptions;
import 'package:path/path.dart' as path;

/// The command for invoking the modular compiler.
class CompileCommand extends Command {
  get name => 'compile';
  get description => 'Compile a set of Dart files into a JavaScript module.';

  CompileCommand() {
    argParser.addOption('out', abbr: 'o', help: 'Output file (required)');
    argParser.addFlag('persistent_worker',
        help: 'Whether or not we are running as a persistent bazel worker. '
            'This is automatically added by bazel when running in worker mode.',
        defaultsTo: false);
    CompilerOptions.addArguments(argParser);
    AnalyzerOptions.addArguments(argParser);
  }

  @override
  void run() {
    var compiler =
        new ModuleCompiler(new AnalyzerOptions.fromArguments(argResults));
    if (argResults['persistent_worker'] == true) {
      new CompilerLoop(compiler, argParser, runCompiler, argResults.rest).run();
    } else {
      runCompiler(compiler, new CompilerOptions.fromArguments(argResults),
          argResults['out'], argResults.rest);
    }
  }

  void runCompiler(ModuleCompiler compiler, CompilerOptions compilerOptions,
      String outPath, List<String> extraArgs,
      {void forEachError(String error): print}) {
    if (outPath == null) {
      usageException('Please include the output file location. For example:\n'
          '    -o PATH/TO/OUTPUT_FILE.js');
    }
    var unit = new BuildUnit(
        path.basenameWithoutExtension(outPath), extraArgs, _moduleForLibrary);

    JSModuleFile module = compiler.compile(unit, compilerOptions);
    module.errors.forEach(forEachError);

    if (!module.isValid) throw new CompileErrorException();

    // Write JS file, as well as source map and summary (if requested).
    new File(outPath).writeAsStringSync(module.code);
    if (module.sourceMap != null) {
      var mapPath = outPath + '.map';
      new File(mapPath)
          .writeAsStringSync(JSON.encode(module.placeSourceMap(mapPath)));
    }
    if (module.summaryBytes != null) {
      var summaryPath = path.withoutExtension(outPath) + '.sum';
      new File(summaryPath).writeAsBytesSync(module.summaryBytes);
    }
  }

  String _moduleForLibrary(Source source) {
    if (source is InSummarySource) {
      return path.basenameWithoutExtension(source.summaryPath);
    }

    throw usageException(
        'Imported file "${source.uri}" was not found as a summary or source '
        'file. Please pass in either the summary or the source file '
        'for this import.');
  }
}

/// Thrown when the input source code has errors.
class CompileErrorException implements Exception {
  toString() => '\nPlease fix all errors before compiling (warnings are okay).';
}

typedef void RunCompilerFn(ModuleCompiler compiler, CompilerOptions options,
    String outPath, List<String> extraArgs,
    {void forEachError(String error)});

/// Runs the compiler worker loop.
class CompilerLoop extends SyncWorkerLoop {
  final ModuleCompiler compiler;
  final ArgParser argParser;
  final RunCompilerFn runCompilerFn;
  final List<String> extraArgs;

  CompilerLoop(
      this.compiler, this.argParser, this.runCompilerFn, this.extraArgs)
      : super();

  WorkResponse performRequest(WorkRequest request) {
    var argResults = argParser.parse(request.arguments);
    var output = new StringBuffer();
    try {
      runCompilerFn(compiler, new CompilerOptions.fromArguments(argResults),
          argResults['out'], new List.from(argResults.rest)..addAll(extraArgs),
          forEachError: output.writeln);
      return new WorkResponse()
        ..exitCode = EXIT_CODE_OK
        ..output = output.toString();
    } catch (e, s) {
      return new WorkResponse()
        ..exitCode = EXIT_CODE_ERROR
        ..output = '$output\n$e\n$s';
    }
  }
}
