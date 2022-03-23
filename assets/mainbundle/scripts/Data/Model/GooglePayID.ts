/**
 * 支付结果码
 */
export enum GooglePayCode {

    //取消支付
    CANCEL = 0,

    //支付失败(用户未绑定支付方式)
    ERROR_NO_PAY_TYPE = 100,

    //支付失败(其他)
    ERROR = -1,

    //支付成功
    SUCCESS = 1,

    //已经支付过了
    SUCCESS_HAS_PAY = 2,

}

export enum GooglePayAppID {
    test_inapp = "test_inapp",

    gift_100 = "gift_100",
    gift_300 = "gift_300",
    gift_400 = "gift_400",
    zs_6 = "zs_6",
    zs_30 = "zs_30",
    zs_68 = "zs_68",
    zs_128 = "zs_128",
    zs_328 = "zs_328",
    zs_648 = "zs_648",
}

export enum GooglePaySubID {
    test_sub = "test_sub",

    reward_31 = "reward_31",
}
