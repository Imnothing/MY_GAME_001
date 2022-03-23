import { ConstValue } from "../Configs/ConstValue";
import { PlatformClass, BasePlatform } from "../../../scripts/framework/lib/platform/BasePlatform";
import AppPlatform from "./AppPlatform";


export class PlatformManager {
    private static instance: PlatformManager;

    private currentPlatform: PlatformClass<BasePlatform> = null;

    public static getInstance(): PlatformManager {
        if (this.instance == null) {
            this.instance = new PlatformManager();
        }
        return this.instance;
    }

    public isAppPlatform() {
        return ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Android || ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.IOS;
    }
    /**
     * init
     */
    public init() {
        if (ConstValue.isWeb) {
            // this.currentPlatform = WebPlatform;
        } else if (this.isAppPlatform()) {
            this.currentPlatform = AppPlatform;
        }else if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Wechat) {
            // this.currentPlatform = WeChatPlatform;
        }else if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.QQ) {
            // this.currentPlatform = QQPlatform;
        }else if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Qtt) {
            // this.currentPlatform = QutoutiaoPlatform;
        } else if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.KS) {
            // this.currentPlatform = KuaiShouPlatform;
        }else if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Vivo) {
            // this.currentPlatform = VivoPlatform;
        } 
        // else if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Oppo) {
        //     this.currentPlatform = OppoPlatform;
        // }
        this.currentPlatform.init();
    }
    /**
     * getPlatform
     */
    public getPlatform() {
        return this.currentPlatform;
    }

}