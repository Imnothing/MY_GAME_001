import { instantiate, Node } from "cc";
import { HomeManager } from "../../../homebundle/scripts/Manager/HomeManager";
import { EnumAllProp } from "../../../homebundle/scripts/Manager/PropManager";
import { UIConfigs } from "../../../mainbundle/scripts/Configs/UIConfigs";
import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { EnumAttribute, PetData } from "../../../mainbundle/scripts/Data/PetData";
import { AttributeConfig } from "../../../mainbundle/scripts/Datatable/AttributeConfig";
import { ItemConfig } from "../../../mainbundle/scripts/Datatable/ItemConfig";
import { SkillConfig } from "../../../mainbundle/scripts/Datatable/SkillConfig";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { engine } from "../../../scripts/framework/engine";
import { BaseUI } from "../../../scripts/framework/lib/router/BaseUI";
import { GameListenerType } from "../Data/GameListenerType";
import BattleUI from "../UI/Battle/BattleUI";
import PetUI from "../UI/Battle/PetUI";
import { BattleSkillSystem } from "./BattleSkillSystem";
import { McGame } from "./McGame";

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


    public async init() {
        this.battleSkillManager = new BattleSkillSystem();
        this.battleState = BattleState.None;
        this.round = 0;
        this.own_pets = new Map<String, Node>();
        this.enemy_pets = new Map<String, Node>();
        this.own_pet_now = null;
        this.enemy_pet_now = null;
        window["BattleMgr"] = this;
    }

    async setInitData(sptJson: any) {
        let petJson: Map<number, PetData> = GameDataManager.getInstance().getGameData().petBagList;
        // 我方所有精灵
        this.own_pets = await this.analysisPetData(petJson, EnumPlayer.Own);
        // 敌方所有精灵
        this.enemy_pets = await this.analysisPetData(sptJson, EnumPlayer.Enemy);
        await this.showPet(EnumPlayer.Enemy);
        await this.showPet(EnumPlayer.Own);
        this.setBattleState(BattleState.Start)
    }

    analysisPetData(petJson, player: EnumPlayer) {
        return new Promise<any>((r, j) => {
            let fightPetJson = new Map<String, Node>();
            let index: number = 1
            for (let key in petJson) {
                if (index > 6) break;
                // 精灵所有数据
                let petData: PetData = petJson[key];
                // 生成战斗专属唯一Id
                let fightId = `${player}_${index}`;
                // 将精灵所有数据转化为战斗数据
                let fightPet: FightPet = new FightPet();
                fightPet.id = petData.id;
                fightPet.petBagId = parseInt(key);
                fightPet.attribute = petData.attribute;
                fightPet.battleValue = petData.battleValue;
                fightPet.features = petData.features;
                fightPet.level = petData.level;
                fightPet.resistance = petData.resistance;
                fightPet.skills = petData.skills;
                // 生成精灵节点
                let pet_node = instantiate(engine.uiManager.getPrefab(UIConfigs.petUI));
                pet_node.getComponent(PetUI).setData({ petInfo: fightPet, fightId: fightId })
                fightPetJson[fightId] = pet_node;

                index++;
            }

            return r(fightPetJson)
        })
    }

    setBattleState(state: BattleState) {
        if (this.battleState != state)
            this.battleState = state;
        if (this.battleState == BattleState.Start) {
            ++this.round;
            engine.listenerManager.trigger(GameListenerType.NextRound, this.round);
            McGame.battleControl.doAI();
            engine.listenerManager.trigger(GameListenerType.RefreshSkillItem, false);
        } else if (this.battleState == BattleState.Ani) {
            McGame.battleControl.doExecute();
            engine.listenerManager.trigger(GameListenerType.RefreshSkillItem, true);
        } else if (this.battleState == BattleState.Over) {
            McGame.battleControl.refreshData();
            if (this.own_pet_now.getComponent(PetUI).checkDead()) {
                let isAlive: boolean = false;
                for (let key in this.own_pets) {
                    if (!this.own_pets[key].getComponent(PetUI).checkDead()) {
                        isAlive = true;
                        break;
                    }
                }
                if (isAlive) {
                    engine.listenerManager.trigger(GameListenerType.SwitchPetsTab);
                } else {
                    McGame.loseGame();
                }
            } else if (this.enemy_pet_now.getComponent(PetUI).checkDead()) {
                McGame.winGame();
            } else {
                this.setBattleState(BattleState.Start);
            }
        }
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
        return new Promise<boolean>((r, j) => {
            let pet_node: Node = null;
            if (player == EnumPlayer.Own) {
                if (!fightId) {
                    for (let i in this.own_pets) {
                        let tmp_petInfo = this.own_pets[i].getComponent(PetUI).getPetInfo();
                        if (tmp_petInfo.battleValue.hp > 0) {
                            pet_node = this.own_pets[i];
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
                    if (this.battleState == BattleState.Start) {
                        this.setBattleState(BattleState.Ani);
                    } else if (this.battleState == BattleState.Over) {
                        this.setBattleState(BattleState.Start);
                    }
                    return r(true);
                }
                return r(false);
            } else if (player == EnumPlayer.Enemy) {
                if (!fightId) {
                    for (let i in this.enemy_pets) {
                        let tmp_petInfo = this.enemy_pets[i].getComponent(PetUI).getPetInfo();
                        if (tmp_petInfo.battleValue.hp > 0) {
                            pet_node = this.enemy_pets[i];
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
                    return r(true);
                }
                return r(false);
            }
        })
    }

    /**
     * 计算克制系数
     * @param ownId 我方属性Id
     * @param enemyId 地方属性Id
     * @returns 
     */
    calRestraint(ownId: string, enemyId: string) {
        let attribute: AttributeConfig = ConfigReader.readAttributeConfig(ownId)
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
        if (player == EnumPlayer.Own)
            return this.own_pet_now;
        else
            return this.enemy_pet_now;
    }

    getOwnPetInfo() {
        return this.own_pet_now.getComponent(PetUI).getPetInfo();
    }

    getPets(player: EnumPlayer) {
        return player == EnumPlayer.Own ? this.own_pets : this.enemy_pets;
    }

    useProp(propId: string) {
        let item: ItemConfig = ConfigReader.readItemConfig(propId);
        switch (item.Type) {
            case EnumAllProp.HP:
                McGame.battleControl.doRecover(item.Value1);
                break;
            case EnumAllProp.PP:
                let pet = this.own_pet_now.getComponent(PetUI).getPetInfo();
                for (let key in pet.skills) {
                    let skill: SkillConfig = ConfigReader.readSkillConfig(key);
                    pet.skills[key] = pet.skills[key] + item.Value1 >= skill.PP ? skill.PP : pet.skills[key] + item.Value1;
                }
                break;
        }
        HomeManager.propManager.costProp(propId, 1);
        this.setBattleState(BattleState.Ani);
    }

    doSkill(skillId: string) {
        this.own_pet_now.getComponent(PetUI).getPetInfo().skills[skillId]--;
        McGame.battleControl.doSkill(skillId, EnumPlayer.Own);
        this.setBattleState(BattleState.Ani);
    }
}

export enum BattleState {
    None = "None",

    Start = "Start",

    Ani = "Ani",

    Over = "Over"
}

export enum EnumPlayer {
    Own = 1,
    Enemy = 2,
}
