/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Sprite, Label, instantiate } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PetData } from '../../../../mainbundle/scripts/Data/PetData';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { SptConfig } from '../../../../mainbundle/scripts/Datatable/SptConfig';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeManager } from '../../Manager/HomeManager';
import auto_StartUI from './autoUI/auto_StartUI';
const { ccclass, property } = _decorator;

@ccclass
export default class StartUI extends BaseUI {
    ui: auto_StartUI = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/sptScene/StartUI`;
    protected static className = "StartUI";
    protected static layerZIndex = EnumUILayer.UILayer;
    private sptConfig: SptConfig = null


    onLoad() {
        this.ui = this.node.addComponent(auto_StartUI);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.sptConfig = data;
        this.setData();
    }

    setData() {
        //关卡抬头
        this.ui.lbl_planet.getComponent(Label).string = "当前关卡：" + this.sptConfig.SptId;
        //精灵
        let pet: PetConfig = ConfigReader.readPetConfig(this.sptConfig.Boss.split("#")[0]);
        let petPic: PicConfig = ConfigReader.readPicConfig(pet.PetPic);
        this.ui.pic_pet.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petPic.PicPath, petPic.PicName);
        this.ui.lbl_name.getComponent(Label).string = pet.Name;
        //奖励
        let prizes = HomeManager.sptManager.getPrize(this.sptConfig.Prize);
        prizes.forEach((prize, index) => {
            if (index == 0) {
                let prize_node = this.ui.prize_item;
                prize_node.active = true;
                prize_node.getChildByName("pic_prize").getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.PropIcon.bundle, ResPathEnum.PropIcon.resPath, ConfigReader.readItemConfig(prize[0]).Icon);
                if (parseInt(prize[1]) != 1)
                    prize_node.getChildByName("lbl_num").getComponent(Label).string = prize[1];
                else
                    prize_node.getChildByName("lbl_num").active = false;
            } else {
                let prize_node = instantiate(this.ui.prize_item);
                prize_node.active = true;
                prize_node.getChildByName("pic_prize").getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.PropIcon.bundle, ResPathEnum.PropIcon.resPath, ConfigReader.readItemConfig(prize[0]).Icon);
                if (parseInt(prize[1]) != 1)
                    prize_node.getChildByName("lbl_num").getComponent(Label).string = prize[1];
                else
                    prize_node.getChildByName("lbl_num").active = false;
                this.ui.lay_prizes.addChild(prize_node);
            }
        })
        //条件
        let targets: Array<string> = this.sptConfig.Target.split("|");
        targets.forEach((target, index) => {
            if (index == 0) {
                let target_node = this.ui.target_item;
                target_node.active = true;
                target_node.getChildByName("lbl_target").getComponent(Label).string = target;
            } else {
                let target_node = instantiate(this.ui.target_item);
                target_node.active = true;
                target_node.getChildByName("lbl_target").getComponent(Label).string = target;
                this.ui.lay_target.addChild(target_node);
            }
        })
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.ui.btn_close, () => {
            this.doClose(UIConfigs.startUI);
        }, this)

        this.onRegisterEvent(this.ui.btn_start, async () => {
            // 生成相应BOSS数据
            let petId: string = this.sptConfig.Boss.split("#")[0];
            let level: number = parseInt(this.sptConfig.Boss.split("#")[1]);
            let pet: PetData = await HomeManager.petManager.instantiatePet(petId, level);
            // 加强boss
            pet.battleValue.atk += this.sptConfig.Atk;
            pet.battleValue.sp_atk += this.sptConfig.SpAtk;
            pet.battleValue.def += this.sptConfig.Def;
            pet.battleValue.sp_def += this.sptConfig.SpDef;
            pet.battleValue.spd += this.sptConfig.Spd;
            pet.battleValue.max_hp += this.sptConfig.Hp;
            let enemy_pets = new Map<number, PetData>();
            enemy_pets[Date.now()] = pet;
            engine.uiManager.openUIAsync(UIConfigs.gamePreLoadUI, { sptConfig: this.sptConfig, petJson: enemy_pets });
            this.doClose(UIConfigs.startUI, true);
            this.doClose(UIConfigs.sptUI, true);
            this.doClose(UIConfigs.mainUI, true);
        }, this)

        this.onRegisterEvent(this.ui.btn_petbag, () => {
            engine.uiManager.openUIAsync(UIConfigs.petBag);
        }, this)
    }

    async startLevel() {

    }

}
