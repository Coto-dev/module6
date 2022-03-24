const wallColor = "black";
const freeColor = "white";
let MatrixSize = 41;

var columns;
var rows;
var canvas = document.getElementById('canvas');
var contex = canvas.getContext('2d');
const isFinisButtonPressed = false;
const isStartButtonPressed = false;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let startCords = new Cell(0, 0);
let finishCords = new Cell(0, 0);

function rangeViewer() {
  document.getElementById("matrixSize").addEventListener("input", function () {
    document.getElementById("rangeValue").textContent = document.getElementById("matrixSize").value;
  });
}

let Cellsize = canvas.width / MatrixSize;

const erasers = [];
for (let i = 0; i < 2; i++) {
  erasers.push({
    x: 0,
    y: 0,
  });
}

async function main(matrix) {
  while (!isValidMaze(matrix)) {
    for (const eraser of erasers) {
      MoveErase(eraser);
    }
  }
  DrawMaze(MatrixSize, MatrixSize);
}
//rangeViewer()
//buttonEventListener()
//updateMatrix();

function matrixCreation() {
  const matrix = CreateMatrix(MatrixSize, MatrixSize);
  updateMatrix();
  return matrix;
}

function updateMatrix() {
  document.getElementById("matrixSize").addEventListener("mouseup", function () {
    matrixSize = Number(document.getElementById("matrixSize").value);
    startCords = new Cell(0, 0);
    finishCords = new Cell(0, 0);
    isFinisButtonPressed = false;
    isStartButtonPressed = false;
    //lastButton = "";
    matrix = CreateMatrix(MatrixSize, MatrixSize);
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
  matrix[0][0] = true;
  return matrix;
}

function DrawMaze(columns, rows) {

  for (let y = 0; y < columns; y++) {
    for (let x = 0; x < rows; x++) {
      const color = matrix[y][x] ? freeColor : wallColor;

      contex.beginPath();
      contex.rect(
        x * Cellsize,
        y * Cellsize,
        Cellsize,
        Cellsize
      );
      contex.fillStyle = color;
      contex.fill();
    }
  }
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
    matrix[eraser.y - dy / 2][eraser.x - dx / 2] = true;
  }
}

function getRandomItem(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function isValidMaze(matrix) {
  for (let y = 0; y < MatrixSize; y += 2) {
    for (let x = 0; x < MatrixSize; x += 2) {
      if (!matrix[y][x]) {
        return false;
      }
    }
  }
  return true;
}/////////////////////////////////////////////////////////////////////////////////////////////////////
// Обработчики событий нажатия на кнопки
function buttonEventListener() {
  let buttons = document.querySelectorAll(".butt");
  buttons.forEach(function (button) {
    button.addEventListener("mousedown", function () {
      if (button.id === "ClearMaze") {
        clearMatrix()
      } else if (button.id === "CreateMaze") {
        clearMatrix()
        mazeCreation()
      } else {
        lastButton = button.innerText;
      }
    })

  });
}

canvas.clear = function () {
  contex.clearRect(0, 0, 730, 730);
  updateMatrix();
}

function CreateMazes() {
   matrix = matrixCreation();
  main(matrix);
}