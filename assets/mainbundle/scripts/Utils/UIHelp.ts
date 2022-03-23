/**
 * UI工具类
 */

import { Button, find, Label, RichText, SpriteFrame, Widget } from "cc";
import { UIConfigs } from "../Configs/UIConfigs";
import { engine } from "../../../scripts/framework/engine";
import { TipUI } from "../../../commonbundle/scripts/popwindow/TipUI";

/**确定框界面参数 */
export interface DialogParams {
    title?: string,
    content: string,
    okCb?: Function,
    cancelCb?: Function,
    okBtnStr?: string,
    cancelBtnStr?: string,
    isOkShow?: boolean,
    isCancelShow?: boolean,
    isForce?: boolean
}

export class UIHelp {
    /**
     * 显示冒泡提示
     */
    public static showTip(message: string, iconPic?: SpriteFrame, count?: string) {
        let tipUI = engine.uiManager.getUI(UIConfigs.tipUI) as TipUI;
        if (!tipUI) {
            engine.uiManager.openUI(UIConfigs.tipUI, null, () => {
                UIHelp.showTip(message, iconPic, count);
            });
        }
        else {
            tipUI.showTip(message, iconPic, count);
        }
    }

}
