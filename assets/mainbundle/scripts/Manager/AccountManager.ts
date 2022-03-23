/**
 * 玩家数据管理
 */

import { engine } from "../../../scripts/framework/engine";
import { GameData } from "../Data/GameData";
import { ListenerType } from "../Data/ListenerType";
import { LocalKeys } from "../Data/LocalKeys";
import { BaseInfo, AwsToken, AccountInfo } from "../Data/Model/AccountInfo";
import { AccountReqHandler } from "../Protocol/AccountReqHandler";
import { GameDataManager } from "./GameDataManager";
import { PlayerManager } from "./PlayerManager";


export class AccountManager {
    private static instance: AccountManager;
    public cubeCommonJson: any = null;
    public allLevelJson: any = null;
    public level_chunk: number;
    public level_total: number;
    public static getInstance(): AccountManager {
        if (this.instance == null) {
            this.instance = new AccountManager();
            //@ts-ignore
            window.AccountManager = this;
        }
        return this.instance;
    }

    /**
     * 登录账号
     * @param param 
     * @param callback 
     */
    public async loginAccount(param: any) {
        AccountReqHandler.getInstance().reqLoginAccount(param, async (json) => {
            GameDataManager.getInstance().baseInfo = new BaseInfo(json['baseInfo']);
            GameDataManager.getInstance().baseInfo.save();
            GameDataManager.getInstance().awsToken = new AwsToken(json['aws_token']);
            GameDataManager.getInstance().awsToken.save();
            GameDataManager.getInstance().setAccountInfo(new AccountInfo(json['userInfo']));

            this.cubeCommonJson = await AccountReqHandler.getInstance().reqCubeCommonJson();
            this.level_chunk = this.cubeCommonJson["level_chunk"];
            this.level_total = this.cubeCommonJson["level_total"];
            this.allLevelJson = await AccountReqHandler.getInstance().reqAllLevelJson();
            let gameData = new GameData();
            GameDataManager.getInstance().setGameData(gameData);

            let playerInfo = engine.storage.getLocalItem(LocalKeys.LOCAL_PLAYERINFO, null);
            if (playerInfo) {
                gameData.initLoalInfo();
            } else {
                //todo:读取游戏数据
                gameData.initLoalInfo();
                // await AccountReqHandler.getInstance().reqGameData();
            }
            PlayerManager.getInstance();
            engine.listenerManager.trigger(ListenerType.GameStart);
        });

    }

}
