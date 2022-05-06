/**
 * 玩家数据管理
 */

import { engine } from "../../../scripts/framework/engine";
import { ListenerType } from "../Data/ListenerType";
import { GameDataManager } from "./GameDataManager";


export class PlayerManager {
    private static instance: PlayerManager;

    static getInstance(): PlayerManager {
        if (this.instance == null) {
            this.instance = new PlayerManager();
            //@ts-ignore
            window.PlayerManager = this;
        }
        return this.instance;
    }

    /**
      * 增加金币
      * @param num 金币数量
      */
    addGold(num: number) {
        //获取玩家信息
        let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
        //玩家金币不够时则返回false
        if (playerInfo.gold + num < 0) return false;
        playerInfo.gold += num;
        playerInfo.save();
        engine.listenerManager.trigger(ListenerType.RefreshTopInfo);
        return true;
    }

}
