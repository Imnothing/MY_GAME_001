import { instantiate, Node } from "cc";
import { UIConfigs } from "../../../mainbundle/scripts/Configs/UIConfigs";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { PetData } from "../../../mainbundle/scripts/Data/PetData";
import { engine } from "../../../scripts/framework/engine";
import { BaseUI } from "../../../scripts/framework/lib/router/BaseUI";
import BattleUI from "../UI/Battle/BattleUI";
import PetUI from "../UI/Battle/PetUI";
import { BattleSkillSystem } from "./BattleSkillSystem";

export class BattleManager {
    battleUI: BattleUI;
    public battleSkillManager: BattleSkillSystem;
    private battleState: BattleState = BattleState.None;
    private own_pets: Map<String, Node> = new Map<String, Node>();
    private enemy_pets: Map<String, Node> = new Map<String, Node>();
    private ground: number = 0;
    private own_pet: Node = null;
    private enemy_pet: Node = null;


    public async init(battleUI: BattleUI) {
        this.battleUI = battleUI;
        this.battleSkillManager = new BattleSkillSystem();

        this.own_pets = new Map<String, Node>();
        this.enemy_pets = new Map<String, Node>();
        this.own_pet = null;
        this.enemy_pet = null;
        window["BattleMgr"] = this;
    }

    setInitData(data: any) {
        this.own_pets = this.analysisPetData(data.own.petJson, "own");
        this.enemy_pets = this.analysisPetData(data.enemy.petJson, "enemy");

        this.showOwnPet();
        // this.show
    }

    analysisPetData(petJson, player: string) {
        let fightPetJson = new Map<String, Node>();
        for (let i in petJson) {
            let petData: PetData = petJson[i];
            let fightId = `${player}_${Date.now()}`

            let fightPet: FightPet = new FightPet();
            fightPet.id = petData.id;
            fightPet.attribute = petData.attribute;
            fightPet.battleValue = petData.battleValue;
            fightPet.features = petData.features;
            fightPet.level = petData.level;
            fightPet.resistance = petData.resistance;

            let pet_node = instantiate(engine.uiManager.getPrefab(UIConfigs.petUI));
            pet_node.getComponent(PetUI).show({ petInfo: fightPet, fightId: fightId })
            fightPetJson[fightId] = pet_node;
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

    showOwnPet(fightId?: string) {
        let petInfo: FightPet = null;
        if (!fightId) {
            for (let i in this.own_pets) {
                let tmpPetInfo = this.own_pets[i].getComponent(PetUI).getPetInfo();
                if (tmpPetInfo.battleValue.hp > 0) {
                    petInfo = tmpPetInfo;
                }
            }
        } else {
            petInfo = this.own_pets[fightId].getComponent(PetUI).getPetInfo();
        }
        if (petInfo) {
            //克制面板
            // this.battleUI.ui.top_banner.children.forEach((child) => {
            //     child.active = false;
            // })
            // let restraint = this.calRestraint(petInfo.attribute, this.enemy_pet.getComponent(PetUI).getPetInfo())


        }
    }

    calRestraint(ownId: string, enemyId) { return 1 }
}

export enum BattleState {
    None = "None",

    Start = "Start",

    Prepare = "Prepare",

    Ani = "Ani",

    Over = "Over"
}
