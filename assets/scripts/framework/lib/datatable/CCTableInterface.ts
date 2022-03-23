/**
 * 数据表接口
 *
 */
export interface CCTableInterface {
    /**
     * 初始化数据表配置
     * @param configPath 
     */
    init(configPath:string);
    
    /**
     * 读取指定表
     */
    get(name:string);

    /**
     * 加载单个数据表
     * @param name 
     * @param callback 
     */
    loadTable(name: string);

    /**
     * 批量加载数据表
     * @param name 
     * @param callback 
     */
    loadTables(tables:Array<string>);
}
