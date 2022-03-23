/**
 * 游戏账号实体类
 */

import { engine } from "../../../../scripts/framework/engine";
import { LocalKeys } from "../LocalKeys";
import { BaseModel } from "./BaseModel";

export class AccountInfo extends BaseModel {
    public uuid: string = '';
    public account: string = '';
    public avatar: string = '';
    public visitor: string = '';
    public nickname: string = '';
    public create_time: number = 0;
    public token: string = '';
    public extra_data: any = null;

    public mobile: string = '';
    public cid: string = '';
    public time: number = 0;
    public fu: number = 0;
    public hot_update_url: string = "";
    constructor(data?: any) {
        super(data);
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

    save() {
        engine.storage.setLocalItem(LocalKeys.LOCAL_ACCOUNTINFO, this);
    }
}

/**
 * 基础信息
 */
export class BaseInfo extends BaseModel {
    public hwandroid_config: string = '';
    public aws_domain: string = '';

    constructor(data?: any) {
        super(data);
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

    save() {
        engine.storage.setLocalItem(LocalKeys.LOCAL_BASEINFO, this);
    }
}

/**
 * aws信息
 */
export class AwsToken extends BaseModel {
    public hwandroid_config: string = '';
    public aws_domain: string = '';
    public domain: string = "";
    public token: string = "";
    public expired: number = 0;
    public aws = {
        AccessKeyId: "",
        SecretAccessKey: "",
        SessionToken: "",
        Expiration: ""
    };
    public prefix = "";
    public bucket = "";
    public region = "";
    public test = "";

    constructor(data?: any) {
        super(data);
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

    save() {
        engine.storage.setLocalItem(LocalKeys.LOCAL_AWSTOKEN, this);
    }
}
