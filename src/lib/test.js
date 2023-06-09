"use strict";
exports.__esModule = true;
var lib2_1 = require("./lib2");
// sample testing library
console.log((0, lib2_1.held_karp)({
    distance: [
        [0, 2, 4, 5],
        [2, 0, 3, 5],
        [4, 4, 0, 6],
        [5, 4, 6, 0],
    ]
}));
