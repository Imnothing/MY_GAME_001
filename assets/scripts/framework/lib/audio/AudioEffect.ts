import { AudioClip, AudioSource, error,warn, _decorator } from 'cc';
import { engine } from '../../engine';
const { ccclass, menu } = _decorator;

/**
 * 注：用playOneShot播放的音乐效果，在播放期间暂时没办法即时关闭音乐
 */

/** 游戏音效 */
@ccclass('AudioEffect')
export class AudioEffect extends AudioSource {
    private effects: Map<string, AudioClip> = new Map<string, AudioClip>();

    public load(url: string, callback?: Function) {
        engine.resLoader.load(url, AudioClip, (err: Error | null, data: AudioClip) => {
            if (err) {
                warn(err);
                return;
            }

            this.effects.set(url, data);
            this.playOneShot(data, this.volume);
            callback && callback();
        });
    }

    release() {
        for (let key in this.effects) {
            engine.resLoader.release(key);
        }
        this.effects.clear();
    }
}
