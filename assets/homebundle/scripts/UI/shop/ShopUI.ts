/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { ShopConfig } from '../../../../mainbundle/scripts/Datatable/ShopConfig';
import ScrollViewContent from '../../../../scripts/framework/lib/components/ScrollView/ScrollViewContent';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import auto_ShopUI from './autoUI/auto_ShopUI';
const { ccclass, property } = _decorator;

@ccclass
export default class ShopUI extends BaseUI {
    ui: auto_ShopUI = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/shop/ShopUI`;
    protected static className = "ShopUI";
    protected static layerZIndex = EnumUILayer.UILayer;


    onLoad() {
        this.ui = this.node.addComponent(auto_ShopUI);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        if (this.ui.content.children.length == 0) {     //若商店内容为空
            let shops = ConfigReader.readShopConfig();  //读取商店信息表
            let arr: Array<ShopConfig> = [];            //初始化数组用于存储商品信息
            for (let key in shops) {
                arr.push(shops[key]);                   //将商品信息存入数组中
            }
            arr.sort((a: ShopConfig, b: ShopConfig) => {    //对数组进行排序
                return a.Sort - b.Sort;
            })
            this.ui.scv_prop.getComponent(ScrollViewContent).setData(arr);  //将数组传递至ScrollViewContent组件用于遍历生成ShopItem预制体
        }
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.ui.btn_back, () => {
            this.doClose(UIConfigs.shopUI)
        }, this)
    }

}
