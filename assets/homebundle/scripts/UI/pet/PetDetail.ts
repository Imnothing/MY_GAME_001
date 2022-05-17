/**
 * @Description 描述
 * @Author 作者11111
 * @Date 
 * @Version 1.0
 */

import { _decorator, Component, Node, Button, Event, Label, Prefab, instantiate, Sprite } from 'cc';
import { BundleConfigs } from '../../../../mainbundle/scripts/Configs/BundleConfigs';
import { ResPathEnum } from '../../../../mainbundle/scripts/Configs/ResPathEnum';
import { EnumUILayer, UIConfigs } from '../../../../mainbundle/scripts/Configs/UIConfigs';
import { ConfigReader } from '../../../../mainbundle/scripts/Data/ConfigReader';
import { PropInfo } from '../../../../mainbundle/scripts/Data/Model/PropInfo';
import { PetData } from '../../../../mainbundle/scripts/Data/PetData';
import { Resistance } from "../../../../mainbundle/scripts/Data/Resistance";
import { AbnormalConfig } from '../../../../mainbundle/scripts/Datatable/AbnormalConfig';
import { AttributeConfig } from '../../../../mainbundle/scripts/Datatable/AttributeConfig';
import { PetConfig } from '../../../../mainbundle/scripts/Datatable/PetConfig';
import { PicConfig } from '../../../../mainbundle/scripts/Datatable/PicConfig';
import { SkillConfig } from '../../../../mainbundle/scripts/Datatable/SkillConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { engine } from '../../../../scripts/framework/engine';
import ScrollViewContent from '../../../../scripts/framework/lib/components/ScrollView/ScrollViewContent';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
import { HomeListenerType } from '../../Data/HomeListenerType';
import auto_PetDetail from './autoUI/auto_PetDetail';
import PetDetailSkillItem from './PetDetailSkillItem';
const { ccclass, property } = _decorator;
enum EnumTab {
    Info = 0,
    Skills = 1,
    Resist = 2,
    Prop = 3
}

@ccclass
export default class PetDetail extends BaseUI {

    @property({ type: Prefab, displayName: '' })
    private petDetailSkillItem: Prefab = null;

    @property({ type: Prefab, displayName: '' })
    private petBagItem: Prefab = null;
    ui: auto_PetDetail = null;

    protected static prefabUrl = `${BundleConfigs.HomeBundle}/prefabs/pet/PetDetail`;
    protected static className = "PetDetail";
    protected static layerZIndex = EnumUILayer.UILayer;
    private enumTab = EnumTab.Info;
    private key: number = null;
    private spSkillId: string = null;

    onLoad() {
        this.ui = this.node.addComponent(auto_PetDetail);
        this.initEvent();
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.key = data;
        this.switchTab(EnumTab.Info);
    }

    hide(onHided: Function): void {
        onHided();
    }

    initEvent() {
        //信息
        this.onRegisterEvent(this.ui.btn_info_uncheck, () => {
            if (this.enumTab == EnumTab.Info) return;
            this.enumTab = EnumTab.Info;
            this.switchTab(this.enumTab)
        }, this)

        //技能
        this.onRegisterEvent(this.ui.btn_skill_uncheck, () => {
            if (this.enumTab == EnumTab.Skills) return;
            this.enumTab = EnumTab.Skills;
            this.switchTab(this.enumTab)
        }, this)

        //抗性
        this.onRegisterEvent(this.ui.btn_resist_uncheck, () => {
            if (this.enumTab == EnumTab.Resist) return;
            this.enumTab = EnumTab.Resist;
            this.switchTab(this.enumTab)
        }, this)

        //物品
        this.onRegisterEvent(this.ui.btn_prop_uncheck, () => {
            if (this.enumTab == EnumTab.Prop) return;
            this.enumTab = EnumTab.Prop;
            this.switchTab(this.enumTab)
        }, this)

        this.onRegisterEvent(this.ui.btn_back, () => {
            this.doClose(UIConfigs.petDetail)
        }, this)
    }

    switchTab(tab: EnumTab) {
        this.ui.petTab.children.forEach((node, index) => {
            node.active = false;
        })
        switch (tab) {
            case EnumTab.Info:
                this.ui.pet_Info.active = true;
                this.showPetInfo();
                break;
            case EnumTab.Skills:
                this.ui.pet_skill.active = true;
                this.showPetSkill();
                break;
            case EnumTab.Resist:
                this.ui.pet_resist.active = true;
                this.showPetResistance();
                break;
            case EnumTab.Prop:
                this.ui.pet_prop.active = true;
                this.showPetProp();
                break;
        }
    }

