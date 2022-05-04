/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
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


    onLoad() {
        this.ui = this.node.addComponent(auto_PetDetail);
        this.initEvent();
        this.switchTab(EnumTab.Info)
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
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

}
