/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Sprite } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { FightPet } from '../../../../mainbundle/scripts/Data/FightPet';
import { EnumAbnormal, EnumAbType } from '../../../../mainbundle/scripts/Data/PetData';
import { AbnormalConfig } from '../../../../mainbundle/scripts/Datatable/AbnormalConfig';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { EnumBuff, EnumDeBuff, LevelType } from '../../Manager/BattleSkillSystem';
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
    private fightId: string = null;
    /** 精灵增益效果 */
    private pet_buffs: Map<EnumBuff, number> = null;
    /** 精灵减益效果 */
    private pet_deBuffs: Map<EnumDeBuff, number> = null;
    /** 精灵异常状态 */
    private pet_abnormal: Map<EnumAbnormal, number> = null;
    /** 精灵属性等级 */
    private level_value: Map<LevelType, number> = null
    /** 先制等级 */
    private pet_priority: number = 0;
    /** 造成伤害倍率 */
    private multi_damage: number = 1;
    /** 受到伤害倍率 */
    private multi_hurt: number = 1;
    /** 是否死亡 */
    private isDead: boolean = false;



    onLoad() {
        this.ui = this.node.addComponent(auto_PetUI);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    setData(data: any) {
        this.petInfo = data.petInfo;
        this.fightId = data.fightId;
        this.isDead = false;

        this.initPet();
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {

    }

    /** 初始化精灵状态，切换上场时调用 */
    initPet() {
        // 初始化精灵Buff
        this.pet_buffs = new Map<EnumBuff, number>();
        // 初始化精灵DeBuff
        this.pet_deBuffs = new Map<EnumDeBuff, number>();
        // 初始化精灵异常状态
        this.pet_abnormal = new Map<EnumAbnormal, number>();
        // 初始化精灵属性等级
        this.level_value = new Map<LevelType, number>();
        // 初始化精灵先制等级
        this.pet_priority = 0;
        // 初始化精灵造成伤害倍率
        this.multi_damage = 1;
        // 初始化精灵受到伤害倍率
        this.multi_hurt = 1
    }

    /** 初始化精灵状态，回合开始时调用 */
    initRound() {

    }

    showSprite() {
        let pet: PetConfig = ConfigReader.readPetConfig(this.petInfo.id)
        let petPic: PicConfig = ConfigReader.readPicConfig(pet.PetPic);
        this.ui.pet_sprite.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petPic.PicPath, petPic.PicName);
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
        //检测异常状态
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

    getFightId() {
        return this.fightId;
    }

    getBattleLevel() {
        return this.level_value;
    }

    getAbState() {
        return this.pet_abnormal;
    }

    getPriority() {
        return this.pet_priority;
    }

    setPriority(pri: number) {
        this.pet_priority += pri;
    }

    getMultiDamage() {
        return this.multi_damage;
    }

    setMultiDamage(multi: number) {
        this.multi_damage = multi;
    }

    getMultiHurt() {
        return this.multi_hurt;
    }

    setMultiHurt(multi: number) {
        this.multi_hurt = multi;
    }

    checkDead() {
        return this.isDead;
    }
    setDead() {
        this.isDead = true;
        this.onDead();
    }

}
