var canvas = document.getElementById('canvas');
var contex = canvas.getContext('2d');

const CellSize = 40;
const Padding = 5;
const wallColor = "black";
const freeColor = "white";

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
  canvas.width = Padding * 2 + columns * CellSize;
  canvas.height = Padding * 2 + rows * CellSize;
  contex.beginPath();
  contex.rect(0, 0, canvas.width, canvas.height);
  contex.fill();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const color = matrix[y][x] ? freeColor: wallColor;
      
      canvas.width = Padding * 2 + columns * CellSize;
      canvas.height = Padding * 2 + rows * CellSize;
      contex.beginPath();
      contex.rect(Padding * 2 + columns * CellSize,
        Padding * 2 + rows * CellSize,
        canvas.width,
        canvas.height);
      contex.fillStyle = color;
      contex.fill();
    }
  }
}
const matrix = CreateMatrix(20, 18);
const eraser = { x: 0, y: 0 };

DrawMaze(20, 18);