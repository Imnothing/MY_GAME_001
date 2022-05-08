import { engine } from "../../../scripts/framework/engine";
import { LocalKeys } from "./LocalKeys";
import { GameInfo } from "./Model/GameInfo";
import { PlayerInfo } from "./Model/PlayerInfo";
import { SettingInfo } from "./Model/SettingInfo";
import { PropInfo } from "./Model/PropInfo";
import { AreaInfo } from "./Model/AreaInfo";
import { PetData } from "./PetData";

/**
 * 数据管理类
 */
export class GameData {
    //游戏设置信息
    settingInfo: SettingInfo = null;
    //玩家信息
    public playerInfo: PlayerInfo = null;
    //登录设备信息
    public loginParam: any = null;
    //所有区域解锁信息
    public areaInfo: AreaInfo = null;
    //道具集合
    public propList: Map<string, PropInfo> = null;
    /**精灵背包 */
    public petBagList: Map<string, PetData> = null
    //----------------------------------------------------------------

    constructor() {
        //@ts-ignore
        window.GameData = this;
    }

    /**
     * 初始化游戏本地数据
     * @param settingInfo
     */
    initLoalInfo() {
        //不是第一次登陆，则读取本地数据到缓存中
        let settingJson = engine.storage.getLocalItem(LocalKeys.LOCAL_SETTINGINFO);
        this.settingInfo = settingJson ? new SettingInfo(JSON.parse(settingJson)) : new SettingInfo();
        let playerJson = engine.storage.getLocalItem(LocalKeys.LOCAL_PLAYERINFO);
        this.playerInfo = playerJson ? new PlayerInfo(JSON.parse(playerJson)) : new PlayerInfo();
        let propListJson = engine.storage.getLocalItem(LocalKeys.LOCAL_PROPLIST);
        this.propList = propListJson ? JSON.parse(propListJson) : new Map<number, PropInfo>();
        let petBagListJson = engine.storage.getLocalItem(LocalKeys.LOCAL_PETBAG);
        this.petBagList = petBagListJson ? JSON.parse(petBagListJson) : new Map<number, PetData>();

        // let areaInfoJson = engine.storage.getLocalItem(LocalKeys.LOCAL_ARREAINFO);
        // this.areaInfo = areaInfoJson ? new AreaInfo(JSON.parse(areaInfoJson)) : new AreaInfo();

    }

    initData() {
        // this.playerInfo.gold = parseInt(JsonConfig['CommonParameter']['FirstGold'].Value);
        // this.playerInfo.heart = parseInt(JsonConfig['CommonParameter']['FirstRenown'].Value);
    }

    // pushToLocalData(gameInfo: GameInfo) {
    //     this.playerInfo = gameInfo.playerInfo || new PlayerInfo();
    //     this.settingInfo = gameInfo.settingInfo || new SettingInfo();
    // }

}
