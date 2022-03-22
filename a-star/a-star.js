var canvas = document.getElementById('canvas');
var contex = canvas.getContext('2d');
var size = document.getElementsByTagName("input").value;

const CellSize = canvas.width / size;
const Padding = 10;
const wallColor = "black";
const freeColor = "white";

const matrix = CreateMatrix(size, size);
let eraser = {
  x: 0,
  y: 0,
};

matrix[eraser.y][eraser.x] = true;

function CreateMatrix(columns, rows) {
  const matrix = [];
  for (let y = 0; y < rows; y++) {
    const rows = [];
    for (let x = 0; x < columns; x++) {
      rows.push(false);
    }
    matrix.push(rows);
  }
  return matrix;
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
        Padding * 2 + columns * CellSize,
        Padding * 2 + rows * CellSize,
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

eraser.push({
  x: 0,
  y: 0,
});

function MoveErase(eraser) {
  const directions = [];

  if (eraser.x > 0) {
    directions.push([-2, 0]);
  }
  if (eraser.x > columns - 1) {
    directions.push([2, 0]);
  }
  if (eraser.y > 0) {
    directions.push([0, -2]);
  }
  if (eraser.y > rows - 1) {
    directions.push([0, 2]);
  }
  const [dx, dy] = getRandomItem(directions);

  eraser.x += dx;
  eraser.y += dy;

  if (!matrix[eraser.y][eraser.x]) {
    matrix[eraser.y][eraser.x] = true;
    matrix[eraser.y - dy / 2][eraser.x - dx / 2] = true;
  }
}


DrawMaze(size, size);
MoveErase(eraser);