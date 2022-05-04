/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Toggle, Prefab } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { FightPet } from '../../../../mainbundle/scripts/Data/FightPet';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import BattleControl from '../../BattleControl';
import auto_BattleUI from './autoUI/auto_BattleUI';
import PetUI from './PetUI';
const { ccclass, property } = _decorator;

@ccclass
export default class BattleUI extends BaseUI {
    ui: auto_BattleUI = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/BattleUI`;
    protected static className = "BattleUI";
    protected static layerZIndex = EnumUILayer.UILayer;
    public battleControl: BattleControl;
    private enumTab: EnumTab = EnumTab.Skill;


    onLoad() {
        this.ui = this.node.addComponent(auto_BattleUI);
        this.initEvent();
        this.enumTab = EnumTab.Skill;
        this.switchTab(this.enumTab);
    }

    show(data?: any, onShowed?: Function) {
        window["BattleUI"] = this;
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.ui.pet_change, () => {
            this.ui.ico_prop.getComponent(Toggle).isChecked = false;
            this.enumTab = this.enumTab == EnumTab.Skill ? EnumTab.Pets : EnumTab.Skill
            this.switchTab(this.enumTab);
        }, this)

        this.onRegisterEvent(this.ui.ico_prop, () => {
            this.enumTab = this.ui.ico_prop.getComponent(Toggle).isChecked ? EnumTab.Skill : EnumTab.Prop;
            this.switchTab(this.enumTab);
        }, this)
    }

    showPet(pet: PetUI) { }

    showPets() { }

    showSkill() { }


    switchTab(tab: EnumTab) {
        this.ui.bottom.children.forEach((node, index) => {
            if (index == this.ui.bottom.children.length - 1) return;
            node.active = (index == tab.valueOf())
        })
    }
}
enum EnumTab {
    Skill = 0,
    Pets = 1,
    Prop = 2
}