import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { LocalKeys } from "../../../mainbundle/scripts/Data/LocalKeys";
import { PropInfo } from "../../../mainbundle/scripts/Data/Model/PropInfo";
import { ItemConfig } from "../../../mainbundle/scripts/Datatable/ItemConfig";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { PlayerManager } from "../../../mainbundle/scripts/Manager/PlayerManager";
import { UIHelp } from "../../../mainbundle/scripts/Utils/UIHelp";
import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import { HomeManager } from "./HomeManager";

/**
 * 开局道具类型
 */
export enum EnumAllProp {
    PP = 1,
    HP = 2,
    Character = 3,
    Feature = 4
}

/**
 * 道具管理
 */
export class PropManager {
    private _allProps: Map<number, Array<string>> = new Map<number, Array<string>>();

    init() {
        return new Promise<boolean>(async (resolve, reject) => {
            let itemConfigs = ConfigReader.readItemConfig();
            for (let i in itemConfigs) {
                let item: ItemConfig = itemConfigs[i];
                //PP道具
                if (item.Type == 1) {
                    let props: Array<string> = this._allProps[EnumAllProp.PP];
                    if (!props) {
                        props = new Array<string>();
                        this._allProps[EnumAllProp.PP] = props;
                    }
                    if (props.indexOf(item.ItemId) == -1) {
                        props.push(item.ItemId);
                    }
                    //HP道具
                } else if (item.Type == 2) {
                    let props: Array<string> = this._allProps[EnumAllProp.HP];
                    if (!props) {
                        props = new Array<string>();
                        this._allProps[EnumAllProp.HP] = props;
                    }
                    if (props.indexOf(item.ItemId) == -1) {
                        props.push(item.ItemId);
                    }
                    //性格道具
                } else if (item.Type == 3) {
                    let props: Array<string> = this._allProps[EnumAllProp.Character];
                    if (!props) {
                        props = new Array<string>();
                        this._allProps[EnumAllProp.Character] = props;
                    }
                    if (props.indexOf(item.ItemId) == -1) {
                        props.push(item.ItemId);
                    }
                    //特性道具
                } else if (item.Type == 4) {
                    let props: Array<string> = this._allProps[EnumAllProp.Feature];
                    if (!props) {
                        props = new Array<string>();
                        this._allProps[EnumAllProp.Feature] = props;
                    }
                    if (props.indexOf(item.ItemId) == -1) {
                        props.push(item.ItemId);
                    }
                }
            }
            resolve(true)
        })
    }

    /**
     * 增加道具
     * @param propId 
     */
    addProp(propId: string, num: number) {
        //物品信息
        let itemConfig: ItemConfig = ConfigReader.readItemConfig(propId);
        //背包列表
        let propList: Map<number, PropInfo> = GameDataManager.getInstance().getGameData().propList;

        //判断武平类型
        switch (itemConfig.Type) {
            //PP道具
            case EnumAllProp.PP:
            //HP道具
            case EnumAllProp.HP:
            //性格道具
            case EnumAllProp.Character:
            //特性道具
            case EnumAllProp.Feature:
                //背包中已有该道具，则数量+1
                if (propList[propId]) {
                    propList[propId].count += num;
                    break;
                }
                //背包中无该道具，则添加道具
                propList[propId] = new PropInfo();
                propList[propId].id = propId;
                propList[propId].count += num;
                break;
        }
        //存储至本地缓存
        engine.storage.setLocalItem(LocalKeys.LOCAL_PROPLIST, propList);
        return true;
    }

    /**
     * 增加多物品
     * @param itemConfig 
     */
    addProps(values: string) {
        let items = values.split("|");
        items.forEach((item) => {
            let propInfo = item.split("#");
            if (propInfo.length == 2) {
                let propId = (propInfo[0]);
                let num = parseInt(propInfo[1]);
                propId && num && this.addProp(propId, num);
            }
        })
    }

    /**
     * 消耗道具
     */
    costProp(propId: string, num: number): boolean {
        let propList = GameDataManager.getInstance().getGameData().propList;
        let propInfo: PropInfo = propList[propId];
        if (!propInfo) {
            engine.logger.error(LOG_TAG.DEV_XLH, "不存在该道具", propId);
            return false;
        }
        if (propInfo.count < num) {
            engine.logger.error(LOG_TAG.DEV_XLH, "道具数量不足", propId);
            return false;
        }
        propInfo.count -= num;
        if (propInfo.count <= 0)
            delete propList[propId];
        this.savePropList();
        return true;
    }

    savePropList() {
        let propList = GameDataManager.getInstance().getGameData().propList;
        engine.storage.pushSyncData(LocalKeys.LOCAL_PROPLIST, propList);
    }

}