var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
var dots = [];
constMutation = 10;
ConstRelativeChance = 10;
const populationSize = 100;
canvas.addEventListener('mousedown', function (e) {
    var x, y;
    x = e.pageX - this.offsetLeft;
    y = e.pageY - this.offsetTop;
    dots.push([x, y])
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    const Fcolor="#1bc2ae";
    ctx.fillStyle = Fcolor;
    ctx.fill();
});
function clear() {
    ctx.clearRect(0, 0, 800, 730);
    ctx.fillStyle = "black";
    dots = [];
    alert('1');
}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}
async function start() {
    var population = [], count = 0;
    createPopulation(population);
    while (count < 10000) {
        getCross(population);
        population = selection(population);
        createPath(population[0]);
        //console.log(population);
        count++;
        await delay(10);
    }
}

function getCross(population) {
    var randomParents = [];
    for (let i = 0; i < populationSize; i++) {
        randomParents[i] = getRandom(0, 100);
    }
    var IndexParents = [];
    for (let i = 0; i < populationSize; i++) {
        if (randomParents[i] > ConstRelativeChance)
            IndexParents.push(i);
    }
    if (IndexParents.length % 2 != 0)
        IndexParents.pop();
    var childFirst = [], childSecond = [], parentSizeOne = 0, parentSizeTwo = 0;
    if (dots.length % 2 == 0) {
        parentSizeOne = Math.floor(dots.length / 2);
        parentSizeTwo = Math.floor(dots.length / 2);
    }
    else {
        parentSizeOne = Math.floor(dots.length / 2);
        parentSizeTwo = Math.floor(dots.length / 2) + 1;
    }

    for (let i = 0; i < IndexParents.length - 1; i += 2) {
        //console.log(population[i],' ',population[i+1]);
        childFirst = [], childSecond = [];
        for (let indexX = 0; indexX < parentSizeOne; indexX++) {
            //    console.log(population[i][indexX]);
            //     console.log('-----------------');
            childFirst.push(population[i][indexX])
        }
        for (let indexY = parentSizeOne; indexY < dots.length; indexY++) {

            if (!childFirst.includes(population[i + 1][indexY]))
                childFirst.push(population[i + 1][indexY])
        }
        for (let indexX = 0; indexX < dots.length; indexX++) {
            if (!childFirst.includes(population[i][indexX]))
                childFirst.push(population[i][indexX])
        }


        for (let indexX = 0; indexX < parentSizeOne; indexX++) {

            childSecond.push(population[i + 1][indexX])
        }
        for (let indexY = parentSizeOne; indexY < dots.length; indexY++) {

            if (!childSecond.includes(population[i][indexY]))
                childSecond.push(population[i][indexY])
        }
        for (let indexX = 0; indexX < dots.length; indexX++) {
            if (!childSecond.includes(population[i + 1][indexX]))
                childSecond.push(population[i + 1][indexX])
        }
        // console.log(childFirst);
        // console.log(childSecond);
        if (getRandom(0, 100) > constMutation)
            childFirst = mutation(childFirst);
        if (getRandom(0, 100) > constMutation)
            childSecond = mutation(childSecond);
        childFirst = findPath(childFirst);
        childSecond = findPath(childSecond);
        population.push(childFirst);
        population.push(childSecond);
        //    console.log(childFirst);
        //    console.log(childSecond);
        //child = findPath(childFirst);
        //    console.log('-------------------------------');
    }



    //console.log(IndexParents);
}


function mutation(child) {
    var mut = [];
    var i = getRandom(0, child.length - 1);
    var j = getRandom(0, child.length - 1);
    while (i == j) {
        j = getRandom(0, child.length - 1);
    }
    var maxx = Math.max(i, j);
    var minn = Math.min(i, j);
    mut = child.slice(minn, maxx + 1);
    mut.reverse();
    for (let h = minn, g = 0; h <= maxx; h++) {
        child[h] = mut[g];
        g++;
    }
    return child;
}
function selection(population) {
    var newPopulation = [];

    while (newPopulation.length < populationSize) {
        var minn = 1000000, gen = [], constI = 0;
        for (let i = 0; i < population.length; i++) {
            if (population[i] != undefined && minn > population[i][dots.length] && newPopulation.includes(gen) != true) {
                minn = population[i][dots.length];

                gen = population[i];
                constI = i;
                // console.log(gen);
            }
        }
        // if (population.includes(gen)){
        // delete population[constI];
        // console.log(newPopulation);
        // }
        newPopulation.push(gen);

    }

    return newPopulation;
}
function createPath(bestPath) {

    ctx.clearRect(0, 0, 800, 730);
    for (let i = 0; i < dots.length; i++) {
        ctx.beginPath();
        ctx.arc(dots[i][0], dots[i][1], 8, 0, Math.PI * 2);
        ctx.fill();
    }

    for (i = 0; i < bestPath.length - 2; i++) {
        ctx.beginPath();
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black';
        ctx.moveTo(dots[bestPath[i]][0], dots[bestPath[i]][1]);
        ctx.lineTo(dots[bestPath[i + 1]][0], dots[bestPath[i + 1]][1]);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(dots[bestPath[0]][0], dots[bestPath[0]][1]);
    ctx.lineTo(dots[bestPath[bestPath.length - 2]][0], dots[bestPath[bestPath.length - 2]][1]);
    ctx.closePath();
    ctx.stroke();

}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createPopulation(population) {

    for (let i = 0; i < populationSize; i++) {
        var randomMass = [];
        for (let i = 0; i < dots.length; i++) {
            randomMass.push(i);
        }
        randomMass = shuffle(randomMass);
        randomMass = findPath(randomMass);
        population.push(randomMass);

    }
    return (population)
}
function findPath(randomMass) {
    var sumOfPaths = 0, x = 0, y = 0, s = 0;
    // console.log(randomMass);
    for (let i = 0; i < randomMass.length; i++) {
        // console.log(randomMass[i]);
        x = dots[randomMass[i]][0];
        y = dots[randomMass[i]][1];
        if (i < randomMass.length - 1)
            s = Math.sqrt(((x - dots[randomMass[i + 1]][0]) ** 2) + ((y - dots[randomMass[i + 1]][1]) ** 2));
        else s = Math.sqrt(((x - dots[randomMass[0]][0]) ** 2) + ((y - dots[randomMass[0]][1]) ** 2));
        sumOfPaths += s;
    }
    // console.log(sumOfPaths);
    randomMass.push(sumOfPaths)
    return randomMass;

}