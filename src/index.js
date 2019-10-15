const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imgData = ctx.createImageData(800, 600);

const calcMax = 100;

const mandelbrot = (x, y, cx, cy, m = calcMax) => {
  if (x * x + y * y > 4) return false;
  if (m == 0) return true;
  return mandelbrot(x * x - y * y + cx, 2 * x * y + cy, cx, cy, m - 1);
};

for (let i = 0; i < 600; i++) {
  for (let j = 0; j < 800; j++) {
    const x = (j - 600) / 300;
    const y = (i - 300) / 300;
    if (mandelbrot(x, y, x, y)) {
      imgData.data[j * 4 + i * imgData.width * 4] = 0;
      imgData.data[1 + j * 4 + i * imgData.width * 4] = 0;
      imgData.data[2 + j * 4 + i * imgData.width * 4] = 0;
      imgData.data[3 + j * 4 + i * imgData.width * 4] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
}
