import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_SkillItem extends Component {
	SkillItem: Node;
	list_item: Node;
	skill_frame: Node;
	spSkill_frame: Node;
	label_name: Node;
	ico_attribute: Node;
	label_pp: Node;
	label_damage: Node;

	public static URL:string = "assets\gamebundle\prefabs\UI\Battle\SkillItem.prefab"

    onLoad () {
		this.SkillItem = this.node
		this.list_item = this.SkillItem.getChildByName("list_item");
		this.skill_frame = this.list_item.getChildByName("skill_frame");
		this.spSkill_frame = this.skill_frame.getChildByName("spSkill_frame");
		this.label_name = this.skill_frame.getChildByName("label_name");
		this.ico_attribute = this.skill_frame.getChildByName("ico_attribute");
		this.label_pp = this.skill_frame.getChildByName("label_pp");
		this.label_damage = this.skill_frame.getChildByName("label_damage");

    }
}
