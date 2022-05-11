import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_StartUI extends Component {
	StartUI: Node;
	item_bg: Node;
	pet_base: Node;
	pet_node: Node;
	pic_pet: Node;
	pet_name_banner: Node;
	lbl_name: Node;
	target_banner: Node;
	title_target: Node;
	ico_diamond: Node;
	lay_target: Node;
	target_item: Node;
	ico_star_light: Node;
	lbl_target: Node;
	price_banner: Node;
	title_price: Node;
	ico_diamond2: Node;
	lay_prizes: Node;
	prize_item: Node;
	pic_prize: Node;
	lbl_num: Node;
	baseInfo_bg: Node;
	lbl_planet: Node;
	btn_petbag: Node;
	btn_recover: Node;
	btn_close: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\spt\StartUI.prefab"

    onLoad () {
		this.StartUI = this.node
		this.item_bg = this.StartUI.getChildByName("item_bg");
		this.pet_base = this.item_bg.getChildByName("pet_base");
		this.pet_node = this.pet_base.getChildByName("pet_node");
		this.pic_pet = this.pet_node.getChildByName("pic_pet");
		this.pet_name_banner = this.item_bg.getChildByName("pet_name_banner");
		this.lbl_name = this.pet_name_banner.getChildByName("lbl_name");
		this.target_banner = this.item_bg.getChildByName("target_banner");
		this.title_target = this.target_banner.getChildByName("title_target");
		this.ico_diamond = this.target_banner.getChildByName("ico_diamond");
		this.lay_target = this.item_bg.getChildByName("lay_target");
		this.target_item = this.lay_target.getChildByName("target_item");
		this.ico_star_light = this.target_item.getChildByName("ico_star_light");
		this.lbl_target = this.target_item.getChildByName("lbl_target");
		this.price_banner = this.item_bg.getChildByName("price_banner");
		this.title_price = this.price_banner.getChildByName("title_price");
		this.ico_diamond2 = this.price_banner.getChildByName("ico_diamond2");
		this.lay_prizes = this.item_bg.getChildByName("lay_prizes");
		this.prize_item = this.lay_prizes.getChildByName("prize_item");
		this.pic_prize = this.prize_item.getChildByName("pic_prize");
		this.lbl_num = this.prize_item.getChildByName("lbl_num");
		this.baseInfo_bg = this.item_bg.getChildByName("baseInfo_bg");
		this.lbl_planet = this.baseInfo_bg.getChildByName("lbl_planet");
		this.btn_petbag = this.item_bg.getChildByName("btn_petbag");
		this.btn_recover = this.item_bg.getChildByName("btn_recover");
		this.btn_close = this.item_bg.getChildByName("btn_close");

    }
}
