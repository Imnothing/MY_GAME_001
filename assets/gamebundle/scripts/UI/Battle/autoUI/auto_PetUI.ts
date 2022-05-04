import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_PetUI extends Component {
	PetUI: Node;
	pet_sprite: Node;

	public static URL:string = "assets\gamebundle\prefabs\UI\Battle\PetUI.prefab"

    onLoad () {
		this.PetUI = this.node
		this.pet_sprite = this.PetUI.getChildByName("pet_sprite");

    }
}
