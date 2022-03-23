/**
 * 游戏账号实体类
 */

import { engine } from "../../../../scripts/framework/engine";
import { LocalKeys } from "../LocalKeys";

export class BaseModel {
    constructor(data?: any) {
        if (!data) return;
        var keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }

    save() {

    }
}
