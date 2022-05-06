import { PropManager } from "./PropManager";
import { ShopManager } from "./ShopManager";


export class HomeManager {
    public static propManager: PropManager;
    public static shopManager: ShopManager;

    public static async init() {
        window['HomeMgr'] = this;
        return new Promise<boolean>(async (resolve, reject) => {
            this.propManager = new PropManager();
            this.propManager.init();
            this.shopManager = new ShopManager();
            this.shopManager.init();
            resolve(true)
        })
    }

    // static update(dt: number) {
    // }


}