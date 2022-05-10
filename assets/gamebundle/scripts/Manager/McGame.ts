import { ConstValue } from "../../../mainbundle/scripts/Configs/ConstValue";
import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
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
    public static sptId: number = null;
    //关卡json
    public static sptJson: any = null;

    public static async init(sptId: number) {
        window['McGame'] = this;
        return new Promise<boolean>(async (resolved, reject) => {
            this.sptId = sptId;
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
    public static playLevel(sptId: any) {
        let sptConfig = ConfigReader.readSptConfig(sptId)
        this.battleManager.setInitData(sptConfig);
    }


    /**
     * 保存精灵数据
     * @param pets 
     */
    public static savePetInfo(pets) { }

    public static loseGame() { }

    public static winGame() { }

}


