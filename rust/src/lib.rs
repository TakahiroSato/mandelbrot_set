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
extern {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub fn img_gen(w: usize, h: usize, limit: u16, offset_x: f64, offset_y: f64, mag: f64) -> *const u8 {
  let mut buf = Vec::with_capacity(4 * w * h);
  buf.resize(4 * w * h, 0);
  let (start_x, start_y) = (-offset_x/mag, -offset_y/mag);
  let (dx, dy) = (1./mag, 1./mag);
  let (mut addx, mut addy) = (0., 0.);
  for y in 0..h {
    for x in 0..w {
        let tx = start_x + addx;
        let ty = start_y + addy;
        let v = mandelbrot(tx, ty, limit);
        let offset = 4 * (w * y + x);
        if v < 255 {
            let r = if v % 2 == 0 && v != 0 { 234 } else if v != 0 { 181 } else { v };
            let g = if v % 2 == 0 && v != 0 { 145 } else if v != 0 { 255 } else { v };
            let b = if v % 2 == 0 && v != 0 { 152 } else if v != 0 { 20 } else { v };
            buf[offset] = r;
            buf[offset + 1] = g;
            buf[offset + 2] = b;
            buf[offset + 3] = 255;
        }
        addx += dx;
    }
    addx = 0.;
    addy += dy;
  }
  return buf.as_ptr();
}

#[test]
fn test_mandelbrot() {
  let o = img_gen(10, 10, 10, 0., 0., 300.);
  for i in 0..10 {
    for j in 0..10 {
      println!("{}", unsafe { *(o.offset(i*10+j)) });
    }
  }
}