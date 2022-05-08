import { SkillConfig } from "../Datatable/SkillConfig";

/** 性格 */
export enum EnumCharacter {
    Lonely = "孤独",

}
/** 异常状态 */
export enum EnumAbnormal {

}
/** 属性 */
export enum EnumAttribute {
    /** 水系 */
    water = "1001",
    /** 火系 */
    fire = "1002",
    /** 草系 */
    grass = "1003",
    /** 飞行系 */
    flying = "1004",
    /** 地面系 */
    ground = "1005",
    /** 机械系 */
    mechanics = "1006",
    /** 电系 */
    thunder = "1007",
    /** 冰系 */
    ice = "1008",
    /** 暗影系 */
    dark = "1009",
    /** 光系 */
    light = "1010",
    /** 超能系 */
    psychic = "1011",
    /** 战斗系 */
    fight = "1012",
    /** 普通系 */
    normal = "1013",
    /** 圣灵系 */
    saint = "1014",
    /** 神灵系 */
    deity = "1015",
    /** 混沌系 */
    chaos = "1016",

}
/** 异常状态类型 */
export enum EnumAbType {
    unControl = 1,
    Control = 2
}
export enum EnumBattleValue {
    NONE = 0,
    ATK = 1,
    SP_ATK = 2,
    DEF = 3,
    SP_DEF = 4,
    SPD = 5
}
/** 特性 */
export enum EnumFeatures {

}

/** 精灵类 */
export class PetData {
    /** 精灵ID */
    id: string = null;
    /** 精灵属性ID */
    attribute: string = null;
    /** 经验类型 */
    expType: string = null;
    /** 已获取经验 */
    exp: number = 0;
    /** 精灵等级 */
    level: number = 1;
    /** 个体值 */
    talentValue: number = 0;
    /** 战斗属性值 */
    battleValue: BattleValue = new BattleValue();
    /** 学习力 */
    learningValue: LearningValue = new LearningValue();
    /** 性格 */
    character: EnumCharacter = null;
    /** 特性 */
    features: EnumFeatures = null;
    /** 抗性 */
    resistance: Resistance = new Resistance();
    /** 刻印 */
    signet: Array<Signet> = new Array<Signet>();
    /** 技能 */
    skills: Map<string, number> = new Map<string, number>();

}

/** 战斗属性值 */
export class BattleValue {
    atk: number = 0;
    sp_atk: number = 0;
    def: number = 0;
    sp_def: number = 0;
    spd: number = 0;
    max_hp: number = 0;
    hp: number = 0;
}

/** 学习力 */
export class LearningValue {
    atk: number = 0;
    sp_atk: number = 0;
    def: number = 0;
    sp_def: number = 0;
    spd: number = 0;
    hp: number = 0;
    all: number = 0
    constructor() { }
}

/** 抗性类 */
export class Resistance {
    damageResist: DamageResist = new DamageResist();
    abnormalResist: AbnormalResist = new AbnormalResist();
}

/** 伤害抗性类 */
export class DamageResist {
    /** 暴击伤害抵抗 */
    criticalResist: number = 0;
    /** 固定伤害抵抗 */
    fixedResist: number = 0;
    /** 百分比伤害 */
    percentage: number = 0;

    constructor() { }
}

/** 异常抗性类 */
export class AbnormalResist {
    /** 控制类异常抗性抵抗 */
    controlResist: Map<string, number> = new Map<string, number>();

    /** 弱化类异常抗性抵抗 */
    weekResist: Map<string, number> = new Map<string, number>();

    constructor() { }
}

/** 刻印 */
export class Signet {
    atk: number = 0;
    sp_atk: number = 0;
    def: number = 0;
    sp_def: number = 0;
    spd: number = 0;
    hp: number = 0;

    constructor() { }
}


