import { BattleValue } from "./BattleValue";
import { Resistance } from "./Resistance";

/** 精灵类 */
export class FightPet {
    /** 精灵ID */
    id: string = null;
    /** 精灵背包Key值 */
    petBagId: number = null;
    /** 精灵属性ID */
    attribute: string = null;
    /** 精灵等级 */
    level: number = 1;
    /** 战斗属性值 */
    battleValue: BattleValue = new BattleValue();
    /** 抗性 */
    resistance: Resistance = new Resistance();
    /** 特性 */
    features: string = null;
    /** 技能 */
    skills: Map<string, number> = new Map<string, number>();
    /** 战斗等级值 */
    // battleLevel: BattleLevel = new BattleLevel();
}

/** 战斗等级值 */
// export class BattleLevel {
//     atk: number = 0;
//     sp_atk: number = 0;
//     def: number = 0;
//     sp_def: number = 0;
//     spd: number = 0;
//     max_hp: number = 0;
//     hp: number = 0;

//     constructor() { }
// }