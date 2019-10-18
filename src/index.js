const mandelbrot_set_wasm = import("mandelbrot_set_wasm");

mandelbrot_set_wasm.then(mandelbrot_set_wasm => {
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
    const imgData = ctx.createImageData(width, height);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const tx = (j - x) / mag;
        const ty = (i - y) / mag;
        const color = mandelbrot_set_wasm.mandelbrot(tx, ty, calcMax);
        if (color < 255) {
          imgData.data[j * 4 + i * imgData.width * 4] = color;
          imgData.data[1 + j * 4 + i * imgData.width * 4] = color;
          imgData.data[2 + j * 4 + i * imgData.width * 4] = color;
          imgData.data[3 + j * 4 + i * imgData.width * 4] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    }
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
