const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let calcMax = 100;

const mandelbrot_recur = (x, y, cx = x, cy = y, m = calcMax) => {
  if (x * x + y * y > 4) {
    return 255*(m/calcMax);
  }
  if (m == 0) return 0;
  return mandelbrot(x * x - y * y + cx, 2 * x * y + cy, cx, cy, m - 1);
};

const mandelbrot_roop = (x, y, cx = x, cy = y, m = calcMax) => {
  while (true) {
    if (x * x + y * y > 4) {
      return 255*(m/calcMax);
    }
    if (m == 0) return 0;
    const tx = x * x - y * y + cx;
    const ty = 2 * x * y + cy;
    x = tx;
    y = ty;
    m--;
  }
}


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
      const color = mandelbrot_roop(tx, ty);
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

const changeSlide = e => {
  document.getElementById("output1").value = e.value;
  mag = e.value;
  draw();
};

const changeSlideX = e => {
  document.getElementById("output_x").value = e.value;
  x = e.value;
  draw();
}

const changeSlideY = e => {
  document.getElementById("output_y").value = e.value;
  y = e.value;
  draw();
}

const changeSlideCalc = e => {
  document.getElementById("output_calc").value = e.value;
  calcMax = e.value;
  draw();
}

draw();
