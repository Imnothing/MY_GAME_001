/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Toggle, Label } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { SkillConfig } from '../../../../mainbundle/scripts/Datatable/SkillConfig';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import auto_SkillItem from './autoUI/auto_SkillItem';
const { ccclass, property } = _decorator;

@ccclass
export default class SkillItem extends BaseUI {
    ui: auto_SkillItem = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/SkillItem`;
    protected static className = "SkillItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private skillId: string = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_SkillItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    setData(data) {
        let skill: SkillConfig = data.skill;
        let pp = data.pp;
        //第五效果
        this.ui.skill_frame.getComponent(Toggle).isChecked = (skill.Special == 1);
        //技能名称
        this.ui.label_name.getComponent(Label).string = skill.Name;
        //技能PP
        this.ui.label_pp.getComponent(Label).string = `${pp}/${skill.PP}`
        //技能威力
        this.ui.label_damage.getComponent(Label).string = String(skill.Power);
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {

    }

}
