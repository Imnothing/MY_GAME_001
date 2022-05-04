/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { FightPet } from '../../../../mainbundle/scripts/Data/FightPet';
import { EnumAbnormal, EnumAbType } from '../../../../mainbundle/scripts/Data/PetData';
import { AbnormalConfig } from '../../../../mainbundle/scripts/Datatable/AbnormalConfig';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { EnumBuff, EnumDeBuff } from '../../Manager/BattleSkillSystem';
import auto_PetUI from './autoUI/auto_PetUI';
const { ccclass, property } = _decorator;

@ccclass
export default class PetUI extends BaseUI {
    ui: auto_PetUI = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/PetUI`;
    protected static className = "PetUI";
    protected static layerZIndex = EnumUILayer.UILayer;
    /** 精灵基本信息 */
    private petInfo: FightPet = null;
    /** 战斗专属Id */
    private fightId: number = 0;
    /** 精灵增益效果 */
    private pet_buffs: Map<EnumBuff, number> = null;
    /** 精灵减益效果 */
    private pet_deBuffs: Map<EnumDeBuff, number> = null;
    /** 精灵异常状态 */
    private pet_abnormal: Map<EnumAbnormal, number> = null;
    /** 先制等级 */
    private pet_priority: number = 0;
    /** 造成伤害倍率 */
    private multi_damage: number = 1;
    /** 受到伤害倍率 */
    private multi_hurt: number = 1;



    onLoad() {
        this.ui = this.node.addComponent(auto_PetUI);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.petInfo = data.petInfo;
        this.fightId = data.fightId;
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {

    }

    /** 初始化精灵状态，切换上场时调用 */
    initPet() {

    }

    /** 初始化精灵状态，回合开始时调用 */
    initRound() {

    }

    // doSkill(id: string) { }

    /** 登场 */
    onStage() { }

    /** 回合开始(技能选择完毕) */
    onRoundStart() { }

    /**
     * 使用技能
     * @param id 技能
     */
    onUseSkill(id: string) {
        let abConfig: AbnormalConfig = ConfigReader.readAbnormalConfig();
        for (let abnormal in this.pet_abnormal) {
            if (this.pet_abnormal[abnormal] && abConfig[abnormal].Type == EnumAbType.Control) return false;
        }
    }

    /** 受到伤害 */
    onHurt() { }

    /** 回合结束 */
    onRoundOver() { }

    /** 死亡 */
    onDead() { }

    getPetInfo() {
        return this.petInfo;
    }

    getBuffs() {
        return this.pet_buffs;
    }

    getDeBuffs() {
        return this.pet_deBuffs;
    }

}
