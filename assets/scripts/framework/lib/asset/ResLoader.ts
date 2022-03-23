import { Asset, AssetManager, assetManager, Constructor, error, GbufferStage, js, resources, SceneAsset, SpriteAtlas, SpriteFrame, Texture2D, __private } from "cc";
import { engine } from "../../engine";
import { LOG_TAG } from "../logger/LoggerInterface";

export type ProgressCallback = __private._cocos_core_asset_manager_shared__ProgressCallback;
export type CompleteCallback<T = any> = __private._cocos_core_asset_manager_shared__CompleteCallbackWithData;
export type IRemoteOptions = __private._cocos_core_asset_manager_shared__IRemoteOptions;
export type AssetType<T = Asset> = Constructor<T>;

interface ILoadResArgs<T extends Asset> {
    bundle?: string;
    dir?: string;
    paths: string | string[];
    type: AssetType<T> | null;
    onProgress: ProgressCallback | null;
    onComplete: CompleteCallback<T> | null;
}

export default class ResLoader {

    public resMap: any = {};
    /**
     * 加载资源包
     * @param url       资源地址
     * @param complete  完成事件
     * @param v         资源MD5版本号
     */
    public loadBundle(url: string, v?: string) {
        return new Promise<AssetManager.Bundle>((resolve, reject) => {
            assetManager.loadBundle(url, { version: v }, (err, bundle: AssetManager.Bundle) => {
                if (err) {
                    return error(err);
                }
                resolve(bundle);
            });
        });
    }

    /**
     * 获取指定bundle
     * @param bundleName 资源地址
     */
    public getBundle(bundleName: string): AssetManager.Bundle {
        var bundle = assetManager.getBundle(bundleName);
        return bundle;
    }

    public parseLoadResArgs<T extends Asset>(
        paths: string | string[],
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onComplete?: ProgressCallback | CompleteCallback | null
    ) {
        let pathsOut: any = paths;
        let typeOut: any = type;
        let onProgressOut: any = onProgress;
        let onCompleteOut: any = onComplete;
        if (onComplete === undefined) {
            const isValidType = js.isChildClassOf(type as AssetType, Asset);
            if (onProgress) {
                onCompleteOut = onProgress as CompleteCallback;
                if (isValidType) {
                    onProgressOut = null;
                }
            }
            else if (onProgress === undefined && !isValidType) {
                onCompleteOut = type as CompleteCallback;
                onProgressOut = null;
                typeOut = null;
            }
            if (onProgress !== undefined && !isValidType) {
                onProgressOut = type as ProgressCallback;
                typeOut = null;
            }
        }
        return { paths: pathsOut, type: typeOut, onProgress: onProgressOut, onComplete: onCompleteOut };
    }

