/**
 * 日志接口
 *
 */
export interface LoggerInterface {
    /**
     * 初始化日志
     *
     * @param option 参数选项
     */
    init(option: LoggerOption): void;
    log(tag, ...args: any[]): void;
    debug(tag, ...args: any[]): void;
    info(tag, ...args: any[]): void;
    warn(tag, ...args: any[]): void;
    error(tag, ...args: any[]): void;
}

export interface LoggerOption {
    /**
     * 是否允许输出log
     */
    enableLog: boolean;
}

/**
 * 日志管理类
 */
export const LOG_TAG = {
    /**socket开关 */
    SOCKET: { desc: 'LOG_SOCKET', isOpen: true },
    /**协议开关 */
    PROTOMGR: { desc: 'LOG_TPROTOMGR', isOpen: true },
    /**gyw开发者专属开关 */
    DEV_GYW: { desc: 'LOG_DEV_GYW', isOpen: true },
    /**cml开发者专属开关 */
    DEV_CML: { desc: 'DEV_CML', isOpen: true },
    /**xlh开发者专属开关 */
    DEV_XLH: { desc: 'LOG_DEV_XLH', isOpen: true},
    /**cml开发者专属开关 */
    DEV_SCROLL: { desc: 'DEV_SCRLL', isOpen: true },
    /**热更新开关 */
    DEV_HOT: { desc: 'DEV_HOT', isOpen: true },
    /**通用开关 */
    GAME: { desc: 'LOG_GAME', isOpen: true },
    /**通用开关 */
    FRAMEWORK: { desc: 'LOG_FRAMEWORK', isOpen: true },
}
