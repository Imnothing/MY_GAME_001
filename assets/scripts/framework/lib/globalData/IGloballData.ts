export interface IGlobalData {

    /**
     * 创建全局数据
     * @param key 
     * @param obj 
     */
    createGlobalData(key: string, obj: any): any;

    /**
     * 获取指定key的数据
     * @param key 
     */
    getGlobalData(key: string): any;

    /**
     * 是否指定全局数据
     * @param key 
     */
    clearGlobalData(key: string);

    /**
     * 清除所有全局数据缓存
     */
    clearAllGlobalData();
}