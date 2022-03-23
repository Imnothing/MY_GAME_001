export enum ADType {
    /** 开屏 */
    SPLASH = 'SPLASH',
    /** Banner 横幅 */
    BANNER = 'BANNER',
    /** 激励视频 */
    REWARD_VIDEO = 'REWARD_VIDEO',
    /** 全屏插屏 */
    INSERT_SCREEN = 'INSERT_SCREEN',
    /** 弹窗插屏 */
    INSERT_POP = 'INSERT_POP',
    /** 弹窗 Banner */
    DIALOG_BANNER = 'DIALOG_BANNER',
    /**预加载弹窗 banner */
    PRELOAD_DIALOG = 'PRELOAD_DIALOG',
    /** 渲染弹窗 banner */
    RENDER_DIALOG = 'RENDER_DIALOG',

}

export interface ADCallback {


    /** 加载失败 */
    onLoadError: (code: number, erroMsg: string) => void;

    /** 加载成功 */
    onLoadSucccess: (...args: any[]) => void;

    /**
     * 视频关闭回调
     * 
     * @param isVideoEnd 视频是否播放完成
     */
    onVideoClose?: (isVideoEnd: boolean) => void;


}