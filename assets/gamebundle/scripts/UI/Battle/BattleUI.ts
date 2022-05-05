/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Toggle, Prefab, Label, ProgressBar } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { FightPet } from '../../../../mainbundle/scripts/Data/FightPet';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import BattleControl from '../../BattleControl';
import { EnumPlayer } from '../../Manager/BattleManager';
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

    showPet(player: EnumPlayer, pet: Node) {
        let petInfo = pet.getComponent(PetUI).getPetInfo();
        let petId = petInfo.id;
        let petConfig: PetConfig = ConfigReader.readPetConfig(petId);
        if (player == EnumPlayer.Own) {
            //精灵名称
            this.ui.label_petName.getComponent(Label).string = petConfig.Name;
            //体力
            this.ui.hp_bar.getComponent(ProgressBar).progress = petInfo.battleValue.hp / petInfo.battleValue.max_hp;
            //等级
            this.ui.label_lv.getComponent(Label).string = String(petInfo.level);
            //属性

            //精灵图片
            //精灵头像

            this.showSkill();

        } else if (player == EnumPlayer.Enemy) {

        }
    }

    showPets() { }

    showSkill() { }

    showTip() { }

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