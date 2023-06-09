"use strict";
exports.__esModule = true;
exports.held_karp = void 0;
var hk = require("../../hk/pkg/hk");
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
    //   const libraryDir = './modules/libhk';
    //   const myLib = Library(libraryDir, {
    //     held_karp: [ref.refType(ref.types.CString), [ref.types.CString]],
    //   });
    //   const readCS = myLib.held_karp(JSON.stringify(dist)).readCString();
    var exec = hk.held_karp(JSON.stringify(dist));
    var parse = JSON.parse(exec);
    var result = new Result();
    result.cost = parse === null || parse === void 0 ? void 0 : parse.cost;
    result.path = parse === null || parse === void 0 ? void 0 : parse.path;
    return result;
}
exports.held_karp = held_karp;
