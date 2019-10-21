/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bundle.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"./rust/pkg/mandelbrot_set_wasm_bg.wasm": function() {
/******/ 			return {
/******/
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["./rust/pkg/mandelbrot_set_wasm_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"./rust/pkg/mandelbrot_set_wasm_bg.wasm":"5725574397f59a15e419"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mod = Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! mandelbrot_set_wasm */ \"./rust/pkg/mandelbrot_set_wasm.js\"));\nconst bg = __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! mandelbrot_set_wasm/mandelbrot_set_wasm_bg */ \"./rust/pkg/mandelbrot_set_wasm_bg.wasm\"));\n\nPromise.all([mod, bg]).then(([mod, { memory }]) => {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext(\"2d\");\n\n  const width = canvas.width;\n  const height = canvas.height;\n\n  let calcMax = 100;\n\n  const mandelbrot_recur = (x, y, cx = x, cy = y, m = calcMax) => {\n    if (x * x + y * y > 4) {\n      return 255 * (m / calcMax);\n    }\n    if (m == 0) return 0;\n    return mandelbrot_recur(x * x - y * y + cx, 2 * x * y + cy, cx, cy, m - 1);\n  };\n\n  const mandelbrot_roop = (x, y, cx = x, cy = y, m = calcMax) => {\n    while (true) {\n      if (x * x + y * y > 4) {\n        return 255 * (m / calcMax);\n      }\n      if (m == 0) return 0;\n      const tx = x * x - y * y + cx;\n      const ty = 2 * x * y + cy;\n      x = tx;\n      y = ty;\n      m--;\n    }\n  };\n\n  const js_draw = (f = mandelbrot_roop) => {\n    ctx.clearRect(0, 0, width, height);\n    const imgData = ctx.createImageData(width, height);\n    for (let i = 0; i < height; i++) {\n      for (let j = 0; j < width; j++) {\n        const tx = (j - x) / mag;\n        const ty = (i - y) / mag;\n        const color = f(tx, ty);\n        if (color < 255) {\n          imgData.data[j * 4 + i * imgData.width * 4] = color;\n          imgData.data[1 + j * 4 + i * imgData.width * 4] = color;\n          imgData.data[2 + j * 4 + i * imgData.width * 4] = color;\n          imgData.data[3 + j * 4 + i * imgData.width * 4] = 255;\n        }\n      }\n\n      ctx.putImageData(imgData, 0, 0);\n    }\n  }\n\n  let mag = 300;\n  let x = 600;\n  let y = 300;\n\n  const wasm_draw = () => {\n    ctx.clearRect(0, 0, width, height);\n    const ptr = mod.img_gen(width, height, calcMax, x, y, mag);\n    const img = new Uint8ClampedArray(memory.buffer, ptr, 4 * width * height);\n    const imgData = new ImageData(\n      img,\n      width,\n      height\n    );\n    ctx.putImageData(imgData, 0, 0);\n  };\n\n  const draw = () => {\n    // const draw_start = performance.now();\n    wasm_draw();\n    // console.log(`draw: ${performance.now() - draw_start}[ms]`);\n\n    document.getElementById(\"output1\").value = mag;\n    document.getElementById(\"output_x\").value = x;\n    document.getElementById(\"output_y\").value = y;\n    document.getElementById(\"output_calc\").value = calcMax;\n  };\n\n  document.getElementById(\"canvas\").addEventListener(\"wheel\", e => {\n    const oldMag = mag;\n    mag -= e.deltaY * (mag / (width));\n    if (mag <= 0) mag = 100;\n    x = (width / 2) + (mag / oldMag) * (x - e.layerX);\n    y = (height / 2) + (mag / oldMag) * (y - e.layerY);\n    draw();\n    e.preventDefault();\n  });\n\n  let drag = false;\n  let startX = 0;\n  let startY = 0;\n  let startMouseX = 0;\n  let statrtMouseY = 0;\n  document.getElementById(\"canvas\").addEventListener(\"mousedown\", e => {\n    drag = true;\n    startX = x;\n    startY = y;\n    startMouseX = e.layerX;\n    startMouseY = e.layerY;\n  });\n\n  document.getElementById(\"canvas\").addEventListener(\"mouseup\", e => {\n    drag = false;\n  })\n\n  document.getElementById(\"canvas\").addEventListener(\"mousemove\", e => {\n    if (drag) {\n      x = startX - (startMouseX - e.layerX) * (mag / width);\n      y = startY - (startMouseY - e.layerY) * (mag / height);\n      draw();\n    }\n  });\n\n  document.getElementById(\"slide1\").addEventListener(\"input\", e => {\n    const oldMag = mag;\n    mag = e.target.value;\n    x = (width / 2) + (mag / oldMag) * (x - (width / 2));\n    y = (height / 2) + (mag / oldMag) * (y - (height / 2));\n    draw();\n  });\n\n  document.getElementById(\"slide_x\").addEventListener(\"input\", e => {\n    x = e.target.value;\n    draw();\n  });\n\n  document.getElementById(\"slide_y\").addEventListener(\"input\", e => {\n    y = e.target.value;\n    draw();\n  });\n\n  document.getElementById(\"slide_calc\").addEventListener(\"input\", e => {\n    calcMax = e.target.value;\n    draw();\n  });\n\n  draw();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });