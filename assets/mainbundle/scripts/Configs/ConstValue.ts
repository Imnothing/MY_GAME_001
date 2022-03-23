import { Color, sys } from "cc";

/**
 * 游戏参数类
 */
export class ConstValue {
    /** 视频加载超时时间(单位: 秒) */
    public static readonly VIDEO_TIMEOUT = 30;

    public static readonly SCREEN_HEIGHT = 1334;
    public static readonly SCREEN_WIDTH = 750;
    public static readonly PLATFORM_UNIT_COUNT = 12;
    public static readonly PLATFORM_TYPE = {
        Wechat: 'wechat',
        Android: 'hwandroid',
        IOS: 'hwios',
        QQ: 'qq',
        Oppo: 'oppo',
        Vivo: 'vivo',
        Qtt: 'qutoutiao',
        KS: 'kuaishou' //快手
    };
    /**游戏版本号 */
    public static readonly GAME_VERSION = "20180718";
    /**热更版本号 */
    public static readonly GAME_HOT_VERSION = "1.0";
    /** 接口是否使用正式环境 */
    public static readonly SERVER_ONLINE = false;
    /**游戏平台 */
    // public static GAME_PLATFORM = (sys.os === sys.OS_ANDROID ? ConstValue.PLATFORM_TYPE.Android : ConstValue.PLATFORM_TYPE.IOS);
    public static GAME_PLATFORM = ConstValue.PLATFORM_TYPE.Android;


    public static readonly SHARE_TYPE = {
        Wechat: 'Wechat',
        WechatMoments: 'WechatMoments',
        SinaWeibo: 'SinaWeibo',
        QQ: 'QQ',
        QZone: 'QZone',
        More: 'More'
    };


    /** aes秘钥 */
    public static AES_KEY = '425b2f26acb2482f8d3eab588095aae0';
    /** 是否加密 */
    public static isAES: boolean = false;
    /** 是否关闭广告 */
    public static isCloseAd: boolean = false;
    /** 是否开启测试界面 */
    public static isOpenTestPanel: boolean = false;
    /** 是否web平台 */
    public static isWeb: boolean = false;

    public static isCloseNative: boolean = false;
    /**是否oppo超休闲 */
    public static isOppoXiuxian: boolean = false;
    /** 种植时间限制 */
    public static isShifeiLimit: boolean = false;
    /** 测试热更 */
    public static isTestHot: boolean = false;
    /** 测试防沉迷未成年 */
    public static isTestFcmWcn: boolean = false;
    /** 刘海屏下移距离 */
    public static LiuHaiSpace: number = 64;

    //语言类型
    public static LANGUAGE_TYPE = {
        CN: "CN",
        EN: "EN"
    };
    //当前语言类型
    // public static CURRENT_LANGUAGE = sys.language == sys.LANGUAGE_CHINESE ? ConstValue.LANGUAGE_TYPE.CN : ConstValue.LANGUAGE_TYPE.EN;

    /** 访问远程json配置 */
    public static IS_SERVER_JSON = false;
    /**模拟测试设备id */
    public static Is_TestDevice = true;
    /** 新手引导开关 */
    public static readonly GUIDER_OPEN = true;
    /** 调试面板开关 */
    public static readonly DEBUG_PANEL_OPEN = false;

    /** 是否开启测试功能 */
    public static readonly DEBUG_OPEN_TEST: boolean = true;
    /** 是否本地测试 */
    public static readonly DEBUG_MAP_LOCAL: boolean = false;
    /** 多语言打包开关 */
    public static readonly DEBUG_LANG_OPEN: boolean = false;


}
