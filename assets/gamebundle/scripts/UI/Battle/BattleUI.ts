/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Toggle, Prefab, Label, ProgressBar, Sprite, instantiate, SpriteFrame, Animation, AnimationState } from 'cc';
import { HomeManager } from '../../../../homebundle/scripts/Manager/HomeManager';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { AttributeConfig } from '../../../../mainbundle/scripts/Datatable/AttributeConfig';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { engine } from '../../../../scripts/framework/engine';
import ScrollViewContent from '../../../../scripts/framework/lib/components/ScrollView/ScrollViewContent';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { GameListenerType } from '../../Data/GameListenerType';
import { BattleAni } from '../../Manager/BattleControl';
import BattleControl from '../../Manager/BattleInfo';
import { BattleState, EnumPlayer } from '../../Manager/BattleManager';
import { McGame } from '../../Manager/McGame';
import auto_BattleUI from './autoUI/auto_BattleUI';
import PetItem from './PetItem';
import PetUI from './PetUI';
import SkillItem from './SkillItem';
const { ccclass, property } = _decorator;

@ccclass
export default class BattleUI extends BaseUI {

    @property({ type: Prefab, displayName: '' })
    private petItem: Prefab = null;
    @property({ type: Prefab, displayName: '' })
    private skillItem: Prefab = null;
    @property({ type: SpriteFrame, displayName: '' })
    private ico_kes: SpriteFrame[] = [];
    ui: auto_BattleUI = null;

    protected static prefabUrl = `${BundleConfigs.GameBundle}/prefabs/Battle/BattleUI`;
    protected static className = "BattleUI";
    protected static layerZIndex = EnumUILayer.UILayer;
    public battleControl: BattleControl;
    private enumTab: EnumTab = EnumTab.Skill;
    private isOver: boolean = false;


    onLoad() {
        this.ui = this.node.addComponent(auto_BattleUI);
        this.initEvent();
        this.enumTab = EnumTab.Skill;
        this.isOver = false;
        // this.switchTab(this.enumTab);
    }

    show(data?: any, onShowed?: Function) {
        window["BattleUI"] = this;
        onShowed && onShowed();
        McGame.playLevel();
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        this.onRegisterEvent(this.ui.pet_change, () => {
            this.ui.ico_prop.getComponent(Toggle).isChecked = false;
            this.enumTab = this.enumTab == EnumTab.Skill ? EnumTab.Pets : EnumTab.Skill
            this.switchTab(this.enumTab);
        }, this)

        this.onRegisterEvent(this.ui.ico_prop, () => {
            this.enumTab = this.ui.ico_prop.getComponent(Toggle).isChecked ? EnumTab.Skill : EnumTab.Prop;
            this.switchTab(this.enumTab);
        }, this)

        this.onRegisterEvent(this.ui.ico_surrender, () => {
            McGame.loseGame();
        }, this)

        this.onRegisterEvent(this.ui.over, () => {
            engine.uiManager.openUIAsync(UIConfigs.mainUI);
            this.doClose(UIConfigs.battleUI, true);
        }, this)

        this.onAddEvent(GameListenerType.RefreshBattlePetUI, this, this.showPet);

        this.onAddEvent(GameListenerType.DoSkill, this, (skillId) => {
            McGame.battleManager.doSkill(skillId);
        })

        this.onAddEvent(GameListenerType.SwitchPetsTab, this, () => {
            this.switchTab(EnumTab.Pets);
        })

        this.onAddEvent(GameListenerType.SwitchSkillTab, this, () => {
            this.ui.ico_prop.getComponent(Toggle).isChecked = false;
            this.switchTab(EnumTab.Skill);
        })

        this.onAddEvent(GameListenerType.PlayBattleAni, this, (round_ani) => {
            this.isOver = false;
            this.playBattleAni(round_ani);
        });

        this.onAddEvent(GameListenerType.GameOver, this, (isWin) => {
            this.ui.over.active = true;
            isWin ? this.ui.show_win.active = true : this.ui.show_lose.active = true;
        })

        this.onAddEvent(GameListenerType.NextRound, this, (round) => {
            this.ui.label_round.getComponent(Label).string = `第${round}回合`
        })
    }

