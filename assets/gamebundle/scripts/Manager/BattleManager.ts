import { instantiate, Node } from "cc";
import { UIConfigs } from "../../../mainbundle/scripts/Configs/UIConfigs";
import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { EnumAttribute, PetData } from "../../../mainbundle/scripts/Data/PetData";
import { AttributeConfig } from "../../../mainbundle/scripts/Datatable/AttributeConfig";
import { engine } from "../../../scripts/framework/engine";
import { BaseUI } from "../../../scripts/framework/lib/router/BaseUI";
import { GameListenerType } from "../Data/GameListenerType";
import BattleUI from "../UI/Battle/BattleUI";
import PetUI from "../UI/Battle/PetUI";
import { BattleSkillSystem } from "./BattleSkillSystem";

export class BattleManager {
    battleUI: BattleUI;
    public battleSkillManager: BattleSkillSystem;
    /** 当前回合状态 */
    private battleState: BattleState = BattleState.None;
    /** 我方所有精灵 */
    private own_pets: Map<String, Node> = new Map<String, Node>();
    /** 敌方所有精灵 */
    private enemy_pets: Map<String, Node> = new Map<String, Node>();
    /** 当前回合数 */
    private round: number = 0;
    /** 我方当前精灵 */
    private own_pet_now: Node = null;
    /** 敌方当前精灵 */
    private enemy_pet_now: Node = null;


    public async init(battleUI: BattleUI) {
        this.battleUI = battleUI;
        this.battleSkillManager = new BattleSkillSystem();

        this.own_pets = new Map<String, Node>();
        this.enemy_pets = new Map<String, Node>();
        this.own_pet_now = null;
        this.enemy_pet_now = null;
        window["BattleMgr"] = this;
    }

    setInitData(data: any) {
        // 我方所有精灵
        this.own_pets = this.analysisPetData(data.own.petJson, EnumPlayer.Own);
        // 敌方所有精灵
        this.enemy_pets = this.analysisPetData(data.enemy.petJson, EnumPlayer.Enemy);

        this.showPet(EnumPlayer.Own);
        this.showPet(EnumPlayer.Enemy);
    }

    analysisPetData(petJson, player: EnumPlayer) {
        let fightPetJson = new Map<String, Node>();
        let index: number = 1
        for (let i in petJson) {
            // 精灵所有数据
            let petData: PetData = petJson[i];
            // 生成战斗专属独一Id
            let fightId = `${player.valueOf()}_${index}`;
            // 将精灵所有数据转化为战斗数据
            let fightPet: FightPet = new FightPet();
            fightPet.id = petData.id;
            fightPet.attribute = petData.attribute;
            fightPet.battleValue = petData.battleValue;
            fightPet.features = petData.features;
            fightPet.level = petData.level;
            fightPet.resistance = petData.resistance;
            // 生成精灵节点
            let pet_node = instantiate(engine.uiManager.getPrefab(UIConfigs.petUI));
            pet_node.getComponent(PetUI).show({ petInfo: fightPet, fightId: fightId })
            fightPetJson[fightId] = pet_node;

            index++;
        }

        return fightPetJson;
    }

    setBattleState(state: BattleState) {
        if (this.battleState != state)
            this.battleState = state;
    }

    getBattleState() {
        return this.battleState;
    }

    /**
     * 展示精灵UI
     * @param player 
     * @param fightId 无Id则展示第一只可出场精灵
     */
    showPet(player: EnumPlayer, fightId?: string) {
        let pet_node: Node = null;
        if (player == EnumPlayer.Own) {
            if (!fightId) {
                for (let i in this.own_pets) {
                    let tmp_PetNode = this.own_pets[i].getComponent(PetUI).getPetInfo();
                    if (tmp_PetNode.battleValue.hp > 0) {
                        pet_node = tmp_PetNode;
                        break;
                    }
                }
            } else {
                pet_node = this.own_pets[fightId];
            }

            if (pet_node) {
                this.own_pet_now = pet_node;
                //发送表现层修改通知
                engine.listenerManager.trigger(GameListenerType.RefreshBattlePetUI, player)
            }
        } else if (player == EnumPlayer.Enemy) {
            if (!fightId) {
                for (let i in this.enemy_pets) {
                    let tmp_PetNode = this.enemy_pets[i].getComponent(PetUI).getPetInfo();
                    if (tmp_PetNode.battleValue.hp > 0) {
                        pet_node = tmp_PetNode;
                        break;
                    }
                }
            } else {
                pet_node = this.enemy_pets[fightId];
            }
            if (pet_node) {
                this.enemy_pet_now = pet_node;
                //发送表现层修改通知
                engine.listenerManager.trigger(GameListenerType.RefreshBattlePetUI, player)
            }
        }
    }

    /**
     * 计算克制系数
     * @param ownId 我方属性Id
     * @param enemyId 地方属性Id
     * @returns 
     */
    calRestraint(ownId: string, enemyId: string) {
        let attribute: AttributeConfig = ConfigReader.readAbnormalConfig(ownId)
        switch (enemyId) {
            case EnumAttribute.water.valueOf():
                return attribute.water;
            case EnumAttribute.fire.valueOf():
                return attribute.fire;
            case EnumAttribute.grass.valueOf():
                return attribute.grass;
            case EnumAttribute.flying.valueOf():
                return attribute.flying;
            case EnumAttribute.ground.valueOf():
                return attribute.ground;
            case EnumAttribute.mechanics.valueOf():
                return attribute.mechanics;
            case EnumAttribute.thunder.valueOf():
                return attribute.thunder;
            case EnumAttribute.ice.valueOf():
                return attribute.ice;
            case EnumAttribute.dark.valueOf():
                return attribute.dark;
            case EnumAttribute.light.valueOf():
                return attribute.light;
            case EnumAttribute.psychic.valueOf():
                return attribute.psychic;
            case EnumAttribute.fight.valueOf():
                return attribute.fight;
            case EnumAttribute.normal.valueOf():
                return attribute.normal;
            case EnumAttribute.saint.valueOf():
                return attribute.saint;
            case EnumAttribute.deity.valueOf():
                return attribute.deity;
            case EnumAttribute.chaos.valueOf():
                return attribute.chaos;
        }
    }

    getPetNow(player: EnumPlayer) {
        if (EnumPlayer.Own)
            return this.own_pet_now;
        else
            return this.enemy_pet_now;
    }
}

export enum BattleState {
    None = "None",

    Start = "Start",

    Prepare = "Prepare",

    Ani = "Ani",

    Over = "Over"
}

export enum EnumPlayer {
    Own = 1,
    Enemy = 2,
}
