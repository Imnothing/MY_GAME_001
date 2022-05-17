import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PetItem extends Component {
	PetItem: Node;
	ico_avatar: Node;
	small_hp_frame: Node;
	small_hp: Node;
	lbl_level: Node;
	lbl_hp: Node;
	lay_petInfo: Node;
	ico_attribute: Node;
	lbl_name: Node;
	pet_state: Node;
	ico_state: Node;

	public static URL:string = "assets\gamebundle\prefabs\UI\Battle\PetItem.prefab"

    onLoad () {
		this.PetItem = this.node
		this.ico_avatar = this.PetItem.getChildByName("ico_avatar");
		this.small_hp_frame = this.PetItem.getChildByName("small_hp_frame");
		this.small_hp = this.small_hp_frame.getChildByName("small_hp");
		this.lbl_level = this.PetItem.getChildByName("lbl_level");
		this.lbl_hp = this.PetItem.getChildByName("lbl_hp");
		this.lay_petInfo = this.PetItem.getChildByName("lay_petInfo");
		this.ico_attribute = this.lay_petInfo.getChildByName("ico_attribute");
		this.lbl_name = this.lay_petInfo.getChildByName("lbl_name");
		this.pet_state = this.PetItem.getChildByName("pet_state");
		this.ico_state = this.pet_state.getChildByName("ico_state");

    }
}
