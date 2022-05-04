/**
 * 游戏设置实体类
 */

import { engine } from "../../../../scripts/framework/engine";
import { ConstValue } from "../../Configs/ConstValue";
import { LocalKeys } from "../LocalKeys";

export class SettingInfo {
    /**提示开关 */
    public switchHint: boolean = true;
    /**通知开关 */
    public switchNotific: boolean = true;
    /**多语言开关 */
    public languageType: string = ConstValue.LANGUAGE_TYPE.CN;



    constructor(data?: any) {
        // super(data);
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