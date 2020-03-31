import {FileController} from "./core/controller";
import {AccountController} from "./core/controller";
import {state} from "./core/controller";
import {RT_FILE_TYPE, RtFile} from "./core/model/File";
import {ACCOUNT_TYPE, RtAccount} from "./core/model/Account";
import {RtDB} from "./core/service/RtDB";
export const fileController = new FileController()
export const accountController = new AccountController()

export const store = {
    fileController,
    accountController,
    state
}
export {RT_FILE_TYPE, RtFile } from "./core/model/File"
export {ACCOUNT_TYPE, RtAccount} from "./core/model/Account";
export {RtDB} from "./core/service/RtDB";
export {state} from "./core/controller";
