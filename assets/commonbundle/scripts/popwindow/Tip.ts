import { _decorator, Component, Label, Sprite, tween, v2, UIOpacity, Vec3, Tween } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export class Tip extends Component {
    @property(Label)
    private tipLabel: Label = null;
    @property(Sprite)
    private iconPic: Sprite = null;
    @property(Label)
    private countLabel: Label = null;
    private ready: boolean = true;

    public playTip(msgData: any) {
        Tween.stopAllByTarget(this.node);
        this.ready = false;
        this.tipLabel.string = msgData.message;
        if (msgData.iconPic) {
            this.iconPic.node.active = true;
            this.iconPic.spriteFrame = msgData.iconPic || '';
        } else {
            this.iconPic.node.active = false;
        }
        if (msgData.count) {
            this.countLabel.node.active = true;
            this.countLabel.string = (msgData.count) || '';
        } else {
            this.countLabel.node.active = false;
        }
        this.reset();
        this.node.getComponent(UIOpacity).opacity = 0;
        // tween(this.node)
        //     .to(0.5, { position: v2(0, 128), opacity: 255 })
        //     .delay(0.5)
        //     .to(0.5, { opacity: 0 })
        //     .call(() => {
        //         this.ready = true;
        //     })
        //     .start();
        tween(this.node.getComponent(UIOpacity))
            .to(0.5, { opacity: 255 })
            .delay(0.5)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.ready = true;
            })
            .start();
        tween(this.node)
            .to(0.5, { position: new Vec3(0, 128, 0) })
            .delay(0.5)
            .call(() => {
                this.ready = true;
            })
            .start();

        // tween()
        //     // 同时执行两个 Tween
        //     .parallel(
        //         tween(this.node.getComponent(UIOpacity)).to(0.5, { opacity: 255}),
        //         tween(this.node).to(2, { position: new Vec3(0, 128, 0) })
        //     )
        //     .call(() => {
        //         this.ready = true;
        //     }).start();
    }

    public isReady(): boolean {
        return this.ready;
    }

    private reset() {
        this.node.setPosition(0, 0);
        this.node.getComponent(UIOpacity).opacity = 255;
    }
}