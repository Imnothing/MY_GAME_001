/*
 * @Author: gyw
 * @Date: 2018-01-15 23:06:12
 * @Desc: 工具类
 */

import { Vec2, dragonBones, loader, Vec3, Node, UITransform, v3, v2, view } from "cc";
import { JSB } from "cc/env";


export class Utils {

    //数值转换
    static numFormate(num: number) {
        if (num < 10000) {
            return num;
        } else if (num / 1000 >= 1) {
            return num / 1000 + 'K';
        } else if (num / 1000 / 1000 >= 10) {
            return num / 1000 / 1000 + 'M';
        }
    }

    //获取最大值
    static getMax(a, b) {
        var result = [a, b];
        //如果a长度小于b长度
        if (a.length < b.length) {
            //b放前面
            result[0] = b;
            result[1] = a;
            //返回result长度为3，为了减法的不够减而准备
            result[2] = 'not';
            //返回最终数组
            return result;
        }
        //如果a长度等于b长度
        if (a.length == b.length) {
            //循环对比a,b里面的单个元素
            for (var i = 0; i < a.length; i++) {
                if (result[0][i] > result[1][i]) {
                    result[0] = a;
                    result[1] = b;
                    return result;
                }
                if (result[0][i] < result[1][i]) {
                    result[0] = b;
                    result[1] = a;
                    result[2] = 'not';
                    return result;
                }
                //假如全部相等，当最后一个元素，以上条件都不执行，则执行默认的返回结果
                if (i == a.length - 1) {
                    return result;
                }
            }
        }
        if (a.length > b.length) {
            return result;
        }
    }

    //删除字符串前面多余的0
    static shanchuling(result) {
        //首先判断是否全部都是0，是的话直接返回一个0
        if (result == 0) {
            result = 0;
            //返回最终字符串
            return result;
        }
        //把字符串分割成数组
        result = result.split('');
        //获取数组长度
        var hebing = result.length;
        for (var j = 0; j < hebing; j++) {
            //判断数组首位是否为0
            if (result[0] == 0) {
                //把数组首位删掉
                result.splice(0, 1);
            }
            else {
                //删除完了就跳出循环
                break;
            }
        }
        //返回最终字符串
        return result;
    }

    // 获取小数的位数
    static getDecimalDigits(n) {
        if (typeof n == 'number')
            return n.toString().split(".")[1] != null ? n.toString().split(".")[1].length : 0;
        else if (typeof n == 'string')
            return n.split(".")[1] != null ? n.split(".")[1].length : 0;
    }


