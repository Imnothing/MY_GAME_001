/**
 * 账号协议发送类
 */

import { engine } from "../../../scripts/framework/engine";
import { LOG_TAG } from "../../../scripts/framework/lib/logger/LoggerInterface";
import { LocalKeys } from "../Data/LocalKeys";
import { AccountInfo, AwsToken, BaseInfo } from "../Data/Model/AccountInfo";
import { GameDataManager } from "../Manager/GameDataManager";
import { PlatformManager } from "../Platform/PlatformManager";
import { UIHelp } from "../Utils/UIHelp";
import { BaseReqHandler } from "./BaseReqHandler";
import { IAccountInterface } from "./IAccountInterface";

export class AccountReqHandler extends BaseReqHandler implements IAccountInterface {
    private static instance: AccountReqHandler;
    public static getInstance(): AccountReqHandler {
        if (this.instance == null) {
            this.instance = new AccountReqHandler();
            //@ts-ignore
            window.AccountReqHandler = this.instance;
        }
        return this.instance;
    }

    constructor() {
        super();
    }


    reqGameData() {
        return new Promise<any>(async (resolved, reject) => {
            engine.http.get("https://doc-joyparty.s3-accelerate.amazonaws.com/lifematch/lc/1.0.0/common.json", (json) => {
                console.log(json);
                engine.storage.setLocalItem(LocalKeys.LOCAL_CUBECOMMON_JSON, json);
                resolved(json);
            }, (err) => {
                reject(null);
            });
        });
    }

    reqCheckVersion(callback: Function) {
        // let url = '/api/checkVersion';
        // ProtocolMgr.getInstance().sendHttpReq(url, {}, (res) => {
        //     callback(res);
        // }, false);
    }


    registAccount(account: string, password: string, callback: Function) {
        callback();
    }

    async reqLoginAccount(msg: any, callback: Function) {
        let path = "/life/user/login";
        let param = Object.assign(PlatformManager.getInstance().getPlatform().getCommonParams(), msg);
        this.doPost(path, param, async (json) => {
            console.log(json);
            callback(json);
        }, (data) => {
            engine.logger.error(LOG_TAG.GAME, "reqLoginAccount失败", data);
        })
    }


    public submitUser(nickName: string, pic: string) {

    }



    public reqCompleteReport(callback: Function) {
        // let url = 'xxkz/xxkz/completeReport';
        // ProtocolMgr.getInstance().sendHttpReq(url, {}, (res) => {
        //     if (res && res.code == 1) {
        //         callback(true);
        //     } else {
        //         SLog.getInstance().logEvent('completeReport', 'fail');
        //         callback(false);
        //     }
        // }, false);
    }


    public reqRank() {

    }


    public reqCubeCommonJson() {
        return new Promise<any>(async (resolved, reject) => {
            engine.http.get("https://doc-joyparty.s3-accelerate.amazonaws.com/lifematch/lc/1.0.0/common.json", (json) => {
                console.log(json);
                engine.storage.setLocalItem(LocalKeys.LOCAL_CUBECOMMON_JSON, json);
                resolved(json);
            }, (err) => {
                reject(null);
            });
        });
    }


    public reqAllLevelJson() {
        return new Promise<any>(async (resolved, reject) => {
            engine.http.get("https://doc-joyparty.s3-accelerate.amazonaws.com/lifematch/lc/1.0.0/level_0.json", (json) => {
                console.log(json);
                engine.storage.setLocalItem(LocalKeys.LOCAL_LEVEL_JSON, json);
                resolved(json);
            }, (err) => {
                reject(null);
            });
        });
    }


}
