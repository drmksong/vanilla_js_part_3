const canvas = document.getElementById("jsCanvas");
var ctx;
const colors = document.getElementsByClassName("jsColor");
const brush = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = 500;
canvas.height = 500;

let painting = false;
let filling = false;

function init() {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("contextmenu", handleCM);
  }

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    //ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "black";
    ctx.lineWidth = 2.5;
  }

  if (colors) {
    Array.from(colors).forEach(color =>
      color.addEventListener("click", handleColorClick)
    );
  }

  if (brush) {
    brush.addEventListener("click", handleBrushChange);
  }

  if (mode) {
    mode.addEventListener("click", handleModeClick);
  }

  if (save) {
    save.addEventListener("click", handleSave);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "painting";
  link.click();
}

function handleModeClick(event) {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleBrushChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleColorClick(event) {
  const col = event.target.style.backgroundColor;
  ctx.strokeStyle = col;
  ctx.fillStyle = col;
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
  if (!filling) {
    painting = true;
  } else {
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, 500, 500);
  }
}
function stopPainting() {
  painting = false;
}

function onMouseLeave(event) {
  stopPainting();
}

init();
