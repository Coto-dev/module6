var dataset = [
    ["outlook", "temperature", "humidity", "windy", "play"],
    ["overcast", "hot", "high", "FALSE", "yes"],
    ["overcast", "cool", "normal", "TRUE", "yes"],
    ["overcast", "mild", "high", "TRUE", "yes"],
    ["overcast", "hot", "normal", "FALSE", "yes"],
    ["rainy", "mild", "high", "FALSE", "yes"],
    ["rainy", "cool", "normal", "FALSE", "yes"],
    ["rainy", "cool", "normal", "TRUE", "no"],
    ["rainy", "mild", "normal", "FALSE", "yes"],
    ["rainy", "mild", "high", "TRUE", "no"],
    ["sunny", "hot", "high", "FALSE", "no"],
    ["sunny", "hot", "high", "TRUE", "no"],
    ["sunny", "mild", "high", "FALSE", "no"],
    ["sunny", "cool", "normal", "FALSE", "yes"],
    ["sunny", "mild", "normal", "TRUE", "yes"]
];

class Node {
    constructor(index, value, left, right) {
        this.index = index;
        this.value = value;
        this.left = left;
        this.right = right;
        this.domElement = null;
        this.Value = null;
    }
}

class Tree {
    constructor() {

    }
}

class ForEntropy {
    constructor(positive, negative, value, entropy) {   
        this.positive = positive;
        this.negative = negative;
        this.value = value;
        this.entropy = entropy;
    }
}
var attr = [];

function getUniqueValues(index) {
    let values = dataset.map(data => data[index]);
    return [...new Set(values)];
}

function countUniqueValues(group) {
    temp = getUniqueValues(group);
    for (var k = 0; k < 3; k++) {
        attr[k] = new ForEntropy(0, 0, temp[k], 0);
    }

    for (var k = 1; k < 3; k++) {
        let pos = 1;
        let neg = 1;
        for (var i = 0; i < dataset.length; i++) {
            if (dataset[i][group] === attr[k].value) {
                if (dataset[i][dataset[0].length - 1] === "yes") {
                    attr[k].positive = pos++;
                }
                if (dataset[i][dataset[0].length - 1] === "no") {
                    attr[k].negative = neg++;
                }
            }
        }
    }
}
entropy();
function entropy() {
    countUniqueValues(2);
    console.log(attr);
    var entropy = 0;
    var pp, pn;
    let positive;
    let negative;
    for (var i = 1; i < attr.length; i++) {
        pp = attr[i].positive / (dataset.length - 1);
        positive = -pp * Math.log(pp);

        pn = attr[i].negative / (dataset.length - 1);
        negative = -pn * Math.log(pn);
        entropy = positive + negative;
        attr[i].entropy = entropy;
    }

    console.log(attr[1].entropy);
}


