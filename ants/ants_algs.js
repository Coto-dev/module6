var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ant_count = 70;
var ant = new Array(ant_count);
const speed = 1.4;
var marker=0;//0-стена 1-еда 2-дом
var iter_time=30;//скорость работы алгоритма
var eat_count=1;
var time = 100;
const size_world=80;
var world=[];
var fer_to_home = [];
fer_to_home[0] = {
	time: time,
	x: 0,
	y: 0
}
var fer_eat = [];
fer_eat[0] = {
	time: time,
	x: 0,
	y: 0
}

var timer;
var home = {
    x: 0,
    y: 0
};

async  function clean(){
	for(let i=0;i<80;i++)
	for(let j=0;j<80;j++)
	{
		world[i][j].map=0;
	}
	ant_count = 30;
	time = 300;

	ant=[];
	fer_eat=[];
	fer_to_home=[];
	world=[];
	createWorld();
	drawField();
	setTimeout(() => { clearInterval(interval)}, 10);
}

function new_speed_iter(){
	setTimeout(() => { clearInterval(interval); interval=setInterval(ant_algoritm, iter_time); }, 10);
}

async  function world1(){
	for(let i=20;i<40;i++)
	for(let j=20;j<40;j++)
	{
		if(i>=j-20&&i*j+30>600&&i*j<1000-i) world[i][j].map=-1;
	}
	ant_count = 30;
	time = 300;
	drawField();
}
async function world2(){
	for(let i=0;i<10;i++)
	for(let j=0;j<80;j++)
	{
		world[i][j].map=-1;
	}
	for(let i=10;i<80;i++)
	for(let j=0;j<10;j++)
	{
		world[i][j].map=-1;
	}
	for(let i=40;i<60;i++)
	for(let j=30;j<80;j++)
	{
		world[i][j].map=-1;
	}
	ant_count = 70;
	time = 700;
	drawField();
}



canvas.onmousemove = function(event){//это чтобы рисовать стены
	if(event.buttons !== 1){return; }
	var x = event.offsetX;
	var y = event.offsetY;
	x = Math.floor(x/10); //300 /10 = 30
	y = Math.floor(y/10); //300 /10 = 
	if(marker==0)
		world[x][y].map=-1;
		else if(marker==1)
		{
			world[x][y].map=eat_count;
			world[x][(y-1)%80].map=eat_count;
		}
		else if(marker==3){
			for(let i=0;i<10;i++)
			for(let j=0;j<10;j++){
				world[x+5-i][y+5-j].map=0;
			}
		}
			else {
				home.x=x;
				home.y=y;
				world[x][y].map=-2;
			}
	world[home.x][home.y].map=-2;
	drawField();
	drawAnt();
}

function createWorld(){//инициализирует мир
	var n=size_world, m=size_world;
	for (var i=0; i<m; i++){
		world[i]=[];
		world[i][0]={
			map: 0,
			eat: 0,
			to_home:0
		}
		for (var j=0; j<n; j++){
			world[i][j]={
				map: 0,
				eat: 0,
				to_home:0
			};
		}
	}
}

function drawAnt(){
    ctx.fillStyle = 'blue';
    for(let i=0;i<ant_count;i++)
        ctx.fillRect(ant[i].x*10, 10*ant[i].y,10,10);
}

