const mod = import("mandelbrot_set_wasm");
const bg = import("mandelbrot_set_wasm/mandelbrot_set_wasm_bg");

Promise.all([mod, bg]).then(([mod, { memory }]) => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  let calcMax = 100;

  const mandelbrot_recur = (x, y, cx = x, cy = y, m = calcMax) => {
    if (x * x + y * y > 4) {
      return 255 * (m / calcMax);
    }
    if (m == 0) return 0;
    return mandelbrot_recur(x * x - y * y + cx, 2 * x * y + cy, cx, cy, m - 1);
  };

  const mandelbrot_roop = (x, y, cx = x, cy = y, m = calcMax) => {
    while (true) {
      if (x * x + y * y > 4) {
        return 255 * (m / calcMax);
      }
      if (m == 0) return 0;
      const tx = x * x - y * y + cx;
      const ty = 2 * x * y + cy;
      x = tx;
      y = ty;
      m--;
    }
  };

  const js_draw = (f = mandelbrot_roop) => {
    ctx.clearRect(0, 0, width, height);
    const imgData = ctx.createImageData(width, height);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const tx = (j - x) / mag;
        const ty = (i - y) / mag;
        const color = f(tx, ty);
        if (color < 255) {
          imgData.data[j * 4 + i * imgData.width * 4] = color;
          imgData.data[1 + j * 4 + i * imgData.width * 4] = color;
          imgData.data[2 + j * 4 + i * imgData.width * 4] = color;
          imgData.data[3 + j * 4 + i * imgData.width * 4] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    }
  }

  let mag = 300;
  let x = 600;
  let y = 300;

  const wasm_draw = () => {
    ctx.clearRect(0, 0, width, height);
    const ptr = mod.img_gen(width, height, calcMax, x, y, mag);
    const img = new Uint8ClampedArray(memory.buffer, ptr, 4 * width * height);
    const imgData = new ImageData(
      img,
      width,
      height
    );
    ctx.putImageData(imgData, 0, 0);
  };

  const draw = () => {
    // const draw_start = performance.now();
    wasm_draw();
    // console.log(`draw: ${performance.now() - draw_start}[ms]`);

    document.getElementById("output1").value = mag;
    document.getElementById("output_x").value = x;
    document.getElementById("output_y").value = y;
    document.getElementById("output_calc").value = calcMax;
  };

  document.getElementById("canvas").addEventListener("wheel", e => {
    const oldMag = mag;
    mag -= e.deltaY * (mag / (width));
    if (mag <= 0) mag = 100;
    x = (width / 2) + (mag / oldMag) * (x - e.layerX);
    y = (height / 2) + (mag / oldMag) * (y - e.layerY);
    draw();
    e.preventDefault();
  });

  let drag = false;
  let startX = 0;
  let startY = 0;
  let startMouseX = 0;
  let statrtMouseY = 0;
  document.getElementById("canvas").addEventListener("mousedown", e => {
    drag = true;
    startX = x;
    startY = y;
    startMouseX = e.layerX;
    startMouseY = e.layerY;
  });

  document.getElementById("canvas").addEventListener("mouseup", e => {
    drag = false;
  })

  document.getElementById("canvas").addEventListener("mousemove", e => {
    if (drag) {
      x = startX - (startMouseX - e.layerX) * (mag / width);
      y = startY - (startMouseY - e.layerY) * (mag / height);
      draw();
    }
  });

  document.getElementById("slide1").addEventListener("input", e => {
    const oldMag = mag;
    mag = e.target.value;
    x = (width / 2) + (mag / oldMag) * (x - (width / 2));
    y = (height / 2) + (mag / oldMag) * (y - (height / 2));
    draw();
  });

  document.getElementById("slide_x").addEventListener("input", e => {
    x = e.target.value;
    draw();
  });

  document.getElementById("slide_y").addEventListener("input", e => {
    y = e.target.value;
    draw();
  });

  document.getElementById("slide_calc").addEventListener("input", e => {
    calcMax = e.target.value;
    draw();
  });

  draw();
});
