var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var world=[];
var count=0;
var timer;

canvas.onclick = function(event){
	var x = event.offsetX;
	var y = event.offsetY;
	console.log(x);
	console.log(y);
	x = Math.floor(x/10); //300 /10 = 30
	y = Math.floor(y/10); //300 /10 = 
	world[y][x]=1;
	console.log(world);
	drawField();
}

function createWorld(){
	var n=size_world, m=size_world;
	for (var i=0; i<m; i++){
		world[i]=[];
		for (var j=0; j<n; j++){
			world[i][j]=0;
		}
	}
}
size_world=80;
createWorld();

function drawField(){
	ctx.clearRect(0, 0, 800, 800);
	for (var i=0; i<size_world; i++){
		for (var j=0; j<size_world; j++){
			if (world[i][j]==1){
				ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}
}

function fpm(i){
	if(i==0) return size_world;
	else return i;
}
function fpp(i){
	if(i==size_world-1) return -1;
	else return i;
}

function readWorld(){/* вот эта херота для чтения готовой карты https://www.youtube.com/watch?v=p1jqBiqnnxI*/
    
    document.querySelector('#file').addEventListener('click', function(){
        let file =document.getElementById('#file').files[0];
        let reader = new FileReader();
        reader.readAsArray(file);
        reader.onload = function(){
            world = reader;
        }
    })
}

document.getElementById('draw').onclick = startLife;