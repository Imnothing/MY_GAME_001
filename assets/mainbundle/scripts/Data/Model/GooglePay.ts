import AppNative from "../../Platform/AppNative";
import { GooglePayAppID, GooglePaySubID } from "./GooglePayID";
import { GooglePayResult } from "./GooglePayResult";


export class GooglePay {

    private static instance: GooglePay = null;
    public static getInstance(): GooglePay {
        if (this.instance == null) {
            this.instance = new GooglePay();
        }
        return this.instance;
    }

    private isInited = false;

    public init(callback = (error: Error) => { }) {
        if (this.isInited) return callback(null);
        AppNative.getInstance().googlePayInit((isSuccess: boolean) => {
            if (!isSuccess) return callback(new Error("google pay init failed"));
            this.isInited = true;
            callback(null);
        });
    }

    public queryUnsynchronizedGoods(callback = (error: Error, unsynchronizedGoods: string[]) => { }) {
        AppNative.getInstance().googlePayQueryOnceGoods((unsynchronizedGoods) => {
            callback(null, unsynchronizedGoods || []);
        });
    }

    public payOnceGoods(id: GooglePayAppID, callback = (error: Error, res: GooglePayResult) => { }) {
        AppNative.getInstance().googlePayOnceGoods(id, {
            onPayResult(result: GooglePayResult) {
                if (result.isPaySuccess()) {
                    callback(null, result);
                } else {
                    callback(new Error(result.msg), null);
                }
            }
        });
    }

    public subscribe(subscriptionID: string, callback = (error: Error, res: GooglePayResult) => { }) {
        AppNative.getInstance().googlePaySubcribe(<any>subscriptionID, {
            onPayResult(result: GooglePayResult) {
                if (result.isPaySuccess()) {
                    callback(null, result);
                } else {
                    callback(new Error(result.msg), null);
                }
            }
        });
    }

    public querySubscriptionStatus(callback = (error: Error, res: { [subscriptionID: string]: GooglePayResult }) => { }) {
        AppNative.getInstance().googlePayQuerySubcribe((res) => {
            callback(null, res || {});
        });
    }

}
