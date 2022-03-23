/**
 * 游戏设置实体类
 */

import { engine } from "../../../../scripts/framework/engine";
import { LocalKeys } from "../LocalKeys";
import { BaseModel } from "./BaseModel";

export class SettingInfo extends BaseModel {
    public _storageKey = "SettingInfo";
    /**音乐开关 */
    public switchMusic: boolean = true;
    /**音效开关 */
    public switchSound: boolean = true;
    /**提示开关 */
    public switchHint: boolean = true;
    /**通知开关 */
    public switchNotific: boolean = true;

    constructor(data?: any) {
        super(data);
        if (!data) return;
        var keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            if (this.hasOwnProperty(key)) {
                this[key] = value;
            }
        }
    }

    save(): void {
        engine.storage.setLocalItem(LocalKeys.LOCAL_SETTINGINFO, this);
    }

}