import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";

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
export class FightPetManager {
    init() { }
    ////养成类////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 刷新战斗属性
     * @param id 精灵Id
     */
    refreshBattleValue(pet: FightPet) { }

    /**
     * 增加学习力
     * @param id 精灵Id
     * @param type 能力
     * @param num 点数
     */
    addLearning(pet: FightPet, type: EnumLearnType, num) { }

    /**
     * 恢复体力
     * @param id 精灵Id
     * @param hp 体力值
     * 判断是否满体力
     */
    recoverHp(pet: FightPet, hp: number) { }

    /**
     * 提升等级
     * @param id 精灵Id
     * @param level 等级值
     * 判断是否满级
     */
    upgradeLevel(pet: FightPet, level: number) { }

    /**
     * 设置等级
     * @param id 精灵Id
     * @param level 等级值
     */
    setLevel(pet: FightPet, level: number) { }

    /**
     * 获取经验
     * @param id 精灵Id
     * @param exp 经验值
     * 判断是否满级
     * 判断是否剩下一级
     */
    getExp(pet: FightPet, exp: number) { }

    /**
     * 装备刻印
     * @param id 精灵Id
     * @param signetId 刻印Id
     * 判断背包中是否存在刻印
     */
    addSignet(pet: FightPet, signetpet: FightPet) { }

    /**
     * 提升抗性
     * @param id 精灵Id
     * @param type 抗性类
     * @param abId 异常抗性Id
     * 判断异常抗性是否存在
     * 判断抗性值是否满
     */
    upgradeResist(pet: FightPet, type: EnumResistType, abId?: number) { }

    /**
     * 重置抗性
     */
    resetResist() { }

    /**
     * 刷新抗性
     */
    refreshResist() { }

    /** 计算克制倍数 */
    calAttribute(attributeId: string): number { return 1 }



    ////战斗类////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
