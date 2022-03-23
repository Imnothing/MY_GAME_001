import Analysis from "./lib/analysis/Analysis";
import { AnalysisInterface } from "./lib/analysis/AnalysisInterface";
import ResLoader from "./lib/asset/ResLoader";
import { AudioManager } from "./lib/audio/AudioManager";
import { CCTable } from "./lib/datatable/CCTable";
import { ListenerInterface } from "./lib/eventmanager/ListenerInterface";
import ListenerManager from "./lib/eventmanager/ListenerManager";
import { GlobalDataManager } from "./lib/globalData/GlobalDataManager";
import CCLogger from "./lib/logger/CCLogger";
import { LoggerInterface } from "./lib/logger/LoggerInterface";
import { HttpRequest } from "./lib/net/HttpRequest";
import { PoolManager } from "./lib/objectPool/PoolManager";
import UIManager from "./lib/router/UIManager";
import { UIManagerInterface } from "./lib/router/UIManagerInterface";
import { LocalStorage } from "./lib/storage/LocalStorage";
import { LocalStorageInterface } from "./lib/storage/LocalStorageInterface";

export class engine {
    /**
     * 日志接口
     */
    public static logger: LoggerInterface;

    /**
     * 事件广播、监听、注销管理器接口
     */
    public static listenerManager: ListenerInterface;

    /**
     * 事件统计上报接口
     */
    public static analysis: AnalysisInterface;

    /**
     * 面板路由器接口
     */
    public static uiManager: UIManagerInterface;

    /**
     * 本地缓存键值对存储接口
     */
    public static storage: LocalStorageInterface;

    /**
     * 资源加载器
     */
    public static resLoader: ResLoader;

    /**
     * 音频管理器
     */
    public static audioManager: AudioManager;

    /**
     * 网络模块
     */
    public static http: HttpRequest;

    /**
     * 数据表管理
     */
    public static ccTable: CCTable;

    /**
     * 节点池管理
     */
    public static poolManager: PoolManager;

    /**
     * 全局数据缓存管理
     */
    public static globalDataManager: GlobalDataManager;

    public static init() {
        this.logger = new CCLogger();
        this.listenerManager = new ListenerManager();
        this.analysis = new Analysis();
        this.storage = new LocalStorage();
        this.uiManager = new UIManager();
        this.resLoader = new ResLoader();
        this.audioManager = new AudioManager();
        this.http = new HttpRequest();
        this.ccTable = new CCTable();
        this.poolManager = new PoolManager();
        this.globalDataManager = new GlobalDataManager();
    }
}

// //@ts-ignore
// window.engine = engine;