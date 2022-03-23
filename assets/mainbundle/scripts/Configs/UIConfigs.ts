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
    /**
     * 引导
     */
    guiderUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Guider/GuiderUI`,
        layerZIndex: EnumUILayer.PopLayer,
    },
    /**
     * 首页
     */
    mainUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Main/MainUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 场景页
     */
    areaUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Main/AreaUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 任务页
     */
    taskUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Main/TaskUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 体力页
     */
    HeartUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Main/HeartUI`,
        layerZIndex: EnumUILayer.DialogLayer,
    },
    /**
     * 星星不足弹窗页
     */
    earnStarDialog: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Main/EarnStarDialog`,
        layerZIndex: EnumUILayer.UILayer,
    },

    /**
     * 购买道具弹框
     */
    propBuyDialog: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Main/PropBuy`,
        layerZIndex: EnumUILayer.DialogLayer,
    },
    /**
     * 商城页
     */
    ShopUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Shop/ShopUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
    * 设置页
    */
    SettingUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.HomeBundle}/prefabs/UI/Setting/SettingUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    ////////////////////////////////////////////////////////////////////////////////
    /**
      * 开始游戏页
      */
    startUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Game/StartUI`,
        layerZIndex: EnumUILayer.DialogLayer,
    },

    /**
     * 游戏过渡加载页
     */
    gamePrealoadUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Game/GamePreloadUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    /**
     * 消除游戏页
     */
    mapUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Map/MapViewUI`,
        layerZIndex: EnumUILayer.UILayer,
    },

    boardUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Map/BoardUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    cellUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Map/CellUI`,
        layerZIndex: EnumUILayer.UILayer,
    },
    debugLabelUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Map/DebugLabelUI`,
        layerZIndex: EnumUILayer.UILayer,
    },

    cubeUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Map/CubeUI`,
        layerZIndex: EnumUILayer.UILayer,
    },



    winUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Game/WinUI`,
        layerZIndex: EnumUILayer.DialogLayer,
    },
    loseUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Game/LoseUI`,
        layerZIndex: EnumUILayer.DialogLayer,
    },

    restartUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Game/RestartUI`,
        layerZIndex: EnumUILayer.DialogLayer,
    },
    leaveUI: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/UI/Game/LeaveUI`,
        layerZIndex: EnumUILayer.DialogLayer,
    },

    rock: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/Cube/Rock`,
        layerZIndex: EnumUILayer.UILayer,
    },
    rockFire: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/Ani/RockFire`,
        layerZIndex: EnumUILayer.UILayer,
    },
    unicorn: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/Ani/Unicorn`,
        layerZIndex: EnumUILayer.UILayer,
    },
    hammer: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/Ani/Hammar`,
        layerZIndex: EnumUILayer.UILayer,
    },
    plane: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/Ani/Plane`,
        layerZIndex: EnumUILayer.UILayer,
    },
    magicStick: <ViewConfig>{
        prefabPath: `${BundleConfigs.GameBundle}/prefabs/Ani/MagicStick`,
        layerZIndex: EnumUILayer.UILayer,
    },


};
