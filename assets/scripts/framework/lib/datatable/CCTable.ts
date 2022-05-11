import { error, JsonAsset } from "cc";
import { engine } from "../../engine";
import { LOG_TAG } from "../logger/LoggerInterface";
import { CCTableInterface } from "./CCTableInterface";

/** 
 * 数据表工具 
 **/

export class CCTable implements CCTableInterface {
    public _configPath: string;
    public data: Map<string, any> = new Map();
    //配置文件读取进度
    private curLoadedCount: number = 0;

    init(configPath: string) {
        this._configPath = configPath;
    }

    get(name: string): any {
        if (this.data.has(name))
            return this.data.get(name);
    }

    loadTable(name: string) {
        if (!this._configPath) {
            engine.logger.error(LOG_TAG.GAME, "配置表路径未配置");
            return;
        }

        return new Promise<Object>((resolve, reject) => {
            var url = this._configPath + name;
            engine.resLoader.load(url, JsonAsset, (err: Error | null, content: JsonAsset) => {
                console.log("load config:" + url);
                if (err) {
                    error("load config failed:" + err.message);
                }
                this.data.set(name, content.json);
                resolve(content.json);
            });
        });
    }

    async loadTables(tables: string[]) {
        return new Promise<void>(async (resolve, reject) => {
            let proArr = [];
            tables.forEach(table => {
                proArr.push(this.loadTable(table));
            });
            await Promise.all(proArr).then(() => {
                resolve();
            });
        });

    }


}