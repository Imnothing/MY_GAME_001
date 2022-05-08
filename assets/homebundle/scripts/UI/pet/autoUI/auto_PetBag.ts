import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PetBag extends Component {
	PetBag: Node;
	BG: Node;
	pet_base: Node;
	pet: Node;
	pic_pet: Node;
	lay_left: Node;
	btn_heal: Node;
	btn_go_warehouse: Node;
	btn_warehouse: Node;
	btn_more: Node;
	mask1: Node;
	lay_petbag: Node;
	lay_fighting_petbag: Node;
	fighting_pet: Node;
	fighting_pet_container: Node;
	lay_fighting_pet: Node;
	lay_wait_petbag: Node;
	wait_pet: Node;
	wait_pet_container: Node;
	lay_wait_pet: Node;
	top_banner: Node;
	lay_top: Node;
	btn_back: Node;
	common_back: Node;
	lbl_top: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\pet\PetBag.prefab"

    onLoad () {
		this.PetBag = this.node
		this.BG = this.PetBag.getChildByName("BG");
		this.pet_base = this.PetBag.getChildByName("pet_base");
		this.pet = this.pet_base.getChildByName("pet");
		this.pic_pet = this.pet.getChildByName("pic_pet");
		this.lay_left = this.PetBag.getChildByName("lay_left");
		this.btn_heal = this.lay_left.getChildByName("btn_heal");
		this.btn_go_warehouse = this.lay_left.getChildByName("btn_go_warehouse");
		this.btn_warehouse = this.lay_left.getChildByName("btn_warehouse");
		this.btn_more = this.lay_left.getChildByName("btn_more");
		this.mask1 = this.PetBag.getChildByName("mask1");
		this.lay_petbag = this.mask1.getChildByName("lay_petbag");
		this.lay_fighting_petbag = this.lay_petbag.getChildByName("lay_fighting_petbag");
		this.fighting_pet = this.lay_fighting_petbag.getChildByName("fighting_pet");
		this.fighting_pet_container = this.lay_fighting_petbag.getChildByName("fighting_pet_container");
		this.lay_fighting_pet = this.fighting_pet_container.getChildByName("lay_fighting_pet");
		this.lay_wait_petbag = this.lay_petbag.getChildByName("lay_wait_petbag");
		this.wait_pet = this.lay_wait_petbag.getChildByName("wait_pet");
		this.wait_pet_container = this.lay_wait_petbag.getChildByName("wait_pet_container");
		this.lay_wait_pet = this.wait_pet_container.getChildByName("lay_wait_pet");
		this.top_banner = this.PetBag.getChildByName("top_banner");
		this.lay_top = this.top_banner.getChildByName("lay_top");
		this.btn_back = this.lay_top.getChildByName("btn_back");
		this.common_back = this.btn_back.getChildByName("common_back");
		this.lbl_top = this.lay_top.getChildByName("lbl_top");

    }
}
