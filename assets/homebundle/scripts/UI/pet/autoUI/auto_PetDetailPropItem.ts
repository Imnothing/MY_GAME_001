import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PetDetailPropItem extends Component {
	PetDetailPropItem: Node;
	list_item: Node;
	ico_prop: Node;
	lbl_num: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\pet\PetDetailPropItem.prefab"

    onLoad () {
		this.PetDetailPropItem = this.node
		this.list_item = this.PetDetailPropItem.getChildByName("list_item");
		this.ico_prop = this.list_item.getChildByName("ico_prop");
		this.lbl_num = this.list_item.getChildByName("lbl_num");

    }
}
