import { Prefab, Node } from "cc";
import { ViewConfig } from "../../../../mainbundle/scripts/Configs/UIConfigs";
import { BaseUI, UIClass } from "./BaseUI";
import { UIStateEnum } from "./UIStateEnum";

/**
 * UI管理器接口
 *
 */
export interface UIManagerInterface {
    init(rootNode: Node, enableDebugLog: boolean): void;

    /**
     * 预加载UI资源（只下载到本地，不加载解析到内存）
     * 通过相对路径预加载分包中的资源。路径是相对分包文件夹路径的相对路径。
     * 调用完后，你仍然需要通过 Bundle.load 来完成加载。 就算预加载还没完成，你也可以直接调用 Bundle.load。
     */
    preload(viewConfig: ViewConfig);

    /**
     * 同步加载UI资源（加载到内存）
     */
    loadAsync(viewConfig: ViewConfig): Promise<void>;

    /**
     * 加载UI资源（加载到内存）
     */
    load(prefabPath: string, onCompleted: (error?: Error) => void);

    /**
     * （Promise）同步方式打开UI,自带预加载
     *
     * @param option 打开UI的参数
     */
    openUIAsync(viewConfig: ViewConfig, data?: any, parent?: Node);

    /**
     * 打开UI,需要提前预加载UI
     *
     * @param option 展示UI的参数
     */
    openUI(viewConfig: ViewConfig, data?: any, onShowed?: Function, parent?: Node);

    /**
     * 获取指定UI
     * @param uiClass 
     */
    getUI(viewConfig: ViewConfig): BaseUI;

    /**
     * 获取指定UI
     * @param uiClass 
     */
    getPrefab(viewConfig: ViewConfig): Prefab;

    /**
     * （Promise）隐藏UI
     *
     * @param option 隐藏UI的参数
     */
    hideAsync(viewConfig: ViewConfig, data?: any);

    /**
     * 隐藏UI
     *
     * @param option 隐藏UI的参数
     */
    hide(viewConfig: ViewConfig, data?: any, onHided?: Function);

    /**
     * 关闭UI
     * @param uiClass 
     * @param isRelease 释放资源
     */
    closeUI(viewConfig: ViewConfig, isRelease?: boolean);
    /**
    * 销毁UI
    *
    * @param option 销毁参数
    */
    destroy(viewConfig: ViewConfig);

    /**
     * 获取UI当前状态
     *
     * @returns 如果还没有创建或者已经销毁了，那么返回null，否则返回对应的状态
     */
    getPanelState(viewConfig: ViewConfig): UIStateEnum;
}
