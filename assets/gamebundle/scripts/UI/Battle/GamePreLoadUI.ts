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
import auto_GamePreLoadUI from './autoUI/auto_GamePreLoadUI';
const { ccclass, property } = _decorator;

@ccclass
export default class GamePreLoadUI extends BaseUI {
    ui: auto_GamePreLoadUI = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/GamePreLoadUI`;
    protected static className = "GamePreLoadUI";
    protected static layerZIndex = EnumUILayer.UILayer;


    onLoad() {
        this.ui = this.node.addComponent(auto_GamePreLoadUI);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {

    }

}
