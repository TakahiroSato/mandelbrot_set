const mod = import("mandelbrot_set_wasm");

mod.then((mod) => {
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
    ctx.clearRect(0, 0, width, height);
    const imgData = new ImageData(
      Uint8ClampedArray.from(mod.img_gen(width, height, calcMax, x, y, mag)),
      width,
      height
    );
    ctx.putImageData(imgData, 0, 0);
  };

  document.getElementById("slide1").addEventListener("input", e => {
    document.getElementById("output1").value = e.target.value;
    mag = e.target.value;
    draw();
  });

  document.getElementById("slide_x").addEventListener("input", e => {
    document.getElementById("output_x").value = e.target.value;
    x = e.target.value;
    draw();
  });

  document.getElementById("slide_y").addEventListener("input", e => {
    document.getElementById("output_y").value = e.target.value;
    y = e.target.value;
    draw();
  });

  document.getElementById("slide_calc").addEventListener("input", e => {
    document.getElementById("output_calc").value = e.target.value;
    calcMax = e.target.value;
    draw();
  });

  draw();
});
