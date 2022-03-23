import { _decorator, Component, Node, view, ResolutionPolicy, Canvas, AssetManager, SpriteAtlas, assetManager, setDisplayStats } from "cc";
import { engine } from "../../scripts/framework/engine";
import { LOG_TAG } from "../../scripts/framework/lib/logger/LoggerInterface";
import { BundleConfigs } from "./Configs/BundleConfigs";
import { UIConfigs } from "./Configs/UIConfigs";
import { GameDataManager } from "./Manager/GameDataManager";
import { PlatformManager } from "./Platform/PlatformManager";
import { Utils } from "./Utils/Utils";

const { ccclass, property } = _decorator;
/**
 * evy
 * 步骤说明:
 * 1:先加载bundle到本地
 * 2:再预加载资源到内存
 * 3:最后显示
 */
@ccclass
export default class GameEntry extends Component {
    @property(Node)
    rootLayerNode: Node = null;

    onLoad() {
        engine.init();
        //@ts-ignore
        window.engine = engine;
        //@ts-ignore
        window.Utils = Utils;
        window['Canvas'] = this.node;
        setDisplayStats(false);
        //@ts-ignore 关闭浏览器页面上的vConsole调试
        !CC_JSB && window.vConsole && (window.vConsole.$dom.style.display = 'none');

        // let frameSize = view.getFrameSize();
        // if (frameSize.width / frameSize.height > 0.68) {
        //     //平板兼容设计分辨率
        //     view.setDesignResolutionSize(1200, 2134, ResolutionPolicy.FIXED_WIDTH);
        // }
        // let bFitWidth = (frameSize.width / frameSize.height) < 0.8;
        // Canvas.instance.fitWidth = bFitWidth;
        // Canvas.instance.fitHeight = !bFitWidth;

        console.log("Main Scene Loading...");

        // 初始化日志管理器
        engine.logger.init({
            enableLog: true,
        });
        //初始化配置表管理器
        engine.ccTable.init("config/");
        //初始化音频管理器
        engine.audioManager.init();
        engine.http.init("http://www.liwaishenghuo.com/match_dev");
        // 初始化面板路由器 
        engine.uiManager.init(this.rootLayerNode, true);
    }

    async start() {
        engine.logger.log(LOG_TAG.GAME, "开始加载bundle")
        // 加载 Bundle,Bundle需要在面板上勾选
        await engine.resLoader.loadBundle(BundleConfigs.LoadingBundle);
        await engine.resLoader.loadBundle(BundleConfigs.CommonBundle);
        // await engine.resLoader.loadBundle(BundleConfigs.HomeBundle);
        // await engine.resLoader.loadBundle(BundleConfigs.GameBundle);

        //加载数据表
        // engine.ccTable.loadTable("WordText");//单表模式
        //多表模式
        // let tables = ["WordText", "CommonParameter", "MusicConfig", "EffectConfig", "LevelConfig", "ItemConfig", "TaskConfig", "AreaConfig", "PicConfig", "ShopConfig", "RechargeConfig", "ChipConfig"]
        // engine.ccTable.loadTables(tables);
        // await engine.uiManager.openUIAsync(UIConfigs.loadingUI, null);
        // PlatformManager.getInstance().init();
        // GameDataManager.getInstance().init();
    }
}
