

/** 属性等级 */
enum LevelType {
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
enum ChangLevelWay {
    /** 提升 */
    Promote = "1",
    /** 降低 */
    Reduce = "2",
    /** 消除 */
    Remove = "3",
    /** 反转 */
    Reverse = "4",
    /** 吸收 */
    Absorb = "5"
}

/** 受到伤害枚举 */
enum EnumReduceHP {
    /** 固定伤害 */
    Fixed,
    /** 百分比伤害 */
    Percentage,
    /** 暴击伤害 */
    Critical,
    /** 攻击伤害 */
    Attack
}

/** 增益效果枚举 */
enum EnumBuff {
    /** 必定命中 */
    MustHit,
    /** 必定暴击 */
    MustCritical,
    /** 免疫下一次攻击 */
    ImmuneNextAttack,
    /** 免疫下一次攻击伤害 */
    ImmuneNextDamage,
    /** 免疫下一次攻击效果 */
    ImmuneNextEffect,
    /** 受到伤害减少 */
    HurtReduce,
    /** 造成伤害增加 */
    DamageIncrease
}
/** 减益效果枚举 */
enum EnumDeBuff {
    /** 下一次攻击无效 */
    InvalidNextAttack,
    /** 下一次属性技能无效 */
    InvalidNextAttribute,
    /** 进入异常状态 */
    AbnormalState,
    /** 受到伤害增加 */
    HurtIncrease,
    /** 造成伤害降低 */
    DamageReduce
}

/** 性格 */
enum EnumCharacter {

}

/** 特性 */
enum EnumFeatures {

}

export class SkillManager {

    doSkill() { }

    /**
     * 改变精灵属性等级
     * @param type 等级类型
     * @param num 等级数
     */
    changLevel(way: ChangLevelWay, type: LevelType, num?: number) { }

    /**
     * 恢复体力
     * @param pet 精灵类
     * @param hp 体力
     */
    recoverHp(pet: Pet, hp: number) { }

    /**
     * 造成伤害
     * @param type 伤害类型
     * @param pet 精灵类
     * @param hp 伤害值
     */
    reduceHp(type: EnumReduceHP, pet: Pet, hp: number) { }

    /**
     * 增加增益效果
     * @param type 增益效果类型
     * @param pet 精灵类
     * @param possiblity 几率 
     * @param hurtReduce 减伤倍率
     * @param damageIncrease 增伤倍率
     */
    addBuff(type: EnumBuff, pet: Pet, possiblity?: number, hurtReduce?: number, damageIncrease?: number) { }

    /**
     * 增加减益效果
     * @param type 减益效果类型
     * @param pet 精灵类
     * @param possiblity 
     * @param debuffId 几率
     * @param damageReduce 增伤倍率
     * @param hurtIncrease 减伤倍率
     */
    addDeBuff(type: EnumDeBuff, pet: Pet, possiblity?: number, debuffId?: string, damageReduce?: number, hurtIncrease?: number) { }

}

/** 精灵类 */
export class Pet {
    /** 个体值 */
    talentValue: number;
    /** 学习力 */
    learningAbility: LearningAbility;
    /** 性格 */
    character: EnumCharacter;
    /** 特性 */
    features: EnumFeatures;
    /** 抗性 */
    resistance: Resistance;

}

/** 学习力 */
class LearningAbility {
    atk: number;
    sp_atk: number;
    def: number;
    sp_def: number;
    spd: number;
    hp: number;
}

/** 抗性类 */
class Resistance {
    damageResist: DamageResist;
    abnormalResist: AbnormalResist;
}

/** 伤害抗性类 */
class DamageResist {
    /** 暴击伤害抵抗 */
    criticalResist: number;
    /** 固定伤害抵抗 */
    fixedResist: number;
    /** 百分比伤害 */
    persentage: number;
}

/** 异常抗性类 */
class AbnormalResist {
    /** 异常抗性抵抗数组 */
    abnormalStates: Array<AbnormalState>;
}

//todo: AbStateManager
/** 异常状态类 */
export class AbnormalState {
    public id: number = 0;
    public type: number = 1;
}


