import { ConstValue } from "../../../mainbundle/scripts/Configs/ConstValue";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import BattleUI from "../UI/Battle/BattleUI";
import { BattleManager } from "./BattleManager";
import { BattleSkillSystem } from "./BattleSkillSystem";

export class McGame {
    public static battleManager: BattleManager;
    public static battleSkillSystem: BattleSkillSystem;

    //是否胜利
    public static isWin: boolean = false;
    public static isEnd: boolean = false;
    //关卡id
    public static levelId: number = 0;
    //关卡json
    public static levelJson: any = null;

    public static async init(levelId: number) {
        window['McGame'] = this;
        return new Promise<boolean>(async (resolved, reject) => {
            if (!this.battleManager)
                this.battleManager = new BattleManager();

            resolved(true);
        });
    }

    static initData() {
        this.isWin = false;
        this.isEnd = false;
    }

    static initMgr(battleUI: BattleUI) {
        this.battleManager.init(battleUI);
    }

    /**
     * 开始游戏
     */
    public static playLevel(levelJson: any) {
        this.battleManager.setInitData(levelJson);
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