    private loadByBundleAndArgs<T extends Asset>(bundle: AssetManager.Bundle, args: ILoadResArgs<T>): void {
        if (args.dir) {
            bundle.loadDir(args.paths as string, args.type, args.onProgress, args.onComplete);
        }
        else {
            if (typeof args.paths == 'string') {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
            else {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
        }
    }

    private loadByArgs<T extends Asset>(args: ILoadResArgs<T>) {
        if (args.bundle) {
            if (assetManager.bundles.has(args.bundle)) {
                let bundle = assetManager.bundles.get(args.bundle);
                this.loadByBundleAndArgs(bundle!, args);
            }
            else {
                // 自动加载bundle
                assetManager.loadBundle(args.bundle, (err, bundle) => {
                    if (!err) {
                        this.loadByBundleAndArgs(bundle, args);
                    }
                })
            }
        }
        else {
            this.loadByBundleAndArgs(resources, args);
        }
    }

    public load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(
        bundleName: string,
        paths?: string | string[] | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    ) {
        let args: ILoadResArgs<T> | null = null;
        if (typeof paths === "string" || paths instanceof Array) {
            args = this.parseLoadResArgs(paths, type, onProgress, onComplete);
            args.bundle = bundleName;
        }
        else {
            args = this.parseLoadResArgs(bundleName, paths, type, onProgress);
        }
        this.loadByArgs(args);
    }

    public loadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(bundleName: string, dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(bundleName: string, dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends Asset>(
        bundleName: string,
        dir?: string | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    ) {
        let args: ILoadResArgs<T> | null = null;
        if (typeof dir === "string") {
            args = this.parseLoadResArgs(dir, type, onProgress, onComplete);
            args.bundle = bundleName;
        }
        else {
            args = this.parseLoadResArgs(bundleName, dir, type, onProgress);
        }
        args.dir = args.paths as string;
        this.loadByArgs(args);
    }

    public loadRemote<T extends Asset>(url: string, options: IRemoteOptions | null, onComplete?: CompleteCallback<T> | null): void;
    public loadRemote<T extends Asset>(url: string, onComplete?: CompleteCallback<T> | null): void;
    public loadRemote(url: string, ...args: any): void {
        assetManager.loadRemote(url, args);
    }

    /**
     * 释放bundle内指定资源
     * @param path 
     * @param bundleName 
     */
    public release(path: string, bundleName: string = "resources", type?: typeof Asset) {
        var bundle = assetManager.getBundle(bundleName);
        bundle?.release(path, type);
        if (this.resMap[`${bundleName}_${path}`]) {
            delete this.resMap[`${bundleName}_${path}`];
        }
    }

    public releaseDir(path: string, bundleName: string = "resources") {
        var bundle: AssetManager.Bundle | null = assetManager.getBundle(bundleName);
        var infos = bundle?.getDirWithPath(path);
        infos?.map(function (info) {
            bundle?.release(info.path);
        });

        if (path == "" && bundleName != "resources" && bundle) {
            assetManager.removeBundle(bundle);
        }
    }

    public get<T extends Asset>(path: string, type?: __private._cocos_core_asset_manager_shared__AssetType<T> | null, bundleName: string = "resources"): T | null {
        var bundle: AssetManager.Bundle | null = assetManager.getBundle(bundleName);
        return bundle!.get(path, type);
    }

    public dump() {
        assetManager.assets.forEach((value: Asset, key: string) => {
            console.log(key);
        })
        console.log(`当前资源总数:${assetManager.assets.count}`);
    }

    // 官网解释
    // 开发者可以将自己的场景、资源、代码划分成多个 Asset Bundle，并在运行时动态加载资源，从而实现资源的模块化，以便在需要时加载对应资源。例如：
    // assetManager.loadBundle('testBundle', function (err, bundle) {
    //     bundle.load('textures/background', (err, asset) => {
    //         // ...
    //     });
    // });

    public loadSync<T extends Asset>(bundle: AssetManager.Bundle, path: string, type?: typeof Asset): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            bundle.load(path, type, (error: Error, asset: T) => {
                error ? reject(error) : resolve(asset);
            });
        });
    }

    public loadDirSync<T extends Asset>(bundle: AssetManager.Bundle, dirPath: string, type?: typeof Asset): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            bundle.loadDir(dirPath, type, (error: Error, asset: Array<T>) => {
                error ? reject(error) : resolve(asset);
            });
        });
    }

    public loadSceneSync(bundle: AssetManager.Bundle, sceneName: string, options?: Record<string, any>) {
        return new Promise<SceneAsset>((resolve, reject) => {
            bundle.loadScene(sceneName, options, (error: Error, asset: SceneAsset) => {
                error ? reject(error) : resolve(asset);
            });
        });
    }

    /**
     * 加载指定bundle里的资源
     * @param bundle 
     * @param path 
     * @param type 
     * @returns 
     */
    public loadBundleResSync<T extends Asset>(bundleName: string, path: string, type?: typeof Asset): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let key = this.getResMapKey(bundleName, path);
            if (this.resMap[key]) {
                resolve(this.resMap[key]);
                return;
            }

            let bundle = this.getBundle(bundleName);
            if (!bundle) {
                reject("bundleName未加载")
            } else {
                if (type == SpriteFrame) {
                    path = path + "/spriteFrame";
                } else if (type == Texture2D) {
                    path = path + "/texture";
                }
                let time1 = Date.now();
                bundle.load(path, type, (error: Error, asset: T) => {
                    if (!error) {
                        engine.logger.log(LOG_TAG.GAME, path, "图集加载时间", Date.now() - time1);
                        this.resMap[this.getResMapKey(bundleName, path)] = asset;
                    }
                    error ? reject(error) : resolve(asset);
                });

            }
        });
    }

    /**
     * 加载多个指定bundle里的资源
     * @param bundle 
     * @param path 
     * @param type 
     * @returns 
     */
    public loadAllBundleResSync(bundleName: string, paths: Array<string>, type?: typeof Asset): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            let proArr: Promise<void>[] = [];
            let bundle = this.getBundle(bundleName);
            if (!bundle) {
                reject("bundleName未加载")
            } else {
                let time1 = Date.now();
                paths.forEach(path => {
                    if (type == SpriteFrame) {
                        path = path + "/spriteFrame";
                    } else if (type == Texture2D) {
                        path = path + "/texture";
                    }
                    proArr.push(new Promise<void>((r2, j2) => {
                        bundle.load(path, type, (error: Error, asset: Asset) => {
                            if (!error) {
                                this.resMap[this.getResMapKey(bundleName, path)] = asset;
                            }
                            error ? j2(error) : r2();
                        });

                    }));
                });

                await Promise.all(proArr).then(() => {
                    engine.logger.log(LOG_TAG.GAME, "所有图集加载时间", Date.now() - time1);
                    resolve();
                });
            }
        });
    }

    /**
     * 获取缓存的资源
     * @param bundleName 
     * @param path 
     * @returns 
     */
    public getCacheRes<T extends Asset>(bundleName: string, path: string): T {
        let key = this.getResMapKey(bundleName, path);
        return this.resMap[key]
    }

    /**
     * 获取指定图集的图片
     * @param path 
     * @param tag 
     * @returns 
     */
    public getAtlas(bundleName: string, name: string): SpriteAtlas {
        let key = this.getResMapKey(bundleName, name);
        if (!this.resMap[key]) {
            engine.logger.error(LOG_TAG.GAME, '找不到图集', key);
            return null;
        }
        let atlas = this.resMap[key] as SpriteAtlas;
        return atlas;
    }

    /**
     * 获取指定图集的图片
     * @param path 
     * @param tag 
     * @returns 
     */
    public getAtlasByTag(bundleName: string, name: string, tag: string): SpriteFrame {
        let key = this.getResMapKey(bundleName, name);
        if (!this.resMap[key]) {
            engine.logger.error(LOG_TAG.GAME, '找不到图集', key);
            return null;
        }
        let atlas = this.resMap[key] as SpriteAtlas;
        return atlas.getSpriteFrame(tag);
    }

    /**
     * 获取指定图片
     * @param name 
     * @returns 
     */
    public getSpriteFrameByName(bundleName: string, name: string): SpriteFrame {
        let key = this.getResMapKey(bundleName, name);
        if (!this.resMap[key]) {
            engine.logger.error(LOG_TAG.GAME, '找不到图片', key);
            return null;
        }
        return this.resMap[key] as SpriteFrame;
    }

    private getResMapKey(bundleName: string, name: string) {
        return `${bundleName}_${name}`
    }
}

export let resLoader = new ResLoader();