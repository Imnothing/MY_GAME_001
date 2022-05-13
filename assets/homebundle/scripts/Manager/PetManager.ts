import { instantiate } from "cc";
import { ConstValue } from "../../../mainbundle/scripts/Configs/ConstValue";
import { AbnormalResist } from "../../../mainbundle/scripts/Data/AbnormalResist";
import { BattleValue } from "../../../mainbundle/scripts/Data/BattleValue";
import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { DamageResist } from "../../../mainbundle/scripts/Data/DamageResist";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { LearningValue } from "../../../mainbundle/scripts/Data/LearningValue";
import { EnumAbType, PetData } from "../../../mainbundle/scripts/Data/PetData";
import { Resistance } from "../../../mainbundle/scripts/Data/Resistance";
import { AbnormalConfig } from "../../../mainbundle/scripts/Datatable/AbnormalConfig";
import { CharacterConfig } from "../../../mainbundle/scripts/Datatable/CharacterConfig";
import { PetConfig } from "../../../mainbundle/scripts/Datatable/PetConfig";
import { SkillConfig } from "../../../mainbundle/scripts/Datatable/SkillConfig";
import { Utils } from "../../../mainbundle/scripts/Utils/Utils";
import { HomeManager } from "./HomeManager";

enum EnumLearnType {
    atk,
    sp_atk,
    def,
    sp_def,
    spd,
    hp,
}
export enum EnumResistType {
    Crical,
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
    refreshBattleValue(pet: PetData): BattleValue {
        let PetConfig: PetConfig = ConfigReader.readPetConfig(pet.id);
        let value: BattleValue = new BattleValue();
        let character: CharacterConfig = ConfigReader.readCharacterConfig(pet.character);
        value.atk = ((PetConfig.Atk * 2 + pet.talentValue + Math.floor(pet.learningValue.atk / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * character.Atk == 0 ? 1 : character.Atk == 1 ? 1.1 : 0.9;
        value.sp_atk = ((PetConfig.SpAtk * 2 + pet.talentValue + Math.floor(pet.learningValue.sp_atk / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * character.SpAtk == 0 ? 1 : character.Atk == 1 ? 1.1 : 0.9;
        value.def = ((PetConfig.SpDef * 2 + pet.talentValue + Math.floor(pet.learningValue.def / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * character.SpDef == 0 ? 1 : character.Atk == 1 ? 1.1 : 0.9;
        value.sp_def = ((PetConfig.SpDef * 2 + pet.talentValue + Math.floor(pet.learningValue.sp_def / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * character.SpDef == 0 ? 1 : character.Atk == 1 ? 1.1 : 0.9;
        value.spd = ((PetConfig.Spd * 2 + pet.talentValue + Math.floor(pet.learningValue.spd / 4)) * pet.level / ConstValue.MaxPetLevel + 5) * character.Spd == 0 ? 1 : character.Atk == 1 ? 1.1 : 0.9;
        value.max_hp = (PetConfig.Hp * 2 + pet.talentValue + Math.floor(pet.learningValue.hp / 4) * pet.level / 100) + pet.level + 10;
        return value;
    }

    /**
     * 增加学习力
     * @param id 精灵Id
     * @param type 能力
     * @param num 点数
     */
    addLearning(pet: PetData, type: EnumLearnType, num): PetData {
        return pet;
    }

    /**
     * 恢复体力
     * @param id 精灵Id
     * @param hp 体力值
     * 判断是否满体力
     */
    recoverHp(pet: PetData, hp: number): PetData {
        return pet;
    }

    /**
     * 提升等级
     * @param id 精灵Id
     * @param level 等级值
     * 判断是否满级
     */
    upgradeLevel(pet: PetData, level: number): PetData {
        return pet;
    }

    /**
     * 设置等级
     * @param id 精灵Id
     * @param level 等级值
     */
    setLevel(pet: PetData, level: number): PetData {
        return pet;
    }

    /**
     * 提升抗性
     * @param id 精灵Id
     * @param type 抗性类
     * @param abId 异常抗性Id
     * 判断异常抗性是否存在
     * 判断抗性值是否满
     */
    upgradeResist(pet: PetData, type: EnumResistType, abId?: string): PetData {
        return pet;
    }

    /**
     * 设置性格
     * @param pet 
     */
    setCharacter(pet: PetData, cid?: string): PetData {
        return pet;
    }

    /**
     * 设置特性
     * @param pet 
     */
    setTalent(pet: PetData, talent?: number): PetData {
        return pet;
    }

    /**
     * 设置特性
     * @param pet 
     */
    setFeature(pet: PetData, cid?: string): PetData {
        return pet;
    }

    /**
     * 重置异常抗性
     */
    resetAbResist(abnormalResist: AbnormalResist) {
        let weekAb: AbnormalConfig = Utils.randValue(HomeManager.abManager.getAbConfigByType(EnumAbType.Week));
        let controlAb: AbnormalConfig = Utils.randValue(HomeManager.abManager.getAbConfigByType(EnumAbType.Control));

        if (!abnormalResist) {
            abnormalResist = new AbnormalResist();
            // abnormalResist.weekResist = new Map<string, number>();
            // abnormalResist.controlResist = new Map<string, number>();
        }
        abnormalResist.weekResist[weekAb.Id] = 0;
        abnormalResist.controlResist[controlAb.Id] = 0;

        return abnormalResist;
    }

    resetDamageResist(damageResist: DamageResist) {
        if (!damageResist) {
            damageResist = new DamageResist();
        }
        damageResist.criticalResist = 0;
        damageResist.fixedResist = 0;
        damageResist.percentage = 0;

        return damageResist;
    }

    /**
     * 刷新异常抗性
     */
    refreshResist() {

    }

    setResist() {

    }

    instantiatePet(petId: string, level: number = 1) {
        let pet: PetConfig = ConfigReader.readPetConfig(petId);
        let petInfo: PetData = new PetData();
        // 属性
        petInfo.attribute = pet.Attribute;
        // 性格
        petInfo = this.setCharacter(petInfo, String(Utils.randomNum(1001, 1025)));
        // id
        petInfo.id = pet.Id;
        // 等级
        petInfo.level = level;
        // 个体
        petInfo = this.setTalent(petInfo);
        // 学习力
        petInfo.learningValue = new LearningValue();
        // 属性值
        petInfo.battleValue = this.refreshBattleValue(petInfo);
        // 技能
        petInfo.skills = new Map<string, number>();
        let skillIds = pet.Skills.split("|");
        skillIds.forEach(skillId => {
            let skill: SkillConfig = ConfigReader.readSkillConfig(skillId);
            petInfo.skills[skillId] = skill.PP;
        })
        // 抗性
        petInfo.resistance = new Resistance();
        petInfo.resistance.abnormalResist = this.resetAbResist(petInfo.resistance.abnormalResist);
        petInfo.resistance.damageResist = this.resetDamageResist(petInfo.resistance.damageResist);

    }
}
