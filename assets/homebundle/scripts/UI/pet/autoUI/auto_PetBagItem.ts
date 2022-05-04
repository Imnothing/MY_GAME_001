import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PetBagItem extends Component {
	PetBagItem: Node;
	item_bg_frame2: Node;
	ico_avatar_bg: Node;
	pic_avatar: Node;
	lbl_lv: Node;
	ico_first: Node;
	pet_name_bg: Node;
	lbl_pet_name: Node;
	hp_black: Node;
	hp_green: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\pet\PetBagItem.prefab"

    onLoad () {
		this.PetBagItem = this.node
		this.item_bg_frame2 = this.PetBagItem.getChildByName("item_bg_frame2");
		this.ico_avatar_bg = this.PetBagItem.getChildByName("ico_avatar_bg");
		this.pic_avatar = this.ico_avatar_bg.getChildByName("pic_avatar");
		this.lbl_lv = this.ico_avatar_bg.getChildByName("lbl_lv");
		this.ico_first = this.ico_avatar_bg.getChildByName("ico_first");
		this.pet_name_bg = this.PetBagItem.getChildByName("pet_name_bg");
		this.lbl_pet_name = this.pet_name_bg.getChildByName("lbl_pet_name");
		this.hp_black = this.PetBagItem.getChildByName("hp_black");
		this.hp_green = this.hp_black.getChildByName("hp_green");

    }
}
