import { Label } from "cc";
import { ConstValue } from "../../../../mainbundle/scripts/Configs/ConstValue";
import { ConfigReader } from "../../../../mainbundle/scripts/Data/ConfigReader";

declare const CC_PREVIEW;
// String.prototype.format = function (...param) {
//     //将arguments转化为数组（ES5中并非严格的数组）
//     var args = Array.prototype.slice.call(arguments);
//     var count = 0;
//     //通过正则替换%s
//     return this.replace(/%s/g, function (s, i) {
//         return args[count++];
//     });
// }

Label.prototype['onLoad'] = function () {
    let isPackage: boolean = ConstValue.DEBUG_LANG_OPEN ? false : !CC_PREVIEW;
    if (typeof ConfigReader == 'undefined' || isPackage) return;
    let str: string = this._string;
    if (str.match("^[[][0-9]*]$")) {
        this.string = ConfigReader.readWordText(str.substring(1, str.length - 1));
    }

    // this.string = Utils.getWordText(this._string) || this._string;
}
