var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ant_count = 100;
var ant=[];
var speed = 10;

ctx.fillRect(10,10,10,10);


//-1-стена
//-2-дом


/*var ant_ = new Object;
var ant_ = {
    x,
    y,
    eat: false,
    direction: 0,
    direction_update(){
        x+= Math.random()%10;
        y+= Math.random()%10;
    },
    show(ant_png){
        document.getElementById('#first_img_place').appendChild(img);
    }
};*/

function createAntColony(){
    for(var i; i<ant_count;i++){
        ant[i] = {
            x: Math.random()%80,
            y: Math.random()%80,
            eat: false,
            direction: 0,
        }        
    }
}


function drawAnt(x, y){
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y,10,10);
}
drawAnt(0,0);



function ant_algoritm(){
    drawField();
    for(var i=0;i<ant_count;i++){
        ant[i].x+= Math.random()%10;
        ant[i].y+= Math.random()%10;
        drawAnt(ant.x, ant.y);
    }
}


function start_(){
    createAntColony();
    console.log(ant);
    ant_algoritm();
}


start_();
while(true){
    ant_algoritm();
}
ant.show;