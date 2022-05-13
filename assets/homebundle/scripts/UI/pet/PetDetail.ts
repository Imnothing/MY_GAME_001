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
import { SkillConfig } from '../../../../mainbundle/scripts/Datatable/SkillConfig';
import { GameDataManager } from '../../../../mainbundle/scripts/Manager/GameDataManager';
import { engine } from '../../../../scripts/framework/engine';
import ScrollViewContent from '../../../../scripts/framework/lib/components/ScrollView/ScrollViewContent';
import { BaseUI } from '../../../../scripts/framework/lib/router/BaseUI';
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
    private petInfo: PetData = null;
    private spSkillId: string = null;

    onLoad() {
        this.ui = this.node.addComponent(auto_PetDetail);
        this.initEvent();
        this.initPetTab();
        this.switchTab(EnumTab.Info)
    }

    show(data?: any, onShowed?: Function) {
        onShowed && onShowed();
        this.petInfo = data;
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
            node.active = (index == tab.valueOf())
        })
    }

    initPetTab() {
        //精灵信息初始化
        //等级
        this.ui.lbl_level.getComponent(Label).string = String(this.petInfo.level);
        //学习力
        this.ui.lbl_learn.getComponent(Label).string = String(this.petInfo.learningValue.all);
        //天赋
        this.ui.lbl_talent.getComponent(Label).string = String(this.petInfo.talentValue);
        //性格
        this.ui.lbl_character.getComponent(Label).string = ConfigReader.readCharacterConfig(this.petInfo.character.valueOf()).Name;
        //特性
        this.ui.lbl_feature.getComponent(Label).string = ConfigReader.readFeatureConfig(this.petInfo.features.valueOf()).Name;
        //体力上限
        this.ui.lbl_maxHp.getComponent(Label).string = "0";

        //精灵属性
        //攻击
        this.ui.lbl_atk.getComponent(Label).string = String(this.petInfo.battleValue.atk);
        this.ui.lbl_learn_atk.getComponent(Label).string = String(this.petInfo.learningValue.atk);
        //特攻
        this.ui.lbl_spAtk.getComponent(Label).string = String(this.petInfo.battleValue.sp_atk);
        this.ui.lbl_learn_spAtk.getComponent(Label).string = String(this.petInfo.learningValue.sp_atk);
        //防御
        this.ui.lbl_def.getComponent(Label).string = String(this.petInfo.battleValue.def);
        this.ui.lbl_learn_def.getComponent(Label).string = String(this.petInfo.learningValue.def);
        //特防
        this.ui.lbl_spDef.getComponent(Label).string = String(this.petInfo.battleValue.sp_def);
        this.ui.lbl_learn_spDef.getComponent(Label).string = String(this.petInfo.learningValue.sp_def);
        //速度
        this.ui.lbl_spd.getComponent(Label).string = String(this.petInfo.battleValue.spd);
        this.ui.lbl_learn_spd.getComponent(Label).string = String(this.petInfo.learningValue.spd);
        //体力
        this.ui.lbl_hp.getComponent(Label).string = String(this.petInfo.battleValue.hp);
        this.ui.lbl_learn_hp.getComponent(Label).string = String(this.petInfo.learningValue.hp);

        //精灵技能
        let skills = this.petInfo.skills;
        if (skills) {
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
                    this.ui.lbl_PP_spSkill.getComponent(Label).string = `${skills[i]}/${skill.PP}`
                    //技能威力
                    this.ui.lbl_damage_spSkill.getComponent(Label).string = String(skill.Power);
                }
            }

        }

        //精灵抗性
        let resist: Resistance = this.petInfo.resistance;
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
                this.ui[`control_item${i}`].active = true;
                let abnormal: AbnormalConfig = ConfigReader.readAbnormalConfig(i);
                this.ui[`ico_control${i}`].getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, abnormal.Icon)
                this.ui[`lbl_control${i}`].getComponent(Label).string = "免疫" + abnormal.Name;
                this.ui[`num_control${i}`].getComponent(Label).string = controlResist[i] + "%";
                index++;
            }
            index = 1;
            //弱化
            let weekResist: Map<string, number> = resist.abnormalResist.weekResist;
            for (let i in weekResist) {
                this.ui[`week_item${i}`].active = true;
                let abnormal: AbnormalConfig = ConfigReader.readAbnormalConfig(i);
                this.ui[`ico_week${i}`].getComponent(Sprite).spriteFrame = engine.resLoader.getAtlasByTag(ResPathEnum.Attribute.bundle, ResPathEnum.Attribute.resPath, abnormal.Icon)
                this.ui[`lbl_week${i}`].getComponent(Label).string = "免疫" + abnormal.Name;
                this.ui[`num_week${i}`].getComponent(Label).string = weekResist[i] + "%";
                index++;
            }
        }

        //精灵道具
        let propList: Map<string, PropInfo> = GameDataManager.getInstance().getGameData().propList;
        if (propList) {
            let arr: Array<PropInfo> = [];
            for (let key in propList) {
                arr.push(propList[key]);
            }
            this.ui.scv_prop.getComponent(ScrollViewContent).setData(arr);
        }

    }

}
