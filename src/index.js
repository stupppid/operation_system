import {init} from "./core";
import {FileRepository} from "./core/dao/FileRepository";
import {FileController} from "./core/controller";
import {RT_FILE_TYPE, RtFile} from "./core/model/File";
/**
 * 1. 初始化数据库  indexdb作为磁盘  storage作为简单缓存
 * 2. 获取配置数据      theme language account等config
 * 3. 使用配置数据运行  走到login
 */
document.addEventListener("DOMContentLoaded", function(event) {
    init().then()
});
