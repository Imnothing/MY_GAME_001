import { GooglePayCode } from "./GooglePayID";

export interface PayCallback {

    onPayResult: (result: GooglePayResult)=>void

}

/** 支付结果信息 */
export class GooglePayResult {

    code: GooglePayCode;

    msg: string;

    orderId: string;

    id: string;

    token: string;

    vipBuyTime: number;

    autoRenewing: boolean;

    public static newInstance(str: string): GooglePayResult {
        let result: GooglePayResult = new GooglePayResult();
        let data = JSON.parse(str);
        result.code = data.code;
        result.msg = data.msg;
        result.orderId = data.orderId;
        result.id = data.id;
        result.token = data.token;
        result.vipBuyTime = data.vipBuyTime;
        result.autoRenewing = data.autoRenewing;
        return result;
    }

    isPaySuccess() {
        return this.code == GooglePayCode.SUCCESS || this.code == GooglePayCode.SUCCESS_HAS_PAY
    }

}
