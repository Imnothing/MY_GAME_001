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
import auto_SkillItem from './autoUI/auto_SkillItem';
const { ccclass, property } = _decorator;

@ccclass
export default class SkillItem extends BaseUI {
    ui: auto_SkillItem = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/SkillItem`;
    protected static className = "SkillItem";
    protected static layerZIndex = EnumUILayer.UILayer;


    onLoad() {
        this.ui = this.node.addComponent(auto_SkillItem);
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
