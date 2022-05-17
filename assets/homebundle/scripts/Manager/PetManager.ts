import { instantiate } from "cc";
import { ConstValue } from "../../../mainbundle/scripts/Configs/ConstValue";
import { AbnormalResist } from "../../../mainbundle/scripts/Data/AbnormalResist";
import { BattleValue } from "../../../mainbundle/scripts/Data/BattleValue";
import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { DamageResist } from "../../../mainbundle/scripts/Data/DamageResist";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { LearningValue } from "../../../mainbundle/scripts/Data/LearningValue";
import { LocalKeys } from "../../../mainbundle/scripts/Data/LocalKeys";
import { EnumAbType, PetData } from "../../../mainbundle/scripts/Data/PetData";
import { Resistance } from "../../../mainbundle/scripts/Data/Resistance";
import { AbnormalConfig } from "../../../mainbundle/scripts/Datatable/AbnormalConfig";
import { CharacterConfig } from "../../../mainbundle/scripts/Datatable/CharacterConfig";
import { PetConfig } from "../../../mainbundle/scripts/Datatable/PetConfig";
import { SkillConfig } from "../../../mainbundle/scripts/Datatable/SkillConfig";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { Utils } from "../../../mainbundle/scripts/Utils/Utils";
import { engine } from "../../../scripts/framework/engine";
import { HomeListenerType } from "../Data/HomeListenerType";
import { HomeManager } from "./HomeManager";

