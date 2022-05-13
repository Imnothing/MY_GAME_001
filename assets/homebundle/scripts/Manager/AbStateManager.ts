import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { EnumAbType } from "../../../mainbundle/scripts/Data/PetData";
import { AbnormalConfig } from "../../../mainbundle/scripts/Datatable/AbnormalConfig";

/** 异常状态类 */
export class AbStateManager {
    private _abnormalConfigs: Map<EnumAbType, Array<AbnormalConfig>> = new Map<EnumAbType, Array<AbnormalConfig>>()

    init() {
        let abInfo = ConfigReader.readAbnormalConfig();
        for (let key in abInfo) {
            let abConfig: AbnormalConfig = abInfo[key];
            if (abConfig.Type == EnumAbType.Control) {
                if (!this._abnormalConfigs[EnumAbType.Control]) {
                    this._abnormalConfigs[EnumAbType.Control] = new Array<AbnormalConfig>();
                }
                this._abnormalConfigs[EnumAbType.Control].push(abConfig);
            } else if (abConfig.Type == EnumAbType.Week) {
                if (!this._abnormalConfigs[EnumAbType.Week]) {
                    this._abnormalConfigs[EnumAbType.Week] = new Array<AbnormalConfig>();
                }
                this._abnormalConfigs[EnumAbType.Week].push(abConfig);
            }
        }
    }

    getAbConfigByType(type: EnumAbType) {
        return this._abnormalConfigs[type];
    }


}

// export enum EnumAbType {
//     Week = 1,
//     Control = 2
// }


