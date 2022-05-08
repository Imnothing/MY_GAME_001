/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Prefab } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import auto_PetBag from './autoUI/auto_PetBag';
const { ccclass, property } = _decorator;

@ccclass
export default class PetBag extends BaseUI {

	@property({ type: Prefab, displayName: '' })
	private petBagItem: Prefab = null;
	ui: auto_PetBag = null;

	protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/pet/PetBag`;
	protected static className = "PetBag";
	protected static layerZIndex = EnumUILayer.UILayer;


	onLoad() {
		this.ui = this.node.addComponent(auto_PetBag);
		this.initEvent();
	}

	show(data?: any, onShowed?: Function) {
		onShowed && onShowed();
	}

	hide(onHided: Function): void {
		onHided();
	}

	initEvent() {

	}

}
