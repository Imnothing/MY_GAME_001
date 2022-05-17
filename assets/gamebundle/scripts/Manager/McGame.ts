import { HomeManager } from "../../../homebundle/scripts/Manager/HomeManager";
import { ConstValue } from "../../../mainbundle/scripts/Configs/ConstValue";
import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { LocalKeys } from "../../../mainbundle/scripts/Data/LocalKeys";
import { PetData } from "../../../mainbundle/scripts/Data/PetData";
import { SptConfig } from "../../../mainbundle/scripts/Datatable/SptConfig";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import { GameListenerType } from "../Data/GameListenerType";
import BattleUI from "../UI/Battle/BattleUI";
import PetUI from "../UI/Battle/PetUI";
import { BattleControl } from "./BattleControl";
import { BattleManager, EnumPlayer } from "./BattleManager";
import { BattleSkillSystem } from "./BattleSkillSystem";

export class McGame {
    public static battleManager: BattleManager;
    public static battleSkillSystem: BattleSkillSystem;
    public static battleControl: BattleControl;

    //是否胜利
    public static isWin: boolean = false;
    public static isEnd: boolean = false;
    //关卡json
    public static sptJson: any = null;
    public static sptConfig: SptConfig = null;

    public static async init() {
        window['McGame'] = this;
        return new Promise<boolean>(async (resolved, reject) => {
            if (!this.battleManager)
                this.battleManager = new BattleManager();
            if (!this.battleSkillSystem)
                this.battleSkillSystem = new BattleSkillSystem();
            if (!this.battleControl)
                this.battleControl = new BattleControl();
            this.initMgr();
            resolved(true);
        });
    }

    static initData(sptConfig: SptConfig, petJson: any) {
        this.isWin = false;
        this.isEnd = false;
        this.sptJson = petJson;
        this.sptConfig = sptConfig;
    }

    static initMgr() {
        this.battleManager.init();
        this.battleControl.init();
    }

    /**
     * 开始游戏
     */
    public static playLevel() {
        this.battleManager.setInitData(this.sptJson);
    }


    /**
     * 保存精灵数据
     * @param pets 
     */
    public static savePetInfo() {
        let petBagList = GameDataManager.getInstance().getGameData().petBagList;
        let fightPetNode = this.battleManager.getPets(EnumPlayer.Own);
        for (let key in fightPetNode) {
            let petInfo: FightPet = fightPetNode[key].getComponent(PetUI).getPetInfo();
            petBagList[petInfo.petBagId].battleValue.hp = petInfo.battleValue.hp;
        }
        engine.storage.pushSyncData(LocalKeys.LOCAL_PETBAG, petBagList);
    }

    public static loseGame() {
        this.isWin = false;
        engine.listenerManager.trigger(GameListenerType.GameOver, false)
    }

    public static winGame() {
        this.isWin = true;
        engine.listenerManager.trigger(GameListenerType.GameOver, true)
        HomeManager.propManager.addProps(this.sptConfig.Prize);
    }

}


