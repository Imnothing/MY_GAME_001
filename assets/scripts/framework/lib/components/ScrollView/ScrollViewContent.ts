import ScrollViewItemEventHandler from "./../ScrollView/ScrollViewItemEventHandler";
import ScrollViewBaseItem from "./ScrollViewBaseItem";
import { _decorator, ScrollView, Prefab, instantiate, Vec2, v2, Rect, rect, UITransform, Node, UIOpacity, Vec3, v3, CCBoolean } from "cc";

const { ccclass, property } = _decorator;

/**
 * @classdesc 只渲染可视区域的ScrollView
 * @description
 *
 * 用法 :
 * 1. 将本组件挂载在节点上即可，和正常ScrollView使用一致，子item需要拖动到组件的scrollViewItemPrefab中，子item的脚本名字需要写入prefabClassName
 * 2.子节点继承ScrollViewBaseItem
 * 赋值案例：
 * 
        let sc = this.ui.ScrollViewTest.getComponent(ScrollViewContent);
        sc.releaseData();
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(i);
            sc.setData(arr);
        }
 * 原理：
 * 1. 滚动时，判断子节点是否进入了/离开了可视区域
 * 2. 根据结果回调对应事件，在可以实现类似以下功能：
 *  控制可视区域Item显示（透明度改为 255 ），非可视区域Item隐藏（透明度改为 0 ）
 */
@ccclass
export default class ScrollViewContent extends ScrollView {
    @property({
        tooltip: "是否计算在可视区域中Item的相对位置（可能会相对耗性能）"
    })
    caculatePosition: boolean = false;

    @property({
        type: Prefab,
        tooltip: "滚动视图Item预制体"
    })
    scrollViewItemPrefab: Prefab = null;

    @property({
        tooltip: "Item预制体 TS脚本组件类名 必须继承ScrollViewBaseItem"
    })
    prefabClassName: string = '';
    // @property({
    //     type: Boolean,
    //     tooltip: "是否需要分帧"
    // })
    // fenzhen: boolean = true;
    @property(CCBoolean) fenzhen: boolean = true;
    private _itemClickCallBack: Function = null;
    private _itemArgs: any[] = null;

    private _dataSource: Array<any> = null;
    private _changeIndex: number = 0;
    onEnable() {
        super.onEnable();
        this.node.on("scrolling", this._onScrollingDrawCallOpt, this);
    }

    onDisable() {
        super.onDisable();
        this.node.off("scrolling", this._onScrollingDrawCallOpt, this);
    }

    /**
     * 
     * @param array 
     * @param callBack 
     */
    public setData(array: Array<any>, callBack?: Function, args?: any[]) {
        if (array.length > 0) {
            this._itemClickCallBack = callBack;
            this._itemArgs = args;
            if (this.fenzhen) {
                this._changeIndex++;
                this.executePreFrame(this._getScrollViewItemGenerator(array), 1, this._changeIndex);
            } else {
                for (let i = 0; i < array.length; i++) {
                    var data = array[i];
                    this._initScrollViewItemPrefab(data, i);
                }
            }
            this._onScrollingDrawCallOpt();
        }
    }

    public releaseData() {
        this.content.removeAllChildren();
    }

    private _onScrollingDrawCallOpt() {
        if (this.content.children.length == 0) {
            return;
        }
        this.optDc();
    }

    public optDc() {
        ScrollViewContent.optDc(this, this.caculatePosition);
    }

    /**
     * 分帧执行 Generator 逻辑
     *
     * @param generator 生成器
     * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    private executePreFrame(generator: Generator, duration: number, changeIndex) {
        return new Promise((resolve, reject) => {
            let gen = generator;
            // 创建执行函数
            let execute = (changeIndex) => {
                // 执行之前，先记录开始时间
                let startTime = new Date().getTime();

                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next(); ; iter = gen.next()) {
                    // 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve(1);
                        return;
                    }

                    // 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime > duration) {
                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        this.scheduleOnce(() => {
                            if (this._changeIndex == changeIndex) {
                                execute(changeIndex);
                                this.optDc();
                            }
                        });
                        return;
                    }
                }
            };
            // 运行执行函数
            execute(changeIndex);
        });
    }
    /**
     * 初始化item预制体
     * @param array 
     */
    private *_getScrollViewItemGenerator(array: Array<any>) {
        for (let i = 0; i < array.length; i++) {
            var data = array[i];
            yield this._initScrollViewItemPrefab(data, i);
        }
    }
    /**
     * 设置预制体 数据
     * @param data 
     */
    private _initScrollViewItemPrefab(data: any, tag: number) {
        let itemNode = instantiate(this.scrollViewItemPrefab);
        itemNode.parent = this.content;
        if (!this.prefabClassName) {
            // LogWrap.info("请设置item预制体类名");
            itemNode.getComponent(ScrollViewBaseItem).nodeTag = tag;
            itemNode.getComponent(ScrollViewBaseItem).setData(data, this._itemClickCallBack, this._itemArgs);
            return;
        }
        //@ts-ignore
        itemNode.getComponent(this.prefabClassName).nodeTag = tag;
        //@ts-ignore
        itemNode.getComponent(this.prefabClassName).setData(data, this._itemClickCallBack, this._itemArgs);
    }

