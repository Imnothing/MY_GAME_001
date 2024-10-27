import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { EffectConfig } from "../../../mainbundle/scripts/Datatable/EffectConfig";
import { SkillConfig } from "../../../mainbundle/scripts/Datatable/SkillConfig";
import { Utils } from "../../../mainbundle/scripts/Utils/Utils";
import { engine } from "../../../scripts/framework/engine";
import { GameListenerType } from "../Data/GameListenerType";
import PetUI from "../UI/Battle/PetUI";
import { BattleState, EnumPlayer } from "./BattleManager";
import { ChangLevelWay, LevelType } from "./BattleSkillSystem";
import { McGame } from "./McGame";

export class BattleControl {
    private own_skill: string = null;
    private own_recover: number = 0;
    private enemy_skill: string = null;

    private round_ani: Array<BattleAni> = null;

    init() {
        this.own_skill = null;
        this.own_recover = 0;
        this.enemy_skill = null;
        this.round_ani = null;
    }

    refreshData() {
        this.own_skill = null;
        this.own_recover = 0;
        this.enemy_skill = null;
        this.round_ani = null;
    }

    doAI() {
        let enemy_pet_now = McGame.battleManager.getPetNow(EnumPlayer.Enemy);
        let skills = enemy_pet_now.getComponent(PetUI).getPetInfo().skills;
        let arr = [];
        for (let key in skills) {
            if (skills[key] != 0) arr.push(key);
        }
        this.doSkill(Utils.randValue(arr), EnumPlayer.Enemy);
    }

    doSkill(skill: string, player: EnumPlayer) {
        if (player == EnumPlayer.Own) this.own_skill = skill;
        else this.enemy_skill = skill;
    }

    doRecover(hp: number) {
        this.own_recover += hp;
    }

    doRound() {
        let ownPet = McGame.battleManager
            .getPetNow(EnumPlayer.Own)
            .getComponent(PetUI);
        let enemyPet = McGame.battleManager
            .getPetNow(EnumPlayer.Enemy)
            .getComponent(PetUI);

        // 切换表现
        let isOwnExchage: boolean = false;
        let isEnemyExchage: boolean = false;

        // 治疗表现

        if (this.own_skill || this.enemy_skill) {
            // 获取先手方
        }
    }

