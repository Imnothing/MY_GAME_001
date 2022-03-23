export enum BrigeConst {

    /** 请求权限 */
    REQUEST_PERMISSION = "checkPermission",

    /** 获取语言配置 */
    FETCH_SYSTEM_LANGUAGE = "fetchSystemLanguage",

    /** 获取设备信息 */
    FETCH_DEVICE_INFO = "fetchDeviceInfo",

    /** 检查更新 */
    CHECK_VERSION = "CHECK_VERSION",

    /** 发送原生事件 */
    SEND_EVEN_LOG = "SEND_EVEN_LOG",


    /** 调用系统浏览器 */
    SKIP_URL = "SKIP_URL",

    /** 关闭Loading页面 */
    CLOSE_LOADING = "CLOSE_LOADING",

    /** 刷新用户信息 */
    REFRESH_USER_INFO = "refreshUserInfo",

    /** 登录第三方 */
    LOGIN_THIRD = "loginThird",

    /** 关闭app */
    FINISH_GAME = "finishGame",

    /** 重启app */
    RESTART_GAME = "restartGame",

    /** 复制文字到剪切板 */
    COPY_CLIP_BOARD = "COPY_CLIP_BOARD",

    /** 加载广告 */
    LOAD_AD = "LOAD_AD",

    /** 关闭广告 */
    CLOSE_AD = "CLOSE_AD",

    /** 上传文件 */
    UPLOAD_FILE = "UPLOAD_FILE",

    /** 初始化Google支付 */
    GOOGLE_PAY_INIT = "googlePayInit",

    /** 查询Google一次性商品 */
    GOOGLE_PAY_QUERY_ONCE_GOODS = "googlePayQueryOnceGoods",

    /** 查询Google订阅 */
    GOOGLE_PAY_QUERY_SUBSCRIBE = "googlePayQuerySubscribe",

    /** 发起Google一次性商品支付 */
    GOOGLE_PAY_ONCE_GOODS = "googlePayOnceGoods",

    /** 发起Google订阅支付 */
    GOOGLE_PAY_SUBSCRIBE = "googlePaySubscribe",

    /***************************** (START)  Android 主动调用 Cocos ******************************************************************/

    /** 原生调用 **/
    APP_TO_COCOS_LOG = "APP_COCOS_SendAliLog",

    /** App按返回键 */
    APP_TO_COCOS_OnBackPress = "APP_TO_COCOS_OnBackPress",


    /***************************** (END)  Android 主动调用 Cocos ******************************************************************/
}


export class AndroidBrigde {

    private callMethod: string
    private callParams: string
    private callbackMethod: string

    constructor(callMethod: BrigeConst, callParams: string, callbackMethod: string) {
        this.callMethod = callMethod;
        this.callParams = callParams;
        this.callbackMethod = callbackMethod;
    }
}