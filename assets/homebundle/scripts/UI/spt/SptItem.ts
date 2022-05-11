/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, Sprite } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { SptConfig } from '../../../../mainbundle/scripts/Datatable/SptConfig';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import auto_SptItem from './autoUI/auto_SptItem';
const { ccclass, property } = _decorator;

@ccclass
export default class SptItem extends BaseUI {
    ui: auto_SptItem = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/spt/SptItem`;
    protected static className = "SptItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private sptConfig: SptConfig = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_SptItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }

    setData(spt: SptConfig) {
        this.sptConfig = spt;
        let pic: PicConfig = ConfigReader.readPicConfig(spt.SptPic);
        this.ui.lbl_planet.getComponent(Label).string = spt.SptName;
        this.ui.pic_planet.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.HomeBundle, pic.PicPath, pic.PicName);

    }

    initEvent() {
        this.onRegisterEvent(this.ui.pic_planet, () => {
            engine.uiManager.openUIAsync(UIConfigs.startUI, this.sptConfig)
        }, this)
    }

}
