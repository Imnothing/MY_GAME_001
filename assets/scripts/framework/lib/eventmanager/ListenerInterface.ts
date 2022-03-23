/**
 * 事件管理器接口，支持以下函数：
 *
 * * emit()：发送事件
 * * onOnce()：注册事件（回调一次后自动销毁）
 * * on()：注册事件
 * * off()：注销事件
 * * offTarget()：注释指定对象下的所有事件
 *
 */
export interface ListenerInterface {
    /**
     * 广播事件
     *
     * @param eventName 事件名
     * @param argArray 传递的剩余不定参数
     */
    trigger(eventName: string, ...argArray: any[]): boolean;

    /**
     * 注册事件
     *
     * @param eventName 事件名
     * @param listener 事件处理函数
     * @param caller 事件处理函数的执行对象
     */
    add(eventName: string, caller: any, listener: Function, ...argArray: any[]): void;
    
    /**
     * 注册事件（接受函数执行一次后会自动销毁，不用主动off）
     *
     * @param eventName 事件名
     * @param listener 事件处理函数
     * @param caller 事件处理函数的执行对象
     */
    addOnce(eventName: string, caller: any, listener: Function, ...argArray: any[]): void;

    /**
     * 注销事件
     *
     * @param eventName 事件名
     * @param listener 事件处理函数
     * @param caller 事件处理函数的执行对象
     */
    remove(eventName: string, caller: any, listener: Function, onceOnly?: boolean): void;

    /**
     * 注销某个已经注册的对象的所有事件
     *
     * @param caller 事件函数处理的执行对象
     */
    removeAll(caller: any): void;
}
