
/** 性格 */
enum EnumCharacter {
    Lonely = "10001",

}

/** 特性 */
enum EnumFeatures {

}

/** 精灵类 */
export class PetInfo {
    /** 精灵ID */
    id: string;
    /** 经验类型 */
    expType: string;
    /** 已获取经验 */
    exp: number;
    /** 精灵等级 */
    level: number;
    /** 个体值 */
    talentValue: number;
    /** 战斗属性值 */
    battleValue: BattleValue;
    /** 学习力 */
    learningValue: LearningValue;
    /** 性格 */
    character: EnumCharacter;
    /** 特性 */
    features: EnumFeatures;
    /** 抗性 */
    resistance: Resistance;
    /** 刻印 */
    signet: Array<Signet>;

}

/** 战斗属性值 */
class BattleValue {
    atk: number;
    sp_atk: number;
    def: number;
    sp_def: number;
    spd: number;
    max_hp: number;
    hp: number;

    constructor() { }
}

/** 学习力 */
class LearningValue {
    atk: number = 0;
    sp_atk: number = 0;
    def: number = 0;
    sp_def: number = 0;
    spd: number = 0;
    hp: number = 0;

    constructor() { }
}

/** 抗性类 */
class Resistance {
    damageResist: DamageResist;
    abnormalResist: AbnormalResist;
}

/** 伤害抗性类 */
class DamageResist {
    /** 暴击伤害抵抗 */
    criticalResist: number = 0;
    /** 固定伤害抵抗 */
    fixedResist: number = 0;
    /** 百分比伤害 */
    persentage: number = 0;
}

/** 异常抗性类 */
class AbnormalResist {
    /** 异常抗性抵抗数组 */
    abnormalStates: Map<AbnormalResist, number>
}

//todo: AbStateManager
/** 异常状态类 */
export class AbnormalState {
    public id: number = 0;
    public type: number = 1;
}

/** 刻印 */
class Signet {
    atk: number = 0;
    sp_atk: number = 0;
    def: number = 0;
    sp_def: number = 0;
    spd: number = 0;
    hp: number = 0;

    constructor() { }
}


