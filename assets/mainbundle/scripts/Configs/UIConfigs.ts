import { BundleConfigs } from "./BundleConfigs";

/**
 * 面板图层层级（层级大的显示在最前面）
 */
export enum EnumUILayer {
    /**
     * 普通界面
     */
    UILayer = 200,

    /**
     * 弹窗层级
     */
    DialogLayer = 300,

    /**
     * 弹窗层级
     */
    PopLayer = 400,

    /**
     * loading层
     */
    LoadingLayer = 600,

    /**
     * 提示层 
     */
    TipLayer = 700,
}

export interface ViewConfig {
    /**
     *  Prefab 路径，需要写上对应的 bundleName
     *
     */
    prefabPath: string;

    /**
     * 面板所在的层级节点的ZIndex
     */
    layerZIndex: number;
}


/**
 * 游戏面板配置
 */
export const UIConfigs = {

    /**
     * 游戏启动页
     */
    tipUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.CommonBundle}/prefabs/popwindow/TipPrefab`,
        layerZIndex: EnumUILayer.TipLayer,
    },
    /**
     * 游戏启动页
     */
    loadingUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.LoadingBundle}/prefabs/LoadingView`,
        layerZIndex: EnumUILayer.UILayer,
    },
    ////////////////////////////////////////////////////////////////////////////////////
    petUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Battle/PetUI`,
        layerZIndex: EnumUILayer.UILayer,
    }

    ////////////////////////////////////////////////////////////////////////////////


};
