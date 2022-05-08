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
import auto_StartUI from './autoUI/auto_StartUI';
const { ccclass, property } = _decorator;

@ccclass
export default class StartUI extends BaseUI {
    ui: auto_StartUI = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/sptScene/StartUI`;
    protected static className = "StartUI";
    protected static layerZIndex = EnumUILayer.UILayer;


    onLoad() {
        this.ui = this.node.addComponent(auto_StartUI);
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
