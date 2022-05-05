import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_GamePreLoadUI extends Component {
	GamePreLoadUI: Node;
	battle_loding_rightBg: Node;
	battle_loding_leftBg: Node;
	battle_loding_vs: Node;
	ProgressBar: Node;
	Bar: Node;

	public static URL:string = "assets\gamebundle\prefabs\UI\Battle\GamePreLoadUI.prefab"

    onLoad () {
		this.GamePreLoadUI = this.node
		this.battle_loding_rightBg = this.GamePreLoadUI.getChildByName("battle_loding_rightBg");
		this.battle_loding_leftBg = this.GamePreLoadUI.getChildByName("battle_loding_leftBg");
		this.battle_loding_vs = this.GamePreLoadUI.getChildByName("battle_loding_vs");
		this.ProgressBar = this.GamePreLoadUI.getChildByName("ProgressBar");
		this.Bar = this.ProgressBar.getChildByName("Bar");

    }
}