    showPetInfo() {
        let petInfo: PetData = GameDataManager.getInstance().getGameData().petBagList[this.key]
        //精灵信息初始化
        //等级
        this.ui.lbl_level.getComponent(Label).string = String(petInfo.level);
        //学习力
        this.ui.lbl_learn.getComponent(Label).string = String(petInfo.learningValue.all);
        //天赋
        this.ui.lbl_talent.getComponent(Label).string = String(petInfo.talentValue);
        //性格
        this.ui.lbl_character.getComponent(Label).string = ConfigReader.readCharacterConfig(petInfo.character).Name;
        //特性
        this.ui.lbl_feature.getComponent(Label).string = ConfigReader.readFeatureConfig(petInfo.features).Name;
        //体力上限
        this.ui.lbl_maxHp.getComponent(Label).string = "0";

        //精灵属性
        //攻击
        this.ui.lbl_atk.getComponent(Label).string = String(petInfo.battleValue.atk);
        this.ui.lbl_learn_atk.getComponent(Label).string = String(petInfo.learningValue.atk);
        //特攻
        this.ui.lbl_spAtk.getComponent(Label).string = String(petInfo.battleValue.sp_atk);
        this.ui.lbl_learn_spAtk.getComponent(Label).string = String(petInfo.learningValue.sp_atk);
        //防御
        this.ui.lbl_def.getComponent(Label).string = String(petInfo.battleValue.def);
        this.ui.lbl_learn_def.getComponent(Label).string = String(petInfo.learningValue.def);
        //特防
        this.ui.lbl_spDef.getComponent(Label).string = String(petInfo.battleValue.sp_def);
        this.ui.lbl_learn_spDef.getComponent(Label).string = String(petInfo.learningValue.sp_def);
        //速度
        this.ui.lbl_spd.getComponent(Label).string = String(petInfo.battleValue.spd);
        this.ui.lbl_learn_spd.getComponent(Label).string = String(petInfo.learningValue.spd);
        //体力
        this.ui.lbl_hp.getComponent(Label).string = String(petInfo.battleValue.max_hp);
        this.ui.lbl_learn_hp.getComponent(Label).string = String(petInfo.learningValue.hp);

        //精灵图片
        let pet: PetConfig = ConfigReader.readPetConfig(petInfo.id)
        let petPic: PicConfig = ConfigReader.readPicConfig(pet.PetPic);
        this.ui.pic_pet.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(BundleConfigs.CommonBundle, petPic.PicPath, petPic.PicName);
    }

    showPetSkill() {
        let petInfo: PetData = GameDataManager.getInstance().getGameData().petBagList[this.key]
        //精灵技能
        let skills = petInfo.skills;
        if (skills) {
            if (this.ui.grid_skill.children.length == 0) {
                for (let i in skills) {
                    let skill: SkillConfig = ConfigReader.readSkillConfig(i);
                    if (skill.Special == 0) {
                        let skill_node = instantiate(this.petDetailSkillItem);
                        this.ui.grid_skill.addChild(skill_node);
                        skill_node.getComponent(PetDetailSkillItem).show({ skill: skill, pp: skills[i] })
                    } else {
                        //图标
                        let attribute: AttributeConfig = ConfigReader.readAttributeConfig(skill.Attribute);
                        this.ui.ico_attribute_spSkill.getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, attribute.Icon)
                        //技能名称
                        this.ui.lbl_spSkill.getComponent(Label).string = skill.Name;
                        //技能PP
                        this.ui.lbl_PP_spSkill.getComponent(Label).string = `PP：${skills[i]}/${skill.PP}`
                        //技能威力
                        this.ui.lbl_damage_spSkill.getComponent(Label).string = `威力：${skill.Power}`;
                    }
                }
            } else {
                for (let key in skills) {
                    engine.listenerManager.trigger(HomeListenerType.RefreshPetDetailSkillItem, ConfigReader.readSkillConfig(key), skills[key]);
                }
            }

        }
    }

    showPetResistance() {
        let petInfo: PetData = GameDataManager.getInstance().getGameData().petBagList[this.key]
        //精灵抗性
        let resist: Resistance = petInfo.resistance;
        if (resist) {
            //伤害抗性
            //致命伤害
            this.ui.lbl_critical.getComponent(Label).string = `${resist.damageResist.criticalResist * 100}%`
            //固定伤害
            this.ui.lbl_fix.getComponent(Label).string = `${resist.damageResist.fixedResist * 100}%`
            //百分比伤害
            this.ui.lbl_percent.getComponent(Label).string = `${resist.damageResist.percentage * 100}%`

            //异常抗性
            //控制
            let controlResist: Map<string, number> = resist.abnormalResist.controlResist;
            let index = 1;
            for (let i in controlResist) {
                this.ui[`control_item${index}`].active = true;
                let abnormal: AbnormalConfig = ConfigReader.readAbnormalConfig(i);
                this.ui[`ico_control${index}`].getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, abnormal.Icon)
                this.ui[`lbl_control${index}`].getComponent(Label).string = "免疫" + abnormal.Name;
                this.ui[`num_control${index}`].getComponent(Label).string = controlResist[i] + "%";
                index++;
            }
            index = 1;
            //弱化
            let weekResist: Map<string, number> = resist.abnormalResist.weekResist;
            for (let i in weekResist) {
                this.ui[`week_item${index}`].active = true;
                let abnormal: AbnormalConfig = ConfigReader.readAbnormalConfig(i);
                this.ui[`ico_week${index}`].getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, abnormal.Icon)
                this.ui[`lbl_week${index}`].getComponent(Label).string = "免疫" + abnormal.Name;
                this.ui[`num_week${index}`].getComponent(Label).string = weekResist[i] + "%";
                index++;
            }
        }
    }

    showPetProp() {
        if (this.ui.content.children.length == 0) {
            //精灵道具
            let propList: Map<string, PropInfo> = GameDataManager.getInstance().getGameData().propList;
            if (propList) {
                let arr: Array<string> = [];
                for (let key in propList) {
                    arr.push(key);
                }
                this.ui.scv_prop.getComponent(ScrollViewContent).setData(arr);
            }
        }
    }

    getKey() {
        return this.key;
    }

}