//-1-стена
//-2-дом
//>0-еда
function drawField(){
	ctx.clearRect(0, 0, size_world*10, size_world*10);
	for (var i=0; i<size_world; i++){
		for (var j=0; j<size_world; j++){
			if (world[i][j].map==-1){//стена
				ctx.fillStyle = 'black';
				ctx.fillRect(i*10, j*10, 10, 10);
			}
			else
				if(world[i][j].map==1){
					ctx.fillStyle = "#8afa34";
					ctx.fillRect(i*10, 10*j,20,20);
				} 
				else if(world[i][j].map==2){
					ctx.fillStyle = "#2bb52b";
					ctx.fillRect(i*10, 10*j,20,20);
				} 
				else if(world[i][j].map==3){
					ctx.fillStyle = "#228c22";
					ctx.fillRect(i*10, 10*j,20,20);
				} 
				else if(world[i][j].map==4){
					ctx.fillStyle = "#0e3b0e";
					ctx.fillRect(i*10, 10*j,20,20);
				} 
				else if(world[i][j].map>4){
					ctx.fillStyle = "#132712";
					ctx.fillRect(i*10, 10*j,20,20);
				} 
			if(world[i][j].fer_eat<1)world[i][j].fer_eat=0;
			if(world[i][j].fer_to_home<1)world[i][j].fer_to_home=0;
		}
	}
	ctx.fillStyle = 'white';
	for(let i=0;i<fer_eat.length;i++){
		ctx.fillRect(fer_eat[i].x*10+Math.round(Math.random()*7), fer_eat[i].y*10+Math.round(Math.random()*7), 3, 3);
	}
	ctx.fillStyle = 'brown';
	for(let i=0;i<fer_to_home.length;i++){
		ctx.fillRect(fer_to_home[i].x*10+Math.round(Math.random()*7), fer_to_home[i].y*10+Math.round(Math.random()*7), 3, 3);
	}

	
	ctx.fillStyle = 'red';
		ctx.fillRect(home.x*10, home.y*10, 20, 20);
}


function createColony() {
        ant[0]={
            x: home.x,
            y: home.y,
			eat: 0,
            angle: (Math.random()*10)%2,
			dist_time: time
        };
        for(let i=1;i<ant_count;i++){
            ant[i]={
			 	x: home.x,
				y: home.y,
				eat: 0,
				angle:(Math.random()*10)%2,
				dist_time: time
        };
    }
}

function update_fer(){
	let i=0;
	while(i<fer_to_home.length){
		fer_to_home[i].time --;
		if(world[fer_to_home[i].x][fer_to_home[i].y].to_home>=1)
			world[fer_to_home[i].x][fer_to_home[i].y].to_home--;
		if (fer_to_home[i].time<=0) {
			fer_to_home.splice(i, 1);
			i--;
		}
		i++;
	}
	
	
	i = 0;
	while(i<fer_eat.length){
		fer_eat[i].time --;
		if(world[fer_eat[i].x][fer_eat[i].y].eat>=1)
			world[fer_eat[i].x][fer_eat[i].y].eat--;
		if (fer_eat[i].time<=0) {
			fer_eat.splice(i, 1);
			i--;
		}
		i++;
	}
}

function new_fer_to_home(i){
	fer_to_home.push({
		time: ant[i].dist_time,
		x: ant[i].x,
		y: ant[i].y,
	})
	world[ant[i].x][ant[i].y].to_home += ant[i].dist_time;
}

function new_fer_eat(i){//у него есть еда
	fer_eat.push({
		time: ant[i].dist_time*ant[i].eat,
		x: ant[i].x,
		y: ant[i].y,
	})
	world[ant[i].x][ant[i].y].eat += ant[i].dist_time*ant[i].eat;
}

function diagonal_to_home(ant, X, Y){
	let i = X, j=Y, k=0, p=0;
	if(ant.x+i<size_world && ant.x+i>0 && ant.y+j<size_world && ant.y+j>0){
    if(world[ant.x+i][ant.y+j].map<-1) p+=1000000;
		p=world[ant.x+i][ant.y+j].to_home;
		i+=X; j+=Y;	k++;
	}
	while(ant.x+i<size_world&&ant.x+i>=0&&ant.y+j<size_world&&ant.y+j>=0&&ant.x+i-Y<size_world && ant.x+i-Y>=0 && ant.y+j-X<size_world && ant.y+j-X>=0 && k<10){
    if(world[ant.x+i][ant.y+j].map<-1||world[ant.x+i-Y][ant.y+j].map<-1||world[ant.x+i][ant.y+j-X].map<-1) p+=1000000;
		p+=world[ant.x+i-Y][ant.y+j].to_home;
		p+=world[ant.x+i][ant.y+j-X].to_home;
		p+=world[ant.x+i][ant.y+j].to_home;
		i+=X; j+=Y;k+=3;
	} 
	return p/k;
	}
	
