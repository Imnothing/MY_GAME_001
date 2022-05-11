import { BundleConfigs } from "./BundleConfigs";

export const ResPathEnum = {
    Attribute: <ResConfig>{
        bundle: BundleConfigs.CommonBundle,
        resPath: "atlas/attribute"
    },

    Abnormal: <ResConfig>{
        bundle: BundleConfigs.CommonBundle,
        resPath: "atlas/abnormal"
    },

    PropIcon: <ResConfig>{
        bundle: BundleConfigs.CommonBundle,
        resPath: "atlas/prop"
    },

    PetS1: <ResConfig>{
        bundle: BundleConfigs.CommonBundle,
        resPath: "pets/Pet/pet_S1"
    },

    PetAvatarS1: <ResConfig>{
        bundle: BundleConfigs.CommonBundle,
        resPath: "pets/PetAvatar/petAvatars_S1"
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