export enum EnumLearnType {
    atk = 1,
    sp_atk = 2,
    def = 3,
    sp_def = 4,
    spd = 5,
    hp = 6,
}
export enum EnumResistType {
    Critical,
    Fixed,
    Percentage,
    Abnormal
}
export class PetManager {
    init() { }
    ////养成类////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 刷新战斗属性
     * @param id 精灵Id
     * 能力数值公式：
     * HP能力=(种族值x2+个体值+努力值/4)x等级/100+等级+10
     * 非HP能力=[(种族值x2+个体值+努力值/4)x等级/100+5] x 性格修正
     */
    refreshBattleValue(pet: PetData) {
        let petConfig: PetConfig = ConfigReader.readPetConfig(pet.id);
        let value: BattleValue = new BattleValue();
        let character: CharacterConfig = ConfigReader.readCharacterConfig(pet.character);
        value.atk = Math.round(((petConfig.Atk * 2 + pet.talentValue + (pet.learningValue.atk / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * (character.Atk == 0 ? 1 : character.Atk == 1 ? 1.1 : 0.9));
        value.sp_atk = Math.round(((petConfig.SpAtk * 2 + pet.talentValue + (pet.learningValue.sp_atk / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * (character.SpAtk == 0 ? 1 : character.SpAtk == 1 ? 1.1 : 0.9));
        value.def = Math.round(((petConfig.Def * 2 + pet.talentValue + (pet.learningValue.def / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * (character.Def == 0 ? 1 : character.Def == 1 ? 1.1 : 0.9));
        value.sp_def = Math.round(((petConfig.SpDef * 2 + pet.talentValue + (pet.learningValue.sp_def / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * (character.SpDef == 0 ? 1 : character.SpDef == 1 ? 1.1 : 0.9));
        value.spd = Math.round(((petConfig.Spd * 2 + pet.talentValue + (pet.learningValue.spd / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * (character.Spd == 0 ? 1 : character.Spd == 1 ? 1.1 : 0.9));
        value.max_hp = Math.round((petConfig.Hp * 2 + pet.talentValue + (pet.learningValue.hp / 4)) * pet.level / 100 + pet.level + 10);
        pet.battleValue = value;
        this.savePetBag();
        return true;
    }

    /**
     * 增加学习力
     * @param id 精灵Id
     * @param type 能力
     * @param num 点数
     */
    addLearning(pet: PetData, type: EnumLearnType, num: number, init?: boolean) {
        if (type == EnumLearnType.atk) {
            if (pet.learningValue && pet.learningValue.atk + num <= ConstValue.MaxLearnValue) {
                pet.learningValue.atk += num;
            } else return false;
        } else if (type == EnumLearnType.sp_atk) {
            if (pet.learningValue && pet.learningValue.sp_atk + num <= ConstValue.MaxLearnValue) {
                pet.learningValue.sp_atk += num;
            } else return false;
        } else if (type == EnumLearnType.def) {
            if (pet.learningValue && pet.learningValue.def + num <= ConstValue.MaxLearnValue) {
                pet.learningValue.def += num;
            } else return false;
        } else if (type == EnumLearnType.sp_def) {
            if (pet.learningValue && pet.learningValue.sp_def + num <= ConstValue.MaxLearnValue) {
                pet.learningValue.sp_def += num;
            } else return false;
        } else if (type == EnumLearnType.spd) {
            if (pet.learningValue && pet.learningValue.spd + num <= ConstValue.MaxLearnValue) {
                pet.learningValue.spd += num;
            } else return false;
        } else if (type == EnumLearnType.hp) {
            if (pet.learningValue && pet.learningValue.hp + num <= ConstValue.MaxLearnValue) {
                pet.learningValue.hp += num;
            } else return false;
        }

        !init && this.refreshBattleValue(pet);
        this.savePetBag();
        return true;
    }

    /**
     * 恢复体力
     * @param id 精灵Id
     * @param hp 体力值
     * 判断是否满体力
     */
    recoverHp(pet: PetData, hp?: number) {
        if (pet.battleValue.hp == pet.battleValue.max_hp) return false;
        if (!hp)
            pet.battleValue.hp = pet.battleValue.max_hp
        else
            pet.battleValue.hp = pet.battleValue.hp + hp >= pet.battleValue.max_hp ? pet.battleValue.max_hp : pet.battleValue.hp + hp
        this.savePetBag();
        return true;
    }

    /**
     * 恢复PP
     * @param pp pp值
     * 判断是否满体力
     */
    recoverPP(pet: PetData, pp?: number) {
        {
            for (let key in pet.skills) {
                let skill: SkillConfig = ConfigReader.readSkillConfig(key);
                if (!pp)
                    pet.skills[key] = skill.PP
                else
                    pet.skills[key] = pet.skills[key] + pp >= skill.PP ? skill.PP : pet.skills[key] + pp
            }

        }
        this.savePetBag();
        return true;
    }

    /**
     * 提升等级
     * @param id 精灵Id
     * @param level 等级值
     * 判断是否满级
     */
    upgradeLevel(pet: PetData, level: number, init?: boolean) {
        if (pet.level >= ConstValue.MaxPetLevel) return false;
        pet.level = pet.level + level >= ConstValue.MaxPetLevel ? ConstValue.MaxPetLevel : pet.level + level;
        !init && this.refreshBattleValue(pet);
        // this.savePetBag();
        return true;
    }

    /**
     * 设置等级
     * @param id 精灵Id
     * @param level 等级值
     */
    setLevel(pet: PetData, level: number, init?: boolean) {
        if (level > ConstValue.MaxPetLevel) return false;
        pet.level++;
        !init && this.refreshBattleValue(pet);
        // this.savePetBag();
        return true;
    }

    /**
     * 提升抗性
     * @param id 精灵Id
     * @param type 抗性类
     * @param abId 异常抗性Id
     * 判断异常抗性是否存在
     * 判断抗性值是否满
     */
    upgradeResist(pet: PetData, type: EnumResistType, abId?: string) {
        this.savePetBag();
        return true;
    }

    /**
     * 设置性格
     * @param pet 
     */
    setCharacter(pet: PetData, cid?: string, init?: boolean) {
        if (cid) {
            pet.character = cid;
        } else {
            pet.character = String(Utils.randomNum(1001, 1025));
        }
        !init && this.refreshBattleValue(pet);
        // this.savePetBag();
        return true;
    }

    /**
     * 设置个体
     * @param pet 
     */
    setTalent(pet: PetData, talent?: number, init?: boolean) {
        if (pet.talentValue > ConstValue.MaxPetTalent) return false;
        if (talent) {
            pet.talentValue = talent;
        } else {
            pet.talentValue = Utils.randomNum(0, 31);
        }
        !init && this.refreshBattleValue(pet);
        // this.savePetBag();
        return true;
    }

    /**
     * 设置特性
     * @param pet 
     */
    setFeature(pet: PetData, fid?: string) {
        if (fid) {
            pet.character = fid;
        } else {
            pet.character = String(Utils.randomNum(1001, 1008));
        }
        this.savePetBag();
        return true;
    }

    /**
     * 重置异常抗性
     */
    resetAbResist(pet: PetData) {
        let weekAb: AbnormalConfig = Utils.randValue(HomeManager.abManager.getAbConfigByType(EnumAbType.Week));
        let controlAb: AbnormalConfig = Utils.randValue(HomeManager.abManager.getAbConfigByType(EnumAbType.Control));

        if (!pet.resistance.abnormalResist) {
            pet.resistance.abnormalResist = new AbnormalResist();
            // pet.resistance.abnormalResist.weekResist = new Map<string, number>();
            // pet.resistance.abnormalResist.controlResist = new Map<string, number>();
        }
        pet.resistance.abnormalResist.weekResist[weekAb.Id] = 0;
        pet.resistance.abnormalResist.controlResist[controlAb.Id] = 0;

        this.savePetBag();
        return true;
    }

    resetDamageResist(pet: PetData) {
        if (!pet.resistance.damageResist) {
            pet.resistance.damageResist = new DamageResist();
        }
        pet.resistance.damageResist.criticalResist = 0;
        pet.resistance.damageResist.fixedResist = 0;
        pet.resistance.damageResist.percentage = 0;

        this.savePetBag();
        return true;
    }

    /**
     * 刷新异常抗性
     */
    refreshResist() {

    }

    setResist() {

    }

    savePetBag() {
        let petBag = GameDataManager.getInstance().getGameData().petBagList;
        engine.storage.pushSyncData(LocalKeys.LOCAL_PETBAG, petBag);
    }

    async instantiatePet(petId: string, level: number = 1) {
        let pet: PetConfig = ConfigReader.readPetConfig(petId);
        let petInfo: PetData = new PetData();
        await new Promise<boolean>((r, j) => {
            // id
            petInfo.id = pet.Id;
            // 属性
            petInfo.attribute = pet.Attribute;
            // 性格
            this.setCharacter(petInfo, null, true);
            // 等级
            petInfo.level = level;
            // 个体
            this.setTalent(petInfo, null, true);
            // 学习力
            petInfo.learningValue = new LearningValue();

            r(true);
        })
        // 属性值
        this.refreshBattleValue(petInfo);
        // 技能
        petInfo.skills = new Map<string, number>();
        let skillIds = pet.Skills.split("|");
        skillIds.forEach(skillId => {
            let skill: SkillConfig = ConfigReader.readSkillConfig(skillId);
            petInfo.skills[skillId] = skill.PP;
        })
        // 抗性
        petInfo.resistance = new Resistance();
        this.resetAbResist(petInfo);
        this.resetDamageResist(petInfo);
        // 满体力体力
        petInfo.battleValue.hp = petInfo.battleValue.max_hp;

        return petInfo;

    }
}
