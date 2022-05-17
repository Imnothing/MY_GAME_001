import { AbStateManager } from "./AbStateManager";
import { PetManager } from "./PetManager";
import { PropManager } from "./PropManager";
import { ShopManager } from "./ShopManager";
import { SptManager } from "./SptManager";


export class HomeManager {
    public static propManager: PropManager;
    public static shopManager: ShopManager;
    public static sptManager: SptManager;
    public static abManager: AbStateManager;
    public static petManager: PetManager;

    public static async init() {
        window['HomeMgr'] = this;
        return new Promise<boolean>(async (resolve, reject) => {
            this.propManager = new PropManager();
            this.propManager.init();
            this.shopManager = new ShopManager();
            this.shopManager.init();
            this.sptManager = new SptManager();
            this.sptManager.init();
            this.abManager = new AbStateManager();
            this.abManager.init();
            this.petManager = new PetManager();
            this.petManager.init();
            resolve(true)
        })
    }

    // static update(dt: number) {
    // }


}