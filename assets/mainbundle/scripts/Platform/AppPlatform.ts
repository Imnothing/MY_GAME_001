import { sys } from "cc";
import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import { ADSlotId } from "../../../scripts/framework/lib/model/ADSlotId";
import { ADType, ADCallback } from "../../../scripts/framework/lib/model/ADType";
import { BasePlatform } from "../../../scripts/framework/lib/platform/BasePlatform";
import UIManager from "../../../scripts/framework/lib/router/UIManager";
import { Utils } from "../Utils/Utils";
import { ConstValue } from "../Configs/ConstValue";
import { GameDataManager } from "../Manager/GameDataManager";
import { LocalKeys } from "../Data/LocalKeys";
import { UIHelp } from "../Utils/UIHelp";
import AppNative from "./AppNative";
import { NetConfig } from "../Configs/NetConfig";
// import AppNative from "./AppNative";


const ISONLINESERVER = false;//是否使用正式环境
const URL_ONLINE = 'https://beta.ygj.com.cn/xxwg';
const URL_DBUG = 'https://beta.ygj.com.cn/xxwg';
const API_CODE: string = '1';
const HOT_VERSION = '1.0.0.1';
export default class AppPlatform extends BasePlatform {

    static loginCallBack: Function;
    static shareCallBack: Function;
    static getDeviceIdCallBack: Function;
    static showBannerCallBack: Function;
    public static DEVICE_ID: string;
    public static DEVICE_INFO: any;
    public static APP_CHANNEL: string;
    private _isClickVideoAD: boolean;//是否正在点击视频广告的标记
    private videoTimeSchedule: any; //标记
    private _hasSetIMEINetwork: boolean;//是否已经请求了IMEI的标记
    static _isClickVideoAD: any;
    static videoTimeSchedule: any;
    static _hasSetIMEINetwork: any;
    public constructor() {
        super();
    }

    public static init() {
    }

    static getVersion() {
        return this.APP_VERSION_NAME;
    }

    static getVersionCode() {
        return this.APP_VERSION_CODE;
    }

    static getHotVersion() {
        return HOT_VERSION;
    }

    static callApp(methodName: string, params: string, paramsType?: string) {
        if (sys.platform === sys.Platform.ANDROID) {
            var className = "com/xingluo/game/AppNative";
            jsb.reflection.callStaticMethod(className, methodName, paramsType ? paramsType : "Ljava/lang/String;)Z", params);
        } else {
            jsb.reflection.callStaticMethod("XLThirdAdToolNew", methodName + ":", params);
        }
    }

    static appEnter(callback) {
        // SLog.getInstance().initSLog(sys.os === sys.OS_ANDROID ? 'oppoAndroid_xxkz' : 'ios_kezhan');
        AppNative.getInstance().fetchDeviceInfo((deviceinfo) => {
            engine.logger.log(LOG_TAG.DEV_GYW, JSON.stringify(deviceinfo));
            // LogWrap.OPENLOGFLAG = deviceinfo.toggle.logCocos;
            this.DEVICE_INFO = deviceinfo.userAgent;
            this.DEVICE_ID = deviceinfo.userAgent.deviceId;

            //判断切换帐号清空数据(测试环境调试的时候，方便切换帐号，自动清空缓存)
            let localDeviceId = engine.storage.getLocalItem(LocalKeys.LOCAL_DEVICE_ID, '');
            if (!deviceinfo.toggle.isOnlineServer && localDeviceId && localDeviceId != '' && localDeviceId != deviceinfo.userAgent.deviceId) {
                console.error("App 切换帐号，清空本地缓存");
                sys.localStorage.clear();
                // GameDataManager.getInstance()['gameData'] = new GameData();
            }
            engine.storage.setLocalItem(LocalKeys.LOCAL_DEVICE_ID, deviceinfo.userAgent.deviceId);

            this.PHONEMODEL = deviceinfo.userAgent.phoneModel;
            this.APP_CHANNEL = deviceinfo.userAgent.channel;
            var isOnline = typeof deviceinfo.toggle.isOnlineServer != 'undefined' ? deviceinfo.toggle.isOnlineServer : ISONLINESERVER;
            ConstValue.isOpenTestPanel = !isOnline;
            NetConfig.BASEURL = isOnline ? URL_ONLINE : URL_DBUG;
            this.IS_REAL_SERVER = isOnline;
            this.setVersionInfo(deviceinfo.userAgent.versionName, deviceinfo.userAgent.versionCode, API_CODE);

            // PaymentMgr.init();

            this.login(callback);
        });
    }

