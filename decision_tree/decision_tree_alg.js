var Dataset = [
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
    constructor(name, data, predict, parent, childrens) {
        this.name = name;
        this.data = data;
        this.parent = parent;
        this.childrens = childrens;
        this.predict = predict;
    }
}

class Tree {
    constructor(Branch) {
        this.root = Branch;
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
}

function getUniqueValues(index, dataset) {
    let values = dataset.map(data => data[index]);
    return [...new Set(values)];
}

function countUniqueValues(group, Branch) {
    var dataset = [];
    dataset = CreateAndCopyDataset(dataset, Branch.data);

    var temp = [];
    temp = getUniqueValues(group, dataset);
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

function Entropy(group, Branch) {
    var attr = []
    attr = countUniqueValues(group, Branch);
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
        attr[i].entropy = entropy;
        if (i !== 0) {
            attr[i].entropy = entropy * (attr[i].res / attr[0].res);
        }
    }
    return attr;
}

function getLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function Gain(Branch) {
    var gains = [];
    for (var i = 0; i < Branch.data[0].length - 1; i++) {
        var attr = [];
        attr = Entropy(i, Branch);
        var summentr = 0;
        for (var k = 1; k < attr.length; k++) {
            if (!Number.isNaN(attr[k].entropy)) {
                summentr = summentr + attr[k].entropy;
            }
        }
        gains[i] = attr[0].entropy - summentr;
    }
    return gains;
}

function getMaxGain(Branch) {
    var gains = [];
    gains = Gain(Branch);
    var maxgain = -1;
    for (var i = 0; i < gains.length; i++) {
        var maxgainattr;
        if (gains[i] > maxgain) {
            maxgainattr = i;
            maxgain = gains[i];
        }
    }
    return maxgainattr;
}

function CreateAndCopyDataset(data, dataset) {
    for (var i = 0; i < dataset.length; i++) {
        data[i] = new Array;
        for (var j = 0; j < dataset[0].length; j++) {
            data[i][j] = dataset[i][j];
        }
    }
    return data;
}

function changeData(attribut, group, dataset) {
    var data = [];
    for (var i = 0; i < dataset.length; i++) {
        var count = 0;
        for (var j = 0; j < dataset[0].length; j++) {
            data[count] = new Array();
            if (dataset[i][group] === attribut) {
                for (var r = 0; r < dataset.length; r++) {
                    for (var c = 0; c < dataset[0].length; c++) {
                        data[count][c] = dataset[r][c];
                    }
                }
                count++;
            }

        }
    }
    console.log(data);
    return data;
}

function getRoot() {
    Branch = new Node('root', Dataset);
    var tree = new Tree(Branch);
    return Branch;
}

function getBranch() {
    Branch = new Node('root', Dataset);
    var tree = new Tree(Branch);

    var attrIndex = getMaxGain(Branch);
    var attr = [];
    attr = getUniqueValues(attrIndex, Branch.data);

    for (var i = 1; i < attr.length; i++) {
        var data = [];
        data = changeData(attr[i], attrIndex, Branch.data);

        //Brunch = new Node(attr[i])
        // getBranch();
    }

}
getBranch();