    /***
     * 数组排序
     */
    static sortByType(array, type) {
        var by = function (type) {
            return function (o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[type];
                    b = p[type];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return a < b ? -1 : 1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                }
                else {
                    throw ("error");
                }
            }
        };
        return array.sort(by(type));
    };

    /***
     * 是否是同一天
     */
    static isOneDay(perTime, nowTime) {
        var per = new Date(parseInt(perTime));
        var now = new Date(parseInt(nowTime));
        if (per.getFullYear() == now.getFullYear()) {
            if (per.getMonth() == now.getMonth()) {
                if (per.getDate() == now.getDate()) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 随机数中签
     * @param num 随机数
     * @param max 最大值
     * @param min 最小值 (默认1)
     */
    static winRandom(num: number, max: number, min?: number): boolean {
        let r = Utils.randomNum(1, max);
        // console.log("winRandom", num, r, num > r);
        return num > r;
    }

    /***
     * 随机数 [minNum, maxNum] 闭合区间
     */
    static randomNum(minNum, maxNum) {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    }

    /**
     * 保留几位小数
     */
    static getFixNum(num: number, fixNum: number): number {
        let s = Math.pow(10, fixNum);
        return Math.floor(num * s) / s;
    }


    /***
     * 大数相加
     */
    static galaxyAdd(a, b) {
        //把a,b放进zong数组
        var vls = [String(a), String(b)];
        //创建fen数组
        var fen = [];
        //把a,b较大的放在前面
        let zong = this.getMax(vls[0], vls[1]);
        //把zong数组里面的元素分成单个数字
        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        //创建加0变量
        var jialing;
        //判断两个参数是否相同长度
        if (!(zong[0].length == zong[1].length)) {
            //创建0
            jialing = new Array(zong[0].length - zong[1].length + 1).join('0');
            //把0放进zong[1]前面
            zong[1] = jialing.split('').concat(zong[1]);
        }
        //创建补充上一位的数字
        var next = 0;
        //从个位数起对应单个计算
        for (var i = (zong[0].length - 1); i >= 0; i--) {
            //求和
            var he = Number(zong[0][i]) + Number(zong[1][i]) + next;
            //把求和的个位数先放进数组
            fen.unshift(he % 10);
            //把求和的十位数放进补充上一位的数字，留在下一次循环使用
            next = Math.floor(he / 10);
            //判断最后一次如果求和的结果为两位数则把求和的十位数加在最前面
            if (i == 0 && !(next == 0)) {
                fen.unshift(next);
            }
        }
        //把最后的结果转化成字符串
        var result = fen.join('');
        //返回字符串
        return result;
    }

    /***
     * 大数相减
     */
    static galaxySub(a, b) {
        var vls = [String(a), String(b)];
        var fen = [];
        let zong = this.getMax(vls[0], vls[1]);
        if (zong.length == 3) {
            // alert("金币不足");
            return false;
        }
        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        var jialing;
        if (!(zong[0].length == zong[1].length)) {
            jialing = new Array(zong[0].length - zong[1].length + 1).join('0');
            zong[1] = jialing.split('').concat(zong[1]);
        }
        var next = 0;
        for (var i = (zong[0].length - 1); i >= 0; i--) {
            var cha = Number(zong[0][i]) - Number(zong[1][i]) - next;
            next = 0;
            if (cha < 0) {
                cha = cha + 10;
                next = 1;
            }
            fen.unshift(cha % 10);
        }
        var result = fen.join('');
        if (result[0] == '0') {
            result = this.shanchuling(result);
        }
        let number = '';
        for (let index = 0; index < result.length; index++) {
            number += '' + result[index];
        }
        if (number == "") number = '0';
        return number;
    }

    /***
     * 大数相乘 b可以是小数 返回是整数
     */
    static galaxyMut(a, b) {
        var decdigs = this.getDecimalDigits(b);
        if (decdigs > 0) {
            b = String(b).replace('.', '');
        }
        var vls = [String(a), String(b)];
        var fen = [];
        let zong = this.getMax(vls[0], vls[1]);

        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        if (zong[0].indexOf('N') != -1 || zong[1].indexOf("N") != -1) {
            return a;
        }
        //获取b的长度,处理乘法分配率的乘法
        for (var j = (zong[1].length - 1); j >= 0; j--) {
            var next = 0;
            var fentemp = [];
            var jialing = '';
            //获取a的长度处理乘法
            for (var i = (zong[0].length - 1); i >= 0; i--) {
                var ji = Number(zong[0][i]) * Number(zong[1][j]) + next;
                fentemp.unshift(ji % 10);
                next = Math.floor(ji / 10);
                if (i == 0 && !(next == 0)) {
                    fentemp.unshift(next);
                }
            }
            //后面添加0
            jialing = new Array((zong[1].length - (j + 1)) + 1).join('0');
            fentemp.push(jialing);
            fen[j] = fentemp.join('');
        }
        //处理乘法后的求和
        var cishu = fen.length;
        for (var k = 1; k < cishu; k++) {
            var hebing = this.galaxyAdd(fen[0], fen[1]);
            fen.splice(0, 2, hebing);
        }

        var result = fen.join('');
        if (result[0] == '0') {
            result = this.shanchuling(result);
        }
        let number = '';
        for (let index = 0; index < result.length - decdigs; index++) {
            if (parseInt(result[index]) >= 0) {
                number += '' + result[index];
            }
        }
        if (number == "") number = '0';
        //result = result.substring(0, result.length - decdigs);
        return number;
    }

    /***
     * 大数相除
     * @param a
     * @param b
     * @returns {string}
     */
    static galaxyDivs(a, b) {
        a = String(a);
        b = String(b);
        var alen = a.length, blen = b.length;
        var quotient: any = 0, remainder = 0;
        var result = [], temp = 0;
        for (var i = 0; i < alen; i++) {
            temp = remainder * 10 + parseInt(a[i]);
            if (temp < b) {
                remainder = temp;
                result.push(0);
            } else {
                quotient = Math.round(temp / b) + '';
                remainder = temp % b;
                result.push(quotient);
            }

        }
        //return result.join("").replace(/\b(0+)/gi, "");
        quotient = result.join("").replace(/\b(0+)/gi, "");
        quotient = quotient == "" ? "0" : quotient;
        //return [result.join("").replace(/\b(0+)/gi, ""), remainder];//结果返回[商，余数]
        return [quotient, remainder];
    };

    /***
     * 比较大小
     * @param a
     * @param b
     * @returns 0为相等，1为a大，-1为b大
     */
    static cmpBigInt(a, b) {
        //log('a=' + a + '     b=' + b)
        a = String(a);
        b = String(b);

        if (a.length > b.length) {
            return 1;
        }

        if (a.length < b.length) {
            return -1;
        }

        //循环对比a,b里面的单个元素
        for (var i = 0; i < a.length; i++) {
            if (a[i] > b[i]) {
                return 1;
            }
            if (a[i] < b[i])
                return -1;
        }

        return 0;
    }

    /***
     * 比较大小
     * @param a
     * @param b
     * @returns a是否大于等于b
     */
    static compare(a, b) {
        return this.cmpBigInt(a, b) >= 0;
    }



    static millisecondToMinute(msd) {
        if (msd < 500) {
            msd = 0;
        }

        var remainTime = parseFloat(msd) / 1000;
        var minit = parseInt((remainTime / 60).toString());
        var second = parseInt((remainTime - minit * 60).toString());
        let time = (minit < 10 ? ('0' + minit) : minit) + ':' + (second < 10 ? ('0' + second) : second);
        return time;
    }


    /**
     * 世界坐标触摸两点的角度
     * @param px
     * @param py
     * @param mx
     * @param my
     */
    static getPointAngle(px: number, py: number, mx: number, my: number) {
        let deltaX = px - mx;
        let deltaY = py - my;
        let angle = Math.atan2(deltaX, deltaY) * 180 / Math.PI;
        if (angle < 0) angle += 360;
        //对角度取整
        angle = Math.round(angle);
        return angle;
    }

    /**
    * 获得两点坐标连线，与y轴正半轴之间的夹角
    */
    static getAngle(px: number, py: number, mx: number, my: number) {
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos);
        var angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度
        if (mx > px && my > py) {                   //鼠标在第四象限
            angle = 180 - angle;
        } else if (mx == px && my > py) {            //鼠标在y轴负方向上
            angle = 180;
        } else if (mx > px && my == py) {            //鼠标在x轴正方向上
            angle = 90;
        } else if (mx < px && my > py) {             //鼠标在第三象限
            angle = 180 + angle;
        } else if (mx < px && my == py) {            //鼠标在x轴负方向
            angle = 270;
        } else if (mx < px && my < py) {             //鼠标在第二象限
            angle = 360 - angle;
        } else {
            angle = 0;
        }
        return angle;
    }

    // 角度
    static getAngle2(start: Vec3 | Vec2, end: Vec3 | Vec2) {
        //计算出朝向
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var dir = v2(dx, dy);

        //根据朝向计算出夹角弧度
        var angle = dir.signAngle(v2(1, 0));

        //将弧度转换为欧拉角
        var degree = angle / Math.PI * 180;

        return -degree;
    }

    /**
     * 按照角度、速度 计算出位移的位置
     */
    static moveForAngle(angle: number, speed: number): number[] {
        // 角度转换为弧度
        var rad: number = angle * Math.PI / 180;
        // 根据sin cos 算出x，y
        var yy: number = Math.sin(rad) * speed;
        var xx: number = Math.cos(rad) * speed;
        return [xx, yy]
    }

    /**
     * 按照角度、速度 计算出位移的位置
     */
    static moveForXY(xx: number, speed: number) {
        let rad = Math.asin(xx / speed);
        let angle = rad * 180 / Math.PI;
        angle = (angle - 180) / (-1)
        return Math.round(angle);
    }

    /**
     * 整数区间随机 [min, max]
     */
    static intRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    /**
     * 小数区间随机 [min, max]
     */
    static floatRandom = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    /**
     * 从数组中随机一个
     * @param array
     */
    static arrayRandom(array) {
        var idx = this.intRandom(0, array.length - 1);
        return array[idx];
    };

    /**
     * 从数组中随机几个
     * @param arr
     * @param count
     */
    static getRandomArrayWithCount(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    /**
     * 数组去重
     * @param arr
     */
    static arrayUnique(arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            if (hash.indexOf(arr[i]) == -1) {
                hash.push(arr[i]);
            }
        }
        return hash;
    }


    /**
     * 计算两点间距离
    */
    static getDis(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    /**计算两个触摸点之间的距离*/
    static getDis2(points) {
        var distance = 0;
        if (points && points.length == 2) {
            var dx = points[0].stageX - points[1].stageX;
            var dy = points[0].stageY - points[1].stageY;

            distance = Math.sqrt(dx * dx + dy * dy);
        }
        return distance;
    }

    /**
     * 返回距离的平方
    */
    static getSqrDis(x1, y1, x2, y2) {
        var xoffset = x1 - x2, yoffset = y1 - y2;
        return xoffset * xoffset + yoffset * yoffset;
    };

    /**
     * 通过name搜索child
     * @param parent
     * @param childName
     * @returns {AnimationNode|Node|节点对象}
     */
    static getChildDeep(parent, childName) {
        var child = parent.getChildByName(childName);
        if (child)
            return child;
        for (var i = 0; i < parent._children.length; i++) {
            child = this.getChildDeep(parent._children[i], childName);
            if (child)
                return child;
        }
    };

    /**
     * 概率随机
     * @param {object} 概率 {a:0.20, b:0.20, c:0.40, d:0.20}
     */
    static getProbability(obj) {
        var arr1 = [];
        var arr2 = [];
        var str = "";
        var num = 0;
        var len = 0;
        for (var key in obj) {
            str = ""
            str += obj[key];
            if (len < (str.length - 2)) {
                len = str.length - 2;
            }
        }
        for (var key in obj) {
            arr1.push(key);
            num += obj[key] * Math.pow(10, len)
            arr2.push(num);
        }
        var index = 0;
        var rd = Math.floor(Math.random() * Math.pow(10, len) + 1);
        for (var j = 0; j < arr2.length; j++) {
            if (rd <= arr2[j]) {
                index = j;
                break;
            }
        }
        return arr1[index];
    }

    /**
     * 返回格式00:00样式的时间
     * @param second 秒
     * @returns {string}
     */
    static formatTime(second: number, showHours?: boolean, showUnit?: boolean) {
        var min = Math.floor(second / 60);
        second = second % 60;
        if (!showHours || min < 60)
            return this.timeNumberFormat(min) + (showUnit ? "m" : ":") + this.timeNumberFormat(second) + (showUnit ? "s" : "");
        var hours = Math.floor(min / 60);
        min %= 60;
        return hours + (showUnit ? "h" : ":") + this.timeNumberFormat(min) + (showUnit ? "m" : ":") + this.timeNumberFormat(second) + (showUnit ? "s" : "");
    };

    /**
     * 返回格式 00小时00分 样式的时间
     * @param second 秒
     * @returns {string}
     */
    static formatTimeZh_cn(second, showHours, showSeconds) {
        var min = Math.floor(second / 60);
        second = second % 60;
        if (!showHours || min < 60)
            return this.timeNumberFormat(min) + ("分") + this.timeNumberFormat(second) + ("秒");
        var hours = Math.floor(min / 60);
        min %= 60;
        if (showSeconds) {
            return hours + ("小时") + this.timeNumberFormat(min) + ("分") + this.timeNumberFormat(second) + ("秒");
        } else {
            return hours + ("小时") + this.timeNumberFormat(min) + ("分");
        }
    };

    /**
     * 获取 00格式数字
     */
    static timeNumberFormat(value) {
        return (value < 10 ? "0" : "") + parseInt(value);
    };


    /**
   * 金币数额展示规则
   */
    static coinNumShow(coinNum) {
        var num;
        if (coinNum < 10000) {
            num = coinNum % 10000;
        } else if (coinNum >= 10000 && coinNum < 100000000) {
            var floatNum = coinNum / 10000;
            var a = String(floatNum);
            var aNew;
            var re = /([0-9]+.[0-9]{1})[0-9]*/;
            aNew = a.replace(re, "$1");
            let arr = aNew.split(".");
            num = arr[0] + "万";
            if (arr[1] && arr[1][0] != "0") num = num + arr[1][0];
        } else if (coinNum >= 100000000) {
            var floatNum = coinNum / 100000000;
            var a = String(floatNum);
            var aNew;
            var re = /([0-9]+.[0-9]{1})[0-9]*/;
            aNew = a.replace(re, "$1");
            let arr = aNew.split(".");
            num = arr[0] + "亿";
            if (arr[1] && arr[1][0] != "0") num = num + arr[1][0];
        }
        return num;
    };

    /**
    * 金币数额展示规则
    */
    static getGoldNumber(num: number) {
        if (num >= 10000) {
            var number = (num / 1000).toFixed(2);
            if (num % 1000 == 0) {
                number = (num / 1000) + '';
            }
            return number + 'k';
        }
        return num;
    }

    /**
    * rgb转换16进制
    * @param str
    */
    static tranColor(str) {
        var hexcode = "#";
        var s = str.split(",");
        for (var x = 0; x < 3; x++) {
            var n = s[x];
            if (n === "") n = "0";
            var c = "0123456789ABCDEF",
                b = "",
                a = n % 16;
            b = c.substr(a, 1);
            a = (n - a) / 16;
            hexcode += c.substr(a, 1) + b
        }
        return hexcode;
    }

    /**
     * 图片流转base64
     * @param data
     * @param width
     * @param height
     */
    static getImgBase64(data: Uint8Array, width: number, height: number) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        //优化截图效率：https://forum.cocos.com/t/2-1-3-4/72655
        //原生： https://forum.cocos.com/t/cocoscreator/72580/18
        let imageData = ctx.createImageData(width, height);//new ImageData(width,height);
        // write the render data
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let start2 = row * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[start2 + i] = data[start + i];
            }
        }
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL("image/jpeg");
    }

    /**
     * 将字符串转换成二进制形式，中间用空格隔开
     * @param str
     */
    strToBinary(str) {
        var result = [];
        var list = str.split("");
        for (var i = 0; i < list.length; i++) {
            if (i != 0) {
                result.push(" ");
            }
            var item = list[i];
            var binaryStr = item.charCodeAt().toString(2);
            result.push(binaryStr);
        }
        return result.join("");
    }

    /**
     * 将二进制字符串转换成Unicode字符串
     * @param str
     */
    binaryToStr(str) {
        var result = [];
        var list = str.split(" ");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var asciiCode = parseInt(item, 2);
            var charValue = String.fromCharCode(asciiCode);
            result.push(charValue);
        }
        return result.join("");
    }

    /**
     * 根据权重获取索引
     * weight 数组
     */
    static getWeightIndex(weight) {
        let rd = Utils.randomNum(1, 10000);
        let index = 0;
        for (let i = 0; i < weight.length; i++) {
            if (rd <= parseInt(weight[i])) {
                index = i;
                break;
            }
        }
        return index;
    }

    static getDiffTime(time1, time2) {
        let time = time2 - time1;
        return time;
    }

    static BrowserInfo() {
        return {
            userAgent: navigator.userAgent.toLowerCase(),
            isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
            isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
            isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
            isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
        };
    }


    /*
   *  base64编码(编码，配合encodeURIComponent使用)
   *  @parm : str 传入的字符串
   *  使用：
       1、引入util.js(路径更改) :const util  = require('../../utils/util.js');
       2、util.base64_encode(util.utf16to8('base64 编码'));
   */
    public static base64_encode(str) {
        //下面是64个基本的编码
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    //加密
    public static aesEncrypt(data, secretKey) {
        // if (!ConstValue.isAES || !data) return data;
        // try {
        //     var key = CryptoJS.enc.Utf8.parse(secretKey);
        //     data = Base64.encode(data);
        //     var srcs = CryptoJS.enc.Utf8.parse(data);
        //     var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        //     data = encrypted.toString();
        // } catch (error) {
        //     if (typeof error == 'object')
        //         SLog.getInstance().logEvent('error', 'aesEncrypt = ' + JSON.stringify(error));
        //     else SLog.getInstance().logEvent('error', 'aesEncrypt = ' + error);
        // }

        return data;
    }

    //解密
    public static aesDecrypt(data, secretKey) {
        // if (!ConstValue.isAES || !data) return data;
        // try {
        //     var key = CryptoJS.enc.Utf8.parse(secretKey);
        //     var decrypt = CryptoJS.AES.decrypt(data, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        //     var jsonStr = CryptoJS.enc.Utf8.stringify(decrypt).toString();
        //     data = Base64.decode(jsonStr);
        // } catch (error) {
        //     if (typeof error == 'object')
        //         SLog.getInstance().logEvent('error', 'aesEncrypt = ' + JSON.stringify(error));
        //     else
        //         SLog.getInstance().logEvent('error', 'aesEncrypt = ' + error);
        // }
        return data;
    }

    //检测是否是json
    public static isJSON(str): boolean {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
        console.log('It is not a string!')
    }

    static dateFormat(fmt, date) {
        let ret;
        date = new Date(date);
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }

    static isLiuhai() {
        var winSize = view.getVisibleSize();
        var isLH = winSize.width * 2 < winSize.height;
        return isLH;
    }

    static getQueryString(name, url?: string) {
        let search = !JSB ? window.location.search : "";
        if (url) {
            let arr = url.split('?');
            if (arr.length >= 2) {
                search = arr[1];
            } else {
                return null;
            }
        } else {
            search = search.substr(1);
        }
        if (!search) return null;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = search.match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    //当天剩余时间，返回秒
    static getDayLastTime() {
        //获取当前时间
        var nowTime = Date.now();
        // var nowTime = new Date().getTime();
        //获取当天 23:59
        var endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
        //获取时间差
        var timediff = Math.round((endTime - nowTime) / 1000);
        return timediff;
    }

    //转化倒计时时间格式 1中文2冒号3英文
    static millisecondToDate(timediff, type?: number) {
        //获取还剩多少小时
        var hour = parseInt(timediff / 3600 % 24 + '') + parseInt(timediff / 3600 / 24 + '') * 24;
        //获取还剩多少分钟
        var minute = parseInt(timediff / 60 % 60 + '');
        //获取还剩多少秒
        var second = parseInt(timediff % 60 + '');

        // let nhours = hour < 10 ? "0" + hour : hour;
        let nhours = hour < 10 ? hour : hour;
        let nminutes = minute < 10 ? "0" + minute : minute;
        let nseconds = second < 10 ? "0" + second : second;
        let str = '';
        if (type == 1) {
            str = nhours + "时" + nminutes + "分" + nseconds + "秒";
        } else if (type == 2) {
            if (nhours > 0) {
                str += nhours + "h";
            }
            str += nminutes + "m" + nseconds + 's';
        } else {
            str = nhours + ":" + nminutes + ":" + nseconds;
        }
        return str;
    }

    /**
    * 转换成分钟前
    * @param second 秒
    * @returns {string}
    */
    static timeEarly(time) {
        //获取还剩多少秒
        var second = parseInt(time % 60 + '');
        //获取还剩多少分钟
        var minute = parseInt(time / 60 % 60 + '');
        //获取还剩多少小时
        var hour = parseInt(time / 3600 % 24 + '');
        //获取还剩多少小时
        var day = parseInt(time / 3600 / 24 + '') + parseInt(time / 3600 / 24 + '') * 24;
        let str = '';
        let cn = ['一', '二', '三', '四', '五', '六', '七'];
        if (day >= 8) {
            str = '一周前';
        } else if (day >= 7) {
            str = '七天前';
        } else if (day >= 1) {
            str = cn[day - 1] + '天前';
        }
        else if (hour >= 0) {
            str = hour + '小时前';
        } else if (minute >= 0) {
            str = minute + '分前';
        } else {
            str = '刚刚';
        }
        return str;
    };

    //当天倒计时
    static showCountdownDay() {
        //获取当前时间
        var nowTime = Date.now();
        // var nowTime = new Date().getTime();
        //获取当天 23:59
        var endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
        //获取时间差
        var timediff = Math.round((endTime - nowTime) / 1000);
        //获取还剩多少小时
        var hour = parseInt(timediff / 3600 % 24 + '') + parseInt(timediff / 3600 / 24 + '') * 24;
        //获取还剩多少分钟
        var minute = parseInt(timediff / 60 % 60 + '');
        //获取还剩多少秒
        var second = timediff % 60;
        //输出还剩多少时间
        hour = timerFilter(hour);
        minute = timerFilter(minute);
        second = timerFilter(second);

        //给小于10的数值前面添加 0
        function timerFilter(params) {
            if (params - 0 < 10) {
                return '0' + params
            } else {
                return params
            }
        }

        let str = hour + "时" + minute + "分" + second + "秒";
        return str;
    }

    /**
     * 解析时间差
     * @param timediff 时间差
     * @param type 返回类型hour minute second
     * @returns 
     */
    static showCountdownLast(timediff, type?) {
        timediff = timediff / 1000;
        //获取距离多少小时
        var hour = parseInt(timediff / 3600 % 24 + '') + parseInt(timediff / 3600 / 24 + '') * 24;
        //获取距离多少分钟
        var minute = parseInt(timediff / 60 % 60 + '');
        //获取距离多少秒
        var second = timediff % 60;

        if (type && type != null) {
            switch (type) {
                case 'hour': return hour;
                case 'minute': return minute;
                case 'second': return second;
            }
        }
    }


    static changeAwardGold(number) {
        if (number > 1000) {
            number = Math.floor(number / 10) * 10;
        } else if (number > 10000) {
            number = Math.floor(number / 100) * 100;
        } else if (number > 100000) {
            number = Math.floor(number / 1000) * 1000;
        } else if (number > 1000000) {
            number = Math.floor(number / 10000) * 10000;
        }
        return number;
    }

    /**
     * 根据身份证号得到姓别和精确计算年龄
     */
    static analyzeIDCard(IDCard) {
        //获取用户身份证号码
        var userCard = IDCard;
        //如果身份证号码为undefind则返回空
        if (!userCard) {
            return 0;
        }
        //获取出生年月日
        var yearBirth = userCard.substring(6, 10);
        var monthBirth = userCard.substring(10, 12);
        var dayBirth = userCard.substring(12, 14);
        //获取当前年月日并计算年龄
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
            age--;
        }
        //返回年龄
        return age;
    }

    /**
     * 敏感词过滤
     */
    static filtWord(str, ciku: Array<string>) {
        var reStr = '';
        for (var i = 0; i < ciku.length; i++) {
            if (i == ciku.length - 1)
                reStr += ciku[i];
            else
                reStr += ciku[i] + "|";
        }
        var re = new RegExp(reStr, "ig");
        if (str.match(re)) {
            console.log("%c敏感词汇将被替换为：", "color:red", str.replace(re, '?'));
        } else {
            console.log(str);
        }
    }

    /**
     * 去除空对象
     * @param object
     */
    static deleteEmptyProperty(object) {
        for (var i in object) {
            var value = object[i];
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    if (value.length == 0) {
                        delete object[i];
                        continue;
                    }
                }
                this.deleteEmptyProperty(value);
                if (Utils.isEmpty(value)) {
                    delete object[i];
                }
            } else {
                if (value === '' || value === null || value === undefined || value === false || value === 0) {
                    delete object[i];
                } else {
                }
            }
        }
    }

    static isEmpty(object) {
        for (var name in object) {
            return false;
        }
        return true;
    }

    /**
     * UI节点转换到目标节点下的坐标
     * @param node 节点
     * @param targetNode 目标节点
     * @returns {转换后的坐标的点|Point}
     */
    static transPos(node: Node, targetNode: Node): Vec3 {
        //转世界坐标
        var endGlobalPos = this.getWorldPos(node);
        if (!endGlobalPos) return null;
        //再转局部坐标
        var endPos = targetNode.getComponent(UITransform).convertToNodeSpaceAR(endGlobalPos);
        return endPos;
    }

    /**
     * 转换世界坐标
     * @param node
     */
    static getWorldPos(node: Node) {
        if (!node.parent) return null;
        let pos = node.parent.getComponent(UITransform).convertToWorldSpaceAR(node.getPosition());
        return pos;
    }

    /**
     * 队列控制器
     * @param tasks 
     */
    static async queue(tasks: any, taskFunc: Function) {
        let promise = Promise.resolve();
        tasks.forEach(element => {
            promise = promise.then(() => {
                return new Promise(resolve => {
                    taskFunc(element, resolve);
                });
            })
        });
        return promise;
        // tasks.reduce((promise, current) => {
        //     return promise.then(() => {
        //         return new Promise(resolve => {
        //             setTimeout(() => {
        //                 console.log(current);
        //                 resolve()
        //             }, 1000)
        //         })
        //     })
        // }, Promise.resolve())
    }

    /**
     * 协同任务
     * @param taskFunc 
     * @returns 
     */
    static promisGroup(taskFunc: Function) {
        return new Promise<void>(async (resolve, reject) => {
            let proArr: Promise<void>[] = [];
            taskFunc(proArr);
            if (proArr.length > 0) {
                await Promise.all(proArr).then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * 随机并返回值
     * @param arr 
     */
    static randValue(arr: Array<any>) {
        let rd = this.randomNum(0, arr.length - 1);
        return arr[rd];
    }
}