function cross_to_home(ant, X, Y){
		let i = X, j=Y, k=0, p=0;
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0){
			if(world[ant.x+i][ant.y+j].map<-1) p+=1000000;
			p+=world[ant.x+i][ant.y+j].to_home;
			i+=X; j+=Y;	k++;
		}
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0){
			if(world[ant.x+i][ant.y+j].map<-1) p+=1000000;
			p+=world[ant.x+i][ant.y+j].to_home;
			i+=X; j+=Y;	k++;
		}
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0){
			if(world[ant.x+i-Y][ant.y+j-X].map<-1 || world[ant.x+i+Y][ant.y+j+X].map<-1 ||world[ant.x+i][ant.y+j].map<-1) p+=1000000;
			p+=world[ant.x+i-Y][ant.y+j-X].to_home;
			p+=world[ant.x+i+Y][ant.y+j+X].to_home;
			p+=world[ant.x+i][ant.y+j].to_home;
			i+=X; j+=Y;k+=3;
		}
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0 && k<10){
			if(world[ant.x+i-Y][ant.y+j-X].map<-1 || world[ant.x+i+Y][ant.y+j+X].map<-1 ||world[ant.x+i][ant.y+j].map<-1) p+=1000000;
			p+=world[ant.x+i-Y][ant.y+j-X].to_home;
			p+=world[ant.x+i+Y][ant.y+j+X].to_home;
			p+=world[ant.x+i][ant.y+j].to_home;
			k+=3;
		}
		if(ant.x+i+2*Math.abs(Y)<size_world && ant.x+i-2*Math.abs(Y)>0 && ant.y+j+2*Math.abs(X)<size_world && ant.y+j-2*Math.abs(X)>0 && k<10){
			if(world[ant.x+i-2*Y][ant.y+j-2*X].map<-1 || world[ant.x+i+2*Y][ant.y+j+2*X].map<-1) p+=1000000;
			p+=world[ant.x+i-2*Y][ant.y+j-2*X].to_home;
			p+=world[ant.x+i+2*Y][ant.y+j+2*X].to_home;
			i+=X; j+=Y;k+=2;
		} 
		return p/k;
	}

