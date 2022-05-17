/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, ProgressBar, Sprite, SpriteFrame, UI } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { FightPet } from '../../../../mainbundle/scripts/Data/FightPet';
import { AttributeConfig } from '../../../../mainbundle/scripts/Datatable/AttributeConfig';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { engine } from '../../../../scripts/framework/engine';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { EnumPlayer } from '../../Manager/BattleManager';
import { McGame } from '../../Manager/McGame';
import auto_PetItem from './autoUI/auto_PetItem';
import PetUI from './PetUI';
const { ccclass, property } = _decorator;

@ccclass
export default class PetItem extends BaseUI {

    @property({ type: SpriteFrame, displayName: '' })
    private ico_kes: SpriteFrame[] = [];

    ui: auto_PetItem = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/PetItem`;
    protected static className = "PetItem";
    protected static layerZIndex = EnumUILayer.UILayer;
    private key: string = null;
    private isDead: boolean = false;


    onLoad() {
        this.ui = this.node.addComponent(auto_PetItem);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
    }

    onEnable() {
        if (this.key)
            this.setData();
    }

    setData(key?: string) {
        if (key) {
            this.key = key;
            let pet: PetUI = McGame.battleManager.getPets(EnumPlayer.Own)[this.key].getComponent(PetUI);
            let petInfo: FightPet = pet.getPetInfo();
            let petConfig: PetConfig = ConfigReader.readPetConfig(petInfo.id);
            // 等级
            this.ui.lbl_level.getComponent(Label).string = `Lv.${petInfo.level}`;
            // 名称
            this.ui.lbl_name.getComponent(Label).string = petConfig.Name;
            // 头像
            let petAvatar: PicConfig = ConfigReader.readPicConfig(petConfig.PetAvatar);
            this.ui.ico_avatar.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petAvatar.PicPath, petAvatar.PicName);
            // 属性
            let attribute: AttributeConfig = ConfigReader.readAttributeConfig(petInfo.attribute)
            this.ui.ico_attribute.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
            // 血量
            this.ui.lbl_hp.getComponent(Label).string = `${petInfo.battleValue.hp}/${petInfo.battleValue.max_hp}`;
            this.ui.small_hp_frame.getComponent(ProgressBar).progress = petInfo.battleValue.hp / petInfo.battleValue.max_hp;
            // 克制
            let enemy_attr = McGame.battleManager.getPetNow(EnumPlayer.Enemy).getComponent(PetUI).getPetInfo().attribute;
            let keZhi: number = McGame.battleManager.calRestraint(petInfo.attribute, enemy_attr);
            if (pet.checkDead()) {
                this.isDead = true;
                this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[4];
            } else {
                if (keZhi == 0) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[0];
                } else if (keZhi == 1) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[1];
                } else if (keZhi == 2) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[2];
                } else if (keZhi == 0.5) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[3];
                }
            }
        } else {
            let pet: PetUI = McGame.battleManager.getPets(EnumPlayer.Own)[this.key].getComponent(PetUI);
            let petInfo: FightPet = pet.getPetInfo();
            // 血量
            this.ui.lbl_hp.getComponent(Label).string = `${petInfo.battleValue.hp}/${petInfo.battleValue.max_hp}`;
            this.ui.small_hp_frame.getComponent(ProgressBar).progress = petInfo.battleValue.hp / petInfo.battleValue.max_hp;
            // 克制
            let enemy_attr = McGame.battleManager.getPetNow(EnumPlayer.Enemy).getComponent(PetUI).getPetInfo().attribute;
            let keZhi: number = McGame.battleManager.calRestraint(petInfo.attribute, enemy_attr);
            if (pet.checkDead()) {
                this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[4];
            } else {
                if (keZhi == 0) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[0];
                } else if (keZhi == 1) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[1];
                } else if (keZhi == 2) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[2];
                } else if (keZhi == 0.5) {
                    this.ui.ico_state.getComponent(Sprite).spriteFrame = this.ico_kes[3];
                }
            }
        }
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.node, () => {
            if (McGame.battleManager.getPetNow(EnumPlayer.Own).getComponent(PetUI).getFightId() == this.key || this.isDead) return;
            McGame.battleManager.showPet(EnumPlayer.Own, this.key);
        }, this)
    }

}
