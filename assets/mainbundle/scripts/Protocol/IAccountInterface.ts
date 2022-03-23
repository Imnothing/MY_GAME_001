

/**
 * 账号协议接口
 *
 */
export interface IAccountInterface {
    /**
     * 检测版本
     */
    reqCheckVersion(callback: Function): void;

    /**
     * 注册账号
     */
    registAccount(account: string, password: string, callback: Function): void;

    /**
     * 登陆账号
     */
    reqLoginAccount(msg: any, callback: Function): void;

    /**
     * 提交用户信息
     */
    submitUser(nickName: string, pic: string): void;


    /**
    * 上报激活接口
    * @param {*} account
    * @param {*} password
    */
    reqCompleteReport(callback: Function): void;

    /**
     * 请求排行榜数据
     */
    reqRank(callback: Function): void;

    /**
     * 请求棋子基础库
     * @returns 
     */
    reqCubeCommonJson(): Promise<any>;

    /**
     * 请求当前批次关卡库
     * @returns 
     */
    reqAllLevelJson(): Promise<any>;

    /**
     * 请求游戏数据
     */
    reqGameData();

}
