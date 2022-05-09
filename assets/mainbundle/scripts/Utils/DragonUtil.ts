/**
 * 龙骨工具类
 */

import { NodePool, Vec2, dragonBones, Node, Vec3, v3 } from "cc";
import { BundleConfigs } from "../Configs/BundleConfigs";
import { engine } from "../../../scripts/framework/engine";


export class DragonUtil {
    public static dragonPool: NodePool = new NodePool();
    public static dragonMap: Map<string, Node> = new Map<string, Node>();
    /**
     * 播放龙骨
     * diff  偏移
     * delay  延迟
     * timeScale  速度
     */
    public static playDragon(file: string, aniName, parent: Node, playTimes: number, position: Vec3, scale?: number, noDestroy?: boolean, completeCallback?: Function, frameCallback?: Function, timeScale?: number) {
        // let node = this.dragonPool.get() || new Node();
        // let node = new Node();
        let node = this.dragonMap[file];
        if (!node) {
            node = new Node();
        }
        node.setPosition(position);
        if (scale) {
            node.setScale(v3(scale, scale, scale));
        }
        let armatureDisplay = node.getComponent(dragonBones.ArmatureDisplay);
        if (!armatureDisplay) {
            armatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
        }
        this._loadDragonBones(BundleConfigs.GameBundle, armatureDisplay, file, "Armature", (armatureDisplay: dragonBones.ArmatureDisplay) => {
            if (armatureDisplay) {
                if (!parent.isValid && !noDestroy) {
                    node.destroy();
                    // this.dragonPool.put(node);
                    return;
                }
                parent.addChild(node);
                armatureDisplay.playAnimation(aniName, playTimes);
                if (timeScale)
                    armatureDisplay.timeScale = timeScale;
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    if (!noDestroy) {
                        node.destroy();
                    }
                    // this.dragonPool.put(node);
                    armatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this, armatureDisplay);
                    completeCallback && completeCallback();
                }, armatureDisplay);
                if (frameCallback)
                    armatureDisplay.addEventListener(dragonBones.EventObject.FRAME_EVENT, (event) => {
                        // cc.log(event.animationState.name);
                        console.log("event.animationState.name", event.animationState.name);
                        frameCallback(event.animationState.name);
                    }, this);
            } else {
                node.destroy();
            }
        });
        return node;
    }

    //动态加载龙骨
    static _loadDragonBones(bundleName: string, armatureDisplay: dragonBones.ArmatureDisplay, dir, armature, callback) {
        armatureDisplay.dragonAsset = null;
        armatureDisplay.dragonAtlasAsset = null;
        let bundle = engine.resLoader.getBundle(bundleName);
        if (bundle) {
            bundle.loadDir(dir, null, (err: Error, assets) => {
                if (err || assets.length <= 0) {
                    callback(null);
                    return;
                }
                assets.forEach(asset => {
                    if (asset instanceof dragonBones.DragonBonesAsset) {
                        armatureDisplay.dragonAsset = asset;
                    }
                    if (asset instanceof dragonBones.DragonBonesAtlasAsset) {
                        armatureDisplay.dragonAtlasAsset = asset;
                    }
                });
                armatureDisplay.armatureName = armature;
                callback(armatureDisplay);
            });

        }
    }
}

