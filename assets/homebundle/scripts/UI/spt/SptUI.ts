/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, SpriteAtlas } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { SptConfig } from '../../../../mainbundle/scripts/Datatable/SptConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { engine } from '../../../../scripts/framework/engine';
import ScrollViewContent from '../../../../scripts/framework/lib/components/ScrollView/ScrollViewContent';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeManager } from '../../Manager/HomeManager';
import auto_SptUI from './autoUI/auto_SptUI';
const { ccclass, property } = _decorator;

@ccclass
export default class SptUI extends BaseUI {
    ui: auto_SptUI = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/sptScene/SptUI`;
    protected static className = "SptUI";
    protected static layerZIndex = EnumUILayer.UILayer;


    async onLoad() {
        this.ui = this.node.addComponent(auto_SptUI);
        this.initEvent();
        let areaInfo = GameDataManager.getInstance().getGameData().areaInfo;
        let areaId = areaInfo.unlockAreaNum;
        await engine.resLoader.loadBundleResSync(BundleConfigs.HomeBundle, `atlas/spt${this.timerFilter(areaId)}`, SpriteAtlas)
        let sptInfo: Array<SptConfig> = HomeManager.sptManager.getSptByArea(areaId);
        this.ui.scv_planets.getComponent(ScrollViewContent).setData(sptInfo);
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }

    timerFilter(params: number) {
        if (params - 0 < 10) {
            return '0' + params
        } else {
            return params
        }
    }

    initEvent() {
        this.onRegisterEvent(this.ui.btn_back, () => {
            this.doClose(UIConfigs.sptUI);
        }, this)
    }

}
