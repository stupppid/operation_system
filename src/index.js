import {init} from "./core";
import {FileController} from "./core/controller";
import {AccountController} from "./core/controller";
import states from "./core/controller/state";

export const state = states
export const fileController = new FileController()
export const accountController = new AccountController()
export const initialize = init

