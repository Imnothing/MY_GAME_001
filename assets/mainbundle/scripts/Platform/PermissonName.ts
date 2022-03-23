export enum PermissonName {
    // 常用权限
    READ_PHONE_STATE = "android.permission.READ_PHONE_STATE",// 读取手机设备状态信息
    READ_EXTERNAL_STORAGE = "android.permission.READ_EXTERNAL_STORAGE",// 读取 SDCard 权限
    WRITE_EXTERNAL_STORAGE = "android.permission.WRITE_EXTERNAL_STORAGE",// 写入 SDCard 权限
    CAMERA = "android.permission.CAMERA",// 调用系统相机拍照权限
    ACCESS_FINE_LOCATION = "android.permission.ACCESS_FINE_LOCATION",// 精准定位权限
    ACCESS_COARSE_LOCATION = "android.permission.ACCESS_COARSE_LOCATION",// 粗略定位权限

    // 不常用权限
    RECORD_AUDIO = "android.permission.RECORD_AUDIO",// 麦克风权限
    READ_CONTACTS = "android.permission.READ_CONTACTS",// 读取联系人权限
    WRITE_CONTACTS = "android.permission.WRITE_CONTACTS",// 写入联系人权限
    GET_ACCOUNTS = "android.permission.GET_ACCOUNTS",// 获取系统的用户账号列表权限
    BODY_SENSORS = "android.permission.BODY_SENSORS",// 获取传感器权限
    CALL_PHONE = "android.permission.CALL_PHONE",// 拨打电话权限
    READ_CALL_LOG = "android.permission.READ_CALL_LOG",// 读取通话记录权限
    WRITE_CALL_LOG = "android.permission.WRITE_CALL_LOG",// 写入通话记录权限
    SEND_SMS = "android.permission.SEND_SMS", // 发送短信权限
    READ_SMS = "android.permission.READ_SMS", // 阅读短信权限
    RECEIVE_SMS = "android.permission.RECEIVE_SMS" // 接收短信权限
}