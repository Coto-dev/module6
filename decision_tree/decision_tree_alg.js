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
    constructor(positive, negative, value, entropy, res) {
        this.positive = positive;
        this.negative = negative;
        this.value = value;
        this.entropy = entropy;
        this.res = res;
    }
    removeAll() {
        this.positive = 0;
        this.negative = 0;
        this.value = 0;
        this.entropy = 0;
        this.res = 0;
    }
}

function getUniqueValues(index) {
    let values = dataset.map(data => data[index]);
    return [...new Set(values)];
}

function countUniqueValues(group) {
    var temp = [];
    temp = getUniqueValues(group);
    var attr = [];
    for (var k = 0; k < temp.length; k++) {
        attr[k] = new ForEntropy(0, 0, temp[k], 0, 0);
    }

    for (var k = 1; k < temp.length; k++) {
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
        attr[k].res = attr[k].negative + attr[k].positive;
    }
    let pos = 1;
    let neg = 1;
    for (var i = 0; i < dataset.length; i++) {
        if (dataset[i][dataset[0].length - 1] === "yes") {
            attr[0].positive = pos++;
        }
        if (dataset[i][dataset[0].length - 1] === "no") {
            attr[0].negative = neg++;
        }
        attr[0].res = attr[0].negative + attr[0].positive;
    }
    return attr;
}

function Entropy(group) {
    var attr = []
    attr = countUniqueValues(group);
    var entropy = 0;
    var pp, pn;
    let positive;
    let negative;
    for (var i = 0; i < attr.length; i++) {
        pp = attr[i].positive / attr[i].res;
        positive = -pp * getLog(2, pp);

        pn = attr[i].negative / attr[i].res;
        negative = -pn * getLog(2, pn);
        entropy = positive + negative;
        if (i !== 0) {
            attr[i].entropy = entropy * (attr[i].res / attr[0].res);
        }
    }
    return attr;
}

function getLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function Gain() {
    var gains = [];
    for (var i = 0; i < dataset[0].length - 1; i++) {
        var attr = [];
        attr = Entropy(i);
        console.log(attr);
        for (var k = 1; k < attr.length; k++) {
            var summentr = 0;
            summentr = summentr + attr[k].entropy;
        }
        gains[i] = attr[0].entropy - summentr;
    }
    console.log(gains);
}
Gain();