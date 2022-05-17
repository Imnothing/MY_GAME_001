/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, Animation } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PropInfo } from '../../../../mainbundle/scripts/Data/Model/PropInfo';
import { ItemConfig } from '../../../../mainbundle/scripts/Datatable/ItemConfig';
import { UIHelp } from '../../../../mainbundle/scripts/Utils/UIHelp';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeManager } from '../../Manager/HomeManager';
import auto_PropDialog from './autoUI/auto_PropDialog';
const { ccclass, property } = _decorator;

@ccclass
export default class PropDialog extends BaseUI {
    ui: auto_PropDialog = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/dialog/PropDialog`;
    protected static className = "PropDialog";
    protected static layerZIndex = EnumUILayer.UILayer;
    private propId: string = null;
    private callback: Function = null;


    onLoad() {
        this.ui = this.node.addComponent(auto_PropDialog);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.node.getComponent(Animation).play("OpenUI")
        let prop: PropInfo = data.prop;
        this.callback = data.callback;
        this.propId = prop.id;
        let item: ItemConfig = ConfigReader.readItemConfig(prop.id);
        //物品名称
        this.ui.lbl_name.getComponent(Label).string = item.Name;
        //物品描述
        this.ui.lbl_desc.getComponent(Label).string = item.Desc;
        //物品数量
        this.ui.lbl_num.getComponent(Label).string = String(prop.count);
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.ui.touchBg, () => {
            this.closeUI();
        }, this)

        this.onRegisterEvent(this.ui.btn_use, () => {
            if (HomeManager.propManager.useProp(this.propId)) {
                UIHelp.showTip("使用成功！");
                this.callback()
                this.closeUI()
            } else {
                UIHelp.showTip("精灵无需再使用该道具")
            }
        })
    }

    closeUI() {
        let aniComp = this.node.getComponent(Animation);
        aniComp.play("CloseUI");
        aniComp.on(Animation.EventType.FINISHED, () => {
            this.doClose(UIConfigs.propDialog);
        })
    }

}
