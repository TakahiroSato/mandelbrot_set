(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./rust/pkg/mandelbrot_set_wasm.js":
/*!*****************************************!*\
  !*** ./rust/pkg/mandelbrot_set_wasm.js ***!
  \*****************************************/
/*! exports provided: img_gen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"img_gen\", function() { return img_gen; });\n/* harmony import */ var _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mandelbrot_set_wasm_bg.wasm */ \"./rust/pkg/mandelbrot_set_wasm_bg.wasm\");\n\n\n/**\n* @param {number} w\n* @param {number} h\n* @param {number} limit\n* @param {number} offset_x\n* @param {number} offset_y\n* @param {number} mag\n* @returns {number}\n*/\nfunction img_gen(w, h, limit, offset_x, offset_y, mag) {\n    const ret = _mandelbrot_set_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"img_gen\"](w, h, limit, offset_x, offset_y, mag);\n    return ret;\n}\n\n\n\n//# sourceURL=webpack:///./rust/pkg/mandelbrot_set_wasm.js?");

/***/ })

}]);