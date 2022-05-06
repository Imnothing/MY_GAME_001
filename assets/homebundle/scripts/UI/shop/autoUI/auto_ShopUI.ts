import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_ShopUI extends Component {
	ShopUI: Node;
	BG: Node;
	pet_prop: Node;
	lay_shop: Node;
	banner_shop: Node;
	lbl_shop: Node;
	prop_bg: Node;
	scv_prop: Node;
	view: Node;
	content: Node;
	top_banner: Node;
	lay_top: Node;
	btn_back: Node;
	common_back: Node;
	lbl_top: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\shop\ShopUI.prefab"

    onLoad () {
		this.ShopUI = this.node
		this.BG = this.ShopUI.getChildByName("BG");
		this.pet_prop = this.ShopUI.getChildByName("pet_prop");
		this.lay_shop = this.pet_prop.getChildByName("lay_shop");
		this.banner_shop = this.lay_shop.getChildByName("banner_shop");
		this.lbl_shop = this.banner_shop.getChildByName("lbl_shop");
		this.prop_bg = this.lay_shop.getChildByName("prop_bg");
		this.scv_prop = this.prop_bg.getChildByName("scv_prop");
		this.view = this.scv_prop.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.top_banner = this.ShopUI.getChildByName("top_banner");
		this.lay_top = this.top_banner.getChildByName("lay_top");
		this.btn_back = this.lay_top.getChildByName("btn_back");
		this.common_back = this.btn_back.getChildByName("common_back");
		this.lbl_top = this.lay_top.getChildByName("lbl_top");

    }
}
