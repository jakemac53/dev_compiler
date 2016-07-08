dart_library.library('corelib/regexp/zero-length-alternatives_test', null, /* Imports */[
  'dart_sdk',
  'expect'
], function load__zero$45length$45alternatives_test(exports, dart_sdk, expect) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const expect$ = expect.expect;
  const zero$45length$45alternatives_test = Object.create(null);
  const v8_regexp_utils = Object.create(null);
  let JSArrayOfString = () => (JSArrayOfString = dart.constFn(_interceptors.JSArray$(core.String)))();
  let VoidTovoid = () => (VoidTovoid = dart.constFn(dart.functionType(dart.void, [])))();
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  let VoidTovoid$ = () => (VoidTovoid$ = dart.constFn(dart.definiteFunctionType(dart.void, [])))();
  let dynamicAnddynamic__Tovoid = () => (dynamicAnddynamic__Tovoid = dart.constFn(dart.definiteFunctionType(dart.void, [dart.dynamic, dart.dynamic], [core.String])))();
  let dynamic__Tovoid = () => (dynamic__Tovoid = dart.constFn(dart.definiteFunctionType(dart.void, [dart.dynamic], [core.String])))();
  let dynamic__Tovoid$ = () => (dynamic__Tovoid$ = dart.constFn(dart.definiteFunctionType(dart.void, [dart.dynamic], [core.num])))();
  let dynamicAnddynamicAndnumTovoid = () => (dynamicAnddynamicAndnumTovoid = dart.constFn(dart.definiteFunctionType(dart.void, [dart.dynamic, dart.dynamic, core.num])))();
  let dynamicTovoid = () => (dynamicTovoid = dart.constFn(dart.definiteFunctionType(dart.void, [dart.dynamic])))();
  let StringAndRegExpToMatch = () => (StringAndRegExpToMatch = dart.constFn(dart.definiteFunctionType(core.Match, [core.String, core.RegExp])))();
  let MatchToString = () => (MatchToString = dart.constFn(dart.definiteFunctionType(core.String, [core.Match])))();
  let StringAndRegExpToListOfString = () => (StringAndRegExpToListOfString = dart.constFn(dart.definiteFunctionType(ListOfString(), [core.String, core.RegExp])))();
  zero$45length$45alternatives_test.main = function() {
    v8_regexp_utils.description('Test regular expression processing with alternatives that match consuming no characters');
    let emptyStr = "";
    let s1 = "xxxx";
    let s2 = "aaaa";
    let s3 = "aax";
    let s4 = "abab";
    let s5 = "ab";
    let s6 = "xabx";
    let s7 = "g0";
    let re1 = core.RegExp.new("(?:|a|z)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re1), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re1), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re1), JSArrayOfString().of(["aaaa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re1), JSArrayOfString().of(["aa"]));
    let re2 = core.RegExp.new("(?:a||z)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re2), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re2), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re2), JSArrayOfString().of(["aaaa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re2), JSArrayOfString().of(["aa"]));
    let re3 = core.RegExp.new("(?:a|z|)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re3), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re3), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re3), JSArrayOfString().of(["aaaa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re3), JSArrayOfString().of(["aa"]));
    let re4 = core.RegExp.new("(|a|z)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re4), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re4), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re4), JSArrayOfString().of(["aaaa", "a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re4), JSArrayOfString().of(["aa", "a"]));
    let re5 = core.RegExp.new("(a||z)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re5), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re5), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re5), JSArrayOfString().of(["aaaa", "a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re5), JSArrayOfString().of(["aa", "a"]));
    let re6 = core.RegExp.new("(a|z|)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re6), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re6), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re6), JSArrayOfString().of(["aaaa", "a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re6), JSArrayOfString().of(["aa", "a"]));
    let re7 = core.RegExp.new("(?:|a|z){2,5}");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re7), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re7), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re7), JSArrayOfString().of(["aaa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re7), JSArrayOfString().of(["aa"]));
    let re8 = core.RegExp.new("(?:a||z){2,5}");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re8), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re8), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re8), JSArrayOfString().of(["aaaa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re8), JSArrayOfString().of(["aa"]));
    let re9 = core.RegExp.new("(?:a|z|){2,5}");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re9), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re9), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re9), JSArrayOfString().of(["aaaa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re9), JSArrayOfString().of(["aa"]));
    let re10 = core.RegExp.new("(?:|a|z)*?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re10), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re10), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re10), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re10), JSArrayOfString().of([""]));
    let re11 = core.RegExp.new("(?:a||z)*?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re11), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re11), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re11), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re11), JSArrayOfString().of([""]));
    let re12 = core.RegExp.new("(?:a|z|)*?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re12), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re12), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re12), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re12), JSArrayOfString().of([""]));
    let re13 = core.RegExp.new("(|a|z)*?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re13), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re13), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re13), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re13), JSArrayOfString().of(["", null]));
    let re14 = core.RegExp.new("(a||z)*?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re14), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re14), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re14), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re14), JSArrayOfString().of(["", null]));
    let re15 = core.RegExp.new("(a|z|)*?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re15), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re15), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re15), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re15), JSArrayOfString().of(["", null]));
    let re16 = core.RegExp.new("(?:|a|z)?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re16), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re16), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re16), JSArrayOfString().of(["a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re16), JSArrayOfString().of(["a"]));
    let re17 = core.RegExp.new("(?:a||z)?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re17), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re17), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re17), JSArrayOfString().of(["a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re17), JSArrayOfString().of(["a"]));
    let re18 = core.RegExp.new("(?:a|z|)?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re18), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re18), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re18), JSArrayOfString().of(["a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re18), JSArrayOfString().of(["a"]));
    let re19 = core.RegExp.new("(|a|z)?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re19), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re19), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re19), JSArrayOfString().of(["a", "a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re19), JSArrayOfString().of(["a", "a"]));
    let re20 = core.RegExp.new("(a||z)?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re20), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re20), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re20), JSArrayOfString().of(["a", "a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re20), JSArrayOfString().of(["a", "a"]));
    let re21 = core.RegExp.new("(a|z|)?");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re21), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re21), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re21), JSArrayOfString().of(["a", "a"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re21), JSArrayOfString().of(["a", "a"]));
    let re22 = core.RegExp.new("(?:|a|z)??");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re22), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re22), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re22), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re22), JSArrayOfString().of([""]));
    let re23 = core.RegExp.new("(?:a||z)??");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re23), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re23), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re23), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re23), JSArrayOfString().of([""]));
    let re24 = core.RegExp.new("(?:a|z|)??");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re24), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re24), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re24), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re24), JSArrayOfString().of([""]));
    let re25 = core.RegExp.new("(|a|z)??");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re25), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re25), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re25), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re25), JSArrayOfString().of(["", null]));
    let re26 = core.RegExp.new("(a||z)??");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re26), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re26), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re26), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re26), JSArrayOfString().of(["", null]));
    let re27 = core.RegExp.new("(a|z|)??");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re27), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re27), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re27), JSArrayOfString().of(["", null]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re27), JSArrayOfString().of(["", null]));
    let re28 = core.RegExp.new("(?:|a|z)*x");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re28), null);
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re28), JSArrayOfString().of(["x"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re28), null);
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re28), JSArrayOfString().of(["aax"]));
    let re29 = core.RegExp.new("(?:a||z)*x");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re29), null);
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re29), JSArrayOfString().of(["x"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re29), null);
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re29), JSArrayOfString().of(["aax"]));
    let re30 = core.RegExp.new("(?:a|z|)*x");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re30), null);
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re30), JSArrayOfString().of(["x"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re30), null);
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re30), JSArrayOfString().of(["aax"]));
    let re31 = core.RegExp.new("(?:a*|b*)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re31), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re31), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re31), JSArrayOfString().of(["aa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s4, re31), JSArrayOfString().of(["abab"]));
    let re32 = core.RegExp.new("(?:a*?|b*?)*");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re32), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re32), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re32), JSArrayOfString().of(["aaaa"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s4, re32), JSArrayOfString().of(["abab"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s5, re32), JSArrayOfString().of(["ab"]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s6, re32), JSArrayOfString().of([""]));
    let re33 = core.RegExp.new("(?:(?:(?!))|g?|0*\\*?)+");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re33), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re33), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s7, re33), JSArrayOfString().of(["g0"]));
    let re34 = core.RegExp.new("(?:|a)");
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(emptyStr, re34), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s1, re34), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s2, re34), JSArrayOfString().of([""]));
    v8_regexp_utils.shouldBe(v8_regexp_utils.firstMatch(s3, re34), JSArrayOfString().of([""]));
  };
  dart.fn(zero$45length$45alternatives_test.main, VoidTovoid$());
  v8_regexp_utils.assertEquals = function(actual, expected, message) {
    if (message === void 0) message = null;
    expect$.Expect.equals(actual, expected, message);
  };
  dart.fn(v8_regexp_utils.assertEquals, dynamicAnddynamic__Tovoid());
  v8_regexp_utils.assertTrue = function(actual, message) {
    if (message === void 0) message = null;
    expect$.Expect.isTrue(actual, message);
  };
  dart.fn(v8_regexp_utils.assertTrue, dynamic__Tovoid());
  v8_regexp_utils.assertFalse = function(actual, message) {
    if (message === void 0) message = null;
    expect$.Expect.isFalse(actual, message);
  };
  dart.fn(v8_regexp_utils.assertFalse, dynamic__Tovoid());
  v8_regexp_utils.assertThrows = function(fn, testid) {
    if (testid === void 0) testid = null;
    expect$.Expect.throws(VoidTovoid()._check(fn), null, dart.str`Test ${testid}`);
  };
  dart.fn(v8_regexp_utils.assertThrows, dynamic__Tovoid$());
  v8_regexp_utils.assertNull = function(actual, testid) {
    if (testid === void 0) testid = null;
    expect$.Expect.isNull(actual, dart.str`Test ${testid}`);
  };
  dart.fn(v8_regexp_utils.assertNull, dynamic__Tovoid$());
  v8_regexp_utils.assertToStringEquals = function(str, match, testid) {
    let actual = [];
    for (let i = 0; i <= dart.notNull(core.num._check(dart.dload(match, 'groupCount'))); i++) {
      let g = dart.dsend(match, 'group', i);
      actual[dartx.add](g == null ? "" : g);
    }
    expect$.Expect.equals(str, actual[dartx.join](","), dart.str`Test ${testid}`);
  };
  dart.fn(v8_regexp_utils.assertToStringEquals, dynamicAnddynamicAndnumTovoid());
  v8_regexp_utils.shouldBeTrue = function(actual) {
    expect$.Expect.isTrue(actual);
  };
  dart.fn(v8_regexp_utils.shouldBeTrue, dynamicTovoid());
  v8_regexp_utils.shouldBeFalse = function(actual) {
    expect$.Expect.isFalse(actual);
  };
  dart.fn(v8_regexp_utils.shouldBeFalse, dynamicTovoid());
  v8_regexp_utils.shouldBeNull = function(actual) {
    expect$.Expect.isNull(actual);
  };
  dart.fn(v8_regexp_utils.shouldBeNull, dynamicTovoid());
  v8_regexp_utils.shouldBe = function(actual, expected, message) {
    if (message === void 0) message = null;
    if (expected == null) {
      expect$.Expect.isNull(actual, message);
    } else {
      expect$.Expect.equals(dart.dload(expected, 'length'), dart.dsend(dart.dload(actual, 'groupCount'), '+', 1));
      for (let i = 0; i <= dart.notNull(core.num._check(dart.dload(actual, 'groupCount'))); i++) {
        expect$.Expect.equals(dart.dindex(expected, i), dart.dsend(actual, 'group', i), message);
      }
    }
  };
  dart.fn(v8_regexp_utils.shouldBe, dynamicAnddynamic__Tovoid());
  v8_regexp_utils.firstMatch = function(str, pattern) {
    return pattern.firstMatch(str);
  };
  dart.fn(v8_regexp_utils.firstMatch, StringAndRegExpToMatch());
  v8_regexp_utils.allStringMatches = function(str, pattern) {
    return pattern.allMatches(str)[dartx.map](core.String)(dart.fn(m => m.group(0), MatchToString()))[dartx.toList]();
  };
  dart.fn(v8_regexp_utils.allStringMatches, StringAndRegExpToListOfString());
  v8_regexp_utils.description = function(str) {
  };
  dart.fn(v8_regexp_utils.description, dynamicTovoid());
  // Exports:
  exports.zero$45length$45alternatives_test = zero$45length$45alternatives_test;
  exports.v8_regexp_utils = v8_regexp_utils;
});