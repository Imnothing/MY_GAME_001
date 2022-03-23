import { AreaConfig } from "../Datatable/AreaConfig";
import { ChipConfig } from "../Datatable/ChipConfig";
import { CommonParameter } from "../Datatable/CommonParameter";
import { EffectConfig } from "../Datatable/EffectConfig";
import { ItemConfig } from "../Datatable/ItemConfig";
import { MusicConfig } from "../Datatable/MusicConfig";
import { PicConfig } from "../Datatable/PicConfig";
import { RechargeConfig } from "../Datatable/RechargeConfig";
import { ShopConfig } from "../Datatable/ShopConfig";
import { TaskConfig } from "../Datatable/TaskConfig";
import { engine } from "../../../scripts/framework/engine";
import { GameDataManager } from "../Manager/GameDataManager";
import { SettingInfo } from "./Model/SettingInfo";
import { LevelConfig } from "../Datatable/LevelConfig";

export class ConfigReader {

    public static readWordText(id: string | number): string {
        let setInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        if (setInfo.switchNotific) {
            return engine.ccTable.get("WordText")[id].CN;
        } else
            return engine.ccTable.get("WordText")[id].EN;
    }

    public static readCommonParameter(id?: number | string): CommonParameter {
        if (!id) return engine.ccTable.get("CommonParameter");
        return engine.ccTable.get("CommonParameter")[id];
    }

    public static readMusicConfig(id?: number | string): MusicConfig {
        if (!id) return engine.ccTable.get("MusicConfig");
        return engine.ccTable.get("MusicConfig")[id];
    }

    public static readEffectConfig(id?: number | string): EffectConfig {
        if (!id) return engine.ccTable.get("EffectConfig");
        return engine.ccTable.get("EffectConfig")[id];
    }

    public static readLevelConfig(id?: number | string): LevelConfig {
        if (!id) return engine.ccTable.get("LevelConfig");
        return engine.ccTable.get("LevelConfig")[id];
    }

    public static readItemConfig(id?: number | string): ItemConfig {
        if (!id) return engine.ccTable.get("ItemConfig");
        return engine.ccTable.get("ItemConfig")[id];
    }

    public static readTaskConfig(id?: number | string): TaskConfig {
        if (!id) return engine.ccTable.get("TaskConfig");
        return engine.ccTable.get("TaskConfig")[id];
    }

    public static readAreaConfig(id?: number | string): AreaConfig {
        if (!id) return engine.ccTable.get("AreaConfig");
        return engine.ccTable.get("AreaConfig")[id];
    }

    public static readPicConfig(id?: number | string): PicConfig {
        if (!id) return engine.ccTable.get("PicConfig");
        return engine.ccTable.get("PicConfig")[id];
    }

    public static readShopConfig(id?: number | string): ShopConfig {
        if (!id) return engine.ccTable.get("ShopConfig");
        return engine.ccTable.get("ShopConfig")[id];
    }

    public static readRechargeConfig(id?: number | string): RechargeConfig {
        if (!id) return engine.ccTable.get("RechargeConfig");
        return engine.ccTable.get("RechargeConfig")[id];
    }

    public static readChipConfig(id?: number | string): ChipConfig {
        if (!id) return engine.ccTable.get("ChipConfig");
        return engine.ccTable.get("ChipConfig")[id];
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