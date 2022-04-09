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

var Dataset = [
    ["Соперник" ,"Играем" ,"Лидеры" ,"Дождь" ,"Победа" ],
    ["Выше" ,"Дома" ,"На месте" ,"Да" ,"no" ],
    ["Выше" ,"Дома" ,"На месте" ,"Нет" ,"yes" ],
    ["Выше" ,"Дома" ,"Пропускают" ,"Нет" ,"no" ],
    ["Ниже" ,"Дома" ,"Пропускают" ,"Нет" ,"yes" ],
    ["Ниже" ,"В гостях" ,"Пропускают" ,"Нет" ,"no" ],
    ["Ниже" ,"Дома" ,"Пропускают" ,"Да" ,"yes" ],
    ["Выше" ,"В гостях" ,"На месте" ,"Да" ,"no" ],
    ["Ниже" ,"В гостях" ,"На месте" ,"Нет" ,"yes" ]];

class Node {
    constructor(name, data, predict, parent, result, child) {
        this.name = name;
        this.data = data;
        this.predict = predict;
        this.parent = parent;
        this.result = result;
        this.child = [];
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
var breakFlag = false;
var attr = [];
var Branch = getRoot();
getBranch(Branch);
var tree;
function getUniqueValues(index, dataset) {
    let values = dataset.map(data => data[index]);
    return [...new Set(values)];
}

function countUniqueValues(group, Branch) {
    var dataset = [];
    dataset = CreateAndCopyDataset(dataset, Branch.data);

    var temp = [];
    temp = getUniqueValues(group, dataset);

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
}

function Entropy(group, Branch) {
    countUniqueValues(group, Branch);
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

}

function getLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function Gain(Branch) {
    var gains = [];
    var data = [];
    data = CreateAndCopyDataset(data, Branch.data)
    for (var i = 0; i < Branch.data[0].length - 1; i++) {
        Entropy(i, Branch);
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
    var count = 0;
    for (var i = 0; i < dataset.length; i++) {
        data[count] = new Array();
        if (dataset[i][group] === attribut) {
            for (var c = 0; c < dataset[0].length; c++) {
                data[count][c] = dataset[i][c];
            }
            count++;
        }
        else if (i === 0) {
            for (var c = 0; c < dataset[0].length; c++) {
                data[count][c] = dataset[i][c];
            }
            count++;
        }
    }
    return data;
}

function getRoot() {
    var Branch = new Node('root', Dataset);
    tree = new Tree(Branch);
    return Branch;
}

function isLeaf(Branch) {
    var data = [];
    var county = 1;
    var countn = 1;
    data = CreateAndCopyDataset(data, Branch.data);
    console.log(data);
    for (var i = 1; i < data.length; i++) {
        if (data[i][data[0].length - 1] === 'yes') {
            county++;
        }
        else if (data[i][data[0].length - 1] === 'no') {
            countn++;
        }
    }
    if ((countn === data.length - 1) || (county === data.length - 1)) {
        return true;
    }
    else return false;
}

function getBranch(Branch) {
    console.log(Branch);
    var attrIndex = getMaxGain(Branch);
    var attrib = [];
    attrib = getUniqueValues(attrIndex, Branch.data);
    for (var i = 1; i < attrib.length; i++) {
        var data = [];
        data = changeData(attrib[i], attrIndex, Branch.data);
        var buf = new Node(attrib[i], data, Branch, attrib[0]);
        Branch.child[Branch.child.length] = buf;
        getBranch(Branch.child[i-1]);
    }

    // for(var i = 1; i<attrib.length; i++) {
    //     if (data.length !== 2) {
    //         var buf = new Node(attrib[i], data, Branch, attrib[0]);
    //         Branch.child[Branch.child.length] = buf;
    //         Branch=buf;
    //         if (!isLeaf(Branch)) {
    //             getBranch(Branch);
    //             console.log(Branch);
    //         }
    //         else {
    //             Branch.result = data[1][data[0].length - 1];
    //             console.log(Branch);
    //             Branch = Branch.predict;
    //         }
    //     }
    // }


}


console.log("i was here!")