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
    return mandelbrot(x * x - y * y + cx, 2 * x * y + cy, cx, cy, m - 1);
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

  let mag = 300;
  let x = 600;
  let y = 300;

  const draw = () => {
    const draw_start = performance.now();
    ctx.clearRect(0, 0, width, height);
    let start = performance.now();
    const ptr = mod.img_gen(width, height, calcMax, x, y, mag);
    //console.log(ptr);
    //console.log(`img_gen : ${performance.now() - start}[ms]`);
    start = performance.now();
    const img = new Uint8ClampedArray(memory.buffer, ptr, 4 * width * height);
    //console.log(`convert array : ${performance.now() - start}[ms]`);
    const imgData = new ImageData(
      img,
      width,
      height
    );
    ctx.putImageData(imgData, 0, 0);
    //console.log(`draw : ${performance.now() - draw_start}[ms]`);

    document.getElementById("output1").value = mag;
    document.getElementById("output_x").value = x;
    document.getElementById("output_y").value = y;
    document.getElementById("output_calc").value = calcMax;
  };

  document.getElementById("canvas").addEventListener("wheel", e => {
    mag -= e.deltaY * Math.log10(mag);
    draw();
  });

  let drag = false;
  let startX = 0;
  let startY = 0;
  let startMouseX = 0;
  let statrtMouseY = 0;
  document.getElementById("canvas").addEventListener("mousedown", e => {
    drag = true;
    startMouseX = e.layerX;
    startMouseY = e.layerY;
    startX = x;
    startY = y;
  });

  document.getElementById("canvas").addEventListener("mouseup", e => {
    drag = false;
  })

  document.getElementById("canvas").addEventListener("mousemove", e => {
    if (drag) {
      x = startX - (startMouseX - e.layerX) * Math.log10(mag / 2);
      y = startY - (startMouseY - e.layerY) * Math.log10(mag / 2);
      draw();
    }
  });

  document.getElementById("slide1").addEventListener("input", e => {
    mag = e.target.value;
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
