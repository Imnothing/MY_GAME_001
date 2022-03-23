import { Component, UIOpacity, _decorator } from "cc";
import { BaseUI } from "../../router/BaseUI";

const { ccclass, menu, property } = _decorator;

export interface ScrollViewBaseItemClass<T extends ScrollViewBaseItem> {
	new(): T;
}
@ccclass
export default class ScrollViewBaseItem extends BaseUI {

	public _itemClickCallBack: Function = null;
	public nodeTag: number;

	onLoad() {
		this.node.getComponent(UIOpacity).opacity = 0;
	}

	/**
	 * 本Item进入ScrollView的时候回调
	 */
	onEnterSrcollView() {
		this.node.getComponent(UIOpacity).opacity = 255;
	}

	/**
	 * 本Item离开ScrollView的时候回调
	 */
	onExitScrollView() {
		this.node.getComponent(UIOpacity).opacity = 0;
	}

	/**
	 * Item 进入 ScrollView 后，位置发生移动时回调，离开ScrollView后不会回调
	 *
	 * @param xOffsetPercent 相对于 ScrollView 可视区域中心点，X的偏移量百分比，取值范围：[0, 1]。其中，0：为在可视区域最左边，1：为可视区域最右边
	 * @param yOffsetPercent 相对于 ScrollView 可视区域中心点，Y的偏移量百分比，取值范围：[0, 1]。其中，0：为在可视区域最下边，1：为可视区域最上边
	 */
	onPositionChange(xOffsetPercent: number, yOffsetPercent: number) {

	}

	/**
	 * 设置Item数据
	 * @param data 
	 */
	setData(data: any, callBack?: Function, args?: any[]) {

	}
	/**
	 * Item点击事件
	 */
	clickItem() {

	}
}