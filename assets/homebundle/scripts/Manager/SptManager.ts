import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { ShopConfig } from "../../../mainbundle/scripts/Datatable/ShopConfig";
import { SptConfig } from "../../../mainbundle/scripts/Datatable/SptConfig";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { PlayerManager } from "../../../mainbundle/scripts/Manager/PlayerManager";
import { UIHelp } from "../../../mainbundle/scripts/Utils/UIHelp";
import { engine } from "../../../scripts/framework/engine";
import { HomeManager } from "./HomeManager";

/**
 * 商店管理
 */
export class SptManager {
    private _sptConfigs = null;
    //区域字典
    public areaMap: Map<number, Array<SptConfig>> = null;
    public init() {
        this.areaMap = new Map<number, Array<SptConfig>>();
        this._sptConfigs = ConfigReader.readSptConfig();
        for (let key in this._sptConfigs) {
            let spt: SptConfig = this._sptConfigs[key];
            let areaId = spt.Area;
            if (!this.areaMap[areaId]) this.areaMap[areaId] = new Array<SptConfig>();
            this.areaMap[areaId].push(this._sptConfigs[key]);
        }
    }

    /**
     * 获取当前区域的关卡
     * @param area 
     */
    getSptByArea(area: number) {
        return this.areaMap[area];
    }

    /**
     * 完成关卡
     * @param sptId 
     */
    finishSpt(sptId: number) {
        let areaInfo = GameDataManager.getInstance().getGameData().areaInfo;
        areaInfo.addSptId(areaInfo.unlockAreaNum, sptId);
        return true;
    }

    checkFinishArea(area) {
        let areaInfo = GameDataManager.getInstance().getGameData().areaInfo;
        // TODO: 判断全部区域是否全部解锁
        if (this.areaMap[area].length == areaInfo.areaList[areaInfo.unlockAreaNum].length) {
            areaInfo.toNextArea();
            return true;
        }
        return false;
    }

    /**
     * 解析奖励字符串
     * @param sptId 
     * @returns [道具Id,数量]
     */
    public getPrize(allPrize: string) {
        let prize: Array<Array<any>> = new Array();
        allPrize.split('|').forEach(prizes => {
            prize.push(prizes.split('#'));
        })

        return prize;
    }
}