function NewAngle_eat(ant){//у него есть еда и он хочет домой
	angle = 0;
	 //будем делать 8 секторов вокруг и 
	 let sec1=0;
	 let sec2=0;
	 let sec3=0;
	 let sec4=0;
	 let sec5=0;
	if (ant.angle>=1/6 && ant.angle<=1/3)//2
		{
		   sec1 = diagonal_to_home(ant, 1, -1);
		   sec2 = cross_to_home(ant, 0, -1);
		   sec3 = cross_to_home(ant, 1, 0);
		   sec4 = diagonal_to_home(ant, -1, -1);
		   sec5 = diagonal_to_home(ant, 1, 1);
		}
		else if (ant.angle>=1/3 && ant.angle<=2*1/3)//3
		{
		   sec1 = cross_to_home(ant, 0, -1);
		   sec2 = diagonal_to_home(ant, -1, -1);
		   sec3 = diagonal_to_home(ant, 1, -1);
		   sec4 = cross_to_home(ant, -1, 0);
		   sec5 = cross_to_home(ant, 1, 0);
		}
		else if (ant.angle>=2/3 && ant.angle<=5/6)//4
		{
		   sec1 = diagonal_to_home(ant, -1, -1);
		   sec2 = cross_to_home(ant, -1, 0);
		   sec3 = cross_to_home(ant, 0, -1);
		   sec4 = diagonal_to_home(ant, -1, 1);
		   sec5 = diagonal_to_home(ant, 1, -1);
		}
		else if (ant.angle>=5/6 && ant.angle<=7/6)//5
		{
		   sec1 = cross_to_home(ant, -1, 0);
		   sec2 = diagonal_to_home(ant, -1, 1);
		   sec3 = diagonal_to_home(ant, -1, -1);
		   sec4 = cross_to_home(ant, 0, 1);
		   sec5 = cross_to_home(ant, 0, -1);
		}
		else if (ant.angle>=7*1/6 && ant.angle<=4*1/3)//6
		{
		   sec1 = diagonal_to_home(ant, -1, 1);
		   sec2 = cross_to_home(ant, 0, 1);
		   sec3 = cross_to_home(ant, -1, 0);
		   sec4 = diagonal_to_home(ant, 1, 1);
		   sec5 = diagonal_to_home(ant, -1, -1);
		}
		else if (ant.angle>=4*1/3 && ant.angle<=5*1/3)//7
		{
		   sec1 = cross_to_home(ant, 0, 1);
		   sec2 = diagonal_to_home(ant, 1, 1);
		   sec3 = diagonal_to_home(ant, -1, 1);
		   sec4 = cross_to_home(ant, 1, 0);
		   sec5 = cross_to_home(ant, -1, 0);
		}
		else if (ant.angle>=5*1/3 && ant.angle<=11*1/6)//8
		{
		   sec1 = diagonal_to_home(ant, 1, 1);
		   sec2 = cross_to_home(ant, 1, 0);
		   sec3 = cross_to_home(ant, 0, 1);
		   sec4 = diagonal_to_home(ant, 1, -1);
		   sec5 = diagonal_to_home(ant, -1, 1);
		}
		else{//1
		   sec1 = cross_to_home(ant, 1, 0);
		   sec2 = diagonal_to_home(ant, 1, -1);
		   sec3 = diagonal_to_home(ant, 1, 1);
		   sec4 = cross_to_home(ant, 0, -1);
		   sec5 = cross_to_home(ant, 0, 1);
		}

	 if(sec1+sec2+sec3+sec4+sec5<=0) return (Math.random()*1/5)-1/10;
		 else{
			let k= Math.round(Math.random()*10000000)%(sec1+sec2+sec3+sec4+sec5);
			if(k<sec1)	return 0;
			else if(k<sec1+sec2) return 2/6;
			else if(k<sec1+sec2+sec3) return -2/6;
			else if(k<sec1+sec2+sec3+sec4) return 3/6;
			else return -3/6;
		 }
}








function diagonal_eat(ant, X, Y){
	let i = X, j=Y, k=0, p=0;
	if(ant.x+i<size_world && ant.x+i>=0 && ant.y+j<size_world && ant.y+j>=0){
		if(world[ant.x+i][ant.y+j].map>0) p+=1000000;
		p=world[ant.x+i][ant.y+j].eat;
		i+=X; j+=Y;	k++;
	}
	while(ant.x+i<size_world-1 && ant.x+i>0 && ant.y+j<size_world-1 && ant.y+j>0&&k<10){
		if(world[ant.x+i-Y][ant.y+j].map>0 || world[ant.x+i][ant.y+j-X].map>0 ||world[ant.x+i][ant.y+j].map>0) p+=1000000;
		p+=world[ant.x+i-Y][ant.y+j].eat;
		p+=world[ant.x+i][ant.y+j-X].eat;
		p+=world[ant.x+i][ant.y+j].eat;
		i+=X; j+=Y;k+=3;
	} 
	return p/k;
	}

	
