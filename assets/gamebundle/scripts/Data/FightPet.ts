
/** 特性 */
enum EnumFeatures {

}

/** 精灵类 */
export class FightPet {
    /** 精灵ID */
    id: string = null;;
    /** 精灵等级 */
    level: number = 1;
    /** 战斗属性值 */
    battleValue: BattleValue = new BattleValue();
    /** 抗性 */
    resistance: Resistance = new Resistance();
    /** 特性 */
    features: EnumFeatures = null;
}

/** 战斗属性值 */
class BattleValue {
    atk: number = 0;
    sp_atk: number = 0;
    def: number = 0;
    sp_def: number = 0;
    spd: number = 0;
    max_hp: number = 0;
    hp: number = 0;
}

/** 抗性类 */
class Resistance {
    damageResist: DamageResist = new DamageResist();
    abnormalResist: AbnormalResist = new AbnormalResist();
}

/** 伤害抗性类 */
class DamageResist {
    /** 暴击伤害抵抗 */
    criticalResist: number = 0;
    /** 固定伤害抵抗 */
    fixedResist: number = 0;
    /** 百分比伤害 */
    persentage: number = 0;

    constructor() { }
}

/** 异常抗性类 */
class AbnormalResist {
    /** 异常抗性抵抗数组 */
    abnormalStates: Map<AbnormalResist, number> = new Map<AbnormalResist, number>();

    constructor() { }
}

//todo: AbStateManager
/** 异常状态类 */
export class AbnormalState {
    public id: number = 0;
    public type: number = 1;

    constructor() { }
}


