/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PetData } from '../../../../mainbundle/scripts/Data/PetData';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import auto_PetDetail from './autoUI/auto_PetDetail';
const { ccclass, property } = _decorator;
enum EnumTab {
    Info = 0,
    Skills = 1,
    Resist = 2,
    Prop = 3
}

@ccclass
export default class PetDetail extends BaseUI {
    ui: auto_PetDetail = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/pet/PetDetail`;
    protected static className = "PetDetail";
    protected static layerZIndex = EnumUILayer.UILayer;
    private enumTab = EnumTab.Info;
    private petInfo: PetData = null;

    onLoad() {
        this.ui = this.node.addComponent(auto_PetDetail);
        this.initEvent();
        this.initPetTab();
        this.switchTab(EnumTab.Info)
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.petInfo = data;
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        //信息
        this.onRegisterEvent(this.ui.btn_info_uncheck, () => {
            if (this.enumTab == EnumTab.Info) return;
            this.enumTab = EnumTab.Info;
            this.switchTab(this.enumTab)
        }, this)

        //技能
        this.onRegisterEvent(this.ui.btn_skill_uncheck, () => {
            if (this.enumTab == EnumTab.Skills) return;
            this.enumTab = EnumTab.Skills;
            this.switchTab(this.enumTab)
        }, this)

        //抗性
        this.onRegisterEvent(this.ui.btn_resist_uncheck, () => {
            if (this.enumTab == EnumTab.Resist) return;
            this.enumTab = EnumTab.Resist;
            this.switchTab(this.enumTab)
        }, this)

        //物品
        this.onRegisterEvent(this.ui.btn_prop_uncheck, () => {
            if (this.enumTab == EnumTab.Prop) return;
            this.enumTab = EnumTab.Prop;
            this.switchTab(this.enumTab)
        }, this)
    }

    switchTab(tab: EnumTab) {
        this.ui.petTab.children.forEach((node, index) => {
            node.active = (index == tab.valueOf())
        })
    }

    initPetTab() {
        //精灵信息初始化
        //等级
        this.ui.lbl_level.getComponent(Label).string = String(this.petInfo.level);
        //学习力
        this.ui.lbl_learn.getComponent(Label).string = String(this.petInfo.learningValue.all);
        //天赋
        this.ui.lbl_talent.getComponent(Label).string = String(this.petInfo.talentValue);
        //性格
        this.ui.lbl_character.getComponent(Label).string = ConfigReader.readCharacterConfig(this.petInfo.character.valueOf()).Name;
        //特性
        this.ui.lbl_feature.getComponent(Label).string = ConfigReader.readFeatureConfig(this.petInfo.features.valueOf()).Name;
        //体力上限
        this.ui.lbl_maxHp.getComponent(Label).string = "0";

        //精灵属性
        //攻击
        this.ui.lbl_atk.getComponent(Label).string = String(this.petInfo.battleValue.atk);
        this.ui.lbl_learn_atk.getComponent(Label).string = String(this.petInfo.learningValue.atk);
        //特攻
        this.ui.lbl_spAtk.getComponent(Label).string = String(this.petInfo.battleValue.sp_atk);
        this.ui.lbl_learn_spAtk.getComponent(Label).string = String(this.petInfo.learningValue.sp_atk);
        //防御
        this.ui.lbl_def.getComponent(Label).string = String(this.petInfo.battleValue.def);
        this.ui.lbl_learn_def.getComponent(Label).string = String(this.petInfo.learningValue.def);
        //特防
        this.ui.lbl_spDef.getComponent(Label).string = String(this.petInfo.battleValue.sp_def);
        this.ui.lbl_learn_spDef.getComponent(Label).string = String(this.petInfo.learningValue.sp_def);
        //速度
        this.ui.lbl_spd.getComponent(Label).string = String(this.petInfo.battleValue.spd);
        this.ui.lbl_learn_spd.getComponent(Label).string = String(this.petInfo.learningValue.spd);
        //体力
        this.ui.lbl_hp.getComponent(Label).string = String(this.petInfo.battleValue.hp);
        this.ui.lbl_learn_hp.getComponent(Label).string = String(this.petInfo.learningValue.hp);
    }

}
