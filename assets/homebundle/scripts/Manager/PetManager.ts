import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { PetData } from "../../../mainbundle/scripts/Data/PetData";

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
     */
    refreshBattleValue(pet: PetData) { }

    /**
     * 增加学习力
     * @param id 精灵Id
     * @param type 能力
     * @param num 点数
     */
    addLearning(pet: PetData, type: EnumLearnType, num) { }

    /**
     * 恢复体力
     * @param id 精灵Id
     * @param hp 体力值
     * 判断是否满体力
     */
    recoverHp(pet: PetData, hp: number) { }

    /**
     * 提升等级
     * @param id 精灵Id
     * @param level 等级值
     * 判断是否满级
     */
    upgradeLevel(pet: PetData, level: number) { }

    /**
     * 设置等级
     * @param id 精灵Id
     * @param level 等级值
     */
    setLevel(pet: PetData, level: number) { }

    /**
     * 提升抗性
     * @param id 精灵Id
     * @param type 抗性类
     * @param abId 异常抗性Id
     * 判断异常抗性是否存在
     * 判断抗性值是否满
     */
    upgradeResist(pet: PetData, type: EnumResistType, abId?: string) { }

    /**
     * 设置性格
     * @param pet 
     */
    setCharacter(pet: PetData, cid?: string) { }

    /**
     * 设置特性
     * @param pet 
     */
    setFeature(pet: PetData, cid?: string) { }

    /**
     * 重置抗性
     */
    resetResist() { }

    /**
     * 刷新抗性
     */
    refreshResist() { }
}
