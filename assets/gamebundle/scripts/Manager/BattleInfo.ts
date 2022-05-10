import { SptConfig } from "../../../mainbundle/scripts/Datatable/SptConfig";

export default class BattleInfo {
    private static _instance: BattleInfo;

    public static get getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new BattleInfo();
        return this._instance;
    }

    // 设置基础数据
    public setLevelInfo(spt: SptConfig) {

    }



}