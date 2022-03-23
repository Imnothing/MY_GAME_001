import { NodePool } from "cc";
import { engine } from "../../engine";
import { LOG_TAG } from "../logger/LoggerInterface";
import { IObjectPoolManager } from "./IObjectPoolManager";
/**
 * 全局对象池管理
 */
export class PoolManager implements IObjectPoolManager{
    public _poolMap:Map<string,NodePool> = new Map<string,NodePool> ();
    getCount(): number {
        throw new Error("Method not implemented.");
    }
    createPool(_poolName:string): NodePool {
        if(this._poolMap[_poolName]){
            engine.logger.error(LOG_TAG.FRAMEWORK,'对象池已经存在，无需重复创建!');
            return null;
        }
        let pool = new NodePool();
        this._poolMap[_poolName] = pool;
        return pool;
    }
    getPool(_poolName: string): NodePool {
        if(this._poolMap[_poolName]){
            return this._poolMap[_poolName];
        }else{
        //    throw new Error(`对象池${_poolName}不存在`);
            return this.createPool(_poolName);
        }

    }
    
    releasePool(_poolName: string) {
        if(this._poolMap[_poolName]){
            this._poolMap[_poolName].clear();
        }else{
            engine.logger.error(LOG_TAG.FRAMEWORK,`对象池${_poolName}不存在`);
         }
    }

}