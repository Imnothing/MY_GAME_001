import { sys } from "cc";
import { engine } from "../../../scripts/framework/engine";
import { ADSlotId } from "../../../scripts/framework/lib/model/ADSlotId";
import { ADType, ADCallback } from "../../../scripts/framework/lib/model/ADType";
import { Utils } from "../Utils/Utils";
import { ConstValue } from "../Configs/ConstValue";
import { LocalKeys } from "../data/LocalKeys";
import { AccountInfo } from "../Data/Model/AccountInfo";
import { GooglePayAppID, GooglePayCode, GooglePaySubID } from "../Data/Model/GooglePayID";
import { GooglePayResult, PayCallback } from "../Data/Model/GooglePayResult";
import { ThirdPlatform, ThirdPlatfromInfo } from "../Data/Model/ThirdPlatform";
import { BrigeConst, AndroidBrigde } from "./AndroidBrigde";
import { PermissonName } from "./PermissonName";
import { PlatformManager } from "./PlatformManager";


export default class AppNative {

    videoADCallbackValue: any = null;
    videoADCallback: any = null;

    loginNativeCallbackValue: any = null;
    vipBuyCallback: any = null;
    goldBuyCallback: any = null;
    private static instance: AppNative;

    public static getInstance(): AppNative {
        if (this.instance == null) {
            this.instance = new AppNative();
            window['AppNative'] = this.instance;
        }
        return this.instance;
    }

    constructor() {
        /***  Android 主动调用 Cocos 设置阿里日志  */
        this[BrigeConst.APP_TO_COCOS_LOG] = (e, ev) => {
            // SLog.getInstance().logEvent(e, ev);
        }
        /** App按返回键 */
        this[BrigeConst.APP_TO_COCOS_OnBackPress] = () => {
            this.onBackPress();
        }
    }

    /**
     * 调用原生方法
     * @param callMethod
     * @param callParams
     * @param callbackMethod
     * @param platform 0: android/iOS  1: android 2: ios
     */
    callApp(callMethod: BrigeConst, callParams: string, callbackMethod: string, platform: number = 0) {
        let bridge: AndroidBrigde = new AndroidBrigde(callMethod, callParams, callbackMethod);
        if (platform == 0 || platform == 1) {
            this.callAndroid(bridge);
        }
        if (platform == 0 || platform == 2) {
            this.callAppIOS(bridge);
        }
    }

    callAppIOS(params) {
        if (sys.platform !== sys.Platform.ANDROID) {
            console.log("params = ", JSON.stringify(params));
            jsb.reflection.callStaticMethod("XLThirdAdToolNew", "cocosCalliOS:", JSON.stringify(params));
        }
    }

