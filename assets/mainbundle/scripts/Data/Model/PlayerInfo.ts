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
    public nickname: string = '';
    //头像URL
    public avatar: string = '';
    //编号
    public no: string = '';
    //当前关卡Id
    public level: number = 1;
    //经验
    public exp: number = 0;
    //Vip
    public vip: number = 0;
    //创建时间
    public create_time: string = null;

    //当前金币总数
    public gold: number = 0;
    //钻石
    public diamond: number = 0;
    //爱心
    public heart: number = 5;
    //星星
    public star: number = 1;
    /**性别 */ //【1-男，2-女】
    public sex: number = 1;

    //是否拥有小月卡
    public yueka1: number = 0;

    //是否拥有小月卡
    public worshipCount: number = 5;
    //该服务器信息
    public server: any = null;

    public update_time: number = 0;
    //引导步骤
    public guiderStep: number = 0;
    //上次体力恢复时间
    public lastHeartRecoveryTime: number = 0;

    //连胜记录
    public winRepeatedly: number = 0;

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
