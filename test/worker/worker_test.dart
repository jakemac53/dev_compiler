// Copyright (c) 2016, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:convert';
import 'dart:io';

import 'package:bazel_worker/bazel_worker.dart';
// TODO(jakemac): Remove once this is a part of the testing library.
import 'package:bazel_worker/src/async_message_grouper.dart';
import 'package:bazel_worker/testing.dart';
import 'package:test/test.dart';

main() {
  group('Hello World', () {
    final inputDartFile = new File('test/worker/hello_world.dart').absolute;
    final outputJsFile = new File('test/worker/hello_world.js').absolute;
    final executableArgs = [
      'bin/dartdevc.dart',
      'compile',
      // TODO(jakemac): Remove once this is no longer necessary.
      '--dart-sdk',
      'tool/generated_sdk',
    ];
    final compilerArgs = [
      '--unsafe-force-compile',
      '--no-source-map',
      '--no-summarize',
      '-o',
      outputJsFile.path,
      inputDartFile.path,
      // TODO(jakemac): Remove these once they are no longer necessary.
      'dart:_runtime',
      'dart:_debugger',
      'dart:_foreign_helper',
      'dart:_interceptors',
      'dart:_internal',
      'dart:_isolate_helper',
      'dart:_js_embedded_names',
      'dart:_js_helper',
      'dart:_js_mirrors',
      'dart:_js_primitives',
      'dart:_metadata',
      'dart:_native_typed_data',
      'dart:async',
      'dart:collection',
      'dart:convert',
      'dart:core',
      'dart:isolate',
      'dart:js',
      'dart:math',
      'dart:mirrors',
      'dart:typed_data',
      'dart:indexed_db',
      'dart:html',
      'dart:html_common',
      'dart:svg',
      'dart:web_audio',
      'dart:web_gl',
      'dart:web_sql'
    ];

    tearDown(() {
      if (outputJsFile.existsSync()) outputJsFile.deleteSync();
    });

    test('can compile in worker mode', () async {
      var args = new List.from(executableArgs)..add('--persistent_worker');
      var process = await Process.start('dart', args);
      var messageGrouper = new AsyncMessageGrouper(process.stdout);

      var request = new WorkRequest();
      request.arguments.addAll(compilerArgs);

      process.stdin.add(protoToDelimitedBuffer(request));

      var buffer = await messageGrouper.next;
      WorkResponse response;
      try {
        response = new WorkResponse.fromBuffer(buffer);
      } catch (_) {
        throw 'Failed to parse response: \n'
            'bytes: $buffer\n'
            'String: ${new String.fromCharCodes(buffer)}\n';
      }

      expect(response.exitCode, EXIT_CODE_OK, reason: response.output);
      expect(response.output,
          new File('tool/sdk_expected_errors.txt').readAsStringSync());

      expect(outputJsFile.existsSync(), isTrue);

      process.kill();

      // TODO(jakemac): This shouldn't be necessary, but it is for the process
      // to exit properly.
      await messageGrouper.next;
    });

    test('can compile in basic mode', () async {
      var args = new List.from(executableArgs)..addAll(compilerArgs);
      var process = await Process.start('dart', args);
      stderr.addStream(process.stderr);
      var futureProcessOutput = process.stdout.map(UTF8.decode).toList();

      expect(await process.exitCode, EXIT_CODE_OK);
      expect((await futureProcessOutput).join(),
          new File('tool/sdk_expected_errors.txt').readAsStringSync());
      expect(outputJsFile.existsSync(), isTrue);
    });
  });
}
