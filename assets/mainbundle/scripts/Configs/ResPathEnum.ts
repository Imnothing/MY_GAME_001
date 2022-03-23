import { BundleConfigs } from "./BundleConfigs";

export const ResPathEnum = {

    // CellAtlas = "atlas/cells",
    // CubeAni = "atlas/cube_ani",
    // Frame = "atlas/frame",
    // Shadow = "atlas/shadow",
    // Icons = "atlas/icon",

    // AreaShow = "prefabs/Ani/AreasShow",
    // GameGold = "prefabs/Ani/GameGold",
    CellAtlas: <ResConfig>{
        bundle: BundleConfigs.GameBundle,
        resPath: "atlas/cells",
    },
    CubeAni: <ResConfig>{
        bundle: BundleConfigs.GameBundle,
        resPath: "atlas/cube_ani",
    },
    Frame: <ResConfig>{
        bundle: BundleConfigs.GameBundle,
        resPath: "atlas/Frame",
    },
    Shadow: <ResConfig>{
        bundle: BundleConfigs.GameBundle,
        resPath: "atlas/shadow",
    },
    Tips: <ResConfig>{
        bundle: BundleConfigs.GameBundle,
        resPath: "prefabs/UI/Map/Tips",
    },
    Icons: <ResConfig>{
        bundle: BundleConfigs.HomeBundle,
        resPath: "atlas/icon",
    },
    AreaShow: <ResConfig>{
        bundle: BundleConfigs.HomeBundle,
        resPath: "prefabs/Ani/AreasShow",
    },
    GameGold: <ResConfig>{
        bundle: BundleConfigs.HomeBundle,
        resPath: "prefabs/Ani/GameGold",
    },

}

export interface ResConfig {
    /**
     *  对应的 bundleName
     *
     */
    bundle: string;

    /**
     * 资源路径
     */
    resPath: string;
}