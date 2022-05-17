/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Toggle, Label, Sprite } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { AttributeConfig } from '../../../../mainbundle/scripts/Datatable/AttributeConfig';
import { SkillConfig } from '../../../../mainbundle/scripts/Datatable/SkillConfig';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { GameListenerType } from '../../Data/GameListenerType';
import { EnumPlayer } from '../../Manager/BattleManager';
import { McGame } from '../../Manager/McGame';
import auto_SkillItem from './autoUI/auto_SkillItem';
import PetUI from './PetUI';
const { ccclass, property } = _decorator;

@ccclass
export default class SkillItem extends BaseUI {
    ui: auto_SkillItem = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/SkillItem`;
    protected static className = "SkillItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private skillId: string = null;
    private petId: string = null;
    private maxPP: number = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_SkillItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    setData(sid?: string) {
        let petUI = McGame.battleManager.getPetNow(EnumPlayer.Own).getComponent(PetUI);
        if (sid) {
            this.skillId = sid;
            let skill: SkillConfig = ConfigReader.readSkillConfig(this.skillId);
            let pp = petUI.getPetInfo().skills[this.skillId];
            this.petId = petUI.getFightId();
            this.maxPP = skill.PP;
            //图标
            let attribute: AttributeConfig = ConfigReader.readAttributeConfig(skill.Attribute);
            this.ui.ico_attribute.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
            //第五效果
            this.ui.spSkill_frame.active = (skill.Special == 1);
            //技能名称
            this.ui.label_name.getComponent(Label).string = skill.Name;
            //技能PP
            this.ui.label_pp.getComponent(Label).string = `次数：${pp}/${this.maxPP}`
            //技能威力
            this.ui.label_damage.getComponent(Label).string = `威力：${skill.Power}`;
        } else {
            //不切换的话只对pp值有影响
            let pp = petUI.getPetInfo().skills[this.skillId];
            //技能PP
            this.ui.label_pp.getComponent(Label).string = `次数：${pp}/${this.maxPP}`
        }
    }

    hide(onHided: Function): void {
        onHided();
    }

    refreshSkillState(isChoose?: boolean) {
        this.setData();
        let isGray: boolean = (parseInt(this.ui.label_pp.getComponent(Label).string) == 0)
        this.ui.skill_frame.getComponent(Sprite).grayscale = isGray;
        this.ui.spSkill_frame.getComponent(Sprite).grayscale = isGray;
        if (isChoose)
            this.ui.skill_frame.getComponent(Button).interactable = !isChoose;
        else
            this.ui.skill_frame.getComponent(Button).interactable = !isGray;
    }

    initEvent() {
        this.onRegisterEvent(this.ui.skill_frame, () => {
            engine.listenerManager.trigger(GameListenerType.DoSkill, (this.skillId))
        }, this)

        this.onAddEvent(GameListenerType.RefreshSkillItem, this, this.refreshSkillState);
    }

}
