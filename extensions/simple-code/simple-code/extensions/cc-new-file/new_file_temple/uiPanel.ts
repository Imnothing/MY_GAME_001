/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event } from 'cc';
import _AUTOUI from './autoUI/auto__UINAME';
import { BundleConfigs } from "../../../mainbundle/scripts/Configs/BundleConfigs";
import { EnumUILayer } from '../../../mainbundle/scripts/Configs/UIConfigs';
import { BaseUI } from "../../../scripts/framework/lib/router/BaseUI";

const { ccclass, property } = _decorator;

@ccclass
export default class _UINAME extends BaseUI {
	ui: _AUTOUI = null;

    protected static prefabUrl = `${BundleConfigs._BUNDLENAME}/prefabs/_MODULE/_UINAME`;
    protected static className = "_UINAME";
    protected static layerZIndex = EnumUILayer.UILayer;

    show(data?: any, onShowed?: Function) {
        this.ui = this.node.addComponent(_AUTOUI);
        this.initEvent();
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent(){

    }

}
