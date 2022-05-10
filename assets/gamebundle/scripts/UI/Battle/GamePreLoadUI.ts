/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { McGame } from '../../Manager/McGame';
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

    async show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        let levelId = data && (data.levelId || 1);
        await McGame.init(levelId);
        McGame.initData()
        await engine.uiManager.loadAsync(UIConfigs.battleUI);
        await engine.uiManager.loadAsync(UIConfigs.petUI);
        // await engine.resLoader.loadBundleResSync(ResPathEnum);
        engine.uiManager.openUI(UIConfigs.battleUI, levelId)

    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {

    }

}
