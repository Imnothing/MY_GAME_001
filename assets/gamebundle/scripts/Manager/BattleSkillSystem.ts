import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { EnumAbnormal } from "../../../mainbundle/scripts/Data/PetData";
import { SkillConfig } from "../../../mainbundle/scripts/Datatable/SkillConfig";
import { Utils } from "../../../mainbundle/scripts/Utils/Utils";
import { GameConstValue } from "../Data/GameConstValue";
import PetUI from "../UI/Battle/PetUI";

/** 属性等级 */
export enum LevelType {
    /** 攻击等级 */
    LEVEL_Atk = "LEVEL_Atk",
    /** 特攻等级 */
    LEVEL_spAtk = "LEVEL_spAtk",
    /** 防御等级 */
    LEVEL_Def = "LEVEL_Def",
    /** 特防等级 */
    LEVEL_spDef = "LEVEL_spDef",
    /** 速度等级 */
    LEVEL_Spd = "LEVEL_Spd",
    /** 命中等级 */
    LEVEL_Hit = "LEVEL_Hit",
    /** 全部等级 */
    LEVEL_ALL = "LEVEL_ALL",
}

/** 等级改变方式 */
export enum ChangLevelWay {
    /** 提升 */
    Promote = "Promote",
    /** 降低 */
    Reduce = "Reduce",
    /** 消除 */
    Remove = "Remove",
    /** 反转 */
    Reverse = "Reverse",
    /** 吸收 */
    Absorb = "Absorb"
}

/** 受到伤害枚举 */
enum EnumReduceHP {
    /** 固定伤害 */
    Fixed = "Fixed",
    /** 百分比伤害 */
    Percentage = "Percentage",
    /** 暴击伤害 */
    Critical = "Critical",
    /** 攻击伤害 */
    Attack = "Attack"
}

/** 增益效果枚举 */
export enum EnumBuff {
    /** 必定命中 */
    MustHit = "MustHit",
    /** 必定暴击 */
    MustCritical = "MustCritical",
    /** 免疫下一次攻击 */
    ImmuneNextAttack = "ImmuneNextAttack",
    /** 免疫下一次攻击伤害 */
    ImmuneNextDamage = "ImmuneNextDamage",
    /** 免疫下一次攻击效果 */
    ImmuneNextEffect = "ImmuneNextEffect",
    /** 受到伤害减少 */
    HurtReduce = "HurtReduce",
    /** 造成伤害增加 */
    DamageIncrease = "DamageIncrease"
}
/** 减益效果枚举 */
export enum EnumDeBuff {
    /** 下一次攻击无效 */
    InvalidNextAttack = "InvalidNextAttack",
    /** 下一次属性技能无效 */
    InvalidNextAttribute = "InvalidNextAttribute",
    /** 进入异常状态 */
    AbnormalState = "AbnormalState",
    /** 受到伤害增加 */
    HurtIncrease = "HurtIncrease",
    /** 造成伤害降低 */
    DamageReduce = "DamageReduce"
}

/** 常用数值参数 */
enum EnumValue {
    /** 固定数值 */
    Fixed_Number = "Fixed_Number",
    /** 敌方最大体力 */
    Enemy_Max_Hp = "Enemy_Max_Hp",
    /** 我方最大体力 */
    Self_Max_Hp = "Self_Max_Hp",
    /** 敌方造成伤害 */
    Enemy_Damage = "Enemy_Damage",
    /** 我方造成伤害 */
    Self_Damage = "Self_Damage",
    /** 敌方受到伤害 */
    Enemy_Hurt = "Enemy_Hurt",
    /** 我方受到伤害 */
    Self_Hurt = "Self_Hurt",
}

/** 常用判定 */
enum EnumJudge {
    /** 敌方精灵阵亡 */
    Enemy_Dead = "Enemy_Dead",
    /** 我方精灵阵亡 */
    Self_Dead = "Self_Dead",
    /** 体力大于 */
    Greater_Hp = "greater_hp",
    /** 体力小于 */
    Less_Hp = "less_hp"

}

