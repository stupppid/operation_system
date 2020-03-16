import {InputProxy} from "../InputProxy";
import {IStore} from "../../index";
import CommandHandler from "./CommandHandler";
import {Command} from "./Command";


/**
 * handler可以从inputProxy中获取stdin和stdout
 * 从store中获取数据
 */
export default class SystemCommandHandler extends CommandHandler{
    inputProxy: InputProxy;
    store:IStore  // 文件 文件内容 账户 环境变量 cs 的数据
    inputEl:HTMLTextAreaElement

    constructor(store:IStore, inputEl:HTMLTextAreaElement, inputProxy: InputProxy) {
        super(store, inputEl, inputProxy)
        this.commandHandler = this.executeCommandHandler
    }

    init() {
        this.print(this.prefix)
    }

    protected get prefix() {
        return '\n' + this.store.state.getItem('account.name') + '@' +
            this.store.state.getItem('device.name') + ': '
    }

    executeCommandHandler(command) {
        Command.run(command).then((obj) => {
            if(obj.msg) {
                this.print('\n' + obj.msg)
            }
            this.print(this.prefix)
        })
    }
}