function cross_eat(ant, X, Y){
		let i = X, j=Y, k=0, p=0;
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0){
			if(world[ant.x+i][ant.y+j].map>0)p+=1000000;
			p+=world[ant.x+i][ant.y+j].eat;
			i+=X; j+=Y;	k++;
		}
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0){
			if(world[ant.x+i][ant.y+j].map>0)p+=1000000;
			p+=world[ant.x+i][ant.y+j].eat;
			i+=X; j+=Y;	k++;
		}
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0){
			if(world[ant.x+i-Y][ant.y+j-X].map>0 || world[ant.x+i+Y][ant.y+j+X].map>0 ||world[ant.x+i][ant.y+j].map>0) p+=1000000;
			p+=world[ant.x+i-Y][ant.y+j-X].eat;
			p+=world[ant.x+i+Y][ant.y+j+X].eat;
			p+=world[ant.x+i][ant.y+j].eat;
			i+=X; j+=Y;k+=3;
		}
		if(ant.x+i+Math.abs(Y)<size_world && ant.x+i-Math.abs(Y)>0 && ant.y+j+Math.abs(X)<size_world && ant.y+j-Math.abs(X)>0 && k<10){
			if(world[ant.x+i-Y][ant.y+j-X].map>0 || world[ant.x+i+Y][ant.y+j+X].map>0 ||world[ant.x+i][ant.y+j].map>0) p+=1000000;
			p+=world[ant.x+i-Y][ant.y+j-X].eat;
			p+=world[ant.x+i+Y][ant.y+j+X].eat;
			p+=world[ant.x+i][ant.y+j].eat;
			k+=3;
		}
		if(ant.x+i+2*Math.abs(Y)<size_world && ant.x+i-2*Math.abs(Y)>0 && ant.y+j+2*Math.abs(X)<size_world && ant.y+j-2*Math.abs(X)>0 && k<10){
			if(world[ant.x+i-Y][ant.y+j-X].map>0 || world[ant.x+i+Y][ant.y+j+X].map>0 ||world[ant.x+i][ant.y+j].map>0) p+=1000000;
			p+=world[ant.x+i-2*Y][ant.y+j-2*X].eat;
			p+=world[ant.x+i+2*Y][ant.y+j+2*X].eat;
			i+=X; j+=Y;k+=2;
		} 
		return Math.round(p/k);
	}
	
function NewAngle_to_home(ant){//у него нет еды, он хочет кушать
		angle = 0;
		 //будем делать 8 секторов вокруг и 
		 let sec1=0;
		 let sec2=0;
		 let sec3=0;
		 let sec4=0;
		 let sec5=0;
		 if (ant.angle>=1/6 && ant.angle<=1/3)//2
		 {
			sec1 = diagonal_eat(ant, 1, -1);
			sec2 = cross_eat(ant, 0, -1);
			sec3 = cross_eat(ant, 1, 0);
			sec4 = diagonal_eat(ant, -1, -1);
			sec5 = diagonal_eat(ant, 1, 1);
		 }
		 else if (ant.angle>=1/3 && ant.angle<=2*1/3)//3
		 {
			sec1 = cross_eat(ant, 0, -1);
			sec2 = diagonal_eat(ant, -1, -1);
			sec3 = diagonal_eat(ant, 1, -1);
			sec4 = cross_eat(ant, -1, 0);
			sec5 = cross_eat(ant, 1, 0);
		 }
		 else if (ant.angle>=2/3 && ant.angle<=5/6)//4
		 {
			sec1 = diagonal_eat(ant, -1, -1);
			sec2 = cross_eat(ant, -1, 0);
			sec3 = cross_eat(ant, 0, -1);
			sec4 = diagonal_eat(ant, -1, 1);
			sec5 = diagonal_eat(ant, 1, -1);
		 }
		 else if (ant.angle>=5/6 && ant.angle<=7/6)//5
		 {
			sec1 = cross_eat(ant, -1, 0);
			sec2 = diagonal_eat(ant, -1, 1);
			sec3 = diagonal_eat(ant, -1, -1);
			sec4 = cross_eat(ant, 0, 1);
			sec5 = cross_eat(ant, 0, -1);
		 }
		 else if (ant.angle>=7*1/6 && ant.angle<=4*1/3)//6
		 {
			sec1 = diagonal_eat(ant, -1, 1);
			sec2 = cross_eat(ant, 0, 1);
			sec3 = cross_eat(ant, -1, 0);
			sec4 = diagonal_eat(ant, 1, 1);
			sec5 = diagonal_eat(ant, -1, -1);
		 }
		 else if (ant.angle>=4*1/3 && ant.angle<=5*1/3)//7
		 {
			sec1 = cross_eat(ant, 0, 1);
			sec2 = diagonal_eat(ant, 1, 1);
			sec3 = diagonal_eat(ant, -1, 1);
			sec4 = cross_eat(ant, 1, 0);
			sec5 = cross_eat(ant, -1, 0);
		 }
		 else if (ant.angle>=5*1/3 && ant.angle<=11*1/6)//8
		 {
			sec1 = diagonal_eat(ant, 1, 1);
			sec2 = cross_eat(ant, 1, 0);
			sec3 = cross_eat(ant, 0, 1);
			sec4 = diagonal_eat(ant, 1, -1);
			sec5 = diagonal_eat(ant, -1, 1);
		 }
		 else{//1
			sec1 = cross_eat(ant, 1, 0);
			sec2 = diagonal_eat(ant, 1, -1);
			sec3 = diagonal_eat(ant, 1, 1);
			sec4 = cross_eat(ant, 0, -1);
			sec5 = cross_eat(ant, 0, 1);
		 }
		
		 if(sec1+sec2+sec3+sec4+sec5<=0) return (Math.random()*1/5)-1/10;
		 else{
			let k= Math.round(Math.random()*1000000)%(sec1+sec2+sec3+sec4+sec5);
			if(k<sec1)	return 0;
			else if(k<sec1+sec2) return 2/6;
			else if(k<sec1+sec2+sec3) return -2/6;
			else if(k<sec1+sec2+sec3+sec4) return 3/6;
			else return -3/6;
		 }
	}



