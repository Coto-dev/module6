const wallColor = "black";
const freeColor = "white";
var matrix = [];
var MatrixSize = 30;
var columns;
var rows;
var canvas = document.getElementById('canvas');
var contex = canvas.getContext('2d');

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let startCords = new Cell(5, 22);
let finishCords = new Cell(22, 2);
let Graph = new Array(MatrixSize);
var isFinisButtonPressed = true;
var isStartButtonPressed = true;
var lastButton = "";
var Cellsize;

//создание матрицы и генерация лабиринта
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function rangeViewer() {
  document.getElementById("MatrixSize").addEventListener("input", function () {
    document.getElementById("rangeValue").textContent = document.getElementById("MatrixSize").value;
  });
}

const erasers = {
  x: 0, y: 0
}

async function main(matrix) {
  document.getElementById("matrixSize").addEventListener("mouseup", function () {
    MatrixSize = Number(document.getElementById("matrixSize").value);
  });
  var size = MatrixSize;
  if (MatrixSize % 2 === 0) {
    size--;
    for (let i = 0; i < MatrixSize; i++) {
      matrix[i][size] = randomInteger(0, 1);
      matrix[size][i] = randomInteger(0, 1);
    }
  }
  while (!isValidMaze(matrix)) {
    MoveErase(size, erasers);
  }

  DrawMaze(MatrixSize, MatrixSize);
}

function CreateMatrix() {
  document.getElementById("matrixSize").addEventListener("mouseup", function () {
    MatrixSize = Number(document.getElementById("matrixSize").value);
  });

  startCords = new Cell(0, 0);
  finishCords = new Cell(0, 0);
  //isFinisButtonPressed = false;
  //isStartButtonPressed = false;
  lastButton = "";
  matrix = [];
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
  Cellsize = canvas.width / MatrixSize;
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

  eraser.x += +dx;
  eraser.y += +dy;

  if (eraser.x < 0) {
    eraser.x *= -1;
  }
  if (eraser.y < 0) {
    eraser.y *= -1;
  }
  if (eraser.x >= size) {
    eraser.x = size - 1;
    dy
  }
  if (eraser.y >= size) {
    eraser.y = size - 1;
  }
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
}

//обработчики событий
canvas.clear = function () {
  contex.clearRect(0, 0, 730, 730);
  startCords = new Cell(0, 0);
  finishCords = new Cell(0, 0);
  isFinisButtonPressed = false;
  isStartButtonPressed = false;
  lastButton = "";
}

function CreateMazes() {
  matrix = CreateMatrix();
  main(matrix);
}

function CreateWall() {
  canvas.addEventListener('mousedown', function (e) {
    var cordX, cordY;
    cordX = e.pageX - this.offsetLeft;
    cordY = e.pageY - this.offsetTop;
    var x = Math.trunc(cordX / Cellsize);
    var y = Math.trunc(cordY / Cellsize);

    matrix[y][x] = false;
    DrawMaze(MatrixSize, MatrixSize);
  });
}

function RemoveWall() {
  canvas.addEventListener('mousedown', function (e) {
    let cordX, cordY;
    cordX = e.pageX - this.offsetLeft;
    cordY = e.pageY - this.offsetTop;
    var x = Math.trunc(cordX / Cellsize);
    var y = Math.trunc(cordY / Cellsize);

    matrix[y][x] = true;
    DrawMaze(MatrixSize, MatrixSize);
  });
}

canvas.addEventListener('mousedown', function (ef) {
  let cordfX, cordfY;
  cordfX = ef.pageX - this.offsetLeft;
  cordfY = ef.pageY - this.offsetTop;
  let fx = Math.trunc(cordfX / Cellsize);
  let fy = Math.trunc(cordfY / Cellsize);
  if ((matrix[fy][fx] === true) || (matrix[fy][fx] === 1)) {
    if (isFinisButtonPressed) {
      finishCords.x = fx;
      finishCords.y = fy;
      isFinisButtonPressed = true;

      const color = 'red';
      contex.beginPath();
      contex.rect(
        fx * Cellsize,
        fy * Cellsize,
        Cellsize,
        Cellsize
      );
      contex.fillStyle = color;
      contex.fill();
    }
    else if (isStartButtonPressed) {
      startCords.x = fx;
      startCords.y = fy;
      isStartButtonPressed = true;

      const color = 'green';
      contex.beginPath();
      contex.rect(
        fx * Cellsize,
        fy * Cellsize,
        Cellsize,
        Cellsize
      );
      contex.fillStyle = color;
      contex.fill();
    }
  }
  else {
    alert("Это стена!");
  }
});

