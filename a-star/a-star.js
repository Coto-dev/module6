const wallColor = "black";
const freeColor = "white";
var MatrixSize = 31;
let lastButton = "";
var columns;
var rows;
var canvas = document.getElementById('canvas');
var contex = canvas.getContext('2d');

let isFinisButtonPressed = false;
let isStartButtonPressed = false;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let startCords = new Cell(0, 0);
let finishCords = new Cell(0, 0);

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function rangeViewer() {
  document.getElementById("matrixSize").addEventListener("input", function () {
    document.getElementById("rangeValue").textContent = document.getElementById("matrixSize").value;
  });
}

let Cellsize = canvas.width / MatrixSize;

const erasers = {
  x: 0, y: 0
}

async function main(matrix) {
  let size = MatrixSize;
  if (MatrixSize % 2 === 0) {
    size--;
    for (let i = 0; i < MatrixSize; i++) {
      matrix[i][size] = randomInteger(0, 1);
      matrix[size][i] = randomInteger(0, 1);
    }
  }
  while (!isValidMaze(matrix)) {
    //for (const eraser of erasers) {
    MoveErase(size, erasers);
    // }
  }
  /*if (MatrixSize % 2 === 0) {
   for (let i = 0; i < MatrixSize; i++) {
     if (matrix[i][size-1] == 0) {
       matrix[i][size] = 0;
     }
     else {
       matrix[i][size] = 1;
     }
     if (matrix[size-1][i] == 0) {
       matrix[size][i] = 0;
     }
     else {
       matrix[size][i] = 1;
     }

   }
 }*/
  DrawMaze(MatrixSize, MatrixSize);
}

function matrixCreation() {
  var matrix = CreateMatrix();
  //updateMatrix();
  return matrix;
}

function updateMatrix() {
  document.getElementById("matrixSize").addEventListener("mouseup", function () {
    MatrixSize = Number(document.getElementById("matrixSize").value);
    startCords = new Cell(0, 0);
    finishCords = new Cell(0, 0);
    isFinisButtonPressed = false;
    isStartButtonPressed = false;
    lastButton = "";
    let matrix = CreateMatrix(MatrixSize, MatrixSize);
    return matrix;
  });
}

function GetMatrixSize() {
  document.getElementById("matrixSize").addEventListener("mouseup", function () {
    let MatrixSize = Number(document.getElementById("matrixSize").value);
    return MatrixSize;
  });
}
function CreateMatrix() {
  document.getElementById("matrixSize").addEventListener("mouseup", function () {
    MatrixSize = Number(document.getElementById("matrixSize").value);
  });

    //MatrixSize = GetMatrixSize;
    startCords = new Cell(0, 0);
    finishCords = new Cell(0, 0);
    isFinisButtonPressed = false;
    isStartButtonPressed = false;
    lastButton = "";

    var matrix = [];
    for (let y = 0; y < MatrixSize; y++) {
      const row = [];
      for (let x = 0; x < MatrixSize; x++) {
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

function MoveErase(size, eraser) {
  const directions = [];

  if (eraser.x > 0) {
    directions.push([-2, 0]);
  }

  if (eraser.x < size - 1) {
    directions.push([2, 0]);
  }

  if (eraser.y > 0) {
    directions.push([0, -2]);
  }

  if (eraser.y < size - 1) {
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
      console.log
      if (!matrix[y][x]) {
        return false;
      }
    }
  }
  return true;
}
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
   matrix = CreateMatrix();
  //matrix = matrixCreation();
  //updateMatrix();
  main(matrix);
}

function CreateWall(matrix) {
  canvas.addEventListener('mousedown', function (e) {
    var cordX, cordY;
    cordX = e.pageX - this.offsetLeft;
    cordY = e.pageY - this.offsetTop;
    let x = Math.trunc(cordX / Cellsize);
    let y = Math.trunc(cordY / Cellsize);
    //console.log(x, y);
  });
  matrix[y][x] = false;
  DrawMaze(MatrixSize, MatrixSize);
}