function ant_algoritm(){
	update_fer();
	//console.log(ant);
	//console.log(fer_to_home);
	//console.log(world);
    for(let i=0;i<ant_count;i++){
		ant[i].dist_time*=0.99;
		if (ant[i].eat == 0){	
			new_fer_to_home(i);
			ant[i].angle += NewAngle_to_home(ant[i]);
		}
		else {
			new_fer_eat(i);
			ant[i].angle += NewAngle_eat(ant[i]);
			}

		if(ant[i].angle>2)ant[i].angle-=2;
		else if(ant[i].angle<0)ant[i].angle+=2;
		
		if( ant[i].angle<=1/2){
        	var x = Math.round(ant[i].x + speed*Math.cos(-ant[i].angle*Math.PI));
        	var y = Math.round(ant[i].y + speed*Math.sin(-ant[i].angle*Math.PI));
		}
		else if( ant[i].angle<=1){
        	var x = Math.round(ant[i].x - speed*Math.cos(-(1-ant[i].angle)*Math.PI));
        	var y = Math.round(ant[i].y + speed*Math.sin(-(1-ant[i].angle)*Math.PI));
		}
		else if( ant[i].angle<=3/2){
        	var x = Math.round(ant[i].x - speed*Math.cos(-(ant[i].angle-1)*Math.PI));
        	var y = Math.round(ant[i].y - speed*Math.sin(-(ant[i].angle-1)*Math.PI));
		}
		else {
        	var x = Math.round(ant[i].x + speed*Math.cos(-(2-ant[i].angle)*Math.PI));
        	var y = Math.round(ant[i].y - speed*Math.sin(-(2-ant[i].angle)*Math.PI));
		}

		if(x<0){
			x=0;
			ant[i].angle+=1;
		}
		else if(x>=size_world){
			x=79;
			ant[i].angle+=1;
		}
		if(y<0){
			y=0;
			ant[i].angle+=1;
		}
		else if(y>=size_world){
			y=79;
			ant[i].angle+=1;
		}
		if(world[x][y].map==-1){
			ant[i].angle+=1;
		}
		else{
			ant[i].x = x;
			ant[i].y = y;
		}
		if(world[ant[i].x][ant[i].y].map>0)
			{
				ant[i].dist_time=time;
				ant[i].eat = world[ant[i].x][ant[i].y].map;
				ant[i].angle = 1+ ant[i].angle;
			}
		if(world[ant[i].x][ant[i].y].map<-1){
			ant[i].eat = 0;
			ant[i].dist_time=time;
			ant[i].angle = 1 + ant[i].angle;
		}
	}

	drawField();
	drawAnt();
}


home.x=40;
home.y=40;

createWorld();

world[home.x][home.y].map=-2;
world[home.x-1][-1+home.y].map=-2;
var interval;
function start(){
	createColony();
	interval = setInterval(ant_algoritm, iter_time);
}


drawField();