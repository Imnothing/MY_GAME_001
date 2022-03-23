import { IProcedureInterface } from "./IProcedureInterface";
import { ProcedureBase, ProcedureClaa } from "./ProcedureBase";

/**
 * 流程管理(未完成)
 * 把游戏模块按流程划分,例如：loading流程，首页流程，热更流程，主游戏流程
 */
export class ProcedureManager implements IProcedureInterface{

    curProcedure:ProcedureBase;
    init(): void {
        throw new Error("Method not implemented.");
    }

    startProcedure<T extends ProcedureBase>(procedure:ProcedureClaa<T>,data:any) {
        if(this.curProcedure){
            this.curProcedure.OnDestroy();
        }
        let _procedure = new procedure();
        _procedure.OnInit(data);
    }

    // changeProcedure<T extends ProcedureBase>(procedure:ProcedureClaa<T>) {
    //     if(this.curProcedure){
    //         this.curProcedure.OnDestroy();
    //     }

    // }
    
}