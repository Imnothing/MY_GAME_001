// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Sprite,Node, Component, Slider, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class ShineTest extends Component {

    @property({ range: [-180, 180], slide: true })
    dH: number = -180;

    @property({ range: [-1, 1], slide: true })
    dS: number = 0;

    @property({ range: [-1, 1], slide: true })
    dL: number = 0;


    private sprite: Sprite;
    private material: any;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.sprite = this.node.getComponent(Sprite);
        this.material = this.sprite.getMaterial(0);

        this.Hue(this.dH);
        this.Saturation(this.dS);
        this.Lightness(this.dL);
    }

    //色相
    Hue(value: number) {
        this.material.setProperty("u_dH", value);
    }

    //饱和度
    Saturation(value: number) {
        this.material.setProperty("u_dS", value);
    }

    //亮度
    Lightness(value: number) {
        this.material.setProperty("u_dL", value);
    }

    callbackH(slider: Slider) {
        this.Hue(Number(slider.progress * 360))
    }

    callbackS(slider: Slider) {
        this.Saturation(Number(slider.progress))
    }

    callbackL(slider: Slider) {
        this.Lightness(Number(slider.progress))
    }

    onChangeHue(slide: Slider) {
        let progress = slide.progress;
        let value = (-0.5 + progress) * 360;
        this.material.setProperty("u_dH", value);
    }

    onChangeSaturation(slide: Slider) {
        let progress = slide.progress;
        let value = (-0.5 + progress) * 2;
        this.material.setProperty("u_dS", value);
    }
    onLightness(slide: Slider) {
        let progress = slide.progress;
        let value = (-0.5 + progress) * 2;
        this.material.setProperty("u_dL", value);
    }
}