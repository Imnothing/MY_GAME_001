/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
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

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.ui.btn_mall, () => {      //点击节点btn_mall,即商店按钮
            engine.uiManager.openUIAsync(UIConfigs.shopUI); //打开商店UI
        }, this)
    }

}
