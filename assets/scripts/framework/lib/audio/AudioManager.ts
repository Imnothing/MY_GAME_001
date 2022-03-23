import { Component, game, Node } from "cc";
import { SettingInfo } from "../../../../mainbundle/scripts/Data/Model/SettingInfo";
import { MusicConfig } from "../../../../mainbundle/scripts/Datatable/MusicConfig";
import { GameDataManager } from "../../../../mainbundle/scripts/Manager/GameDataManager";
import { engine } from "../../engine";
import { AudioEffect } from "./AudioEffect";
import { AudioMusic } from "./AudioMusic";

const LOCAL_AUDIO_KEY = "game_audio";

export class AudioManager extends Component {
    private local_data: any = {};

    private music!: AudioMusic;
    private effect!: AudioEffect;

    private _volume_music: number = 1;
    private _volume_effect: number = 1;
    private _switch_music: boolean = true;
    private _switch_effect: boolean = true;

    public init() {
        var node = new Node("UIAudioManager");
        game.addPersistRootNode(node);
        node.addComponent(AudioManager);
        var music = new Node("UIMusic");
        music.parent = node;
        this.music = music.addComponent(AudioMusic);

        var effect = new Node("UIEffect");
        effect.parent = node;
        this.effect = effect.addComponent(AudioEffect);

        let data = engine.storage.getLocalItem(LOCAL_AUDIO_KEY);
        if (data) {
            try {
                this.local_data = JSON.parse(data);
                this._volume_music = this.local_data.volume_music;
                this._volume_effect = this.local_data.volume_effect;
                this._switch_music = this.local_data.switch_music;
                this._switch_effect = this.local_data.switch_effect;
            }
            catch (e) {
                this.local_data = {};
                this._volume_music = 1;
                this._volume_effect = 1;
                this._switch_music = true;
                this._switch_effect = true;
            }

            this.music.volume = this._volume_music;
            this.effect.volume = this._volume_effect;
        }
    }



    /**
     *  播放背景音乐
     * @param url        资源地址
     * @param callback   音乐播放完成事件
     */
    playMusic(id: string, callback: Function | null = null) {
        let setInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        if (!setInfo.switchMusic) return;
        if (this._switch_music) {
            let musicConfig = engine.ccTable.get("MusicConfig");
            if (!musicConfig) return;
            let itemConfig: MusicConfig = musicConfig[id];
            if (!itemConfig) return;
            let url = "audios/" + itemConfig.File;
            this.music.volume = itemConfig.MusicPower / 100;

            this.music.load(url);
            this.music.onComplete = callback;
        }
    }



    /**
     *  播放音效
     * @param url        资源地址
     * @param callback   音乐播放完成事件
     */
    playSound(id: string) {
        let setInfo: SettingInfo = GameDataManager.getInstance().getGameData().settingInfo;
        if (!setInfo.switchSound) return;
        if (this._switch_effect) {
            let musicConfig = engine.ccTable.get("MusicConfig");
            if (!musicConfig) return;
            let itemConfig: MusicConfig = musicConfig[id];
            if (!itemConfig) return;
            this.effect.volume = itemConfig.MusicPower / 100;
            let path = "audios/" + itemConfig.File;
            this.effect.load(path);
        }
    }

    /**
     * 播放音效
     * @param url        资源地址
     */
    doFunc(url: string) {
        if (this._switch_effect) {
            this.effect.load(url);
        }
    }

    /** 背景音乐音量 */
    public get musicVolume(): number {
        return this._volume_music;
    }
    public set musicVolume(value: number) {
        this._volume_music = value;
        this.music.volume = value;
    }

    /** 音效音量 */
    public get effectVolume(): number {
        return this._volume_effect;
    }
    public set effectVolume(value: number) {
        this._volume_effect = value;
        this.effect.volume = value;
    }

    /** 音乐开关 */
    public getSwitchMusic(): boolean {
        return this._switch_music;
    }
    public setSwitchMusic(value: boolean) {
        this._switch_music = value;

        if (value == false)
            this.music.stop();
    }

    /** 音效开关 */
    public getSwitchEffect(): boolean {
        return this._switch_effect;
    }
    public setSwitchEffect(value: boolean) {
        this._switch_effect = value;
        if (value == false)
            this.effect.stop();
    }

    public resumeAll() {
        if (this.music) {
            this.music.play();
            this.effect.play();
        }
    }

    public pauseAll() {
        if (this.music) {
            this.music.pause();
            this.effect.pause();
        }
    }

    public stopAll() {
        if (this.music) {
            this.music.stop();
            this.effect.stop();
        }
    }

    public save() {
        this.local_data.volume_music = this._volume_music;
        this.local_data.volume_effect = this._volume_effect;
        this.local_data.switch_music = this._switch_music;
        this.local_data.switch_effect = this._switch_effect;

        let data = JSON.stringify(this.local_data);
        engine.storage.setLocalItem(LOCAL_AUDIO_KEY, data);
    }
}