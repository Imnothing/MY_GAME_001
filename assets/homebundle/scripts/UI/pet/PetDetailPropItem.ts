/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Sprite, Label, SpriteFrame } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PropInfo } from '../../../../mainbundle/scripts/Data/Model/PropInfo';
import { ItemConfig } from '../../../../mainbundle/scripts/Datatable/ItemConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import auto_PetDetailPropItem from './autoUI/auto_PetDetailPropItem';
const { ccclass, property } = _decorator;

@ccclass
export default class PetDetailPropItem extends BaseUI {
    ui: auto_PetDetailPropItem = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/pet/PetDetailPropItem`;
    protected static className = "PetDetailPropItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private key: string = null;
    private propInfo: PropInfo = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_PetDetailPropItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    onEnable() {
        if (this.key)
            this.setData();
    }

    setData(key?: string) {
        if (key)
            this.key = key;
        let prop: PropInfo = GameDataManager.getInstance().getGameData().propList[this.key];
        this.propInfo = prop;
        if (prop.count <= 0) {
            this.node.active = false;
            return;
        }
        //物品图标
        let item: ItemConfig = ConfigReader.readItemConfig(prop.id);
        let frame = engine.resLoader.getAtlasByTag(ResPathEnum.PropIcon.bundle, ResPathEnum.PropIcon.resPath, item.Icon);
        this.ui.ico_prop.getComponent(Sprite).spriteFrame = frame;
        //物品数量
        this.ui.lbl_num.getComponent(Label).string = String(prop.count);
        console.log("=======icon", item.Icon);

    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.node, () => {
            engine.uiManager.openUIAsync(UIConfigs.propDialog, {
                prop: this.propInfo,
                callback: () => {
                    this.setData();
                }
            })
        }, this)
    }

}
