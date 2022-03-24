const wallColor = "black";
const freeColor = "white";
let MatrixSize = 30;

var columns;
var rows;
var canvas = document.getElementById('canvas');
var contex = canvas.getContext('2d');

function rangeViewer() {
  document.getElementById("matrixSize").addEventListener("input", function () {
    document.getElementById("rangeValue").textContent = document.getElementById("matrixSize").value;
  });
}

const erasers = [];
for (let i = 0; i < 2; i++) {
  erasers.push({
    x: 0,
    y: 0,
  });
}

function CreateMatrix(columns, rows) {
  const matrix = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < columns; x++) {
      row.push(false);
    }
    matrix.push(row);
  }
  return matrix;
}

const matrix = CreateMatrix(MatrixSize, MatrixSize);
matrix[0][0] = true;

async function main() {
  while (!isValidMaze()) {
    for (const eraser of erasers) {
      MoveErase(eraser);
    }
  }
  DrawMaze();
}

main();

function isValidMaze() {
  for (let y = 0; y < MatrixSize; y += 2) {
    for (let x = 0; x < MatrixSize; x += 2) {
      if (!matrix[y][x]) {
        return false;
      }
    }
  }
  return true;
}

function DrawMaze(columns, rows) {
  contex.beginPath();
  contex.rect(0, 0, canvas.width, canvas.height);
  contex.fill();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const color = matrix[y][x] ? freeColor : wallColor;
      contex.beginPath();
      contex.rect(
        x * CellSize,
        y * CellSize,
        CellSize,
        CellSize);
      contex.fillStyle = color;
      contex.fill();
    }
  }
}

function getRandomItem(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function MoveErase(eraser) {
  const directions = [];

  if (eraser.x > 0) {
    directions.push([-2, 0]);
  }

  if (eraser.x < MatrixSize - 1) {
    directions.push([2, 0]);
  }

  if (eraser.y > 0) {
    directions.push([0, -2]);
  }

  if (eraser.y < MatrixSize - 1) {
    directions.push([0, 2]);
  }

  var [dx, dy] = getRandomItem(directions);

  eraser.x += dx;
  eraser.y += dy;

  if (!matrix[eraser.y][eraser.x]) {
    matrix[eraser.y][eraser.x] = true;
    matrix[eraser.y - dy / 2][eraser.x - dx / 2] = 0
  }
}