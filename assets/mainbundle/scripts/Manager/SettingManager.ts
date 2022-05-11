/**
 * 玩家数据管理
 */

import { game, sys } from "cc";
import { engine } from "../../../scripts/framework/engine";
import { ConstValue } from "../Configs/ConstValue";
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
        let state = !engine.audioManager.getSwitchMusic();
        engine.audioManager.setSwitchMusic(state);
        engine.audioManager.playMusic(ConstValue.GAME_MUSIC.BGM);
        engine.audioManager.save();
    }

    /**
     * 设置-音效
     */
    setSound() {
        let state = !engine.audioManager.getSwitchEffect();
        engine.audioManager.setSwitchEffect(state);
        engine.audioManager.save();
    }

    /**
     * 设置-提示
     */
    setHint() {
        let settingInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        let state = settingInfo.switchHint;
        settingInfo.switchHint = !state;
        settingInfo.save();
    }

    /**
     * 设置-通知
     */
    setNotific() {
        let settingInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        let state = settingInfo.switchNotific;
        settingInfo.switchNotific = !state;
        settingInfo.save();
    }

    /**
     * 设置-多语言
     */
    setLanguage(language: string) {
        let settingInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        if (language == settingInfo.languageType) return;
        settingInfo.languageType = language;
        settingInfo.save();
        game.restart();
    }
}
