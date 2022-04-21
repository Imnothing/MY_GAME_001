import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_SkillItem extends Component {
	SkillItem: Node;
	skill_frame: Node;
	label_name: Node;
	ico_attribute: Node;
	label_pp: Node;
	label_damage: Node;
	spSkill_frame: Node;
	label_sp_damage: Node;
	label_sp_pp: Node;
	ico_sp_attribute: Node;
	label_sp_name: Node;

	public static URL:string = "assets\gamebundle\prefabs\UI\Battle\SkillItem.prefab"

    onLoad () {
		this.SkillItem = this.node
		this.skill_frame = this.SkillItem.getChildByName("skill_frame");
		this.label_name = this.skill_frame.getChildByName("label_name");
		this.ico_attribute = this.skill_frame.getChildByName("ico_attribute");
		this.label_pp = this.skill_frame.getChildByName("label_pp");
		this.label_damage = this.skill_frame.getChildByName("label_damage");
		this.spSkill_frame = this.SkillItem.getChildByName("spSkill_frame");
		this.label_sp_damage = this.spSkill_frame.getChildByName("label_sp_damage");
		this.label_sp_pp = this.spSkill_frame.getChildByName("label_sp_pp");
		this.ico_sp_attribute = this.spSkill_frame.getChildByName("ico_sp_attribute");
		this.label_sp_name = this.spSkill_frame.getChildByName("label_sp_name");

    }
}
