import { Button, Component, log, _decorator, Node } from "cc";
import { ConstValue } from "../../../../mainbundle/scripts/Configs/ConstValue";
import { ViewConfig } from "../../../../mainbundle/scripts/Configs/UIConfigs";
import { engine } from "../../engine";


/**
 * 面板组件
 *
 */
const { ccclass, property } = _decorator;
@ccclass
export class BaseUI extends Component {
    /**
     * 展示面板（此方法会被面板路由器所调用，请不要直接调用这个方法）
     */
    show(data?: any, onShowed?: Function): void {

    }

    /**
     * 隐藏面板（此方法会被面板路由器所调用，请不要直接调用这个方法）
     */
    hide(onHided?: Function): void {

    }

    protected static prefabUrl;
    protected static className = "BaseUI";
    protected static layerZIndex = 0;
    private _registerEventList: Map<string, any> = new Map<string, any>();
    /**
     * 基础BaseUI需要重写对应的bundle绝对路径地址
     * @returns 
     */
    public static getUrl(): string {
        // log(this.className);
        return this.prefabUrl;
    }

    public static getClassName(): string {
        return this.className;
    }

    public static getLayerZIndex(): number {
        return this.layerZIndex;
    }


    public doClose(viewConfig: ViewConfig, isRelease?: boolean) {
        engine.listenerManager.removeAll(this);
        engine.uiManager.closeUI(viewConfig, isRelease);
    }

    /**
     * 注册touch事件
     * @param node
     * @param callback
     * @param target
     * @param playAudio 是否播放音效，默认播放
     */
    onRegisterEvent(node: Node, callback, target = null, playAudio = true) {
        if (!node) {
            return;
        }
        let btnComp = node.getComponent(Button);
        if (btnComp && btnComp.transition == Button.Transition.SCALE) {
            btnComp.zoomScale = 1.1;
        }
        // node.on(Node.EventType.TOUCH_END,(e)=>{
        node.on("click", (e) => {
            callback.bind(target)(e);
            if (playAudio)
                engine.audioManager.playSound(ConstValue.GAME_SOUND.Common_Click);
        }, target);

        this._registerEventList.set(node.name, { callback: callback, target: target, playAudio: playAudio });
    }

    unRegisterEvent(node: Node, callback, target = null) {
        // node.off(Node.EventType.TOUCH_END, callback, target);
        node.off("click", callback, target);
        delete this._registerEventList[node.name];
    }


    onAddEvent(type: string, caller: any, listener: Function, ...argArray: any[]) {
        engine.listenerManager.add(type, caller, listener, ...argArray);
    }

    onRemoveEvent(type: string, caller: any, listener: Function, onceOnly?: boolean) {
        engine.listenerManager.remove(type, caller, listener, onceOnly);
    }


    onDestroy(): void {
        // this.unscheduleAllCallbacks();
        engine.listenerManager.removeAll(this);
    }

}

export interface UIClass<T extends BaseUI> {
    new(): T;
    getUrl(): string;
    getClassName(): string;
    getLayerZIndex(): number;
}
