import { ConstValue } from "../../../mainbundle/scripts/Configs/ConstValue";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import BattleUI from "../UI/Battle/BattleUI";
import { BattleManager } from "./BattleManager";
import { BattleSkillSystem } from "./BattleSkillSystem";

/** 运行模式 */
export enum RunMode {

    /** 三消模式 */
    Play = 'play',

    /** 调整布局模式 */
    Layout_Exchange = "layout_exchange",

    /** 调整布局模式-直接覆盖模式 */
    Layout_Cover = "layout_cover",

}

export class GameManager {
    public static battleManager: BattleManager;

    public static RunModel = RunMode.Play;
    //是否胜利
    public static isWin: boolean = false;
    public static isEnd: boolean = false;
    //关卡id
    public static levelId: number = 1;
    public static _cocosReady: boolean = false;
    public static _mapDataCache: any = null;
    public static async init() {
        window['GameMgr'] = this;
        this.isWin = false;
        this.isEnd = false;

        engine.logger.log(LOG_TAG.GAME, "管理器初始化完成");
    }

    static initMgr(battleUI: BattleUI) {
        if (ConstValue.DEBUG_MAP_LOCAL) {
            this.init();
        }
        this.battleManager.init(battleUI);
    }

    /**
     * 开始游戏
     */
    public static playLevel(petJson: any) {
        this.battleManager.setInitData(petJson);
    }


    /**
     * 保存精灵数据
     * @param pets 
     */
    public static savePetInfo(pets) { }

    /**
     * 失败
     */
    public static loseGame() {
        let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
        playerInfo.winRepeatedly = 0;
        playerInfo.save();
    }

}


