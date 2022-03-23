import { NodePool } from "cc";
import { engine } from "../../engine";
import { LOG_TAG } from "../logger/LoggerInterface";
import { IGlobalData } from "./IGloballData";
/**
 * 全局数据缓存管理
 */
export class GlobalDataManager implements IGlobalData {

    public _globalDataMap: Map<string, any> = new Map<string, any>();

    getGlobalData(key: string) {
        if (this._globalDataMap.get(key)) {
            return this._globalDataMap.get(key);
        }
        return null;
    }

    createGlobalData(key: string, obj: any) {
        this._globalDataMap.set(key, obj);
    }

    clearGlobalData(key: string) {
        this._globalDataMap.delete(key);
    }


    clearAllGlobalData() {
        this._globalDataMap = new Map<string, any>();
    }
}