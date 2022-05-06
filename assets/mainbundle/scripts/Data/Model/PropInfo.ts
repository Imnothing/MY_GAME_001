/**
 * 道具信息类
 */

export class PropInfo {
    /**道具id */
    public id: number = 0;
    /**道具数量 */
    public count: number = 0;
    constructor(data?: any) {
        if (!data) return;
        var keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            if (this.hasOwnProperty(key)) {
                this[key] = value;
            }
        }
    }

}