    /**
     * 优化 ScrollView Content 节点 DC，可以手动调用
     *
     * 具体为
     * 1. 进入ScrollView可视区域是，回调对应 Content 子节点上挂载的 ScollViewPlusItem 组件的 onEnterScorllViewEvents 数组事件
     * 2. 退出ScrollView可视区域是，回调对应 Content 子节点上挂载的 ScollViewPlusItem 组件的 onExitScorllViewEvents 数组事件
     */
    public static optDc(scrollView: ScrollView, caculatePosition: boolean) {
        // 获取 ScrollView Node 的左下角坐标在世界坐标系中的坐标
        let transform = scrollView.node.getComponent(UITransform);
        let svLeftBottomPoint: Vec3 = scrollView.node.parent.getComponent(UITransform).convertToWorldSpaceAR(
            v3(
                scrollView.node.getPosition().x - transform.anchorX * transform.width,
                scrollView.node.getPosition().y - transform.anchorY * transform.height
            )
        );

        // 求出 ScrollView 可视区域在世界坐标系中的矩形（碰撞盒）
        let svBBoxRect: Rect = rect(svLeftBottomPoint.x, svLeftBottomPoint.y, transform.width, transform.height);

        // console.log("svLeftBottomPoint", svLeftBottomPoint, svBBoxRect);
        // 遍历 ScrollView Content 内容节点的子节点，对每个子节点的包围盒做和 ScrollView 可视区域包围盒做碰撞判断
        scrollView.content.children.forEach((childNode: Node) => {
            // 没有绑定指定组件的子节点不处理
            let itemComponent = childNode.getComponent(ScrollViewItemEventHandler);
            // if (itemComponent == null) {
            //     return;
            // }

            // 如果相交了，那么就显示，否则就隐藏
            let childNodeBBox = childNode.getComponent(UITransform).getBoundingBoxToWorld();
            if (childNodeBBox.intersects(svBBoxRect)) {
                if (itemComponent) {
                    if (!itemComponent.isShowing) {
                        itemComponent.isShowing = true;
                        itemComponent.publishOnEnterScrollView();
                    }
                    if (caculatePosition) {
                        if (itemComponent.isShowing) {
                            itemComponent.publishOnPositionChange(
                                (childNodeBBox.x - (svBBoxRect.x - childNodeBBox.width / 2)) / (childNodeBBox.width + svBBoxRect.width),
                                (childNodeBBox.y - (svBBoxRect.y - childNodeBBox.height / 2)) / (childNodeBBox.height + svBBoxRect.height)
                            );
                        }
                    }
                } else {
                    //3.4.1&3.4.2改透明度无效，临时修改节点隐藏
                    // if (childNode.getComponent(UIOpacity).opacity != 255) {
                    //     childNode.getComponent(UIOpacity).opacity = 255;
                    // }
                    let list_item = childNode.getChildByName("list_item");
                    if (!list_item.active) {
                        list_item.active = true;
                    }
                }
            } else {
                if (itemComponent) {
                    if (itemComponent.isShowing) {
                        itemComponent.isShowing = false;
                        itemComponent.publishOnExitScrollView();
                    }
                } else {
                    // if (childNode.getComponent(UIOpacity).opacity == 255) {
                    //     childNode.getComponent(UIOpacity).opacity = 0;
                    // }
                    let list_item = childNode.getChildByName("list_item");
                    if (list_item.active) {
                        list_item.active = false;
                    }
                }
            }
        });
    }
}

