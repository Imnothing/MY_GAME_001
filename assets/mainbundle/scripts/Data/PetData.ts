import { BattleValue } from "./BattleValue";
import { LearningValue } from "./LearningValue";
import { Resistance } from "./Resistance";
import { Signet } from "./Signet";

/** 性格 */
export enum EnumCharacter {
    Stubborn = "1001",
    Lonely = "1002",
    Mischievous = "1003",
    Brave = "1004",
    Guard = "1005",
    Steady = "1006",
    Careless = "1007",
    Calm = "1008",
    Shy = "1009",
    Honest = "1010",
    Frank = "1011",
    Impetuous = "1012",
    Earnest = "1013",
    Bold = "1014",
    Naughty = "1015",
    Carefree = "1016",
    Leisurely = "1017",
    Composure = "1018",
    Careful = "1019",
    Docile = "1020",
    Arrogance = "1021",
    Timid = "1022",
    Optimistic = "1023",
    Impatience = "1024",
    Naive = "1025"

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
    /** 属性 */
    spirit = "1017"

}
/** 异常状态类型 */
export enum EnumAbType {
    Week = 1,
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
    exp: number = null;
    /** 精灵等级 */
    level: number = null;
    /** 个体值 */
    talentValue: number = null;
    /** 战斗属性值 */
    battleValue: BattleValue = null;
    /** 学习力 */
    learningValue: LearningValue = null;
    /** 性格 */
    character: EnumCharacter = null;
    /** 特性 */
    features: EnumFeatures = null;
    /** 抗性 */
    resistance: Resistance = null;
    /** 刻印 */
    signet: Array<Signet> = null;
    /** 技能 */
    skills: Map<string, number> = null;

}
