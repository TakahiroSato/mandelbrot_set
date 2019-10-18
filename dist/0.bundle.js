(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm.js ***!
  \*****************************************************************/
/*! exports provided: img_gen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"img_gen\", function() { return img_gen; });\n/* harmony import */ var _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mandelbrot_set_wasm_bg.wasm */ \"./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm\");\n\n\nlet cachegetInt32Memory = null;\nfunction getInt32Memory() {\n    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory = new Int32Array(_mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory;\n}\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getArrayU8FromWasm(ptr, len) {\n    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);\n}\n/**\n* @param {number} w\n* @param {number} h\n* @param {number} limit\n* @param {number} offset_x\n* @param {number} offset_y\n* @param {number} mag\n* @returns {Uint8Array}\n*/\nfunction img_gen(w, h, limit, offset_x, offset_y, mag) {\n    const retptr = 8;\n    const ret = _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"img_gen\"](retptr, w, h, limit, offset_x, offset_y, mag);\n    const memi32 = getInt32Memory();\n    const v0 = getArrayU8FromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();\n    _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);\n    return v0;\n}\n\n\n\n//# sourceURL=webpack:///./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm.js?");

/***/ }),

/***/ "./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm":
/*!**********************************************************************!*\
  !*** ./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm ***!
  \**********************************************************************/
/*! exports provided: memory, img_gen, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm?");

/***/ })

}]);