    showPet(player: EnumPlayer) {
        let pet: Node = McGame.battleManager.getPetNow(player);
        let petInfo = pet.getComponent(PetUI).getPetInfo();
        let petId = petInfo.id;
        let petConfig: PetConfig = ConfigReader.readPetConfig(petId);
        if (player == EnumPlayer.Own) {
            this.ui.pet_left.removeAllChildren();
            //精灵名称
            this.ui.label_petName.getComponent(Label).string = petConfig.Name;
            //体力
            this.ui.hp_bar.getComponent(ProgressBar).progress = petInfo.battleValue.hp / petInfo.battleValue.max_hp;
            //等级
            this.ui.label_lv.getComponent(Label).string = "LV." + (petInfo.level);
            //属性
            let attribute: AttributeConfig = ConfigReader.readAttributeConfig(petInfo.attribute)
            this.ui.ico_attribute.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
            //精灵图片
            this.ui.pet_left.addChild(pet);
            pet.getComponent(PetUI).showSprite();
            //精灵头像
            let petAvatar: PicConfig = ConfigReader.readPicConfig(petConfig.PetAvatar);
            this.ui.pic_avatar.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petAvatar.PicPath, petAvatar.PicName);
            // 克制
            let enemy_attr = McGame.battleManager.getPetNow(EnumPlayer.Enemy).getComponent(PetUI).getPetInfo().attribute;
            let keZhi: number = McGame.battleManager.calRestraint(petInfo.attribute, enemy_attr);
            if (keZhi == 0) {
                this.ui.putong.getComponent(Sprite).spriteFrame = this.ico_kes[0];
            } else if (keZhi == 1) {
                this.ui.putong.getComponent(Sprite).spriteFrame = this.ico_kes[1];
            } else if (keZhi == 2) {
                this.ui.putong.getComponent(Sprite).spriteFrame = this.ico_kes[2];
            } else if (keZhi == 0.5) {
                this.ui.putong.getComponent(Sprite).spriteFrame = this.ico_kes[3];
            }
            //精灵出场效果
            pet.getComponent(PetUI).onStage();

            this.switchTab(EnumTab.Skill);
        } else if (player == EnumPlayer.Enemy) {
            this.ui.pet_right.removeAllChildren();
            //精灵名称
            this.ui.label_petName_enemy.getComponent(Label).string = petConfig.Name;
            //体力
            this.ui.hp_bar_enemy.getComponent(ProgressBar).progress = petInfo.battleValue.hp / petInfo.battleValue.max_hp;
            //等级
            this.ui.label_lv_enemy.getComponent(Label).string = "LV." + (petInfo.level);
            //属性
            let attribute: AttributeConfig = ConfigReader.readAttributeConfig(petInfo.attribute)
            this.ui.ico_attribute_enemy.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
            //精灵图片
            this.ui.pet_right.addChild(pet);
            pet.getComponent(PetUI).showSprite();
            //精灵头像
            let petAvatar: PicConfig = ConfigReader.readPicConfig(petConfig.PetAvatar);
            this.ui.pic_avatar_enemy.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petAvatar.PicPath, petAvatar.PicName);
            //精灵出场效果
            pet.getComponent(PetUI).onStage();

