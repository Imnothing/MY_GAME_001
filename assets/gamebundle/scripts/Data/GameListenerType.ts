/**
 * 事件监听定义类
 */
export class GameListenerType {
    /** 刷新精灵信息 */
    public static readonly RefreshBattlePetUI = "RefreshBattlePetUI";
    /** 刷新技能信息 */
    public static readonly RefreshSkillItem = "RefreshSkillItem";
    /** 切出精灵栏 */
    public static readonly SwitchPetsTab = "SwitchPetsTab";
    /** 切出技能栏 */
    public static readonly SwitchSkillTab = "SwitchSkillTab";
    /** 使用技能 */
    public static readonly DoSkill = "DoSkill";
    /** 播放对战动画 */
    public static readonly PlayBattleAni = "PlayBattleAni";
    /** 游戏结算通知 */
    public static readonly GameOver = "GameOver";
    /** 下一回合通知 */
    public static readonly NextRound = "NextRound";


}