    callAndroid(paramsValue) {
        if (!ConstValue.isCloseNative && sys.platform === sys.Platform.ANDROID) {
            var className = "com/xingluo/game/AppNative";
            jsb.reflection.callStaticMethod(className, "cocosCallAndroid", "(Ljava/lang/String;)V", JSON.stringify(paramsValue));
            console.log("-->交互参数：" + JSON.stringify(paramsValue))
        } else {
            console.log("-->交互参数：" + JSON.stringify(paramsValue))
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // 向原生申请权限方法
    requestPermisstion(data: { permissonNames: PermissonName[], callback: Function }) {
        //      if (sys.platform !== sys.Platform.ANDROID) {
        //     return;
        // }
        let callbackName = 'checkPermissionCallback';
        this[callbackName] = (result: string) => {
            data && data.callback && data.callback();
            this[callbackName] = null;
        }
        AppNative.getInstance().callApp(BrigeConst.REQUEST_PERMISSION, JSON.stringify(data.permissonNames), callbackName);
    }

    /** 获取初始化系统语言 */
    fetchSystemLanguage(callback: Function) {
        let callbackName = 'fetchSystemLanguageCallback';
        this[callbackName] = (lang: string) => {
            callback(lang);
            this[callbackName] = null;
        }

        if (sys.platform !== sys.Platform.ANDROID) {
            // this[callbackName](E_language.en_us);
            // this[callbackName](ConstValue.DEFAULT_LANGUAGE);
            return;
        }
        AppNative.getInstance().callApp(BrigeConst.FETCH_SYSTEM_LANGUAGE, "", callbackName);
    }

    closeAppLoading() {
        AppNative.getInstance().callApp(BrigeConst.CLOSE_LOADING, "", "");
    }

    // 获取设备状态信息
    fetchDeviceInfo(callback: Function) {
        let callbackName = 'fetchDeviceInfoCallback';
        this[callbackName] = (deviceInfo: string) => {
            var device = JSON.parse(deviceInfo);
            callback(device);
            this[callbackName] = null;
        }

        if (sys.platform !== sys.Platform.ANDROID) {
            this[callbackName](JSON.stringify(this.fetchDebugDeviceInfo()));
            return;
        }

        AppNative.getInstance().callApp(BrigeConst.FETCH_DEVICE_INFO, "", callbackName);
    }

    fetchDebugDeviceInfo() {
        let defaultDeviceId;
        if (ConstValue.Is_TestDevice) {
            defaultDeviceId = engine.storage.getLocalItem(LocalKeys.LOCAL_DEVICE_ID, "");
            if (!defaultDeviceId) {
                defaultDeviceId = "test_sanxiao_" + Date.now();
                engine.storage.setLocalItem(LocalKeys.LOCAL_DEVICE_ID, defaultDeviceId);
            }
        } else {
            defaultDeviceId = Utils.getQueryString('deviceId') ? Utils.getQueryString('deviceId') : 'test_debug_gyw1014';
        }

        return {
            toggle: {
                "isOnlineServer": ConstValue.SERVER_ONLINE,
                "logCocos": true,
            },
            miitIdInfo: {
                "oaid": "",
                "vaid": "",
                "aaid": "",
                "isSupport": "",
            },
            userAgent: {
                // "deviceId": Utils.getQueryString('deviceId') ? Utils.getQueryString('deviceId') : 'test_debug_gyw1',
                "deviceId": Utils.getQueryString('deviceId') || Utils.getQueryString('id') || defaultDeviceId,
                "channel": "xldebug",
                "imei": "AC54D1F7E040A0E79CA5D0A4AC5D4700",
                "manufacturer": "HUAWEI",
                "phoneModel": "BND-AL10",
                "publishTime": "default",
                "sysVersion": "8.0.0",
                "versionCode": "1",
                "versionName": "1.0.0",
            }
        };
    }

    /** 关闭广告 */
    closeAD(type: ADType, callback: Function) {
        let callbackName = 'closeAdCallback';
        this[callbackName] = (isSuccess: boolean) => {
            callback && callback(isSuccess);
        }
        if (sys.platform !== sys.Platform.ANDROID) {
            this[callbackName](true);
            return;
        }
        AppNative.getInstance().callApp(BrigeConst.CLOSE_AD, type, callbackName);
    }

    /** 加载广告 */
    loadAD(type: ADType, slotId: ADSlotId, callback: ADCallback) {
        let nameLoadSucess = type + '_Succ';
        let nameLoadFail = type + '_Fail';
        let nameVideoClose = type + '_Close';

        let isVideoType = type == ADType.REWARD_VIDEO;
        let videoLoadTimeIdName = 'videoLoadTimeoutID';

        let removeCallback = () => {
            clearVideoTimeoutFun();
            this[nameLoadSucess] = null;
            this[nameLoadFail] = null;
            this[nameVideoClose] = null;
        }
        this[nameLoadSucess] = (...args: any[]) => {
            clearVideoTimeoutFun();
            callback && callback.onLoadSucccess(...args);
            !isVideoType && removeCallback(); //视频加载成功后需等onVideoClose回调后才能销毁
        }
        this[nameLoadFail] = (code: number, erroMsg: string) => {
            callback && callback.onLoadError(code, erroMsg);
            removeCallback();
        }
        this[nameVideoClose] = (isVideoEnd: boolean) => {
            callback && callback.onVideoClose(isVideoEnd);
            removeCallback();
        }

        let data = {
            adType: type,
            slotId: slotId,
            onLoadSuccessMethod: nameLoadSucess,
            onLoadFailMethod: nameLoadFail,
            onVideoCloseMethod: nameVideoClose,
        }

        //清除原生加载超时回调
        let clearVideoTimeoutFun = () => {
            if (isVideoType && typeof this[videoLoadTimeIdName] != 'undefined') {
                clearTimeout(this[videoLoadTimeIdName]);
                delete this[videoLoadTimeIdName];
            }
        }
        //超时处理
        if (isVideoType) {
            clearVideoTimeoutFun();
            this[videoLoadTimeIdName] = setTimeout(() => {
                this[nameLoadFail] && this[nameLoadFail](-1010, 'coocos load video timeout');
                clearVideoTimeoutFun();
            }, ConstValue.VIDEO_TIMEOUT * 1000);
        }
        if (sys.platform !== sys.Platform.ANDROID) {
            setTimeout(() => {
                //模拟视频加载失败
                this[data.onLoadSuccessMethod] && this[data.onLoadSuccessMethod](1, 'a', { kk: 'kk' });
                if (isVideoType) {
                    this[data.onVideoCloseMethod] && this[data.onVideoCloseMethod](true);
                }
                //模拟视频加载成功
                // this[data.onLoadFailMethod] && this[data.onLoadFailMethod](-100, 'test fail');
            }, 1000);
            return;
        }
        AppNative.getInstance().callApp(BrigeConst.LOAD_AD, JSON.stringify(data), null);
    }

    // 刷新 App 用户信息
    refreshAppUserInfo(userInfo: AccountInfo) {
        if (sys.platform !== sys.Platform.ANDROID) {
            return;
        }
        AppNative.getInstance().callApp(BrigeConst.REFRESH_USER_INFO, JSON.stringify(userInfo), null);
    }

    //调用app退出游戏
    finishGame(fouceExit?: boolean) {
        AppNative.getInstance().callApp(BrigeConst.FINISH_GAME, "", null);
    }

    //FB登录
    loginThird(platform: ThirdPlatform, callback: (data: ThirdPlatfromInfo, msg: string) => void) {
        let resolveFunc: Function;
        new Promise((resolve) => {
            resolveFunc = resolve;
            setTimeout(() => {
                resolve({ isSuccess: false, msg: "超时" });
            }, 10 * 1000);
        }).then((value: any) => {
            let { isSuccess, msg } = value;
            console.log("loginThird back", isSuccess, msg);
            if (!isSuccess) {
                callback && callback(null, msg);
            } else {
                let info = JSON.parse(msg);
                let thirdInfo: ThirdPlatfromInfo = new ThirdPlatfromInfo();
                if (platform == ThirdPlatform.FB) {
                    thirdInfo.id = info.nameValuePairs.id;
                    thirdInfo.nickname = info.nameValuePairs.name;
                } else {
                    thirdInfo.id = info.id;
                    thirdInfo.nickname = info.displayName;
                }
                callback && callback(thirdInfo, msg);
            }
            this[callbackName] = null;
        });

        let callbackName = 'loginThirdCallback';
        this[callbackName] = (isSuccess: string, msg: string) => {
            resolveFunc({ isSuccess, msg });
        };

        if (sys.platform !== sys.Platform.ANDROID) {
            let infoStr = '{"nameValuePairs":{"picture":{"nameValuePairs":{"data":{"nameValuePairs":{"height":50,"is_silhouette":false,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid\u003d797465431208470\u0026height\u003d50\u0026width\u003d50\u0026ext\u003d1619162195\u0026hash\u003dAeQ9YBhQzW7anpyEePQ","width":51}}}},"name":"Mingliang Chen","id":"fb_account1","email":"cmlbrightxh@gmail.com","permissions":{"nameValuePairs":{"data":{"values":[{"nameValuePairs":{"permission":"email","status":"granted"}},{"nameValuePairs":{"permission":"public_profile","status":"granted"}}]}}}}}';
            if (platform == ThirdPlatform.GP) {
                infoStr = '{"displayName":"MingLiang Chen","email":"cmlbrightxh1001@gmail.com","familyName":"Chen","givenName":"MingLiang","id":"113918600787314571097_100003"}';
            }
            typeof this[callbackName] == 'function' && this[callbackName](true, infoStr);
            return;
        }

        AppNative.getInstance().callApp(BrigeConst.LOGIN_THIRD, platform, callbackName);
    }

    /** Google支付相关 START */
    /** 初始化Google支付 */
    googlePayInit(callback: Function) {
        let app: any[] = Object.values(GooglePayAppID).map(item => { return { sku: item, inapp: true } });
        let sub: any[] = Object.values(GooglePaySubID).map(item => { return { sku: item, inapp: false } });
        let result = app.concat(sub);
        let callbackName = 'GPInitCB';
        this[callbackName] = (isSuccess: boolean) => {
            callback && callback(isSuccess);
        }
        if (sys.platform !== sys.Platform.ANDROID) {
            this[callbackName](true);
            return;
        }
        AppNative.getInstance().callApp(BrigeConst.GOOGLE_PAY_INIT, JSON.stringify({
            ids: result
        }), callbackName);
    }

    /** 查询Google一次性商品 */
    googlePayQueryOnceGoods(callback: Function) {
        let callbackName = 'GPQueryOnceGoodsCB';
        this[callbackName] = (info: string) => {
            callback && callback(info ? JSON.parse(info) : null);
        }
        if (sys.platform !== sys.Platform.ANDROID) {
            this[callbackName]("");
            return;
        }
        AppNative.getInstance().callApp(BrigeConst.GOOGLE_PAY_QUERY_ONCE_GOODS, '', callbackName);
    }

    /** 查询Google订阅 */
    googlePayQuerySubcribe(callback: Function) {
        let callbackName = 'GPQuerySubcribeCB';
        this[callbackName] = (info: string) => {
            callback && callback(info ? JSON.parse(info) : null);
        }
        if (sys.platform !== sys.Platform.ANDROID) {
            this[callbackName](`{"test_sub":{"autoRenewing":true,"code":1,"id":"test_sub","msg":"","orderId":"GPA.3300-7386-5598-25687","token":"hbgbomiijmnbacahaljolafh.AO-J1OxI49DArlzx_FPedtES_Zc2RAld9rNX5-1H8syxEmMYvknL6u5dQZJvA4sxQhSCZP3W9LGiOjlB2NMp3NHr-xoj368tiQ","vipBuyTime":1622102718151}}`);
            return;
        }
        AppNative.getInstance().callApp(BrigeConst.GOOGLE_PAY_QUERY_SUBSCRIBE, '', callbackName);
    }

    /** 发起一次性Google支付 */
    googlePayOnceGoods(id: GooglePayAppID, callback: PayCallback) {
        this._googlePayPurchase(id, true, callback);
    }

    /** 发起Google订阅支付 */
    googlePaySubcribe(id: GooglePaySubID, callback: PayCallback) {
        this._googlePayPurchase(id, false, callback);
    }

    /**
     * 发起Google支付
     * @param id 支付ID
     * @param isDispose true: 一次性商品 false: 订阅商品
     * @param callback
     */
    private _googlePayPurchase(id: GooglePayAppID | GooglePaySubID, isDispose: boolean, callback: PayCallback) {
        let callbackName = 'GPPurchaseCB';
        this[callbackName] = (code: boolean, json: string) => {
            callback && callback.onPayResult(GooglePayResult.newInstance(json));
        }
        if (sys.platform !== sys.Platform.ANDROID) {
            setTimeout(() => {
                if (isDispose) {
                    let result: GooglePayResult = new GooglePayResult();
                    result.code = GooglePayCode.SUCCESS;
                    result.id = id;
                    result.msg = "xxxx";
                    this[callbackName](result.code, JSON.stringify(result));
                } else {
                    this[callbackName](GooglePayCode.SUCCESS, JSON.stringify({
                        "code": 1,
                        "msg": "success",
                        "orderId": "GPA.3302-2274-0087-15290",
                        "id": "test_sub",
                        "token": "fakegdinmmgenmpbochncfdl.AO-J1Oz2_i0lRhmmXcVGATMoypngPm5FhtxnvhlBmYK4QEmkBRMQ60aXsrY6IP_YWS4SaEMn2GqN9dDIRYyXWIxVGVP5_Po0Xg",
                        "vipBuyTime": 1621856635993,
                        "autoRenewing": true,
                    }));
                }
            }, 1000);
            return;
        }
        AppNative.getInstance().callApp(isDispose ? BrigeConst.GOOGLE_PAY_ONCE_GOODS : BrigeConst.GOOGLE_PAY_SUBSCRIBE, JSON.stringify({
            id: id,
            disposable: isDispose,
        }), callbackName);
    }

    /** Google支付相关 END */

    /** 重启APP */
    restartApp() {
        AppNative.getInstance().callApp(BrigeConst.RESTART_GAME, '', '');
    }

    //App按返回键
    onBackPress() {
        // UIHelp.showDialog({
        //     title: '提示',
        //     content: '是否退出游戏？',
        //     isOkShow: true,
        //     isCancelShow: true,
        //     okCb: () => {
        //         this.finishGame();
        //     }
        // });
    }

    //处理检查更新
    updateVersion(data) {
        var msg = JSON.stringify(data);
        // LogWrap.log(LOG_TAG.DEV_LOG, msg);
        AppNative.getInstance().callApp(BrigeConst.CHECK_VERSION, msg, null);
    }

    //发送原生firebase事件
    sendFirebaseLog(params) {
        AppNative.getInstance().callApp(BrigeConst.SEND_EVEN_LOG, JSON.stringify(params), null);
    }

    //跳转url
    nativeSkipUrl(url) {
        AppNative.getInstance().callApp(BrigeConst.SKIP_URL, url, null);
    }

    //复制到剪切板
    copyShearPlate(content, tip) {
        var data = {
            content: content,
            tip: tip,
        };
        console.log("已复制:", content);
        AppNative.getInstance().callApp(BrigeConst.COPY_CLIP_BOARD, JSON.stringify(data), null);
    }


    //App调用设置IMEI
    setIMEI(data) {
        // LogWrap.log(LOG_TAG.DEV_LOG, 'App调用设置IMEI');
        if (sys.platform !== sys.Platform.ANDROID) {
            data = {
                imei: '8DEB76A9C20CA3CAB358F84DA3FE784011',
                mac: '94:87:E0:05:B1:A6',
                idfa: 'idfa_dddddddddddddddddddd',
                openudid: 'openudid_xxxxxxxxxxxxx',
            }
            data = JSON.stringify(data);
        }
        if (data) {
            data = JSON.parse(data);
            PlatformManager.getInstance().getPlatform().setIMEI(data);
        }
    }

}
