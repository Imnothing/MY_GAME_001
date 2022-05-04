/**
 * 游戏数据管理
 */

import { sys } from "cc";
import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import { ConstValue } from "../Configs/ConstValue";
import { GameData } from "../Data/GameData";
import { ListenerType } from "../Data/ListenerType";
import { LocalKeys } from "../Data/LocalKeys";
import { PlayerManager } from "./PlayerManager";

export class GameDataManager {
    private static instance: GameDataManager;

    private gameData: GameData = null;

    static getInstance(): GameDataManager {
        if (this.instance == null) {
            this.instance = new GameDataManager();
            //@ts-ignore
            window.GameDataManager = this;
        }
        return this.instance;
    }

    getGameData(): GameData {
        return this.gameData;
    }

    setGameData(_gameData: GameData) {
        this.gameData = _gameData;
    }

    init() {
        //平台初始化进入
        // PlatformManager.getInstance().getPlatform().appEnter((param) => {
        //     engine.logger.log(LOG_TAG.GAME, JSON.stringify(param));
        //     engine.storage.register();
        //     let accountJson = engine.storage.getLocalItem(LocalKeys.LOCAL_ACCOUNTINFO);
        //     this.accountInfo = accountJson ? new AccountInfo(JSON.parse(accountJson)) : new AccountInfo();
        //     this.accountInfo.save();

        // PlatformManager.getInstance().getPlatform().initLogParam()
        // AccountManager.getInstance().loginAccount(param);
        // this.requestPermisstion();
        // });


        this.setGameData(this.gameData);

        let playerInfo = engine.storage.getLocalItem(LocalKeys.LOCAL_PLAYERINFO, null);
        if (playerInfo) {
            this.gameData.initLoalInfo();
        } else {
            //todo:读取游戏数据
            this.gameData.initLoalInfo();
        }
        PlayerManager.getInstance();
        engine.listenerManager.trigger(ListenerType.GameStart);
    }

    private requestPermisstion() {
        if (ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.Android || ConstValue.GAME_PLATFORM == ConstValue.PLATFORM_TYPE.IOS) {
            if (sys.platform == sys.Platform.ANDROID) {
                // AppNative.getInstance().requestPermisstion({
                //     permissonNames: [
                //         PermissonName.READ_PHONE_STATE,
                //         PermissonName.WRITE_EXTERNAL_STORAGE
                //     ],
                //     callback: () => { }
                // })
            }
        } else {
            // more
        }
    }

}
