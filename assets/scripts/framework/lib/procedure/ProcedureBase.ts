/**
 * 流程基类
 *
 */
export class ProcedureBase {
   
     //
    // Summary:
    //     状态销毁时调用。
    OnDestroy(){

    }
    //
    // Summary:
    //     进入状态时调用。
    //
    // Parameters:
    //   procedureOwner:
    //     流程持有者。
    OnEnter(data: any){
        
    }
    //
    // Summary:
    //     状态初始化时调用。
    //
    // Parameters:
    //   procedureOwner:
    //     流程持有者。
    OnInit(data: any){

    }
 
}

export interface ProcedureClaa<T extends ProcedureBase> {
    new(): T;
    getUrl(): string;
    getClassName(): string;
    getLayerZIndex():number;
}
