import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_MainUI extends Component {
	MainUI: Node;
	BG: Node;
	mainbg1: Node;
	main_bg_mask: Node;
	main_bg2: Node;
	top: Node;
	userInfo: Node;
	user_bar: Node;
	ico_avatar_frame: Node;
	ico_avatar: Node;
	lbl_user_name: Node;
	lbl_user_sign: Node;
	topInfo: Node;
	lay_topInfo: Node;
	ico_setting: Node;
	ico_mail: Node;
	ico_firend: Node;
	money_node: Node;
	ico_diamond: Node;
	lbl_money: Node;
	middle: Node;
	main_func: Node;
	mask2: Node;
	mask1: Node;
	btn_except: Node;
	main_task: Node;
	btn_challenge: Node;
	ico_challenge: Node;
	btn_pve: Node;
	ico_pve: Node;
	btn_mall: Node;
	signet_recruit: Node;
	pet_recruit: Node;
	pet_fight: Node;
	ico_fight: Node;
	pet_show: Node;
	bottom: Node;
	bottom_banner: Node;
	lay_bottom: Node;
	node_pet: Node;
	ico_pet: Node;
	split_pet: Node;
	node_user: Node;
	ico_user: Node;
	split_user: Node;
	node_handbook: Node;
	ico_handbook: Node;
	split_handbook: Node;
	node_prop: Node;
	ico_prop: Node;
	split_prop: Node;
	node_team: Node;
	ico_team: Node;
	split_team: Node;
	node_map: Node;
	ico_map: Node;
	split_map: Node;
	node_home: Node;
	ico_home: Node;
	split_home: Node;

	public static URL:string = "assets\homebundle\prefabs\UI\main\MainUI.prefab"

    onLoad () {
		this.MainUI = this.node
		this.BG = this.MainUI.getChildByName("BG");
		this.mainbg1 = this.BG.getChildByName("mainbg1");
		this.main_bg_mask = this.BG.getChildByName("main_bg_mask");
		this.main_bg2 = this.BG.getChildByName("main_bg2");
		this.top = this.MainUI.getChildByName("top");
		this.userInfo = this.top.getChildByName("userInfo");
		this.user_bar = this.userInfo.getChildByName("user_bar");
		this.ico_avatar_frame = this.userInfo.getChildByName("ico_avatar_frame");
		this.ico_avatar = this.ico_avatar_frame.getChildByName("ico_avatar");
		this.lbl_user_name = this.userInfo.getChildByName("lbl_user_name");
		this.lbl_user_sign = this.userInfo.getChildByName("lbl_user_sign");
		this.topInfo = this.top.getChildByName("topInfo");
		this.lay_topInfo = this.topInfo.getChildByName("lay_topInfo");
		this.ico_setting = this.lay_topInfo.getChildByName("ico_setting");
		this.ico_mail = this.lay_topInfo.getChildByName("ico_mail");
		this.ico_firend = this.lay_topInfo.getChildByName("ico_firend");
		this.money_node = this.lay_topInfo.getChildByName("money_node");
		this.ico_diamond = this.money_node.getChildByName("ico_diamond");
		this.lbl_money = this.money_node.getChildByName("lbl_money");
		this.middle = this.MainUI.getChildByName("middle");
		this.main_func = this.middle.getChildByName("main_func");
		this.mask2 = this.main_func.getChildByName("mask2");
		this.mask1 = this.main_func.getChildByName("mask1");
		this.btn_except = this.main_func.getChildByName("btn_except");
		this.main_task = this.main_func.getChildByName("main_task");
		this.btn_challenge = this.main_func.getChildByName("btn_challenge");
		this.ico_challenge = this.btn_challenge.getChildByName("ico_challenge");
		this.btn_pve = this.main_func.getChildByName("btn_pve");
		this.ico_pve = this.btn_pve.getChildByName("ico_pve");
		this.btn_mall = this.main_func.getChildByName("btn_mall");
		this.signet_recruit = this.main_func.getChildByName("signet_recruit");
		this.pet_recruit = this.main_func.getChildByName("pet_recruit");
		this.pet_fight = this.main_func.getChildByName("pet_fight");
		this.ico_fight = this.pet_fight.getChildByName("ico_fight");
		this.pet_show = this.middle.getChildByName("pet_show");
		this.bottom = this.MainUI.getChildByName("bottom");
		this.bottom_banner = this.bottom.getChildByName("bottom_banner");
		this.lay_bottom = this.bottom_banner.getChildByName("lay_bottom");
		this.node_pet = this.lay_bottom.getChildByName("node_pet");
		this.ico_pet = this.node_pet.getChildByName("ico_pet");
		this.split_pet = this.node_pet.getChildByName("split_pet");
		this.node_user = this.lay_bottom.getChildByName("node_user");
		this.ico_user = this.node_user.getChildByName("ico_user");
		this.split_user = this.node_user.getChildByName("split_user");
		this.node_handbook = this.lay_bottom.getChildByName("node_handbook");
		this.ico_handbook = this.node_handbook.getChildByName("ico_handbook");
		this.split_handbook = this.node_handbook.getChildByName("split_handbook");
		this.node_prop = this.lay_bottom.getChildByName("node_prop");
		this.ico_prop = this.node_prop.getChildByName("ico_prop");
		this.split_prop = this.node_prop.getChildByName("split_prop");
		this.node_team = this.lay_bottom.getChildByName("node_team");
		this.ico_team = this.node_team.getChildByName("ico_team");
		this.split_team = this.node_team.getChildByName("split_team");
		this.node_map = this.lay_bottom.getChildByName("node_map");
		this.ico_map = this.node_map.getChildByName("ico_map");
		this.split_map = this.node_map.getChildByName("split_map");
		this.node_home = this.lay_bottom.getChildByName("node_home");
		this.ico_home = this.node_home.getChildByName("ico_home");
		this.split_home = this.node_home.getChildByName("split_home");

    }
}