extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

pub fn mandelbrot(x: f64, y: f64, limit: u16) -> u8 {
  let mut x0 = x;
  let mut y0 = y;
  let cx = x;
  let cy = y;
  let mut l = limit;
  loop {
    if x0 * x0 + y0 * y0 > 4.0 {
      return (255.0 * (l as f32 / limit as f32)) as u8;
    }
    if l == 0 {
      return 0;
    }
    let tx = x0 * x0 - y0 * y0 + cx;
    let ty = 2.0 * x0 * y0 + cy;
    x0 = tx;
    y0 = ty;
    l -= 1;
  }
}

#[wasm_bindgen]
pub fn img_gen(w: usize, h: usize, limit: u16, offset_x: f64, offset_y: f64, mag: f64) -> Vec<u8> {
  let mut buf = Vec::with_capacity(4 * w * h);
  buf.resize(4 * w * h, 0);
  for y in 0..h {
    for x in 0..w {
        let tx = (x as f64 - offset_x) / mag;
        let ty = (y as f64 - offset_y) / mag;
        let color = mandelbrot(tx, ty, limit);
        let offset = 4 * (w * y + x);
        if color < 255 {
            buf[offset] = color;
            buf[offset + 1] = color;
            buf[offset + 2] = color;
            buf[offset + 3] = 255;
        }
    }
  }
  return buf;
}

#[test]
fn test_mandelbrot() {
  let o = img_gen(10, 10, 10, 0., 0., 100.);
}