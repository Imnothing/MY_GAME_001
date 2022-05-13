/** 异常抗性类 */

export class AbnormalResist {
    /** 控制类异常抗性抵抗 */
    controlResist: Map<string, number> = new Map<string, number>();

    /** 弱化类异常抗性抵抗 */
    weekResist: Map<string, number> = new Map<string, number>();

    constructor() { }
}
