import { ADSlotId } from "../model/ADSlotId";
import { ADType, ADCallback } from "../model/ADType";


export interface PlatformClass<T extends BasePlatform> {
    new(): T;
    //初始化
    init();
    //进入APP的回调, 只调用一遍
    appEnter(callback: Function);
    //获取通用参数
    getCommonParams();
    /**登录*/
    login(options);
    /** 初始化日志参数 */
    initLogParam();
    /**分享（统一）*/
    share(shareInfo: any, callback?: Function);
    /** 加载广告 */
    loadAD(type: ADType, slotId: ADSlotId, callback?: ADCallback);
    /** 关闭广告 */
    closeAD(type: ADType, callback?: Function);
    //原生使用web
    openWeb(url: string);
    //是否线上
    isOnline();
    //获取版本名称
    getVersion();
    //获取热更版本
    getHotVersion();
    //复制剪切板
    copyShearPlate(content: string, tip: string);
    setIMEI(data: any);
    //上报数据
    reportData(data:any);
    getVersionCode();
}
export abstract class BasePlatform {
    protected static className = "BasePlatform";
    public static PHONEMODEL: string;
    public static IS_REAL_SERVER: boolean;
    public static SERVER_URL: string;

    public static APP_VERSION_NAME: string;
    public static APP_VERSION_CODE: string;
    public static API_CODE: string = '1';

    public static USER_AGENT: string;
    constructor() {
    }

    static setVersionInfo(versionName: string, versionCode: string, apiCode: string) {
        this.APP_VERSION_CODE = versionCode;
        this.APP_VERSION_NAME = versionName;
        this.API_CODE = apiCode;
    }

    //复制剪切板
    static copyShearPlate(content: string, tip: string){

    }

    static setIMEI(data: any){

    }

    static getHotVersion(){
        return '1.0.0';
    }

    static reportData(data: any){

    }

    static getVersionCode(){
        return this.APP_VERSION_CODE;
    }
}