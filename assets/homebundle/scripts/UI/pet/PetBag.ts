/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Prefab, Sprite, instantiate } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { LocalKeys } from '../../../../mainbundle/scripts/Data/LocalKeys';
import { PetData } from '../../../../mainbundle/scripts/Data/PetData';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { UIHelp } from '../../../../mainbundle/scripts/Utils/UIHelp';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeListenerType } from '../../Data/HomeListenerType';
import { HomeManager } from '../../Manager/HomeManager';
import auto_PetBag from './autoUI/auto_PetBag';
import PetBagItem from './PetBagItem';
const { ccclass, property } = _decorator;

@ccclass
export default class PetBag extends BaseUI {

	@property({ type: Prefab, displayName: '' })
	private petBagItem: Prefab = null;
	ui: auto_PetBag = null;

	protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/pet/PetBag`;
	protected static className = "PetBag";
	protected static layerZIndex = EnumUILayer.UILayer;
	private show_pet_now: number = null


	onLoad() {
		this.ui = this.node.addComponent(auto_PetBag);
		this.initEvent();
	}

	show(data?: any, onShowed?: Function) {
		onShowed && onShowed();
	}

	onEnable() {
		// this.ui.lay_fighting_pet.removeAllChildren();
		// this.ui.lay_wait_pet.removeAllChildren();
		if (this.ui.lay_fighting_pet.children.length == 0 || this.ui.lay_wait_pet.children.length == 0) {
			this.setData();
		}
	}

	setData() {
		let pet_list: Map<number, PetData> = GameDataManager.getInstance().getGameData().petBagList;
		let index = 0;
		for (let key in pet_list) {
			if (index >= 12) break;
			if (index == 0) {
				this.showPet(parseInt(key));
			}
			let pet_node: Node = instantiate(this.petBagItem);
			if (index < 6) {
				this.ui.lay_fighting_pet.addChild(pet_node);
			} else {
				this.ui.lay_wait_pet.addChild(pet_node);
			}
			pet_node.getComponent(PetBagItem).show(parseInt(key));
			index++;
		}
	}

	showPet(key: number) {
		if (key == this.show_pet_now) return;
		this.show_pet_now = key;
		let pet_list: Map<number, PetData> = GameDataManager.getInstance().getGameData().petBagList;
		let petInfo: PetData = pet_list[key];
		let pet: PetConfig = ConfigReader.readPetConfig(petInfo.id)
		let petPic: PicConfig = ConfigReader.readPicConfig(pet.PetPic);
		this.ui.pic_pet.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petPic.PicPath, petPic.PicName);
	}

	hide(onHided: Function): void {
		onHided();
	}

	initEvent() {
		this.onRegisterEvent(this.ui.btn_back, () => {
			this.doClose(UIConfigs.petBag);
		}, this)
		// 治疗精灵
		this.onRegisterEvent(this.ui.btn_heal, () => {
			let pet_list = GameDataManager.getInstance().getGameData().petBagList;
			if (HomeManager.petManager.recoverHp(pet_list[this.show_pet_now])) {
				HomeManager.petManager.recoverPP(pet_list[this.show_pet_now])
				engine.listenerManager.trigger(HomeListenerType.RefreshPetBagItem, this.show_pet_now);
			} else {
				UIHelp.showTip("该精灵状态恢复完成，无需补充");
			}
		}, this)
		this.onRegisterEvent(this.ui.btn_more, () => {
			engine.uiManager.openUIAsync(UIConfigs.petDetail, this.show_pet_now)
		}, this)

		this.onAddEvent(HomeListenerType.SwitchPetShow, this, this.showPet)
	}

}
