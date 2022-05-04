import { Component } from "cc";
import { BaseUI } from "../../../scripts/framework/lib/router/BaseUI";
import BattleUI from "../UI/Battle/BattleUI";

export default class BattleControl extends Component {
    private battleUI: BaseUI = null;

    onLoad() {
        this.initListener();
    }

    setBattleUI(ui: BattleUI) {
        this.battleUI = ui;
    }

    initListener() {

    }


}