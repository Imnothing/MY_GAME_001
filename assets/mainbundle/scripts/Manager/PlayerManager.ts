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
     * 增加星星
     * @param num 
     */
    addStar(num: number) {
        let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
        if (playerInfo.star + num < 0) return false;
        playerInfo.star += num;
        playerInfo.save();
        engine.listenerManager.trigger(ListenerType.RefreshTopInfo);
        return true;
    }

    /**
      * 增加金币
      * @param num 
      */
    addGold(num: number) {
        let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
        if (playerInfo.gold + num < 0) return false;
        playerInfo.gold += num;
        playerInfo.save();
        engine.listenerManager.trigger(ListenerType.RefreshTopInfo);
        return true;
    }

}
