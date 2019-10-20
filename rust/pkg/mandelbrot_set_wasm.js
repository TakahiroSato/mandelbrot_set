import * as wasm from './mandelbrot_set_wasm_bg.wasm';

/**
* @param {number} w
* @param {number} h
* @param {number} limit
* @param {number} offset_x
* @param {number} offset_y
* @param {number} mag
* @returns {number}
*/
export function img_gen(w, h, limit, offset_x, offset_y, mag) {
    const ret = wasm.img_gen(w, h, limit, offset_x, offset_y, mag);
    return ret;
}

