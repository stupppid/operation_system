import {FileController} from "../../controller";
import AccountController from "../../controller/AccountController";

export interface IStore {
    fileController: FileController
    state: any
    accountController: AccountController
}

interface IView {
    run: (store:IStore, root:HTMLElement)=>void
}

export declare const console:IView