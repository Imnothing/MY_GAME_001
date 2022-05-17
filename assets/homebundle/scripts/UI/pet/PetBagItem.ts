/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Sprite, Label, ProgressBar } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PetData } from '../../../../mainbundle/scripts/Data/PetData';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeListenerType } from '../../Data/HomeListenerType';
import auto_PetBagItem from './autoUI/auto_PetBagItem';
const { ccclass, property } = _decorator;

@ccclass
export default class PetBagItem extends BaseUI {
    ui: auto_PetBagItem = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/pet/PetBagItem`;
    protected static className = "PetBagItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private key: number = null;
    private petId: string = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_PetBagItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.setData(data);
    }

    setData(key?: number) {
        if (key)
            this.key = key;
        let petInfo: PetData = GameDataManager.getInstance().getGameData().petBagList[this.key];
        this.petId = petInfo.id
        // 头像
        let pet: PetConfig = ConfigReader.readPetConfig(this.petId);
        let petAvatar: PicConfig = ConfigReader.readPicConfig(pet.PetAvatar);
        this.ui.pic_avatar.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petAvatar.PicPath, petAvatar.PicName);
        // 名字
        this.ui.lbl_pet_name.getComponent(Label).string = pet.Name;
        // 等级
        this.ui.lbl_lv.getComponent(Label).string = "Lv." + petInfo.level;
        // 血量
        this.ui.hp_black.getComponent(ProgressBar).progress = petInfo.battleValue.hp / petInfo.battleValue.max_hp;
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.node, () => {
            engine.listenerManager.trigger(HomeListenerType.ClickPetBagItem, this.key);
            engine.listenerManager.trigger(HomeListenerType.SwitchPetShow, this.key);
            this.ui.item_bg_frame2.active = true;
        }, this)

        this.onAddEvent(HomeListenerType.ClickPetBagItem, this, (key) => {
            if (this.key != key) {
                this.ui.item_bg_frame2.active = false;
            }
        })

        this.onAddEvent(HomeListenerType.RefreshPetBagItem, this, (key) => {
            this.setData()
        })
    }

}