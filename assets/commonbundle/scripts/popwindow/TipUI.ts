import { instantiate, log, NodePool, Prefab, SpriteFrame, _decorator } from "cc";
import { BundleConfigs } from "../../../mainbundle/scripts/Configs/BundleConfigs";
import { EnumUILayer } from '../../../mainbundle/scripts/Configs/UIConfigs';
import { BaseUI } from "../../../scripts/framework/lib/router/BaseUI";
import { Tip } from "./Tip";

const { ccclass, property } = _decorator;
//todo:需要重写
@ccclass
export class TipUI extends BaseUI {

    protected static prefabUrl = `${BundleConfigs.CommonBundle}/prefabs/popwindow/TipPrefab`;
    protected static className = "TipUI";
    protected static layerZIndex = EnumUILayer.TipLayer;

    @property(Prefab)
    private tipPrefab: Prefab = null;
    private tipPool: Tip[] = [];
    private msgArr: any[] = [];
    private spaceTime: number = 0.2;
    private recordTime: number = 0;
    show(data?: any, onShowed?: Function): void {
        onShowed && onShowed();
    }

    hide(onHided: Function): void {
        onHided();
    }


    update(dt) {
        this.recordTime += dt;
        if (this.recordTime >= this.spaceTime) {
            this.recordTime = 0;
            let msg = this.msgArr.shift();
            if (msg)
                this.showOneTip(msg);
        }
    }

    showTip(message: string,iconPic?:SpriteFrame,count?:string) {
        this.msgArr.push({message:message,iconPic:iconPic,count:count});
    }

    showOneTip(msgData: any) {
        for (let i = 0; i < this.tipPool.length; ++i) {
            if (this.tipPool[i] != null && this.tipPool[i].isReady()) {
                this.tipPool[i].playTip(msgData);
                return;
            }
        }
        log("create tip");
        let TipNode = instantiate(this.tipPrefab);
        TipNode.parent = this.node
        let tip = TipNode.getComponent(Tip);
        this.tipPool.push(tip);
        tip.playTip(msgData);
    }
}
