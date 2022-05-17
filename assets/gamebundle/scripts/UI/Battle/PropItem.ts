/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, Sprite } from 'cc';
import { HomeManager } from '../../../../homebundle/scripts/Manager/HomeManager';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PropInfo } from '../../../../mainbundle/scripts/Data/Model/PropInfo';
import { ItemConfig } from '../../../../mainbundle/scripts/Datatable/ItemConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { UIHelp } from '../../../../mainbundle/scripts/Utils/UIHelp';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { GameListenerType } from '../../Data/GameListenerType';
import { McGame } from '../../Manager/McGame';
import auto_PropItem from './autoUI/auto_PropItem';
const { ccclass, property } = _decorator;

@ccclass
export default class PropItem extends BaseUI {
    ui: auto_PropItem = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/PropItem`;
    protected static className = "PropItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private key: string = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_PropItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    setData(key: string) {
        if (key)
            this.key = key;
        let prop: PropInfo = GameDataManager.getInstance().getGameData().propList[this.key];
        //物品图标
        let item: ItemConfig = ConfigReader.readItemConfig(prop.id);
        let frame = engine.resLoader.getAtlasByTag(ResPathEnum.PropIcon.bundle, ResPathEnum.PropIcon.resPath, item.Icon);
        this.ui.ico_prop.getComponent(Sprite).spriteFrame = frame;
        //物品数量
        this.ui.lbl_num.getComponent(Label).string = String(prop.count);
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.node, () => {
            McGame.battleManager.useProp(this.key);
            engine.listenerManager.trigger(GameListenerType.SwitchSkillTab);
        })
    }

}
