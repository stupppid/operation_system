import {FileController} from "../../controller";
import {AccountController} from "../../controller";

export interface IStore {
    fileController: FileController
    state: any
    accountController: AccountController
}

interface IView {
    run: (store:IStore, root:HTMLElement, init: any)=>void
}

export declare const console:IView
