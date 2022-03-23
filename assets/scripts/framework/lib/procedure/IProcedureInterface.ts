import { ProcedureBase, ProcedureClaa } from "./ProcedureBase";

/**
 * 流程接口
 *
 */
export interface IProcedureInterface {
    /**
     * 初始化流程
     *
     */
    init(): void;
    startProcedure<T extends ProcedureBase>(uiClass: ProcedureClaa<T>,data:any);

   
}
