import { engine } from "../../../scripts/framework/engine";

export class ConfigReader {

    // public static readWordText(id: string | number): string {
    //     let setInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
    //     if (setInfo.switchNotific) {
    //         return engine.ccTable.get("WordText")[id].CN;
    //     } else
    //         return engine.ccTable.get("WordText")[id].EN;
    // }

    public static readCommonParameter(id?: number | string) {
        if (!id) return engine.ccTable.get("CommonParameter");
        return engine.ccTable.get("CommonParameter")[id];
    }

    public static readMusicConfig(id?: number | string) {
        if (!id) return engine.ccTable.get("MusicConfig");
        return engine.ccTable.get("MusicConfig")[id];
    }

    public static readEffectConfig(id?: number | string) {
        if (!id) return engine.ccTable.get("EffectConfig");
        return engine.ccTable.get("EffectConfig")[id];
    }

    public static readLevelConfig(id?: number | string) {
        if (!id) return engine.ccTable.get("LevelConfig");
        return engine.ccTable.get("LevelConfig")[id];
    }

    public static readAbnormalConfig(id?: number | string) {
        if (!id) return engine.ccTable.get("AbnormalConfig");
        return engine.ccTable.get("AbnormalConfig")[id];
    }

    public static readPetConfig(id?: number | string) {
        if (!id) return engine.ccTable.get("PetConfig");
        return engine.ccTable.get("PetConfig")[id];
    }

    public static readShopConfig(id?: number | string) {
        if (!id) return engine.ccTable.get("ShopConfig");
        return engine.ccTable.get("ShopConfig")[id];
    }

    public static readItemConfig(id?: number | string) {
        if (!id) return engine.ccTable.get("ItemConfig");
        return engine.ccTable.get("ItemConfig")[id];
    }

}

class ConfigDataProcessor {

    // private static config: Object;

    // public static process(config: any) {
    //     if (typeof config != "object") return config;
    //     this.config = config;
    //     return this.config;
    // }

    // private static processMultiLanguageText() {
    //     Object.keys(this.config)
    //         .filter(key => key.indexOf(this.suffix) > -1)
    //         .forEach(key => {
    //             let textID = this.config[key];
    //             let relatedKey = key.replace(this.suffix, '');
    //             // this.config[relatedKey] = Utils.getWordText(textID);
    //         });
    // }

}

export enum Language {
    CN = "CN",
    EN = "EN"
}