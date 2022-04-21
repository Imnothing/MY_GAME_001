import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_BattleUI extends Component {
	BattleUI: Node;
	battle_bg: Node;
	top: Node;
	pet_avatar: Node;
	layout_line1: Node;
	level_bg: Node;
	label_lv: Node;
	ico_attribute: Node;
	label_petName: Node;
	hp_bar: Node;
	layout_line2: Node;
	ico_resistance: Node;
	ico_shield_normal: Node;
	label_shield_normal: Node;
	ico_shield_fix: Node;
	label_shield_normal-001: Node;
	ico_feature: Node;
	top_banner: Node;
	putong: Node;
	ico_round: Node;
	label_round: Node;
	count_bg: Node;
	count_less_bg: Node;
	label_count: Node;
	View: Node;
	PetLayer: Node;
	EffectLayer: Node;
	bottom: Node;
	prop_node: Node;
	layout_prop: Node;
	btn_hp_dark: Node;
	btn_hp: Node;
	btn_pp_dark: Node;
	btn_pp: Node;
	layout_propItem: Node;
	skill_node: Node;
	layout_skill: Node;
	bottom_bg: Node;
	pet_change: Node;
	ico_surrender: Node;
	ico_prop: Node;
	btn_back: Node;

	public static URL:string = "assets\gamebundle\prefabs\UI\Battle\BattleUI.prefab"

    onLoad () {
		this.BattleUI = this.node
		this.battle_bg = this.BattleUI.getChildByName("battle_bg");
		this.top = this.BattleUI.getChildByName("top");
		this.pet_avatar = this.top.getChildByName("pet_avatar");
		this.layout_line1 = this.pet_avatar.getChildByName("layout_line1");
		this.level_bg = this.layout_line1.getChildByName("level_bg");
		this.label_lv = this.level_bg.getChildByName("label_lv");
		this.ico_attribute = this.layout_line1.getChildByName("ico_attribute");
		this.label_petName = this.layout_line1.getChildByName("label_petName");
		this.hp_bar = this.pet_avatar.getChildByName("hp_bar");
		this.layout_line2 = this.pet_avatar.getChildByName("layout_line2");
		this.ico_resistance = this.layout_line2.getChildByName("ico_resistance");
		this.ico_shield_normal = this.layout_line2.getChildByName("ico_shield_normal");
		this.label_shield_normal = this.ico_shield_normal.getChildByName("label_shield_normal");
		this.ico_shield_fix = this.layout_line2.getChildByName("ico_shield_fix");
		this.label_shield_normal-001 = this.ico_shield_fix.getChildByName("label_shield_normal-001");
		this.ico_feature = this.pet_avatar.getChildByName("ico_feature");
		this.top_banner = this.top.getChildByName("top_banner");
		this.putong = this.top_banner.getChildByName("putong");
		this.ico_round = this.top.getChildByName("ico_round");
		this.label_round = this.ico_round.getChildByName("label_round");
		this.count_bg = this.top.getChildByName("count_bg");
		this.count_less_bg = this.count_bg.getChildByName("count_less_bg");
		this.label_count = this.count_bg.getChildByName("label_count");
		this.View = this.BattleUI.getChildByName("View");
		this.PetLayer = this.View.getChildByName("PetLayer");
		this.EffectLayer = this.View.getChildByName("EffectLayer");
		this.bottom = this.BattleUI.getChildByName("bottom");
		this.prop_node = this.bottom.getChildByName("prop_node");
		this.layout_prop = this.prop_node.getChildByName("layout_prop");
		this.btn_hp_dark = this.layout_prop.getChildByName("btn_hp_dark");
		this.btn_hp = this.btn_hp_dark.getChildByName("btn_hp");
		this.btn_pp_dark = this.layout_prop.getChildByName("btn_pp_dark");
		this.btn_pp = this.btn_pp_dark.getChildByName("btn_pp");
		this.layout_propItem = this.prop_node.getChildByName("layout_propItem");
		this.skill_node = this.bottom.getChildByName("skill_node");
		this.layout_skill = this.skill_node.getChildByName("layout_skill");
		this.bottom_bg = this.bottom.getChildByName("bottom_bg");
		this.pet_change = this.bottom_bg.getChildByName("pet_change");
		this.ico_surrender = this.bottom_bg.getChildByName("ico_surrender");
		this.ico_prop = this.bottom_bg.getChildByName("ico_prop");
		this.btn_back = this.ico_prop.getChildByName("btn_back");

    }
}
