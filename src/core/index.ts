import {getStore} from "../util/store";
import {FileController} from "./controller";
import StateController from "./controller/StateController";
import AccountController from "./controller/AccountController";

interface IRender {
    mode: string
    url: string
}

interface IConfig {
    render: IRender
}

export interface IStore {
    fileController: FileController
    stateController: StateController
    accountController: AccountController
}

interface IRenderer {
    run: (store: IStore, root: HTMLElement)=>never
}

async function getConfig() {
    let config: IConfig = getStore<IConfig>({
        name: 'config'
    })
    if (typeof config !== "object") {
        // todo 从数据库取
        // config =
        // todo 如果还是没有，说明是第一次开启，从systemConfig.js读取系统配置
        const configModule = await import('../config/systemConfig')
        config = configModule['default']
        console.log('config:', config)
    }
    return config
}

async function getRender(config?: IConfig): Promise<IRenderer> {
    let rendererModule: any = await import("./view/console")
    let renderer = rendererModule['default']
    return renderer
}

export async function init(): Promise<void> {
    return getConfig().then(config => {
        const root = document.createElement('div')
        root.id = 'root'
        document.body.appendChild(root)
        // 这里把接口全部传入render渲染
        getRender(config).then(renderer => {
            renderer.run({
                fileController: new FileController(),
                stateController: new StateController(),
                accountController: new AccountController()
            }, document.getElementById('root'))
        })
    })
}