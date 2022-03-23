/**
 * 玩家数据管理
 */

import { engine } from "../../../scripts/framework/engine";
import { ListenerType } from "../Data/ListenerType";
import { SettingInfo } from "../Data/Model/SettingInfo";
import { GameDataManager } from "./GameDataManager";


export class SettingManager {
    private static instance: SettingManager;

    static getInstance(): SettingManager {
        if (this.instance == null) {
            this.instance = new SettingManager();
            //@ts-ignore
            window.SettingManager = this;
        }
        return this.instance;
    }

    /**
     * 设置-音乐
     */
    setMusic() {
        let settingInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        let state = settingInfo.switchMusic;
        settingInfo.switchMusic = !state;
        settingInfo.save();
    }

    /**
     * 设置-音乐
     */
    setSound() {
        let settingInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        let state = settingInfo.switchSound;
        settingInfo.switchSound = !state;
        settingInfo.save();
    }

    /**
     * 设置-音乐
     */
    setHint() {
        let settingInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        let state = settingInfo.switchHint;
        settingInfo.switchHint = !state;
        settingInfo.save();
    }

    /**
     * 设置-音乐
     */
    setNotific() {
        let settingInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        let state = settingInfo.switchNotific;
        settingInfo.switchNotific = !state;
        settingInfo.save();
    }
}
