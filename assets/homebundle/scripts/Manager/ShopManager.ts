import { ShopConfig } from "../../../mainbundle/scripts/Datatable/ShopConfig";
import { PlayerManager } from "../../../mainbundle/scripts/Manager/PlayerManager";
import { UIHelp } from "../../../mainbundle/scripts/Utils/UIHelp";
import { engine } from "../../../scripts/framework/engine";
import { HomeManager } from "./HomeManager";

/**
 * 商店管理
 */
export class ShopManager {
    private _shopConfigs = null;

    init() {
        this._shopConfigs = engine.ccTable.get("ShopConfig");
    }

    /**
     * 购买物品
     */
    buyItem(id: string) {
        let shopConfig: ShopConfig = this._shopConfigs[id];
        //金币购买
        if (!PlayerManager.getInstance().addGold(shopConfig.BuyValue * -1)) {
            UIHelp.showTip("金币数量不足！");
            return false;
        }
        //添加商品至物品栏
        if (HomeManager.propManager.addProp(shopConfig.ItemId, shopConfig.Num)) {
            UIHelp.showTip("商品添加成功");
            return true
        }
        else {
            return false
        }
    }

}