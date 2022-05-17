/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, SpriteFrame, Sprite } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { ListenerType } from '../../../../mainbundle/scripts/Data/ListenerType';
import { LocalKeys } from '../../../../mainbundle/scripts/Data/LocalKeys';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { Utils } from '../../../../mainbundle/scripts/Utils/Utils';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeManager } from '../../Manager/HomeManager';
import auto_MainUI from './autoUI/auto_MainUI';
const { ccclass, property } = _decorator;

@ccclass
export default class MainUI extends BaseUI {
    ui: auto_MainUI = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/main/MainUI`;
    protected static className = "MainUI";
    protected static layerZIndex = EnumUILayer.UILayer;


    onLoad() {
        this.ui = this.node.addComponent(auto_MainUI);
        this.initEvent();
    }

    async show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        await HomeManager.init();
        let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
        this.switchPetShow(playerInfo.show_pet);
        this.refreshTopInfo();
    }

    hide(onHided: Function): void {
        onHided();
    }

    refreshTopInfo() {
        let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
        this.ui.lbl_money.getComponent(Label).string = String(playerInfo.gold);
        this.ui.lbl_user_name.getComponent(Label).string = playerInfo.nickname;
        this.ui.lbl_user_sign.getComponent(Label).string = playerInfo.sign;
    }

    switchPetShow(petId: string) {
        let pet: PetConfig = ConfigReader.readPetConfig(petId)
        let petPic: PicConfig = ConfigReader.readPicConfig(pet.PetPic);
        let petAvatar: PicConfig = ConfigReader.readPicConfig(pet.PetAvatar);
        this.ui.ico_avatar.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petAvatar.PicPath, petAvatar.PicName);
        this.ui.pet_show.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petPic.PicPath, petPic.PicName);
    }

    initEvent() {
        // 商店
        this.onRegisterEvent(this.ui.btn_mall, () => {      //点击节点btn_mall,即商店按钮
            engine.uiManager.openUIAsync(UIConfigs.shopUI); //打开商店UI
        }, this)
        // 精灵
        this.onRegisterEvent(this.ui.ico_pet, () => {
            engine.uiManager.openUIAsync(UIConfigs.petBag);
        }, this)
        // 挑战
        this.onRegisterEvent(this.ui.btn_pve, () => {
            engine.uiManager.openUIAsync(UIConfigs.sptUI);
        }, this)
        // 招募精灵
        this.onRegisterEvent(this.ui.pet_recruit, async () => {
            // TODO: 临时测试用，获取精灵
            let rdId = Utils.randomNum(1, 8);
            let rdLv = Utils.randomNum(1, 100);
            let pet = await HomeManager.petManager.instantiatePet(String(rdId), rdLv);
            let pet_list = GameDataManager.getInstance().getGameData().petBagList;
            pet_list[Date.now()] = pet;
            HomeManager.petManager.savePetBag();
        }, this)


        this.onAddEvent(ListenerType.RefreshTopInfo, this, this.refreshTopInfo);
    }

}
