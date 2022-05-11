/**
 * 游戏角色信息类
 */

import { engine } from "../../../../scripts/framework/engine";
import { LocalKeys } from "../LocalKeys";
import { BaseModel } from "./BaseModel";

export class PlayerInfo extends BaseModel {
    //王国id
    public id: number = 0;
    //昵称
    public nickname: string = '玩家1001';
    //头像URL
    public avatar: string = '4';
    //签名
    public sign: string = '打的就是精锐';
    //编号
    public no: string = '';
    //当前金币总数
    public gold: number = 0;
    //钻石
    public diamond: number = 0;
    //主页展示精灵Id
    public show_pet: string = '4';

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
        engine.storage.setLocalItem(LocalKeys.LOCAL_PLAYERINFO, this);
    }


}