    //登录
    public static login(callback?: Function) {
        // var needCheckVersion = typeof this.needCheckVersion != 'undefined' ? that.needCheckVersion : true;
        // if (needCheckVersion) {
        // PlayerReqHandler.getInstance().reqCheckVersion((res) => {
        //     if (res && res.code == 1 && res.data) {
        //         // AppNative.getInstance().updateVersion(res.data);
        //         if (this.DEVICE_INFO.versionCode < res.data.version_value) {
        //             UIHelp.showDialog(
        //                 {
        //                     title: res.data.title,
        //                     content: res.data.infoCode,
        //                     isOkShow: true,
        //                     isCancelShow: res.data.forceUpdate == 1 ? false : true,
        //                     okBtnStr: res.data.confirmText,
        //                     cancelBtnStr: res.data.cancelText,
        //                     isForce: res.data.forceUpdate == 1 ? false : true,
        //                     okCb: () => {
        //                         AppNative.getInstance().updateVersion(res.data);
        //                     },
        //                     cancelCb: () => {
        //                         UIManager.getInstance().closeUI(AlertDialogUI);
        //                     },
        //                 }
        //             )
        //         }

        //     } else {
        //         SLog.getInstance().logEvent('check_version', 'fail');
        //     }
        // });
        // }
        let loginParam = {
            share_uid: '0',
            // cid: SLog.getInstance().cid || '0',
            // fu: SLog.getInstance().fu || '0',
            // ct: SLog.getInstance().ct || '0',
            login_type: '1', //  1-游客登录，999-token登录，2-账号密码登录
            visitor: this.DEVICE_ID,
            hotversion: HOT_VERSION,
            // token:'05fflba'
        };
        callback(loginParam);
    }
    public static initLogParam() {

        // var localUserInfo = GameDataManager.getInstance().getAccountInfo();

        // SLog.getInstance().initParams({
        //     hotversion: HOT_VERSION,
        //     wxscene: this.DEVICE_INFO.channel,
        //     cid: sys.localStorage.getItem("android_cid") ? sys.localStorage.getItem("android_cid") : "0",
        //     version: this.APP_VERSION_NAME,
        //     uid: localUserInfo ? localUserInfo.uuid : '0',
        //     useragent: ("sys=" + this.DEVICE_INFO.sysVersion + "&cs=" + this.DEVICE_INFO.manufacturer + "&pm=" + this.DEVICE_INFO.phoneModel + "&pt=" + this.DEVICE_INFO.publishTime),
        //     ct: localUserInfo ? (localUserInfo.create_time ? localUserInfo.create_time : '0') : '0',
        // });
    }

    /**分享（统一）*/
    public static share(shareInfo: any, callback?: Function) {

    }
    //分享回调
    public static shareAppCallBack(isSuccess) {

    }


    /** 加载广告 */
    public static loadAD(type: ADType, slotId: ADSlotId, callback?: ADCallback) {
        // let isVideo = type == ADType.REWARD_VIDEO;
        // isVideo && UIHelp.showWaitingDialog();
        // AppNative.getInstance().loadAD(type, slotId, {
        //     /** 加载失败 */
        //     onLoadError: (code: number, erroMsg: string) => {
        //         isVideo && UIHelp.closeWaitingDialog();
        //         callback && callback.onLoadError(code, erroMsg);
        //     },

        //     /** 加载成功, 开始播放视频 */
        //     onLoadSucccess: (...args: any[]) => {
        //         isVideo && UIHelp.closeWaitingDialog();
        //         callback && callback.onLoadSucccess(...args);
        //     },

        //     /** 视频关闭回调 */
        //     onVideoClose: (isVideoEnd: boolean) => {
        //         callback && callback.onVideoClose(isVideoEnd);
        //     }
        // });
    }

    /** 关闭广告 */
    public static closeAD(type: ADType, callback?: Function) {
        // AppNative.getInstance().closeAD(type, callback);
    }


    //打开web
    public static openWeb(url) {
        // this.callApp('openWeb', '');
    }

    //复制到剪切板
    public static copyShearPlate(content, tip) {
        // if (cc) {

        // }
        // AppNative.getInstance().copyShearPlate(content, tip);
    }

    public static isOnline() {
        return this.IS_REAL_SERVER;
    }

    static getCommonParams() {
        var accountInfo = GameDataManager.getInstance().getAccountInfo();
        var token = accountInfo.token || "";
        var data = {
            token: token,
            apiversion: API_CODE,
            appversion: this.APP_VERSION_CODE,
            hotversion: HOT_VERSION,
            platform: ConstValue.GAME_PLATFORM,
            // channel: SLog.getInstance().cid || '0',
            // cid: SLog.getInstance().cid || '0',
            apk_channel: this.DEVICE_INFO.channel || '0',
            device_id: this.DEVICE_ID,
            ct: this.DEVICE_INFO.createTime || '0'
        };
        let net = Utils.getQueryString('is_server_json');
        if (net == "1") {
            data["debug-mode"] = 1;
        }

        let timeParam = Utils.getQueryString('debug-now');
        if (timeParam) {
            data["debug-now"] = timeParam;
        }
        return data;
    }


    static setIMEI(data) {
        if (data && !this._hasSetIMEINetwork) {
            this._hasSetIMEINetwork = true;
            var params = {
                os: ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Android ? 'android' : 'ios',
                mac: data.mac ? data.mac : '',
            }
            var logInfo = '';
            if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Android) {
                params['imei'] = data.imei ? data.imei : '';
                logInfo = ' imei-' + params['imei'];
            } else {
                params['idfa'] = data.idfa ? data.idfa : '';
                params['openudid'] = data.openudid ? data.openudid : '';
                logInfo = ' idfa-' + params['idfa'] + ' openudid-' + params['openudid'];
            }
            logInfo += (' mac-' + params['mac'] + ' deviceid-' + this.DEVICE_ID);
            // SLog.getInstance().logEvent('getAppCid', 'request' + logInfo);
            engine.logger.log(LOG_TAG.DEV_GYW, '开始getAppCid');
            // ProtocolMgr.getInstance().sendHttpReq('xxkz/xxkz/getAppCid', params, (res) => {
            //     LogWrap.log(LOG_TAG.DEV_GYW, '返回cid');
            //     LogWrap.log(LOG_TAG.DEV_GYW, res);
            //     if (res) {
            //         var cid = res.data ? res.data.cid : "0";
            //         if (cid && cid != "0") {
            //             sys.localStorage.setItem("android_cid", cid);
            //             SLog.getInstance().setCid(cid);
            //             SLog.getInstance().logEvent('getAppCid', 'success' + logInfo);
            //         }
            //     } else {
            //         SLog.getInstance().logEvent('getAppCid', 'fail' + logInfo + ' msg-' + (res ? JSON.stringify(res) : ""));
            //         this._hasSetIMEINetwork = false;
            //     }
            // });
        }
    }
}