export class BattleSkillSystem {
    init() { }

    /** 进行判定 */
    doJudge(pet: PetUI, type?: EnumJudge, valueType?: EnumValue, percent?: number) { }

    /**
     * 改变精灵属性等级
     * @param type 等级类型
     * @param num 等级数
     */
    changLevel(pet: PetUI, way: ChangLevelWay, type: LevelType, num?: number) {
        switch (way) {
            case ChangLevelWay.Promote:
                pet.getBattleLevel()[type] = pet.getBattleLevel()[type] + num >= GameConstValue.MaxBattleValue ? GameConstValue.MaxBattleValue : pet.getBattleLevel()[type] + num
            case ChangLevelWay.Reduce:
                pet.getBattleLevel()[type] = pet.getBattleLevel()[type] - num <= -GameConstValue.MaxBattleValue ? -GameConstValue.MaxBattleValue : pet.getBattleLevel()[type] - num

        }
    }

    /**
     * 消除回合类效果
     * @param pet 
     */
    changeRoundEffect(pet: PetUI) { }

    /**
     * 恢复体力
     * @param pet 精灵类
     * @param hp 体力
     */
    recoverHp(pet: PetUI, valueType: EnumValue, percent: number, num?: number) {
        let petInfo: FightPet = pet.getPetInfo();
        if (petInfo.battleValue.hp == petInfo.battleValue.max_hp) return false;
        if (valueType == EnumValue.Fixed_Number) {
            petInfo.battleValue.hp = petInfo.battleValue.hp + num >= petInfo.battleValue.max_hp ? petInfo.battleValue.max_hp : petInfo.battleValue.hp + num
        }

        return true;
    }

    recoverPP(pet: PetUI, pp: number) {
        let petInfo: FightPet = pet.getPetInfo();
        for (let key in petInfo.skills) {
            let skill: SkillConfig = ConfigReader.readSkillConfig(key);
            petInfo.skills[key] = petInfo.skills[key] + pp >= skill.PP ? skill.PP : petInfo.skills[key] + pp;
        }
    }

    /**
     * 减少体力
     * @param type 伤害类型
     * @param pet 精灵类
     * @param hp 伤害值
     */
    reduceHp(pet: PetUI, type: EnumReduceHP, valueType: EnumValue, percent: number, num?: number) {
        let petInfo: FightPet = pet.getPetInfo();
        if (petInfo.battleValue.hp == petInfo.battleValue.max_hp) return false;
        if (valueType == EnumValue.Fixed_Number) {
            petInfo.battleValue.hp = petInfo.battleValue.hp + num >= petInfo.battleValue.max_hp ? petInfo.battleValue.max_hp : petInfo.battleValue.hp + num
        }

        return true;
    }

    /**
     * 增加增益效果
     * @param type 增益效果类型
     * @param pet 精灵类
     * @param possibility 几率 
     * @param value 参数
     * @param now 当回合生效
     */
    addBuff(pet: PetUI, type: EnumBuff, possibility?: number, value?: number, now?: boolean) { }

    /**
     * 增加减益效果
     * @param type 减益效果类型
     * @param pet 精灵类
     * @param possibility 几率
     * @param deBUff 
     * @param damageReduce 增伤倍率
     * @param hurtIncrease 减伤倍率
     */
    addDeBuff(pet: PetUI, type: EnumDeBuff, possibility?: number, deBUff?: string, damageReduce?: number, hurtIncrease?: number, now?: boolean) {

    }

    /**
     * 进入异常状态
     * @param pet 
     * @param abId 
     * @param possibility 
     */
    addAbnormal(pet: PetUI, abId: string, possibility?: number) {
        if (possibility) {
            let rd = Utils.randomNum(1, 100);
            if (rd > possibility) return false;
        }
        pet.setAbState(abId);
        return true;
    }

}




