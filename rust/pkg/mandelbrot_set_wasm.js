import * as wasm from './mandelbrot_set_wasm_bg.wasm';

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {number} w
* @param {number} h
* @param {number} limit
* @param {number} offset_x
* @param {number} offset_y
* @param {number} mag
* @returns {Uint8Array}
*/
export function img_gen(w, h, limit, offset_x, offset_y, mag) {
    const retptr = 8;
    const ret = wasm.img_gen(retptr, w, h, limit, offset_x, offset_y, mag);
    const memi32 = getInt32Memory();
    const v0 = getArrayU8FromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
    wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
    return v0;
}

