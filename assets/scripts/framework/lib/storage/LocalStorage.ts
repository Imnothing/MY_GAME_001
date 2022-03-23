import { game, log, sys } from "cc";
import { Utils } from "../../../../mainbundle/scripts/Utils/Utils";
import { LocalStorageInterface } from "./LocalStorageInterface";

/**
 * 本地数据存储类,数据更新频率快，设置同步时间间隔保存，可减少本地存储压力
 */
export class LocalStorage implements LocalStorageInterface {
    private intervalId = null;
    private syncLocalDataInterval = 500; // 数据存储同步间隔(单位毫秒)
    private syncMap = {};//需要同步的数据
    /**
     * 注册窗口监听器
     */
    register() {
        // game.on(game.EVENT_HIDE, (event) => {
        //     log("game onPause - StorageUtil");
        //     if (this.intervalId) {
        //         clearTimeout(this.intervalId);
        //         this.intervalId = null;
        //     }
        // });
        // game.on(game.EVENT_SHOW, (event) => {
        //     log("game onResume - StorageUtil");
        //     this._syncLocalDataInterval();
        // }); 
    }

    /**
     * 保存本地存储
     * @param key 
     * @param value 
     */
    setLocalItem(key, value) {
        this._setData(key, value);
    }

    /**
     * 获取本地存储
     * @param key 
     * @param defaultValue 
     */
    getLocalItem(key, defaultValue?): any {
        let value = this._getData(key, defaultValue);
        if (typeof defaultValue == 'boolean') {
            value = this._toBoolean(value, defaultValue);
        }
        else if (typeof defaultValue == 'number') {
            value = this._toNumber(value, defaultValue);
        }
        else if (typeof defaultValue == 'object') {
            // if (!Utils.isJSON(value)) {
            //     value = Utils.aesDecrypt(value, ConstValue.AES_KEY);
            // }
            value = this._toJSON(value, defaultValue);
        }
        return value;
    }

    /**
     * 添加保存数据
     * @param key 
     * @param value 
     * @param needZip 是否需要压缩
     */
    public pushSyncData(key, value) {
        this.syncMap[key] = value;
        this._syncLocalDataInterval();
    }

    /**
     * 延时事件处理
     */
    private _syncLocalDataInterval() {
        if (!this.intervalId) {
            this.intervalId = setTimeout(() => {
                this.intervalId = null;
                this._syncLocalData();
            }, this.syncLocalDataInterval);
        }
    }

    /**
     * 同步保存到本地数据
     */
    private _syncLocalData() {
        for (let uniKey in this.syncMap) {
            let keysObj = this.syncMap[uniKey];
            this._setData(uniKey, keysObj);
        }
        this.syncMap = {};
    }

    //保存本地数据
    private _setData(key, value) {
        if (typeof value === "object") {
            value = JSON.stringify(value);
            // value = Utils.aesEncrypt(value, ConstValue.AES_KEY);
        }
        // let inOnline = PlatformManager.getInstance().getPlatform().isOnline();
        // if (!inOnline) {
        //     key += '_DEBUG';
        // } else {
        //     key += '_RELEASE';
        // }
        sys.localStorage.setItem(key, value);
    }

    //获取本地数据
    private _getData(key, defaultValue) {
        // let isOnline = PlatformManager.getInstance().getPlatform().isOnline();
        // if (!isOnline) {
        //     key += '_DEBUG';
        // } else {
        //     key += '_RELEASE';
        // }
        let ret = sys.localStorage.getItem(key);
        if ((ret == null || ret == "null") && defaultValue != null) {
            ret = defaultValue;
        }
        return ret;
    }

    /**
     * 转为boolean类型
     * @param src 
     * @param def 
     */
    private _toBoolean(src, def) {
        if (typeof src == 'boolean') {
            return src;
        }
        else if (src == null || src == "") {
            return def;
        }
        else if (src == "false") {
            return false;
        }
        else if (src == "true") {
            return true;
        }
    }

    /**
     * 转为number类型
     * @param src 
     * @param def 
     */
    private _toNumber(src, def) {
        let ret = Number(src);
        if (!ret) {
            return def;
        }
        else {
            return ret;
        }
    }

    /**
     * 转为对象
     * @param src 
     * @param def 
     */
    private _toJSON(src, def) {
        try {
            let ret = JSON.parse(src);
            if (typeof ret == 'object' && ret) {
                return ret;
            }
            else {
                return def;
            }
        }
        catch (e) {
            return def;
        }
    }



}
