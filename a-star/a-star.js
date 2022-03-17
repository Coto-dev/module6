var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const CellSize=10;
const Padding=5;
const wallColor='black';
const freeColor='white';

const matrix=createMatrix(10,10);
const eraser ={x:0,y:0};

drawMaze

function crateMatrix(columns,rows)
{
  const matrix=[];
  for (let y=0; y < rows; y++)
  {
    const rows=[];
    for (let x=0; x<columns;x++)
    {
      rows.push(false);
    }
    matrix.push(rows);
  }
}

function DrawMaze()
{
  canvas.width=Padding*2+columns*CellSize;
  canvas.height=Padding*2+rows*CellSize;
}
