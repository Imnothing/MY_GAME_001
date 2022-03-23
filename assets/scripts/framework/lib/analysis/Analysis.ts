import { engine } from "../../engine";
import { LOG_TAG } from "../logger/LoggerInterface";
import { AnalysisInterface, EventParam } from "./AnalysisInterface";

/**
 * 默认统计分析类
 *
 */
export default class Analysis implements AnalysisInterface {
    report(eventName: string, eventParams?: EventParam): void {
        engine.logger.log(LOG_TAG.GAME,"analysic", "report", eventName, eventParams);
        // engine.logger.log(LOG_TAG.GAME,">> 上报事件")
        // engine.logger.log(LOG_TAG.GAME,">> name       : " + eventName);
        // engine.logger.log(LOG_TAG.GAME,">> params     : ");
        // if (eventParams) {
        //     let keys = Object.keys(eventParams);
        //     if (keys) {
        //         for (let i = 0; i < keys.length; i++) {
        //             engine.logger.log(LOG_TAG.GAME,`>>>> ${keys[i]} : ${eventParams[keys[i]]}`);
        //         }
        //     }
        // }
    }
}
