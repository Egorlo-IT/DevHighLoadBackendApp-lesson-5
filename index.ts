import groupBy = require("./group-by");
import NativeNapi = require("./addons/native_napi");
import colors = require("colors");

const generateData: Function = (amount: number) => {
  return Array.from({ length: <number>amount }, (_v: unknown, i: number) => {
    return {
      id: <number>i,
      group: <String>String.fromCharCode(Math.floor(Math.random() * 25) + 65),
      string: <String>Math.random().toString(36).substring(2),
      number: <number>Math.random() * 100,
      number2: <number>Math.random() * 1000,
      null: null,
      undefined: undefined,
      boolean: true,
    };
  });
};

// Generate demo data
const data: Object = generateData(100000);

// Grouping
let grouped: Object;

/**
 * JavaScript
 */
console.log(colors.red("\n# JavaScript"));
console.time("Duration");
grouped = groupBy(data, "group", ["number", "number2"]);
console.timeEnd("Duration");

/**
 * N-API
 */
console.log(colors.red("\n# Native addon with N-API"));
console.time("Duration");
grouped = NativeNapi.groupBy(data, "group", ["number", "number2"]);
console.timeEnd("Duration");

/**
 * WebAssembly WebIdl (WIP)
 */
import WebidlModule = require("./addons/webassembly-webidl/group_by.js");

WebidlModule["onRuntimeInitialized"] = () => {
  console.log(colors.red("\n# WebAssembly with WebIDL binding"));
  const CollectionUtils = new WebidlModule.CollectionUtils();

  console.time("Duration");
  CollectionUtils.group_by("Fake result. Work in progress", 42);
  console.timeEnd("Duration");
};
