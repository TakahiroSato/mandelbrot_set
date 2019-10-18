(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm.js ***!
  \*****************************************************************/
/*! exports provided: mandelbrot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mandelbrot\", function() { return mandelbrot; });\n/* harmony import */ var _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mandelbrot_set_wasm_bg.wasm */ \"./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm\");\n\n\n/**\n* @param {number} x\n* @param {number} y\n* @param {number} limit\n* @returns {number}\n*/\nfunction mandelbrot(x, y, limit) {\n    const ret = _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mandelbrot\"](x, y, limit);\n    return ret;\n}\n\n\n\n//# sourceURL=webpack:///./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm.js?");

/***/ }),

/***/ "./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm":
/*!**********************************************************************!*\
  !*** ./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm ***!
  \**********************************************************************/
/*! exports provided: memory, mandelbrot */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./node_modules/mandelbrot_set_wasm/mandelbrot_set_wasm_bg.wasm?");

/***/ })

}]);