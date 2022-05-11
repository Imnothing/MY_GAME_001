/**
 * 区域信息类
 */

import { engine } from "../../../../scripts/framework/engine";
import { LocalKeys } from "../../../../mainbundle/scripts/Data/LocalKeys";
import { BaseModel } from "../../../../mainbundle/scripts/Data/Model/BaseModel";

export class AreaInfo extends BaseModel {

    public areaList: Map<number, Array<number>> = new Map<number, Array<number>>();

    public unlockAreaNum: number = 1;

    public nextSptId: number;
    constructor(data?: any) {
        super(data);
        if (!data) return;
        var keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            if (this.hasOwnProperty(key)) {
                this[key] = value;
            }
        }
    }

    save(): void {
        engine.storage.setLocalItem(LocalKeys.LOCAL_ARREAINFO, this);
    }

    /**
     * 增加指定解锁
     * @param sptId 
     */
    addSptId(areaId: number, sptId: number) {
        let sptIds = this.areaList[areaId];
        if (!sptIds) {
            sptIds = Array<number>();
            // this.areaList.set(areaId,sptIds);
            this.areaList[areaId] = sptIds;
        }
        if (sptIds.indexOf(sptId) == -1) {
            sptIds.push(sptId);
            this.nextSptId = ++sptId;
            this.save();
        }
    }

    /**
     * 获取指定区域数据
     * @param areaId 
     * @returns 
     */
    getAreaItem(areaId) {
        return this.areaList[areaId] || [];
    }

    /**
     * 进入下一区域
     */
    toNextArea() {
        this.unlockAreaNum++
        this.save();
    }



}