function DrawFinish() {
  isFinisButtonPressed = true;
  isStartButtonPressed = false;
}

function DrawStart() {
  isStartButtonPressed = true;
  isFinisButtonPressed = false;
}

//алгоритм А*

class Node {
  constructor(value, f, g, h, X, Y) {
    this.value = value;
    this.f = f;//сколько энергии нам понадобится, мы предсказываем нам понадобится, чтобы добраться до конца используя этот узел 
    this.h = h;
    this.g = g;//вес, сколько энергии нам понадобилось, чтобы добраться до этого узла
    this.X = X;
    this.Y = Y;
  }
  removeAll() {
    this.value = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.X = 0;
    this.Y = 0;
  }

}

function createMatrix() {
  for (let i = 0; i < MatrixSize; i++) {
    Graph[i] = new Array(MatrixSize);
  }
  for (let i = 0; i < MatrixSize; i++) {
    for (let j = 0; j < MatrixSize; j++) {
      Graph[i][j] = new Node(0, 0, 0, 0, 0, 0);
      Graph[i][j].value = 0;
      if ((matrix[i][j] === 1) || (matrix[i][j] === true)) {
        Graph[i][j].value = 1;
      }
    }
  }
}

let index = 0;
let breakFlag = false;
let OpenList = [];
let CloseList = [];
let changeList = []

function GetDist(first, second) {
  return Math.abs(first.x - second.x) + Math.abs(first.y - second.y);//эвристическая функция для h
}

function isClosed(temp) {
  for (let i = 0; i < CloseList.length; i++) {
    if (temp.x === CloseList[i].x && temp.y === CloseList[i].y) {
      return true;
    }
  }
  return false;
}

function isOpened(temp) {
  for (let i = 0; i < OpenList.length; i++) {
    if (temp.x === OpenList[i].x && temp.y === OpenList[i].y) {
      return true;
    }
  }
  return false;
}

function getMinCell() {//ищем минимальный f
  let min = 9999999;
  let temp = new Cell(0, 0);

  for (let i = 0; i < OpenList.length; i++) {
    const dx = OpenList[i].x;
    const dy = OpenList[i].y;

    if (Graph[dy][dx].f < min) {
      min = Graph[dy][dx];
      index = i;
      temp = new Cell(dx, dy);
    }
  }
  return temp;
}

