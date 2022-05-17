import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_ShopItem extends Component {
	ShopItem: Node;
	list_item: Node;
	bg: Node;
	top_banner: Node;
	lbl_name: Node;
	ico_prop: Node;
	btn_buy: Node;
	lay_buy: Node;
	ico_diamond: Node;
	lbl_num: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\shop\ShopItem.prefab"

    onLoad () {
		this.ShopItem = this.node
		this.list_item = this.ShopItem.getChildByName("list_item");
		this.bg = this.list_item.getChildByName("bg");
		this.top_banner = this.list_item.getChildByName("top_banner");
		this.lbl_name = this.top_banner.getChildByName("lbl_name");
		this.ico_prop = this.list_item.getChildByName("ico_prop");
		this.btn_buy = this.list_item.getChildByName("btn_buy");
		this.lay_buy = this.btn_buy.getChildByName("lay_buy");
		this.ico_diamond = this.lay_buy.getChildByName("ico_diamond");
		this.lbl_num = this.lay_buy.getChildByName("lbl_num");

    }
}
