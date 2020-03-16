import {init} from "./core";
/**
 * 1. 初始化数据库  indexdb作为磁盘  storage作为简单缓存
 * 2. 获取配置数据      theme language account等config
 * 3. 使用配置数据运行  走到login
 */
document.addEventListener("DOMContentLoaded", function(event) {
    init().then()
});
