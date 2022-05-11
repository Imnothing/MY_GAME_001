import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_SptItem extends Component {
	SptItem: Node;
	list_item: Node;
	pic_planet: Node;
	star_contianer: Node;
	lbl_planet: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\spt\SptItem.prefab"

    onLoad () {
		this.SptItem = this.node
		this.list_item = this.SptItem.getChildByName("list_item");
		this.pic_planet = this.list_item.getChildByName("pic_planet");
		this.star_contianer = this.pic_planet.getChildByName("star_contianer");
		this.lbl_planet = this.star_contianer.getChildByName("lbl_planet");

    }
}
