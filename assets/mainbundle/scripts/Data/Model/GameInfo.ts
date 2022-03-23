import { PlayerInfo } from "./PlayerInfo";
import { SettingInfo } from "./SettingInfo";

/**
 * 游戏数据集合类，提交服务端用
 */

export class GameInfo {
    //玩家信息
    public playerInfo: PlayerInfo = null;
    //玩家设置
    public settingInfo: SettingInfo = null;
    constructor() {

    }

}