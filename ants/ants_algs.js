<png name = 'ant_png' src = 'img\ant.png' />
let world = {};
let position ={
    x: 0,
    y: 0,
}
let colony = {
    x: 0,
    y: 0
};
class ant {
    x = colony.x;
    y = colony.y;
    eat = 0;
    speed = 10;
    direction = 0;
    direction_update(){

    }
    show(ant_png){
        document.getElementById('#first_img_place').appendChild(img);
    }
};
ant.show;