import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PetDetailSkillItem extends Component {
	PetDetailSkillItem: Node;
	ico_attribute: Node;
	lbl_skill_name: Node;
	lbl_skill_damage: Node;
	lbl_skill_PP: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\pet\PetDetailSkillItem.prefab"

    onLoad () {
		this.PetDetailSkillItem = this.node
		this.ico_attribute = this.PetDetailSkillItem.getChildByName("ico_attribute");
		this.lbl_skill_name = this.PetDetailSkillItem.getChildByName("lbl_skill_name");
		this.lbl_skill_damage = this.PetDetailSkillItem.getChildByName("lbl_skill_damage");
		this.lbl_skill_PP = this.PetDetailSkillItem.getChildByName("lbl_skill_PP");

    }
}
