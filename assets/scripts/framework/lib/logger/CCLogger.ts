import { js, log, sys } from "cc";
import { LoggerInterface, LoggerOption } from "./LoggerInterface";

/**
 * 日志信息管理
 */
export default class CCLogger implements LoggerInterface {
    private _option: LoggerOption = null;

    init(option: LoggerOption): void {
        this._option = option;
    }

    // log(...args: any[]): void {
    //     this._option && this._option.enableLog && console.log.apply(null, args);

    //     // backLog.call(this, "%s%s:" + js.formatStr.apply(cc, arguments), this.stack(2), this.getDateString());
    // }

    // debug(...args: any[]): void {
    //     this._option && this._option.enableLog && console.debug.apply(null, args);
    // }

    // info(...args: any[]): void {
    //     this._option && this._option.enableLog && console.info.apply(null, args);
    // }

    // warn(...args: any[]): void {
    //     this._option && this._option.enableLog && console.warn.apply(null, args);
    // }

    // error(...args: any[]): void {
    //     this._option && this._option.enableLog && console.error.apply(null, args);
    // }


    public log(tag, ...args: any[]) {
        var backLog = console.log || log// || log;
        if (!tag || !tag.isOpen) {
            return;
        }
        if (this._option.enableLog) {
            if (sys.isNative) {
                console.log(tag.desc, this._format(args));
            } else {
                // tag = tag.desc;
                // backLog.call(this, "%s%s:" + js.formatStr.apply(this, arguments), this.stack(2), this.getDateString());
                console.log(
                    `%c${this.getDateString()} %c ${tag.desc} %c ${args} `,
                    'background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
                    'background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
                    'background: #00CD00;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;'
                );
            }
        }

    }

    public debug(tag, ...args: any[]): void {
        var backLog = console.log || log// || log;
        if (this._option.enableLog) {
            if (sys.isNative) {
                console.log(tag.desc, this._format(args));
            } else {
                // backLog.call('debug', "%c%s%s:" + js.formatStr.apply(cc, arguments), "color:#F0CD00;", this.stack(2), this.getDateString());

                console.log(
                    `%c${this.getDateString()} %c ${tag.desc} %c ${args} `,
                    'background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
                    'background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
                    'background: #F0CD00;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;'
                );
            }
        }
    }

    public info(tag, ...args) {
        var backLog = console.log || log// || log;
        if (this._option.enableLog) {
            if (sys.isNative) {
                console.log(tag.desc, this._format(args));
            } else {
                // backLog.call('info', "%c%s%s:" + js.formatStr.apply(cc, arguments), "color:#00CD00;", this.stack(2), this.getDateString());
                console.log(
                    `%c${this.getDateString()} %c ${tag.desc} %c ${args} `,
                    'background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
                    'background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
                    'background: #F0CD00;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;'
                );
            }
        }
    }

    public warn(tag, ...args) {
        var backLog = console.log || log// || log;
        if (this._option.enableLog) {
            if (sys.isNative) {
                console.log(tag.desc, this._format(args));
            } else {
                // backLog.call('warn', "%c%s%s:" + js.formatStr.apply(cc, arguments), "color:#ee7700;", this.stack(2), this.getDateString());
                console.log(
                    `%c${this.getDateString()} %c ${tag.desc} %c ${args} `,
                    'background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
                    'background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
                    'background: #F0CD00;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;'
                );
            }
        }
    }

    public error(tag, ...args: any[]): void {
        var backLog = console.log || log// || log;
        if (this._option.enableLog) {
            if (sys.isNative) {
                console.log(tag.desc, this._format(args));
            } else {
                // backLog.call('error', "%c%s%s:" + js.formatStr.apply(cc, arguments), "color:red", this.stack(2), this.getDateString());
                console.log(
                    `%c${this.getDateString()} %c ${tag.desc} %c ${args} `,
                    'background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
                    'background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
                    'background: #ff0000;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;'
                );
            }
        }
    }



    /**
       * 获得时间
       */
    private getDateString(): string {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = "00" + str;
        if (str.length == 2) str = "0" + str;
        timeStr += str;

        timeStr = "[" + timeStr + "]";
        return timeStr;
    }

    private stack(index): string {
        var e = new Error();
        if (!e.stack) return '';
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function (line) {
            line = line.substring(7);
            if (line) {
                var lineBreak = line.split(" ");
                if (lineBreak.length < 2) {
                    result.push(lineBreak[0]);
                } else {
                    result.push({ [lineBreak[0]]: lineBreak[1] });
                }
            }
        });

        var list = [];
        if (index < result.length - 1) {
            for (var a in result[index]) {
                list.push(a);
            }
        }
        if (!list[0]) return '';
        var splitList = list[0].split(".");
        return (splitList[0] + ".js->" + splitList[1] + ": ");
    }

    /**
    * 原生平台上不能直接打印object和array，因此这里将object和array转换为字符串进行输出，方便在 Android Logcat 中直接看 log 结果
    */
    private _format(...args: any[]): string {
        let msg: string = "";
        args.forEach((value: any, index: number, array: any[]) => {
            if (value == null) {
                msg += "null";
            } else {
                const valType = typeof value;
                if (valType === "string" || valType === "number") {
                    msg += value;
                } else {
                    msg += JSON.stringify(value);
                }
            }
            if (index + 1 < array.length) {
                msg += ",";
            }
        });
        return msg;
    }

}
