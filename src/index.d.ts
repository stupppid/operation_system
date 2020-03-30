import {FileController} from "./core/controller";
import {AccountController} from "./core/controller";


export declare const state: {
    getItem:(stateKey: string, type: 1 | 2 | 3, current?: boolean)=> Promise<any>,
    setItem: (stateKey: string, stateValue: any, type: 1|2|3, current?: boolean)=> Promise<void>
}
export declare const fileController: FileController
export declare const accountController: AccountController
