import { UIConfigs } from "../../../mainbundle/scripts/Configs/UIConfigs";
import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { LocalKeys } from "../../../mainbundle/scripts/Data/LocalKeys";
import { PropInfo } from "../../../mainbundle/scripts/Data/Model/PropInfo";
import { PetData } from "../../../mainbundle/scripts/Data/PetData";
import { ItemConfig } from "../../../mainbundle/scripts/Datatable/ItemConfig";
import { GameDataManager } from "../../../mainbundle/scripts/Manager/GameDataManager";
import { PlayerManager } from "../../../mainbundle/scripts/Manager/PlayerManager";
import { UIHelp } from "../../../mainbundle/scripts/Utils/UIHelp";
import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import PetDetail from "../UI/pet/PetDetail";
import { HomeManager } from "./HomeManager";
import { EnumLearnType, PetManager } from "./PetManager";

/**
 * 开局道具类型
 */
export enum EnumAllProp {
    PP = 1,
    HP = 2,
    Character = 3,
    Feature = 4,
    Level = 5,
    Learn = 6,
    Talent = 7
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
                    //等级道具
                } else if (item.Type == 5) {
                    let props: Array<string> = this._allProps[EnumAllProp.Level];
                    if (!props) {
                        props = new Array<string>();
                        this._allProps[EnumAllProp.Level] = props;
                    }
                    if (props.indexOf(item.ItemId) == -1) {
                        props.push(item.ItemId);
                    }
                    //学习力
                } else if (item.Type == 6) {
                    let props: Array<string> = this._allProps[EnumAllProp.Learn];
                    if (!props) {
                        props = new Array<string>();
                        this._allProps[EnumAllProp.Learn] = props;
                    }
                    if (props.indexOf(item.ItemId) == -1) {
                        props.push(item.ItemId);
                    }
                    //天赋
                } else if (item.Type == 7) {
                    let props: Array<string> = this._allProps[EnumAllProp.Talent];
                    if (!props) {
                        props = new Array<string>();
                        this._allProps[EnumAllProp.Talent] = props;
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
        let propList: Map<string, PropInfo> = GameDataManager.getInstance().getGameData().propList;

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
            //等级道具
            case EnumAllProp.Level:
            //学习力道具
            case EnumAllProp.Learn:
            //个体道具
            case EnumAllProp.Talent:
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

    useProp(propId: string, num?: number) {
        let item: ItemConfig = ConfigReader.readItemConfig(propId);
        let petMgr: PetManager = HomeManager.petManager;
        let petDetail = engine.uiManager.getUI(UIConfigs.petDetail) as PetDetail;
        let pet: PetData = GameDataManager.getInstance().getGameData().petBagList[petDetail.getKey()];
        switch (item.Type) {
            case EnumAllProp.HP:
                if (!petMgr.recoverHp(pet, item.Value1))
                    return false;
                break;
            case EnumAllProp.PP:
                if (!petMgr.recoverPP(pet, item.Value1))
                    return false;
                break;
            case EnumAllProp.Character:
                if (item.Value1 != 0) {
                    if (!petMgr.setCharacter(pet, String(item.Value1)))
                        return false;
                } else {
                    if (!petMgr.setCharacter(pet))
                        return false;
                }
                break;
            case EnumAllProp.Feature:
                if (item.Value1 != 0) {
                    if (!petMgr.setFeature(pet, String(item.Value1)))
                        return false;
                } else {
                    if (!petMgr.setFeature(pet))
                        return false;
                }
                break;
            case EnumAllProp.Level:
                if (!petMgr.upgradeLevel(pet, item.Value1))
                    return false;
                break;
            case EnumAllProp.Learn:
                for (let i = 1; i <= 6; i++) {
                    if (!petMgr.addLearning(pet, i, 255))
                        return false;
                }
                break;
            case EnumAllProp.Talent:
                if (item.Value1 != 0) {
                    if (!petMgr.setTalent(pet, (pet.talentValue + item.Value1)))
                        return false;
                } else {
                    if (!petMgr.setTalent(pet))
                        return false;
                }
                break;
        }
        this.costProp(propId, num ? num : 1)
        return true;
    }

    savePropList() {
        let propList = GameDataManager.getInstance().getGameData().propList;
        engine.storage.pushSyncData(LocalKeys.LOCAL_PROPLIST, propList);
    }

    /**
     * 获取游戏内可用道具
     * @returns 
     */
    getGameProp() {
        let arr = [];
        for (let key in this._allProps) {
            if (parseInt(key) == EnumAllProp.HP || parseInt(key) == EnumAllProp.PP) {
                arr = arr.concat(this._allProps[key]);
            }
        }

        return arr;
    }

}