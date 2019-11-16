const canvas = document.getElementById("jsCanvas");
var ctx;
const colors = document.getElementsByClassName("jsColor");

canvas.width = 500;
canvas.height = 500;

let painting = false;

function init() {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", onMouseLeave);
  }

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.5;
  }

  if (colors) {
    console.log(Array.from(colors));
    Array.from(colors).forEach(color =>
      color.addEventListener("click", handleColorClick)
    );
  }
}

function handleColorClick(event) {
  const col = event.target.style.backgroundColor;
  ctx.strokeStyle = col;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (ctx) {
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}

function onMouseLeave(event) {
  stopPainting();
}

init();
