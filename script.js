const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

const DefaultColor = '#333333';
const DefaultMode = 'color';
const DefaultSize = 16;

let currentColor = DefaultColor;
let currentMode = DefaultMode;
let currentSize = DefaultSize;

function setColor(newColor) {
    currentColor = newColor;
}

function setMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setSize(newSize) {
    currentSize = newSize;
}

colorPicker.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode('color');
rainbowBtn.onclick = () => setMode('rainbow');
eraserBtn.onclick = () => setMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function changeSize(value) {
    setSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    setGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function setGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode == 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode == 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode == 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active');
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
      colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    setGrid(DefaultSize);
    activateButton(DefaultMode);
}