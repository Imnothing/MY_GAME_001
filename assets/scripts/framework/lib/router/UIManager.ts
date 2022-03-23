import { engine } from "../../engine";
import { UIStateEnum } from "./UIStateEnum";
import { _decorator, Component, Node, AssetManager, assetManager, instantiate, Prefab, v2, Widget, UITransform, v3 } from 'cc';
import { BaseUI, UIClass } from "./BaseUI";
import { UIManagerInterface } from "./UIManagerInterface";
import { LOG_TAG } from "../logger/LoggerInterface";
import { ViewConfig } from "../../../../mainbundle/scripts/Configs/UIConfigs";


/**
 * UI管理器
 * 使用方式：
 * 1、load|loadAsync加载到内存
 * 2、open|openUIAsync打开UI
 */
export default class UIManager implements UIManagerInterface {

    /**
     * 是否允许输出调试Log
     */
    private _enabledLog: boolean = true;

    /**
     * 所有UI图层的根节点
     */
    private _rootNode: Node = null;

    /**
     * 记录图层节点的Map
     *
     * key: 图层节点zIndex
     * value: 图层节点
     */
    private _layerNodeMap: Map<number, Node> = new Map();

    /**
     * 记录UI缓存的Map
     *
     * * key: UIPrefab路径
     * * value: UI缓存（节点、状态）
     */
    private _panelCacheMap: Map<string, PanelCache> = new Map();

    /**
     * 初始化UI路由器
     *
     * @param rootNode 图层根节点（此节点建议最好是扩充全屏的）
     * @param enableDebugLog 是否允许打印UI路由器操作日志
     */
    init(rootNode: Node, enableDebugLog: boolean): void {
        this._enabledLog = enableDebugLog;
        this._rootNode = rootNode;
    }

    /**
     * 预加载UI资源（只下载到本地，不加载解析到内存）
     * 通过相对路径预加载分包中的资源。路径是相对分包文件夹路径的相对路径。
     * 调用完后，你仍然需要通过 Bundle.load 来完成加载。 就算预加载还没完成，你也可以直接调用 Bundle.load。
     */
    preload(viewConfig: ViewConfig) {
        let preloadBundlePrefab = (bundle: AssetManager.Bundle) => {
            let prefabPath = viewConfig.prefabPath.substring(viewConfig.prefabPath.indexOf("/") + 1);
            bundle.preload(prefabPath);
        };
        let bundleName = viewConfig.prefabPath.substring(0, viewConfig.prefabPath.indexOf("/"));
        let bundle: AssetManager.Bundle = assetManager.getBundle(bundleName);
        if (bundle == null) {
            assetManager.loadBundle(bundleName, (error: Error, bundle: AssetManager.Bundle) => {
                preloadBundlePrefab(bundle);
            });
        } else {
            preloadBundlePrefab(bundle);
        }
    }

