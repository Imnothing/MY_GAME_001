import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PropItem extends Component {
	PropItem: Node;
	list_item: Node;
	ico_prop: Node;
	lbl_num: Node;

	public static URL:string = "assets\gamebundle\prefabs\UI\Battle\PropItem.prefab"

    onLoad () {
		this.PropItem = this.node
		this.list_item = this.PropItem.getChildByName("list_item");
		this.ico_prop = this.list_item.getChildByName("ico_prop");
		this.lbl_num = this.list_item.getChildByName("lbl_num");

    }
}