            //敌方出场不需要刷新技能
        }
    }

    showPets() {
        let pet_nodes = McGame.battleManager.getPets(EnumPlayer.Own);
        if (this.ui.layout_pets.children.length == 0) {
            for (let key in pet_nodes) {
                let pet_node = instantiate(this.petItem);
                this.ui.layout_pets.addChild(pet_node);
                pet_node.getComponent(PetItem).setData(key);
            }
        }
    }

    showProp() {
        this.ui.scv_prop.getComponent(ScrollViewContent).releaseData();
        let propList = GameDataManager.getInstance().getGameData().propList;
        let gameProps: Array<string> = HomeManager.propManager.getGameProp()
        let arr = []
        for (let key in propList) {
            if (gameProps.indexOf(key) == -1) continue;
            arr.push(key)
        }
        this.ui.scv_prop.getComponent(ScrollViewContent).setData(arr)
    }

    showSkills() {
        this.ui.layout_skill.removeAllChildren();
        let skills: Map<string, number> = McGame.battleManager.getOwnPetInfo().skills;
        for (let key in skills) {
            let skill_node = instantiate(this.skillItem);
            this.ui.layout_skill.addChild(skill_node);
            skill_node.getComponent(SkillItem).setData(key);
        }

    }

    showTip() { }

    switchTab(tab: EnumTab) {
        this.ui.bottom.children.forEach((node, index) => {
            node.active = false;
        })
        switch (tab) {
            case EnumTab.Skill:
                this.enumTab = EnumTab.Skill;
                this.ui.skill_node.active = true;
                this.showSkills();
                break;
            case EnumTab.Prop:
                this.enumTab = EnumTab.Prop;
                this.ui.prop_node.active = true;
                this.showProp();
                break;
            case EnumTab.Pets:
                this.enumTab = EnumTab.Pets;
                this.ui.pets_node.active = true;
                this.showPets();
                break;
        }
    }

    playBattleAni(arr: Array<BattleAni>) {
        if (arr.length > 0) {
            let ani: BattleAni = arr.shift();
            console.log("=================ani", ani);
            if (ani.player == EnumPlayer.Own) {
                if (ani.skill) {
                    // 属性
                    let attribute: AttributeConfig = ConfigReader.readAttributeConfig(ani.skill.Attribute);
                    this.ui.ico_tip_attribute.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
                    // 名称
                    this.ui.lbl_tip.getComponent(Label).string = ani.skill.Name;
                    // 暴击
                    this.ui.banner_skill.getComponent(Toggle).isChecked = ani.isCritical;
                }
                let aniComp = this.ui.banner_skill.getComponent(Animation);
                aniComp.play();
                aniComp.on(Animation.EventType.FINISHED, (type: string, state: AnimationState) => {
                    if (state.name == "banner_skill_show1") {
                        if (ani.hp_player != null) {
                            this.ui.hp_bar.getComponent(ProgressBar).progress = ani.hp_player;
                        }
                        if (ani.hp_other != null) {
                            this.ui.hp_bar_enemy.getComponent(ProgressBar).progress = ani.hp_other;
                        }
                        if (arr.length == 0 && !this.isOver) {
                            this.isOver = true;
                            McGame.battleManager.setBattleState(BattleState.Over);
                        } else {
                            this.playBattleAni(arr);
                        }
                    }

                })
            } else {
                if (ani.skill) {
                    // 属性
                    let attribute: AttributeConfig = ConfigReader.readAttributeConfig(ani.skill.Attribute);
                    this.ui.ico_tip_attribute_enemy.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
                    // 名称
                    this.ui.lbl_tip_enemy.getComponent(Label).string = ani.skill.Name;
                    // 暴击
                    this.ui.banner_skill_enemy.getComponent(Toggle).isChecked = ani.isCritical;
                }
                let aniComp = this.ui.banner_skill_enemy.getComponent(Animation);
                aniComp.play();
                aniComp.on(Animation.EventType.FINISHED, (type: string, state: AnimationState) => {
                    if (state.name == "banner_skill_show2") {
                        if (ani.hp_player != null) {
                            this.ui.hp_bar_enemy.getComponent(ProgressBar).progress = ani.hp_player;
                        }
                        if (ani.hp_other != null) {
                            this.ui.hp_bar.getComponent(ProgressBar).progress = ani.hp_other;
                        }
                        if (arr.length == 0 && !this.isOver) {
                            this.isOver = true;
                            McGame.battleManager.setBattleState(BattleState.Over);
                        } else {
                            this.playBattleAni(arr);
                        }
                    }
                })
            }
        }
    }
}
enum EnumTab {
    Skill = 0,
    Pets = 1,
    Prop = 2
}