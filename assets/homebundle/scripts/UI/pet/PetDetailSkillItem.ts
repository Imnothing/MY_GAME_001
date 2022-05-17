/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, Sprite } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { AttributeConfig } from '../../../../mainbundle/scripts/Datatable/AttributeConfig';
import { SkillConfig } from '../../../../mainbundle/scripts/Datatable/SkillConfig';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import auto_PetDetailSkillItem from './autoUI/auto_PetDetailSkillItem';
const { ccclass, property } = _decorator;

@ccclass
export default class PetDetailSkillItem extends BaseUI {
    ui: auto_PetDetailSkillItem = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/pet/PetDetailSkillItem`;
    protected static className = "PetDetailSkillItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private skillId: string;


    onLoad() {
        this.ui = this.node.addComponent(auto_PetDetailSkillItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.setData(data);
    }

    setData(data) {
        let skill: SkillConfig = data.skill;
        let pp = data.pp;
        this.skillId = skill.Id;
        //图标
        let attribute: AttributeConfig = ConfigReader.readAttributeConfig(skill.Attribute);
        this.ui.ico_attribute.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
        //技能名称
        this.ui.lbl_skill_name.getComponent(Label).string = skill.Name;
        //技能PP
        this.ui.lbl_skill_PP.getComponent(Label).string = `PP：${pp}/${skill.PP}`
        //技能威力
        this.ui.lbl_skill_damage.getComponent(Label).string = `威力：${skill.Power}`;
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {

    }

}