    doExecute() {
        // 初始化本局动画
        this.round_ani = new Array<BattleAni>();
        let isCritical: boolean = false
        let isPriority: boolean = false;
        let lv_up: boolean = false;
        let lv_down: boolean = false;

        let own_pet = McGame.battleManager
            .getPetNow(EnumPlayer.Own)
            .getComponent(PetUI);
        let own_petInfo = own_pet.getPetInfo();
        let enemy_pet = McGame.battleManager
            .getPetNow(EnumPlayer.Enemy)
            .getComponent(PetUI);
        let enemy_petInfo = enemy_pet.getPetInfo();

        let own_damage: number = 0;
        let enemy_damage: number = 0;
        let own_recover: number = 0;
        let enemy_recover: number = 0;
        // 道具回血
        if (this.own_recover > 0) {
            own_petInfo.battleValue.hp =
                own_petInfo.battleValue.hp + this.own_recover >=
                    own_petInfo.battleValue.max_hp
                    ? own_petInfo.battleValue.max_hp
                    : own_petInfo.battleValue.hp + this.own_recover;
            this.round_ani.push(
                new BattleAni(
                    EnumPlayer.Own,
                    null,
                    own_petInfo.battleValue.hp / own_petInfo.battleValue.max_hp,
                    null,
                    0,
                    this.own_recover
                )
            );
        }

        //计算伤害
        // if (this.own_skill) {
        //     let skill: SkillConfig = ConfigReader.readSkillConfig(this.own_skill);
        //     let res = this.calDamage(own_pet, enemy_pet, skill);
        //     own_damage = res.damage;
        //     isCritical = res.isCritical;
        // }
        // if (this.enemy_skill) {
        //     let skill: SkillConfig = ConfigReader.readSkillConfig(this.enemy_skill);
        //     let res = this.calDamage(enemy_pet, own_pet, skill);
        //     enemy_damage = res.damage;
        //     isCritical = res.isCritical;
        // }

        // 判断先手
        if (
            own_pet.getPriority() > enemy_pet.getPriority() ||
            (own_pet.getPriority() <= enemy_pet.getPriority() &&
                own_petInfo.battleValue.spd >= enemy_petInfo.battleValue.spd)
        ) {
            // 当回合使用了技能
            if (this.own_skill) {
                if (own_pet.getPriority() > 0) isPriority = true;

                let skill: SkillConfig = ConfigReader.readSkillConfig(this.own_skill);
                let res = this.calDamage(own_pet, enemy_pet, skill);
                own_damage = res.damage;
                isCritical = res.isCritical;

                // 对手阵亡
                if (enemy_petInfo.battleValue.hp - own_damage <= 0) {
                    enemy_petInfo.battleValue.hp = 0;
                    enemy_pet.setDead();
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Own,
                            skill,
                            null,
                            enemy_petInfo.battleValue.hp / enemy_petInfo.battleValue.max_hp,
                            own_damage,
                            0,
                            isCritical,
                            isPriority && EnumTip.Priority
                        )
                    );
                    engine.listenerManager.trigger(
                        GameListenerType.PlayBattleAni,
                        this.round_ani
                    );
                    return;
                } else {
                    enemy_petInfo.battleValue.hp -= own_damage;
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Own,
                            skill,
                            null,
                            enemy_petInfo.battleValue.hp / enemy_petInfo.battleValue.max_hp,
                            own_damage,
                            0,
                            isCritical,
                            isPriority && EnumTip.Priority
                        )
                    );
                }
            }
            // 没阵亡 对手出招
            if (this.enemy_skill) {
                let skill: SkillConfig = ConfigReader.readSkillConfig(this.enemy_skill);
                let res = this.calDamage(enemy_pet, own_pet, skill);
                enemy_damage = res.damage;
                isCritical = res.isCritical;

                // 对手阵亡
                if (own_petInfo.battleValue.hp - enemy_damage <= 0) {
                    own_petInfo.battleValue.hp = 0;
                    own_pet.setDead();
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Enemy,
                            skill,
                            null,
                            own_petInfo.battleValue.hp / own_petInfo.battleValue.max_hp,
                            enemy_damage,
                            0,
                            isCritical,
                            null
                        )
                    );
                    engine.listenerManager.trigger(
                        GameListenerType.PlayBattleAni,
                        this.round_ani
                    );
                    return;
                } else {
                    own_petInfo.battleValue.hp -= enemy_damage;
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Enemy,
                            skill,
                            null,
                            own_petInfo.battleValue.hp / own_petInfo.battleValue.max_hp,
                            enemy_damage,
                            0,
                            isCritical,
                            null
                        )
                    );
                }
            }
        } else {
            if (this.enemy_skill) {
                if (enemy_pet.getPriority() > 0) isPriority = true;
                let skill: SkillConfig = ConfigReader.readSkillConfig(this.enemy_skill);
                let res = this.calDamage(enemy_pet, own_pet, skill);
                enemy_damage = res.damage;
                isCritical = res.isCritical;

                // 对手阵亡
                if (own_petInfo.battleValue.hp - enemy_damage <= 0) {
                    own_petInfo.battleValue.hp = 0;
                    own_pet.setDead();
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Enemy,
                            skill,
                            null,
                            own_petInfo.battleValue.hp / own_petInfo.battleValue.max_hp,
                            enemy_damage,
                            0,
                            isCritical,
                            isPriority && EnumTip.Priority
                        )
                    );
                    engine.listenerManager.trigger(
                        GameListenerType.PlayBattleAni,
                        this.round_ani
                    );
                    return;
                } else {
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Enemy,
                            skill,
                            null,
                            own_petInfo.battleValue.hp / own_petInfo.battleValue.max_hp,
                            enemy_damage,
                            0,
                            isCritical,
                            isPriority && EnumTip.Priority
                        )
                    );
                    own_petInfo.battleValue.hp -= enemy_damage;
                }
                // 没阵亡 对手出招
            }
            if (this.own_skill) {
                let skill: SkillConfig = ConfigReader.readSkillConfig(this.own_skill);
                let res = this.calDamage(own_pet, enemy_pet, skill);
                own_damage = res.damage;
                isCritical = res.isCritical;

                // 对手阵亡
                if (enemy_petInfo.battleValue.hp - own_damage <= 0) {
                    enemy_petInfo.battleValue.hp = 0;
                    enemy_pet.setDead();
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Own,
                            skill,
                            null,
                            enemy_petInfo.battleValue.hp / enemy_petInfo.battleValue.max_hp,
                            own_damage,
                            0,
                            isCritical,
                            null
                        )
                    );
                    engine.listenerManager.trigger(
                        GameListenerType.PlayBattleAni,
                        this.round_ani
                    );
                    return;
                } else {
                    enemy_petInfo.battleValue.hp -= own_damage;
                    this.round_ani.push(
                        new BattleAni(
                            EnumPlayer.Own,
                            skill,
                            null,
                            enemy_petInfo.battleValue.hp / enemy_petInfo.battleValue.max_hp,
                            own_damage,
                            0,
                            isCritical,
                            null
                        )
                    );
                }
            }
        }
        engine.listenerManager.trigger(
            GameListenerType.PlayBattleAni,
            this.round_ani
        );
    }

    doEffect(skill: SkillConfig, p1: PetUI, p2: PetUI) {
        let effects = skill.Effect.split("|");
        effects.forEach((effect) => {
            switch (effect) {
                // 10%令对手害怕 10 1006
                case "1": {
                    let possible = 10;
                    let abnormal = "1006";
                    McGame.battleSkillSystem.addAbnormal(p2, abnormal, possible);
                    break;
                }
                // 技能使用成功时，攻击+2
                case "2": {
                    let type = LevelType.LEVEL_Atk;
                    McGame.battleSkillSystem.changLevel(
                        p1,
                        ChangLevelWay.Promote,
                        type,
                        2
                    );
                    break;
                }
                case "3": {
                    let possible = 30;
                    // if()
                }
            }
        });
    }

    /**
     * 计算伤害
     * @param attack_pet
     * @param hurt_pet
     * @param power
     * [(攻击方精灵等级×0.4 + 2)×(技能威力×攻击方的攻击值x(1+0.1*攻击方攻击等级))÷(防御方的防御值x(1+0.1*防御方防御等级))÷50 + 2]×本系技能系数修正(使用本系技能则为1.1，非本系技能为1)×克制系数×威力系数(217~255)÷255
     */
    calDamage(attack_pet: PetUI, hurt_pet: PetUI, skill: SkillConfig) {
        let res = {
            damage: 0,
            isCritical: false,
        };
        let atkInfo: FightPet = attack_pet.getPetInfo();
        let atkBattleValue = attack_pet.getBattleLevel();
        let hurtInfo: FightPet = hurt_pet.getPetInfo();
        let hurtBattleValue = hurt_pet.getBattleLevel();
        if (skill.Type == 1) {
            let damage_1 =
                ((atkInfo.level * 0.4 + 2) *
                    (skill.Power *
                        atkInfo.battleValue.atk *
                        (1 +
                            (0.1 * atkBattleValue[LevelType.LEVEL_Atk]
                                ? atkBattleValue[LevelType.LEVEL_Atk]
                                : 0)))) /
                (hurtInfo.battleValue.def *
                    (1 +
                        (0.1 * hurtBattleValue[LevelType.LEVEL_Def]
                            ? hurtBattleValue[LevelType.LEVEL_Def]
                            : 0))) /
                50 +
                2;
            let damage_2 =
                ((skill.Attribute == atkInfo.attribute ? 1.1 : 1) *
                    McGame.battleManager.calRestraint(
                        atkInfo.attribute,
                        hurtInfo.attribute
                    ) *
                    Utils.randomNum(217, 255)) /
                255;
            let tmp_damage = damage_1 * damage_2;
            //暴击
            if (Utils.randomNum(1, 100) > skill.CritRate) {
                tmp_damage = tmp_damage * 2;
                res.isCritical = true;
            }
            res.damage = Math.floor(tmp_damage);
        } else if (skill.Type == 2) {
            let damage_1 =
                ((atkInfo.level * 0.4 + 2) *
                    (skill.Power *
                        atkInfo.battleValue.sp_atk *
                        (1 +
                            (0.1 * atkBattleValue[LevelType.LEVEL_spAtk]
                                ? atkBattleValue[LevelType.LEVEL_spAtk]
                                : 0)))) /
                (hurtInfo.battleValue.sp_def *
                    (1 +
                        (0.1 * hurtBattleValue[LevelType.LEVEL_spDef]
                            ? hurtBattleValue[LevelType.LEVEL_spDef]
                            : 0))) /
                50 +
                2;
            let damage_2 =
                ((skill.Attribute == atkInfo.attribute ? 1.1 : 1) *
                    McGame.battleManager.calRestraint(
                        atkInfo.attribute,
                        hurtInfo.attribute
                    ) *
                    Utils.randomNum(217, 255)) /
                255;
            let tmp_damage = damage_1 * damage_2;
            //暴击
            if (Utils.randomNum(1, 100) > skill.CritRate) {
                tmp_damage = tmp_damage * 2;
                res.isCritical = true;
            }
            res.damage = Math.floor(tmp_damage);
        }

        return res;
    }
}

export class BattleAni {
    player: EnumPlayer;
    skill: SkillConfig;
    hp_player: number;
    hp_other: number;
    damage: number;
    recover: number;
    isCritical: boolean;
    tip_player: EnumTip;
    tip_other: EnumTip;

    constructor(
        player: EnumPlayer,
        skill: SkillConfig,
        hp_player: number,
        hp_other: number,
        damage: number,
        recover: number,
        isCritical?: boolean,
        tip_player?: EnumTip,
        tip_other?: EnumTip
    ) {
        this.player = player;
        this.skill = skill;
        this.hp_player = hp_player;
        this.hp_other = hp_other;
        this.damage = damage;
        this.recover = recover;
        this.isCritical = isCritical;
        this.tip_player = tip_player;
        this.tip_other = tip_other;
    }
}

export enum EnumTip {
    LevelUp = 1,
    LevelDown = 2,
    Priority = 3,
}
