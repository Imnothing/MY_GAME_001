/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, Sprite } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { ItemConfig } from '../../../../mainbundle/scripts/Datatable/ItemConfig';
import { ShopConfig } from '../../../../mainbundle/scripts/Datatable/ShopConfig';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeManager } from '../../Manager/HomeManager';
import auto_ShopItem from './autoUI/auto_ShopItem';
const { ccclass, property } = _decorator;

@ccclass
export default class ShopItem extends BaseUI {
    ui: auto_ShopItem = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/shop/ShopItem`;
    protected static className = "ShopItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private shopId: string = null;
    private shopDesc: string = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_ShopItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.ui.btn_buy, () => {
            HomeManager.shopManager.buyItem(this.shopId)
        }, this)
    }

    setData(data: ShopConfig) {
        let item: ItemConfig = ConfigReader.readItemConfig(data.ItemId);
        //商品Id
        this.shopId = data.Id;
        //商品描述
        this.shopDesc = item.Desc
        //商品名称
        this.ui.lbl_name.getComponent(Label).string = item.Name;
        //商品价格
        this.ui.lbl_num.getComponent(Label).string = String(data.BuyValue);
        //商品图标
        let frame = engine.resLoader.getAtlasByTag(ResPathEnum.PropIcon.bundle, ResPathEnum.PropIcon.resPath, item.Name);
        this.ui.ico_prop.getComponent(Sprite).spriteFrame = frame;
    }

}
