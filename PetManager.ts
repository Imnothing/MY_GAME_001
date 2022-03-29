enum EnumeLearnType {
    atk,
    sp_atk,
    def,
    sp_def,
    spd,
    hp,
}

export class PetManager {
    init() { }

    /**
     * 刷新战斗属性
     */
    refreshBattleValue() { }

    /**
     * 增加学习力
     * @param type 能力
     * @param num 点数
     */
    addLearning(type: EnumeLearnType, num) { }

    /**
     * 恢复体力
     */
    recoverHp() { }

}