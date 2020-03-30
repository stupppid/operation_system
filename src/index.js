import {init} from "./core";
import {FileController} from "./core/controller";
import {AccountController} from "./core/controller";
import states from "./core/controller/state";
/**
 * 1. 初始化数据库  indexdb作为磁盘  storage作为简单缓存
 * 2. 获取配置数据      theme language account等config
 * 3. 使用配置数据运行  走到login
 */
document.addEventListener("DOMContentLoaded", function(event) {
    init().then()
});

export const state = states
export const fileController = new FileController()
export const accountController = new AccountController()
