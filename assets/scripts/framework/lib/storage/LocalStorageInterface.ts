/**
 * 本地存储管理接口
 *
 */
export interface LocalStorageInterface {
    /**
      * 注册窗口监听器
      */
    register();

    /**
     * 保存本地存储
     * @param key 
     * @param value 
     */
    setLocalItem(key: string, value: any);
    /**
     * 获取本地存储
     * @param key 
     * @param defaultValue 
     */
    getLocalItem(key, defaultValue?);

    /**
     * 添加保存数据
     * @param key 
     * @param value 
     * @param needZip 是否需要压缩
     */
    pushSyncData(key, value);

}
