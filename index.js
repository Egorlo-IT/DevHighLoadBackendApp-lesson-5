"use strict";
var groupBy = require("./group-by");
var NativeNapi = require("./addons/native_napi");
var generateData = function (amount) {
    return Array.from({ length: amount }, function (_v, i) {
        return {
            id: i,
            group: String.fromCharCode(Math.floor(Math.random() * 25) + 65),
            string: Math.random().toString(36).substring(2),
            number: Math.random() * 100,
            number2: Math.random() * 1000,
            null: null,
            undefined: undefined,
            boolean: true,
        };
    });
};
// Generate demo data
var data = generateData(100000);
// Grouping
var grouped;
/**
 * JavaScript
 */
console.log("\n# JavaScript");
console.time("Duration");
grouped = groupBy(data, "group", ["number", "number2"]);
console.timeEnd("Duration");
/**
 * N-API
 */
console.log("\n# Native addon with N-API");
console.time("Duration");
grouped = NativeNapi.groupBy(data, "group", ["number", "number2"]);
console.timeEnd("Duration");
/**
 * WebAssembly WebIdl (WIP)
 */
var WebidlModule = require("./addons/webassembly-webidl/group_by.js");
WebidlModule["onRuntimeInitialized"] = function () {
    console.log("\n# WebAssembly with WebIDL binding");
    var CollectionUtils = new WebidlModule.CollectionUtils();
    console.time("Duration");
    CollectionUtils.group_by("Fake result. Work in progress", 42);
    console.timeEnd("Duration");
};
