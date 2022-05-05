var fs = require('fs');
let path = require('fire-path');
var xlsx = require("node-xlsx");
//解析Excel
exports.praseExcel = function (list) {
    var excleData = list[0].data;
    var sheetArray = {};
    var titleArray = excleData[0];
    var typeArray = excleData[1];
    var keyArray = excleData[2];
    for (var j = 3; j < excleData.length; j++) {
        var curData = excleData[j];
        if (curData.length == 0) continue;
        try {
            var item = changeObj(curData, typeArray, keyArray, titleArray);
            sheetArray[item[keyArray[0]]] = item;
        } catch (error) {
            throw error;
        }

    }
    // if (Object.keys(sheetArray).length > 0)
    //     writeFile(list[0].name + ".json", JSON.stringify(sheetArray));

    if (Object.keys(sheetArray).length > 0) return sheetArray;
    else return null;
}

/**
 * 获取表定义结构
 */
exports.getTableDefine = function (list) {
    var excleData = list[0].data;
    var titleArray = excleData[0];
    var typeArray = excleData[1];
    var keyArray = excleData[2];
    var keys = [], titles = [], types = [];
    for (var i = 0; i < typeArray.length; i++) {
        //注释列不做处理
        if (titleArray[i].indexOf("#") != -1) continue;
        keys.push(keyArray[i]);
        titles.push(titleArray[i]);
        var type = typeArray[i];
        if (type == "int" || type == "float") types.push("number");
        else
            if (type == "string") types.push("string");
            else
                if (type == "string[]") types.push("Array<string>");
                else
                    if (type == "int[]") types.push("Array<number>");
                    else types.push("any");
    }
    return { keys: keys, titles: titles, types: types };
}
//转换数据类型
function changeObj(curData, typeArray, keyArray, titleArray) {
    var obj = {};
    for (var i = 0; i < curData.length; i++) {
        //字母 
        if (titleArray[i].indexOf("#") != -1) continue;
        obj[keyArray[i]] = changeValue(curData[i], typeArray[i]);
    }
    return obj;
}
function changeValue(value, type) {
    if (value == null || value == "null") return ""
    if (type == "int") return Math.floor(value);
    if (type == "string") return String(value);
    if (type == "float") return parseFloat(value);
    if (type == "string[]") return value.split("#");
    if (type == "int[]") {
        if (!value || value == 0) return [];
        try {
            var array = (value + "").split("#");
            let numArr = [];
            array.forEach(element => {
                numArr.push(parseInt(element));
            });
            return numArr;
        } catch (error) {
            console.log(value);
            throw error;
        }
    }
}


//写文件
exports.writeFile = function (fileName, data) {
    fs.writeFileSync(fileName, data, 'utf-8');
}


//获取项目工程里
function readFileList(dirPath, filesList) {
    var files = fs.readdirSync(dirPath);
    files.forEach(function (item, index) {
        let itemFullPath = path.join(dirPath, '/', item);
        var stat = fs.statSync(itemFullPath);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(itemFullPath, filesList)
        } else if (stat.isFile()) {
            let headStr = item.substring(0, 2);
            let extName = path.extname(itemFullPath);
            if (headStr === "~$" || item.indexOf('#') == 0) {
                // self._addLog("检索到excel产生的临时文件:" + itemFullPath);
            } else {
                if (extName === ".xlsx" || extName === ".xls") {
                    filesList.push(itemFullPath);
                }
            }
        }
    })

}

//获取文件夹下的所有文件
exports.getFileList = function (path) {
    var filesList = [];
    readFileList(path, filesList);
    return filesList;
}

/**
 * 获取所有表
 * @param {*} fileDirectoryPath 
 * @returns 
 */
exports.getAllSheet = function (fileDirectoryPath) {
    if (!fileDirectoryPath) {
        console.log("请设置excel目录");
        return null;
    }
    try {
        fs.statSync(fileDirectoryPath);
        //如果可以执行到这里那么就表示存在了
    } catch (e) {
        //捕获异常
        return null;
    }
    let excelFileArr = [];
    readFileList(fileDirectoryPath, excelFileArr);
    // 组装显示的数据
    let excelSheetArray = [];
    let sheetDuplicationChecker = {};//表单重名检测
    for (let k in excelFileArr) {
        let itemFullPath = excelFileArr[k];
        let excelData = xlsx.parse(itemFullPath);
        //todo 检测重名的sheet
        for (let j in excelData) {
            let itemData = {
                checkbox: true,
                fullPath: itemFullPath,
                name: "name",
                sheet: excelData[j].name
            };
            itemData.name = itemFullPath.substr(fileDirectoryPath.length + 1, itemFullPath.length - fileDirectoryPath.length);
            if (itemData.sheet.substring(0, 1) == "#") continue;
            if (excelData[j].data.length === 0) {
                console.log("[Error] 空Sheet: " + itemData.name + " - " + itemData.sheet);
                continue;
            }

            if (sheetDuplicationChecker[itemData.sheet]) {
                //  重名sheet问题
                console.log("[Error ] 出现了重名sheet: " + itemData.sheet);
                console.log("[Sheet1] " + sheetDuplicationChecker[itemData.sheet].fullPath);
                console.log("[Sheet2] " + itemFullPath);
                console.log("请仔细检查Excel-Sheet!");
            } else {
                sheetDuplicationChecker[itemData.sheet] = itemData;
                excelSheetArray.push(itemData);
            }
        }
    }
    return excelSheetArray;
}