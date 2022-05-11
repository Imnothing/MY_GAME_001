/**
 * @Description 游戏加载页
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, ProgressBar, SpriteAtlas, Prefab } from 'cc';
import { BundleConfigs } from '../../mainbundle/scripts/Configs/BundleConfigs';
import { ConstValue } from '../../mainbundle/scripts/Configs/ConstValue';
import { ResPathEnum } from '../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer, UIConfigs } from '../../mainbundle/scripts/Configs/UIConfigs';
import { ListenerType } from '../../mainbundle/scripts/Data/ListenerType';
import { engine } from '../../scripts/framework/engine';
import { BaseUI } from '../../scripts/framework/lib/router/BaseUI';
import auto_LoadingView from './autoUI/auto_LoadingView';

const { ccclass, property } = _decorator;

@ccclass
export default class LoadingView extends BaseUI {
    ui: auto_LoadingView = null;

    protected static prefabUrl = `${BundleConfigs.LoadingBundle}/prefabs/LoadingView`;
    protected static className = "LoadingView";
    protected static layerZIndex = EnumUILayer.UILayer;
    @property({
        type: ProgressBar,
        tooltip: "加载进度",
    })
    loadingProgressBar: ProgressBar = null;

    @property({
        type: Label,
        tooltip: "加载文本",
    })
    loadingLabel: Label = null;

    onLoad() {
        this.initEvent();
    }

    initEvent() {
        this.onAddEvent(ListenerType.GameStart, this, this._initGame);
    }


    show(data?: any, onShowed?: Function): void {
        onShowed && onShowed();
        this._initGame();
    }

    hide(onHided: Function): void {
        onHided && onHided();
    }

    private async _initGame() {
        // 提前加载通用弹窗面板
        this._onLoadProgressChanged(0.2, "加载游戏资源...");
        await engine.uiManager.loadAsync(UIConfigs.tipUI);

        this._onLoadProgressChanged(0.3, "加载游戏资源...");
        await engine.uiManager.loadAsync(UIConfigs.mainUI);

        // 加载游戏设置面板
        this._onLoadProgressChanged(0.4, "加载游戏资源...");
        await engine.uiManager.loadAsync(UIConfigs.gamePreLoadUI);

        // // 加载游戏主面板
        this._onLoadProgressChanged(0.5, "加载游戏资源...");
        // await engine.uiManager.loadAsync(TestBombUI);
        //预加载 资源
        await engine.resLoader.loadBundleResSync(ResPathEnum.Abnormal.bundle, ResPathEnum.Abnormal.resPath, SpriteAtlas);
        await engine.resLoader.loadBundleResSync(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, SpriteAtlas);
        await engine.resLoader.loadBundleResSync(ResPathEnum.PropIcon.bundle, ResPathEnum.PropIcon.resPath, SpriteAtlas);
        await engine.resLoader.loadBundleResSync(ResPathEnum.PetS1.bundle, ResPathEnum.PetS1.resPath, SpriteAtlas);
        await engine.resLoader.loadBundleResSync(ResPathEnum.PetAvatarS1.bundle, ResPathEnum.PetAvatarS1.resPath, SpriteAtlas);
        // 打开主面板
        this._onLoadProgressChanged(1.0);
        // if (ConstValue.DEBUG_MAP_LOCAL) {
        //     engine.uiManager.openUI(UIConfigs.gamePreloadUI, null, () => {
        //         this.doClose(UIConfigs.loadingUI, true);
        //     });
        // } else {
        engine.uiManager.openUI(UIConfigs.mainUI, null, () => {
            this.doClose(UIConfigs.loadingUI, true);
        });
        // }

    }


    /**
     * 加载进度更新
     *
     * @param pb 加载进度 [0, 1]
     * @param msg 加载描述信息
     */
    private _onLoadProgressChanged(pb: number, msg: string = null) {
        this.loadingProgressBar.progress = pb;
        if (msg) {
            this.loadingLabel.string = msg;
        }
    }
}
