import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PropDialog extends Component {
	PropDialog: Node;
	touchBg: Node;
	propBg: Node;
	lbl_name: Node;
	title_own: Node;
	lbl_num: Node;
	title_desc: Node;
	lbl_desc: Node;
	btn_use: Node;
	lbl_use: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\dialog\PropDialog.prefab"

    onLoad () {
		this.PropDialog = this.node
		this.touchBg = this.PropDialog.getChildByName("touchBg");
		this.propBg = this.PropDialog.getChildByName("propBg");
		this.lbl_name = this.propBg.getChildByName("lbl_name");
		this.title_own = this.propBg.getChildByName("title_own");
		this.lbl_num = this.propBg.getChildByName("lbl_num");
		this.title_desc = this.propBg.getChildByName("title_desc");
		this.lbl_desc = this.propBg.getChildByName("lbl_desc");
		this.btn_use = this.propBg.getChildByName("btn_use");
		this.lbl_use = this.btn_use.getChildByName("lbl_use");

    }
}
