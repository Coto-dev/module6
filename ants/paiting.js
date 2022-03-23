var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var size_world=80;
var $world=[];
var feromon = [];
var eat_count=0;
var timer;
var home = {
    x: 0,
    y: 0
};

home.x=10;
home.y=20;



canvas.onclick = function(event){//это чтобы рисовать стены
	var x = event.offsetX;
	var y = event.offsetY;
	console.log(x);
	console.log(y);
	x = Math.floor(x/10); //300 /10 = 30
	y = Math.floor(y/10); //300 /10 = 
	world[y][x]=-1;
	world[home.x][home.y]=-2;
	console.log(world);
	drawField();
}





function build_home(){//это чтобы ставить дом на карту не работает
	
	addEventListener("click", function() {
		
		var x = offsetY;
		var y = offsetY;
		console.log(x);
		console.log(y);
		x = Math.floor(x/10); //300 /10 = 30
		y = Math.floor(y/10); //300 /10 = 

		home.x=x;
		home.y=y;

		world[y][x]=-2;
		console.log(world);
		drawField();
	});
}

function drop_food(){//это чтобы ставить дом на карту не работает
	
	addEventListener("click", function() {
		
		var x = offsetY;
		var y = offsetY;
		console.log(x);
		console.log(y);
		x = Math.floor(x/10); //300 /10 = 30
		y = Math.floor(y/10); //300 /10 = 

		home.x=x;
		home.y=y;

		world[y][x]=1;
		console.log(world);
		drawField();
	});
}



function createWorld(){//инициализирует мир
	var n=size_world, m=size_world;
	for (var i=0; i<m; i++){
		world[i]=[];
		feromon[i]=[];
		for (var j=0; j<n; j++){
			world[i][j]=0;
			feromon[i][j]=0;
		}
	}
}

function drawField(){
	ctx.clearRect(0, 0, 800, 800);
	for (var i=0; i<size_world; i++){
		for (var j=0; j<size_world; j++){
			if (world[i][j]==-1){
				ctx.fillStyle = 'black';
				ctx.fillRect(j*10, i*10, 10, 10);
			}
			else 
				if(world[i][j]==-2){
					ctx.fillStyle = 'red';
					ctx.fillRect(j*10, i*10, 10, 10);
				}
				else
				if(world[i][j]>0){
					ctx.fillStyle = 'green';
					ctx.fillRect(j*10, i*10, 10, 10);
				}
		}
	}
}


createWorld();



eat_count = 2;
world[13][20]=1;
world[33][20]=1;

document.getElementById('home').onclick = build_home;