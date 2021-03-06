import { engine } from "../../engine";
import { LOG_TAG } from "../logger/LoggerInterface";
import { ListenerInterface } from "./ListenerInterface";

export class Delegate {
    public mListener: Function;
    public get listener(): Function {
        return this.mListener;
    }

    public mArgArray: any[];
    public get argArray(): any[] {
        return this.mArgArray;
    }

    public mIsOnce = false;
    public get isOnce(): boolean {
        return this.mIsOnce;
    }
    public set isOnce(isOnce: boolean) {
        this.mIsOnce = isOnce;
    }

    constructor(listener: Function, argArray: any[], isOnce: boolean = false) {
        this.mListener = listener;
        this.mArgArray = argArray;
        this.mIsOnce = isOnce;
    }
}

export default class ListenerManager implements ListenerInterface {

    private mListenerMap = new Map<string, Map<any, Delegate[]>>();


    public has(type: string, caller: any, listener: Function): boolean {
        return this.find(type, caller, listener) !== null;
    }

    public trigger(type: string, ...argArray: any[]): boolean {
        if (!type) {
            engine.logger.error(LOG_TAG.FRAMEWORK, "Listener type is null!");
            return false;
        }
        let delegateList: Delegate[] = [];
        let callerList: any[] = [];
        let listenerMap = this.mListenerMap.get(type);
        if (listenerMap) {
            listenerMap.forEach((listenerList, caller) => {
                for (let delegate of listenerList) {
                    delegateList.push(delegate);
                    callerList.push(caller);
                }
                for (let index = listenerList.length - 1; index >= 0; --index) {
                    if (listenerList[index].isOnce) {
                        listenerList.splice(index, 1);
                    }
                }
                if (listenerList.length <= 0) {
                    listenerMap.delete(caller);
                }
            });
            if (listenerMap.size <= 0) {
                this.mListenerMap.delete(type);
            }
        }
        let length = delegateList.length;
        for (let index = 0; index < length; index++) {
            let delegate: Delegate = delegateList[index];
            delegate.listener.call(callerList[index], ...delegate.argArray, ...argArray);
        }
        return length > 0;
    }

    public add(type: string, caller: any, listener: Function, ...argArray: any[]): void {
        this.addListener(type, caller, listener, false, ...argArray);
    }

    public addOnce(type: string, caller: any, listener: Function, ...argArray: any[]): void {
        this.addListener(type, caller, listener, true, ...argArray);
    }

    public remove(eventName: string, caller: any, listener: Function, onceOnly?: boolean): void {
        this.removeBy((listenerType, listenerCaller, delegate) => {
            if (eventName && eventName !== listenerType) {
                return false;
            }
            if (caller && caller !== listenerCaller) {
                return false;
            }
            if (listener && listener !== delegate.listener) {
                return false;
            }
            if (onceOnly && !delegate.isOnce) {
                return false;
            }
            return true;
        });
    }

    public removeAll(caller: any): void {
        this.mListenerMap.forEach((listenerMap, type) => {
            listenerMap.delete(caller);
            if (listenerMap.size <= 0) {
                this.mListenerMap.delete(type);
            }
        });
    }

    private addListener(type: string, caller: any, listener: Function, isOnce: boolean, ...argArray: any[]): void {
        let delegate = this.find(type, caller, listener);
        if (delegate) {
            delegate.isOnce = isOnce;
            engine.logger.error(LOG_TAG.FRAMEWORK, "Listener is already exist!" + type);
        } else {
            let delegate = new Delegate(listener, argArray, isOnce);
            this.mListenerMap.get(type).get(caller).push(delegate);
        }
    }

    private removeBy(predicate: (type: string, caller: any, delegate: Delegate) => boolean): void {
        if (!predicate) {
            return;
        }
        this.mListenerMap.forEach((listenerMap, type) => {
            listenerMap.forEach((listenerList, caller) => {
                for (let index = listenerList.length - 1; index >= 0; --index) {
                    let delegate = listenerList[index];
                    if (predicate(type, caller, delegate)) {
                        listenerList.splice(index, 1);
                    }
                }
                if (listenerList.length <= 0) {
                    listenerMap.delete(caller);
                }
            });
            if (listenerMap.size <= 0) {
                this.mListenerMap.delete(type);
            }
        });
    }

    private find(type: string, caller: any, listener: Function): Delegate {
        if (!type) {
            engine.logger.error(LOG_TAG.FRAMEWORK, "Listener type is null!");
            return null;
        }
        if (!caller) {
            engine.logger.error(LOG_TAG.FRAMEWORK, "Caller type is null!");
            return null;
        }
        if (!listener) {
            engine.logger.error(LOG_TAG.FRAMEWORK, "Listener is null!");
            return null;
        }

        let listenerMap: Map<any, Delegate[]>;
        if (this.mListenerMap.has(type)) {
            listenerMap = this.mListenerMap.get(type);
        } else {
            listenerMap = new Map<any, Delegate[]>();
            this.mListenerMap.set(type, listenerMap);
        }
        let listenerList: Delegate[];
        if (listenerMap.has(caller)) {
            listenerList = listenerMap.get(caller);
        } else {
            listenerList = [];
            listenerMap.set(caller, listenerList);
        }

        for (let delegate of listenerList) {
            if (delegate.mListener === listener) {
                return delegate;
            }
        }
        return null;
    }
}