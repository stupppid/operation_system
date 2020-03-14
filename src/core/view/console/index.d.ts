import {FileController} from "../../controller";
import StateController from "../../controller/StateController";
import AccountController from "../../controller/AccountController";

export interface IStore {
    fileController: FileController
    stateController: StateController
    accountController: AccountController
}

interface IView {
    run: (store:IStore, root:HTMLElement)=>void
}

export declare const console:IView