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
     * 游戏加载页
     */
    loadingUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.LoadingBundle}/prefabs/LoadingView`,
        layerZIndex: EnumUILayer.UILayer,
    },
    ////////////////////////////////////////////////////////////////////////////////////
    /**
     * 战斗加载页
     */
    gamePreLoadUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Battle/GamePreLoadUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 精灵UI
     */
    battleUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Battle/BattleUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 精灵UI
     */
    petUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Battle/PetUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    ////////////////////////////////////////////////////////////////////////////////
    /**
     * 游戏主页面
     */
    mainUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/main/MainUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 商店页
     */
    shopUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/shop/ShopUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 精灵详情页
     */
    petDetail: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/pet/PetDetail`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 精灵背包页
     */
    petBag: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/pet/PetBag`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 精灵背包页
     */
    sptUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/spt/SptUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 精灵开始页
     */
    startUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/spt/StartUI`,
        layerZIndex: EnumUILayer.UILayer,
    },

};