    /**
     * 同步加载UI资源（加载到内存）
     */
    loadAsync(viewConfig: ViewConfig): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.load(viewConfig.prefabPath, (error: Error) => {
                error ? reject(error) : resolve();
            });
        });
    }

    /**
     * 加载UI资源（加载到内存）
     */
    load(prefabPath: string, onCompleted: (error?: Error) => void) {
        let panelCache = this._panelCacheMap.get(prefabPath);
        if (panelCache) {
            onCompleted(null);
            return;
        }
        // 初始化UI状态并记录下来
        panelCache = {
            node: null,
            prefab: null,
            state: UIStateEnum.Loading,
        };
        this._panelCacheMap.set(prefabPath, panelCache);
        // 开始加载UI
        let st = Math.floor(new Date().getTime());
        panelCache.state = UIStateEnum.Loading;
        this._loadBundlePrefab(prefabPath, null, (error: Error, prefab: Prefab) => {
            // 加载完毕后，需要在此获取UI状态
            // 因为加载是一个过程，这个过程中，UI可能被销毁了等等之类，因此加载完毕后，重新获取UI状态
            panelCache = this._panelCacheMap.get(prefabPath);
            if (error) {
                // 处理UI实际加载失败的逻辑
                this._enabledLog && engine.logger.error(LOG_TAG.GAME, prefabPath, "尝试加载UI", "加载UI失败", error);
                if (!panelCache) {
                    this._enabledLog && engine.logger.warn(LOG_TAG.GAME, prefabPath, "尝试加载UI", "当前已经找不到UI记录，可能UI加载过程中触发销毁，导致加载结束后找不到对应UI记录");
                } else {
                    if (
                        panelCache.state === UIStateEnum.LoadFailure ||
                        panelCache.state === UIStateEnum.LoadSuccess ||
                        panelCache.state === UIStateEnum.Showing ||
                        panelCache.state === UIStateEnum.Showed ||
                        panelCache.state === UIStateEnum.Hiding ||
                        panelCache.state === UIStateEnum.Hided
                    ) {
                        this._enabledLog && engine.logger.error(LOG_TAG.GAME, prefabPath, "尝试加载UI", "UI状态异常，原则上不会出现这个状态", panelCache.state);
                    } else {
                        // 更新UI状态
                        panelCache.node = null;
                        panelCache.prefab = null;
                        panelCache.state = UIStateEnum.LoadFailure;
                    }
                }
            } else {
                // 处理UI实际加载成功的逻辑
                this._enabledLog && engine.logger.log(LOG_TAG.GAME, `加载UI耗时:${(new Date().getTime() - st)}`, prefabPath);

                if (!panelCache) {
                    this._enabledLog && engine.logger.warn(LOG_TAG.GAME, prefabPath, "尝试加载UI", "当前已经找不到UI记录，可能UI加载过程中触发销毁，导致加载结束后找不到对应UI记录");
                    // 销毁 prefab
                    prefab.decRef();
                } else {
                    if (
                        panelCache.state === UIStateEnum.LoadFailure ||
                        panelCache.state === UIStateEnum.LoadSuccess ||
                        panelCache.state === UIStateEnum.Showing ||
                        panelCache.state === UIStateEnum.Showed ||
                        panelCache.state === UIStateEnum.Hiding ||
                        panelCache.state === UIStateEnum.Hided
                    ) {
                        this._enabledLog && engine.logger.error(LOG_TAG.GAME, prefabPath, "尝试加载UI", "UI状态异常，原则上不会出现这个状态", panelCache.state);
                    } else {
                        // 更新UI状态
                        panelCache.node = null;
                        panelCache.prefab = prefab;
                        panelCache.state = UIStateEnum.LoadSuccess;

                        // Prefab 引用 + 1
                        panelCache.prefab.addRef();
                    }
                }
            }
            onCompleted(error);
        });
    }

    private async _loadBundlePrefab(
        prefabPath: string,
        onProgress: (finish: number, total: number, item: AssetManager.RequestItem) => void,
        onCompleted: (error: Error, prefab: Prefab) => void
    ) {
        // let loadBundlePrefab = (bundle: AssetManager.Bundle) => {
        //     let _prefabPath = prefabPath.substring(prefabPath.indexOf("/") + 1);
        //     bundle.load(_prefabPath, Prefab, onProgress, (error: Error, prefab: Prefab) => {
        //         onCompleted(error, prefab);
        //     });
        // };
        let bundleName = prefabPath.substring(0, prefabPath.indexOf("/"));
        // let bundle: AssetManager.Bundle = assetManager.getBundle(bundleName);
        // if (bundle == null) {
        //     bundle = await engine.resLoader.loadBundle(bundleName);
        //     // bundle = assetManager.getBundle(bundleName);
        //     loadBundlePrefab(bundle);
        //     // assetManager.loadBundle(bundleName, (error: Error, bundle: AssetManager.Bundle) => {
        //     //     loadBundlePrefab(bundle);
        //     // });
        // } else {
        //     loadBundlePrefab(bundle);
        // }


        let _prefabPath = prefabPath.substring(prefabPath.indexOf("/") + 1);
        let prefab = await engine.resLoader.loadBundleResSync(bundleName, _prefabPath, Prefab);
        onCompleted(null, <Prefab>prefab);
    }


    /**
     * （Promise）同步方式打开UI,自带预加载
     *
     * @param option 打开UI的参数
     */
    openUIAsync(viewConfig: ViewConfig, data?: any, parent?: Node) {
        return new Promise<void>(async (resolve, reject) => {
            await this.loadAsync(viewConfig);
            this.openUI(viewConfig, data, (error) => {
                error ? reject(error) : resolve();
            }, parent);
        });
    }

    /**
     * 打开UI,需要提前预加载UI
     *
     * @param option 展示UI的参数
     */
    openUI(viewConfig: ViewConfig, data?: any, onShowed?: Function, parent?: Node) {
        // let panelCache = this._panelCacheMap.get(prefabPath);
        let panelCache = this._panelCacheMap.get(viewConfig.prefabPath);
        if (!panelCache) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试展示UI", "UI还没有加载，不能展示");
            onShowed && onShowed(new Error("open error"));
            return;
        }
        if (panelCache.state === UIStateEnum.Loading) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试展示UI", "UI在加载中，不能展示");
            // onShowed && onShowed(new Error("open error"));
            return;
        }
        if (panelCache.state === UIStateEnum.LoadFailure) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试展示UI", "UI加载失败，不能展示");
            onShowed && onShowed(new Error("open error"));
            return;
        }
        if (panelCache.state === UIStateEnum.LoadSuccess) {
            this._showPanel(viewConfig, panelCache, data, onShowed, parent);
            return;
        }
        if (panelCache.state === UIStateEnum.Showing) {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试展示UI", "UI正在展示中");
            this._showPanel(viewConfig, panelCache, data, onShowed, parent);
            return;
        }
        if (panelCache.state === UIStateEnum.Showed) {
            this._showPanel(viewConfig, panelCache, data, onShowed, parent);
            return;
        }
        if (panelCache.state === UIStateEnum.Hiding) {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试展示UI", "UI在隐藏中，将停止隐藏动画，并立即开始展示");
            this._showPanel(viewConfig, panelCache, data, onShowed, parent);
            return;
        }
        if (panelCache.state === UIStateEnum.Hided) {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试展示UI", "UI已隐藏，将重新展示");
            this._showPanel(viewConfig, panelCache, data, onShowed, parent);
            return;
        }
    }

    private _showPanel(viewConfig: ViewConfig, panelCache: PanelCache, data?: any, onShowed?: Function, parent?: Node) {
        if (panelCache.node == null) {
            // 获取UI层级节点
            if (!parent) {
                let panelLayerNode = this._layerNodeMap.get(viewConfig.layerZIndex) as Node;
                if (panelLayerNode == null) {
                    panelLayerNode = new Node(`zIndex_${viewConfig.layerZIndex}`);
                    panelLayerNode.setSiblingIndex(viewConfig.layerZIndex);
                    // 为图层添加 Widget 组件，扩充至全屏尺寸
                    let widget: Widget = panelLayerNode.addComponent(Widget);
                    widget.top = 0;
                    widget.bottom = 0;
                    widget.left = 0;
                    widget.right = 0;
                    widget.isAlignTop = true;
                    widget.isAlignBottom = true;
                    widget.isAlignLeft = true;
                    widget.isAlignRight = true;
                    widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
                    // 将图层节点添加到根节点中
                    this._rootNode.addChild(panelLayerNode);
                    // 缓存层级节点
                    this._layerNodeMap.set(viewConfig.layerZIndex, panelLayerNode);
                }
                // 将UI加入到层级节点中
                let panelNode = instantiate(panelCache.prefab);
                panelNode.setParent(panelLayerNode);
                panelCache.node = panelNode;
            } else {
                // 将UI加入到层级节点中
                let panelNode = instantiate(panelCache.prefab);
                panelNode.setParent(parent);
                panelCache.node = panelNode;
            }
        }
        panelCache.state = UIStateEnum.Showing;
        panelCache.node.active = true;
        panelCache.node.getComponent(BaseUI).show(
            data,
            () => {
                this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试展示UI", "UI已经展示完成");
                panelCache.state = UIStateEnum.Showed;
                onShowed && onShowed();
            },
        );
    }

    /**
     * 获取指定UI
     * @param uiClass 
     */
    public getUI(viewConfig: ViewConfig): BaseUI {
        let panelCache = this._panelCacheMap.get(viewConfig.prefabPath);
        if (panelCache && panelCache.node) {
            return panelCache.node.getComponent(BaseUI);
        }
        return null;
    }

    /**
     * 获取指定UI
     * @param uiClass 
     */
    public getPrefab(viewConfig: ViewConfig): Prefab {
        let panelCache = this._panelCacheMap.get(viewConfig.prefabPath);
        if (panelCache && panelCache.prefab) {
            return panelCache.prefab;
        }
        return null;
    }

    /**
     * （Promise）隐藏UI
     *
     * @param option 隐藏UI的参数
     */
    hideAsync(viewConfig: ViewConfig, data?: any) {
        return new Promise<void>((resolve, reject) => {
            this.hide(viewConfig, data, (error) => {
                error ? reject(error) : resolve();
            });
        });
    }

    /**
     * 隐藏UI
     *
     * @param option 隐藏UI的参数
     */
    hide(viewConfig: ViewConfig, data?: any, onHided?: Function) {
        let panelCache = this._panelCacheMap.get(viewConfig.prefabPath);
        if (!panelCache) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI还没有加载，不能隐藏");
            onHided && onHided(new Error("hide error"));
            return;
        }
        if (panelCache.state === UIStateEnum.Loading) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI在加载中，不能隐藏");
            onHided && onHided(new Error("hide error"));
            return;
        }
        if (panelCache.state === UIStateEnum.LoadFailure) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI加载失败，不能隐藏");
            onHided && onHided(new Error("hide error"));
            return;
        }
        if (panelCache.state === UIStateEnum.LoadSuccess) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI已加载成功，但未展示，不能隐藏");
            onHided && onHided(new Error("hide error"));
            return;
        }
        if (panelCache.state === UIStateEnum.Showing) {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI在展示中（可能正在执行展示动画），将停止展示并立即隐藏");
            this._hidePanel(viewConfig, panelCache, data, onHided);
            return;
        }
        if (panelCache.state === UIStateEnum.Showed) {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI已展示，将立即隐藏");
            this._hidePanel(viewConfig, panelCache, data, onHided);
            return;
        }
        if (panelCache.state === UIStateEnum.Hiding) {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI正在隐藏中");
            this._hidePanel(viewConfig, panelCache, data, onHided);
            return;
        }
        if (panelCache.state === UIStateEnum.Hided) {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI已隐藏");
            this._hidePanel(viewConfig, panelCache, data, onHided);
            return;
        }
    }

    private _hidePanel(viewConfig: ViewConfig, panelCache: PanelCache, data?: any, onHided?: Function) {
        panelCache.state = UIStateEnum.Hiding;
        panelCache.node.getComponent(BaseUI).hide(() => {
            this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试隐藏UI", "UI隐藏成功");
            panelCache.state = UIStateEnum.Hided;
            panelCache.node.active = false;
            onHided && onHided();
        });
    }

    /**
     * 关闭UI
     * @param uiClass 
     * @param isRelease 释放资源
     */
    public closeUI(viewConfig: ViewConfig, isRelease?: boolean) {
        if (isRelease) {
            this.destroy(viewConfig);
        } else {
            //单单销毁节点，内存还存在资源
            let panel = this._panelCacheMap.get(viewConfig.prefabPath);
            if (panel.node) {
                panel.node.destroy();
                panel.node = null;
            } else {
                engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "重复销毁");
            }
        }

    }

    /**
    * 销毁UI
    *
    * @param option 销毁参数
    */
    destroy(viewConfig: ViewConfig) {
        let panelCache = this._panelCacheMap.get(viewConfig.prefabPath);
        if (!panelCache) {
            this._enabledLog && engine.logger.error(LOG_TAG.GAME, viewConfig.prefabPath, "尝试销毁UI", "当前UI还不存在");
            return;
        }

        if (panelCache.node) {
            panelCache.node.destroy();
            panelCache.node = null;
        }
        if (panelCache.prefab) {
            panelCache.prefab.decRef();
            panelCache.prefab = null;
        }
        this._panelCacheMap.delete(viewConfig.prefabPath);
        let bundleName = viewConfig.prefabPath.substring(0, viewConfig.prefabPath.indexOf("/"));

        let _prefabPath = viewConfig.prefabPath.substring(viewConfig.prefabPath.indexOf("/") + 1);
        engine.resLoader.release(_prefabPath, bundleName);
        this._enabledLog && engine.logger.log(LOG_TAG.GAME, viewConfig.prefabPath, "尝试销毁UI", "UI销毁成功");
    }

    /**
     * 获取UI当前状态
     *
     * @returns 如果还没有创建或者已经销毁了，那么返回null，否则返回对应的状态
     */
    getPanelState(viewConfig: ViewConfig): UIStateEnum {
        let panel = this._panelCacheMap.get(viewConfig.prefabPath);
        if (!panel) {
            return null;
        }
        return panel.state;
    }
}

interface PanelCache {
    /**
     * UI节点（在UI状态为 Loading 和 LoadingFailure ）的时候，节点是不存在的
     */
    node: Node;

    /**
     * UI Prefab Asset
     */
    prefab: Prefab;

    /**
     * UI状态
     */
    state: UIStateEnum;
}



