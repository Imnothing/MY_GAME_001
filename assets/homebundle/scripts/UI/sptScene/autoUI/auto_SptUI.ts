import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_SptUI extends Component {
	SptUI: Node;
	BG: Node;
	scv_planets: Node;
	view: Node;
	content: Node;
	top_banner: Node;
	lay_top: Node;
	btn_back: Node;
	common_back: Node;
	lbl_top: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\sptScene\SptUI.prefab"

    onLoad () {
		this.SptUI = this.node
		this.BG = this.SptUI.getChildByName("BG");
		this.scv_planets = this.SptUI.getChildByName("scv_planets");
		this.view = this.scv_planets.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.top_banner = this.SptUI.getChildByName("top_banner");
		this.lay_top = this.top_banner.getChildByName("lay_top");
		this.btn_back = this.lay_top.getChildByName("btn_back");
		this.common_back = this.btn_back.getChildByName("common_back");
		this.lbl_top = this.lay_top.getChildByName("lbl_top");

    }
}
