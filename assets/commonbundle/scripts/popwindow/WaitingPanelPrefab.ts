import { _decorator, Node, Component, UITransform, UIOpacity, Tween, tween } from "cc";
import { BundleConfigs } from "../../../mainbundle/scripts/Configs/BundleConfigs";
import { EnumUILayer } from "../../../mainbundle/scripts/Configs/UIConfigs";
import { BaseUI } from "../../../scripts/framework/lib/router/BaseUI";

const { ccclass, property } = _decorator;

export interface WaitingPanelShowArgs {
    /**
     * 展示时是否播放展示动画（不传则默认播放）
     */
    playShowAnim?: boolean;

    /**
     * 点击加载页面时回调
     */
    onCancelLoadingBtnClick?: Function;
}

/**
 * 游戏通用 Waiting 面板
 *
 */
@ccclass
export default class WaitingPanelPrefab extends BaseUI {

    protected static prefabUrl = `${BundleConfigs.CommonBundle}/prefabs/popwindow/WaitingPanelPrefab`;
    protected static className = "WaitingPanelPrefab";
    protected static layerZIndex = EnumUILayer.TipLayer;

    @property(Node)
    bgNode: Node = null;

    @property(Node)
    loadingSpriteNode: Node = null;

    private _showArgs: WaitingPanelShowArgs = null;

    onLoad() {
        // this.bgNode.getComponent(UIOpacity).opacity = 0;
        // this.loadingSpriteNode.getComponent(UIOpacity).opacity = 0;
    }

    show(data?: any, onShowed?: Function): void {
        this._showArgs = data;
        if (this._showArgs == null || this._showArgs.playShowAnim == null || this._showArgs.playShowAnim) {
            // 默认播放loading动画
            this._playPanelShowAnim(() => {
                onShowed && onShowed();
            });
        } else {
            onShowed && onShowed();
        }
    }

    hide(onHided: Function): void {
        this._playPanelHideAnim(() => {
            this._showArgs = null;
            onHided();
        });
    }

    private _playPanelShowAnim(onAnimCompleted: Function) {
        Tween.stopAllByTarget(this.bgNode);
        tween(this.bgNode.getComponent(UIOpacity))
            .set({ opacity: 0 })
            .to(0.24, { opacity: 220 }, { easing: "sineOut" })
            .call(() => {
                onAnimCompleted();
            })
            .start();
        // Tween.stopAllByTarget(this.loadingSpriteNode);
        // tween(this.loadingSpriteNode.getComponent(UIOpacity)).set({ opacity: 0, scale: 2 }).to(0.24, { opacity: 255, scale: 1 }, { easing: "sineOut" }).start();
        // tween<Node>(this.loadingSpriteNode)
        //     .repeatForever(tween<Node>().by(0.7, { angle: -360 }))
        //     .start();
    }

    private _playPanelHideAnim(onAnimCompleted: Function) {
        // Tween.stopAllByTarget(this.bgNode);
        // tween<Node>(this.bgNode)
        //     .to(0.24, { opacity: 0 }, { easing: "sineOut" })
        //     .call(() => {
        //         onAnimCompleted();
        //     })
        //     .start();
        // Tween.stopAllByTarget(this.loadingSpriteNode);
        // tween<Node>(this.loadingSpriteNode).to(0.24, { scale: 0, opacity: 0 }, { easing: "sineOut" }).start();
    }

    onCancelLoadingBtnClick() {
        this._showArgs && this._showArgs.onCancelLoadingBtnClick && this._showArgs.onCancelLoadingBtnClick();
    }
}
