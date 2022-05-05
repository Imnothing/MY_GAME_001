import { BundleConfigs } from "./BundleConfigs";

export const ResPathEnum = {
    Attribute: <ResConfig>{
        bundle: BundleConfigs.HomeBundle,
        resPath: "atlas/attribute"
    },

    Abnormal: <ResConfig>{
        bundle: BundleConfigs.HomeBundle,
        resPath: "atlas/abnormal"
    },

    PropIcon: <ResConfig>{
        bundle: BundleConfigs.HomeBundle,
        resPath: "atlas/prop"
    }

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