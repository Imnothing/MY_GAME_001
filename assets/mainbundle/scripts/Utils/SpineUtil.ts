/**
 * spine工具类
 */

import { NodePool, Vec2, dragonBones, Node, Vec3, v3, sp } from "cc";
import { BundleConfigs } from "../Configs/BundleConfigs";
import { engine } from "../../../scripts/framework/engine";


export class SpineUtil {
    public static dragonPool: NodePool = new NodePool();
    public static playCount: number = 0;
    /**
     * 播放龙骨
     * diff  偏移
     * delay  延迟
     * timeScale  速度
     */
    public static playSpine(effectId, aniName, parent: Node, loop: boolean, position: Vec3, isCache: boolean, scale?: number, noDestroy?: boolean, completeCallback?: Function, frameCallback?: Function, timeScale?: number) {
        // let node = this.dragonPool.get() || new Node();
        let effectConfig = engine.ccTable.get("EffectConfig")[effectId];
        let node = new Node();
        node.setPosition(position);
        // if (scale) {
        //     node.setScale(v3(scale, scale, scale));
        // }
        node.setScale(v3(effectConfig.EffectScale, effectConfig.EffectScale, effectConfig.EffectScale));
        let skeleton = node.getComponent(sp.Skeleton);
        if (!skeleton) {
            skeleton = node.addComponent(sp.Skeleton);
            skeleton.premultipliedAlpha = true;
        }
        this.playCount++;
        // engine.logger.log(LOG_TAG.GAME,"aniName = ",aniName);
        // engine.logger.log(LOG_TAG.GAME,"playCount = ",this.playCount);
        if (isCache)
            skeleton.setAnimationCacheMode(sp.AnimationCacheMode.SHARED_CACHE);
        if (timeScale) {
            skeleton.timeScale = timeScale;
        }
        this._loadSpine(BundleConfigs.GameBundle, effectConfig.EffectPath, (_skeletonData: sp.SkeletonData) => {
            if (_skeletonData) {
                skeleton.skeletonData = _skeletonData;

                if (!parent.isValid && !noDestroy) {
                    node.destroy();
                    return;
                }
                parent.addChild(node);
                skeleton.setAnimation(0, aniName, loop);
                skeleton.setCompleteListener(() => {
                    if (!noDestroy && !loop) {
                        node.destroy();
                    }
                    skeleton.setCompleteListener(null);
                    completeCallback && completeCallback();
                })
                if (frameCallback)
                    skeleton.setEventListener((trackIndex, event: sp.spine.Event) => {
                        frameCallback(event.data.name);
                    })
            } else {
                node.destroy();
            }
        });
        return node;
    }

    //动态加载龙骨
    static _loadSpine(bundleName: string, dir, callback) {
        let bundle = engine.resLoader.getBundle(bundleName);
        if (bundle) {
            bundle.load(dir, sp.SkeletonData, (err: Error, asset: sp.SkeletonData) => {
                if (err) {
                    callback(null);
                    return;
                }
                callback(asset);
            });

        }
    }
}

