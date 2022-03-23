/**
 * 账号协议发送类
 */

import { engine } from "../../../scripts/framework/engine";
import { PlatformManager } from "../Platform/PlatformManager";

export class BaseReqHandler {


    doPost(path: string, msg: any, completeCallback?: Function, errCallback?: Function) {
        let param = Object.assign(PlatformManager.getInstance().getPlatform().getCommonParams(), msg);
        engine.http.post(path, param, (json) => {
            completeCallback && completeCallback(json);
        }, (data) => {
            errCallback && errCallback(data);
        })
    }


}
