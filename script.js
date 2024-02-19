// index.js
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const saveButton = document.getElementById("saveButton");
const blackButton = document.getElementById("blackButton");
const redButton = document.getElementById("redButton");
const blueButton = document.getElementById("blueButton");
const imageInput = document.getElementById("imageInput");

canvas.width = 400;
canvas.height = 300;
ctx.fillStyle = "#000"; // Set initial color to black
ctx.lineWidth = 2;

let isDrawing = false;

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

saveButton.addEventListener("click", () => {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png";
    link.click();
});

blackButton.addEventListener("click", () => {
    ctx.strokeStyle = "#000"; // Set color to black
});

redButton.addEventListener("click", () => {
    ctx.strokeStyle = "#ff0000"; // Set color to red
});

blueButton.addEventListener("click", () => {
    ctx.strokeStyle = "#0000ff"; // Set color to blue
});

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };
    reader.readAsDataURL(file);
});