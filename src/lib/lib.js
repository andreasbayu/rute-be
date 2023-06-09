"use strict";
exports.__esModule = true;
exports.held_karp = void 0;
var ffi_napi_1 = require("ffi-napi");
var ref = require("ref-napi");
var Distance = /** @class */ (function () {
    function Distance() {
    }
    return Distance;
}());
var Result = /** @class */ (function () {
    function Result() {
    }
    return Result;
}());
function held_karp(dist) {
    var libraryDir = './modules/libhk';
    var myLib = (0, ffi_napi_1.Library)(libraryDir, {
        held_karp: [ref.refType(ref.types.CString), [ref.types.CString]]
    });
    var readCS = myLib.held_karp(JSON.stringify(dist)).readCString();
    var parse = JSON.parse(readCS);
    var result = new Result();
    result.cost = parse === null || parse === void 0 ? void 0 : parse.cost;
    result.path = parse === null || parse === void 0 ? void 0 : parse.path;
    return result;
}
exports.held_karp = held_karp;
