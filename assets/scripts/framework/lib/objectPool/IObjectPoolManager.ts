import { NodePool } from "cc";

export interface IObjectPoolManager {

    /**
     * 获取对象池数量。
     */    
    getCount():number;

    createPool(_poolName:string):NodePool;

    getPool(_poolName:string):NodePool;

    releasePool(_poolName:string);
}