function CheckPath(current) {
  let x = current.x;
  let y = current.y;
  let cell = new Cell(0, 0);

  OpenList.splice(index, 1);
  CloseList.push(current);
  if (y - 1 >= 0 && Graph[y][x].value !== 0 && !isClosed(new Cell(x, y - 1))) {//пока не долшли до конца
    if (!isOpened(new Cell(x, y - 1))) {
      Graph[y - 1][x].X = x;
      Graph[y - 1][x].Y = y;
      Graph[y - 1][x].h = GetDist(new Cell(x, y - 1), finishCords);
      Graph[y - 1][x].g = 10 + Graph[y][x].g;
      Graph[y - 1][x].f = Graph[y - 1][x].h + Graph[y - 1][x].g;
      OpenList.push(new Cell(x, y - 1));
      cell.x = x;
      cell.y = y - 1;
     // cell.classList.add("currentCell")
      if (x === finishCords.x && y - 1 === finishCords.y) {
        breakFlag = true;
        return 0;
      }
    } else if (Graph[y - 1][x].g > Graph[y][x].g) {
      Graph[y - 1][x].X = x;
      Graph[y - 1][x].Y = y;
      Graph[y - 1][x].g = 10 + Graph[y][x].g;
      Graph[y - 1][x].f = Graph[y - 1][x].h + Graph[y - 1][x].g;
    }
  }
  //down
  if (y + 1 < MatrixSize && Graph[y + 1][x].value !== 0 && !isClosed(new Cell(x, y + 1))) {
    if (!isOpened(new Cell(x, y + 1))) {
      Graph[y + 1][x].X = x;
      Graph[y + 1][x].Y = y;
      Graph[y + 1][x].h = GetDist(new Cell(x, y + 1), finishCords);
      Graph[y + 1][x].g = 10 + Graph[y][x].g;
      Graph[y + 1][x].f = Graph[y + 1][x].h + Graph[y + 1][x].g;
      OpenList.push(new Cell(x, y + 1));
      cell.y = y + 1;
      cell.x = x;
      //cell.classList.add("currentCell")
      if (x === finishCords.x && y + 1 === finishCords.y) {
        breakFlag = true;
        return 0;
      }
    } else if (Graph[y + 1][x].g > Graph[y][x].g) {
      Graph[y + 1][x].X = x;
      Graph[y + 1][x].Y = y;
      Graph[y + 1][x].g = 10 + Graph[y][x].g;
      Graph[y + 1][x].f = Graph[y + 1][x].h + Graph[y + 1][x].g;
    }
  }
  //left
  if (x - 1 >= 0 && Graph[y][x - 1].value !== 0 && !isClosed(new Cell(x - 1, y))) {
    if (!isOpened(new Cell(x - 1, y))) {
      Graph[y][x - 1].X = x;
      Graph[y][x - 1].Y = y;
      Graph[y][x - 1].h = GetDist(new Cell(x - 1, y), finishCords);
      Graph[y][x - 1].g = 10 + Graph[y][x].g;
      Graph[y][x - 1].f = Graph[y][x - 1].h + Graph[y][x - 1].g;
      OpenList.push(new Cell(x - 1, y));
      cell.x = x - 1;
      cell.y = y;
      //cell.classList.add("currentCell")
      if (x - 1 === finishCords.x && y === finishCords.y) {
        breakFlag = true;
        return 0;
      }
    } else if (Graph[y][x - 1].g > Graph[y][x].g) {
      Graph[y][x - 1].X = x;
      Graph[y][x - 1].Y = y;
      Graph[y][x - 1].g = 10 + Graph[y][x].g;
      Graph[y][x - 1].f = Graph[y][x - 1].h + Graph[y][x - 1].g;
    }
  }
  //right
  if (x + 1 < MatrixSize && Graph[y][x + 1].value !== 0 && !isClosed(new Cell(x + 1, y))) {
    if (!isOpened(new Cell(x + 1, y))) {
      Graph[y][x + 1].X = x;
      Graph[y][x + 1].Y = y;
      Graph[y][x + 1].h = GetDist(new Cell(x + 1, y), finishCords);
      Graph[y][x + 1].g = 10 + Graph[y][x].g;
      Graph[y][x + 1].f = Graph[y][x + 1].h + Graph[y][x + 1].g;
      OpenList.push(new Cell(x + 1, y));
      cell.x = x + 1;
      cell.y = y;
     // cell.classList.add("currentCell")
      if (x + 1 === finishCords.x && y === finishCords.y) {
        breakFlag = true;
        return 0;
      }
    } else if (Graph[y][x + 1].g > Graph[y][x].g) {
      Graph[y][x + 1].X = x;
      Graph[y][x + 1].Y = y;
      Graph[y][x + 1].g = 10 + Graph[y][x].g;
      Graph[y][x + 1].f = Graph[y][x - 1].h + Graph[y][x + 1].g;
    }
  }
}

async function drawPath() {
  let x = finishCords.x;
  let y = finishCords.y;
  let cell = new Cell(x, y);
 // cell.classList.remove("currentCell")
  while (x !== startCords.x || y !== startCords.y) {
    if (x !== finishCords.x || y !== finishCords.y){
    const color = 'blue';
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
    let temp = x;
    x = Graph[y][temp].X;
    y = Graph[y][temp].Y;
    cell.x = x;
    cell.y = y;
    //cell.classList.add("path");
    await new Promise(resolve => setTimeout(resolve, 30))
  }
  //cell.classList.remove("path");
  //cell.classList.remove("currentCell");

}

async function aStar() {
  let flag = false
  OpenList.push(startCords);
  CheckPath(startCords)
  while (!breakFlag) {
    var min = getMinCell();
    CheckPath(min);
    if (OpenList.length <= 0) {
      flag = true
      alert("Путь не был найден")
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  if (!flag) {
    await drawPath()
  }

  OpenList.splice(0, OpenList.length);
  changeList.splice(0, changeList.length);
  CloseList.splice(0, CloseList.length);
  index = 0;
  breakFlag = false;
}

async function FindingPath() {
  createMatrix();
  if (startCords != null && finishCords != null) {
    await aStar()
  } else {
    alert("please, input start and finish cells")
  }
}